from aylienapiclient import textapi
from config import DevelopmentConfig
from flask import Flask, render_template, request, flash, jsonify, session
from flask_cors import CORS
import sqlalchemy as sa
from flask_sqlalchemy import SQLAlchemy
from bson import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash

# Initializations
app = Flask(__name__)
app.config.from_object(DevelopmentConfig)
CORS(app)
db = SQLAlchemy(app)
client = textapi.Client("997164d6", "ea4a6cb4b1fffbc1739ae8995ca50a37")


class User(db.Model):
    """
    Class for "User" Model
    Atrributes:
        id (int): universally unique identifier
        username (String): user to login
        password (String): The key to sign in
    """
    id = sa.Column(sa.Integer, primary_key=True)
    username = sa.Column(sa.String(50), unique=True, nullable=False)
    password = sa.Column(sa.String(66))

    def __init__(self, username, password):
        self.username = username
        self.password = self.create_password(password)

    @staticmethod
    def create_password(password):
        return generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password, password)

    def __str__(self):
        return f'<Username: {self.username}>'


db.create_all()


@app.route('/status', methods=['GET'], strict_slashes=False)
def status():
    """ Status of API """
    return jsonify({"status": "OK"})


@app.errorhandler(404)
def not_found(error):
    """ 404 Error
    ---
    responses:
      404:
        description: a resource was not found
    """
    return jsonify({'error': str(error)})


@app.route('/register', methods=['POST'])
def newUser():
    try:
        new_user = User(request.json['username'],
                        request.json['password']
                        )
        id = db.session.add(new_user)
        db.session.commit()
        flash("New user succesfully registered, you can log in now")
        return jsonify(str(ObjectId(id)))
    except:
        return jsonify({'error': 'Try with other username'})


@app.route('/register', methods=['GET'])
def register():
    """ Register function """
    return jsonify({'status': 'ready'})


@app.route('/login', methods=['POST'])
def login():
    """ Login function to start using the application """
    username = request.json['username']
    password = request.json['password']
    user = User.query.filter_by(username=username).first()
    if user is None:
        flash('User not found')
        return jsonify({'error': 'User not found'})
    if user.username is not None and user.verify_password(password):
        session['name'] = str(user.username).capitalize()
        return jsonify({'session': session['name']})
    else:
        flash('There was an error logging in, try again')
        return jsonify({'error': 'There was an error logging in, try again'})


@app.route('/login', methods=['GET'])
def users():
    userlist = []
    user = User.query.all()
    for u in user:
        userlist.append({
            'id': u.id,
            'username': u.username
        })
    return jsonify(userlist)


@app.route('/logout')
def logout():
    # Logout function, returning home by pressing the 'salir' button
    if 'name' in session:
        session.pop('name')
        session.clear()  # Clear the name of the session
    flash("Come back soon")
    return jsonify({'session': 'None'})


@app.route('/index', methods=['POST'])
def index():
    url = request.json['url']
    number_of_ntences = request.json['number']
    nlpdata = {}
    sentiment = client.Sentiment({'url': url})
    nlpdata['sentiment'] = sentiment
    classifications = client.Classify({'url': url})
    nlpdata['classifications'] = classifications
    entities = client.Entities({"url": url})
    nlpdata['entities'] = entities
    concepts = client.Concepts({"url": url})
    nlpdata['concepts'] = concepts
    summary = client.Summarize({'url': url, 'sentences_number': number_of_ntences})
    nlpdata['summary'] = summary
    return jsonify(nlpdata)


# Start app
if __name__ == "__main__":
    """ Main Function """
    db.init_app(app)
    with app.app_context():
        db.create_all()
    app.run(port=4000, debug=True)
