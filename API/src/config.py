import os


class Config(object):
    SECRET_KEY = 'mysecretkey'


class DevelopmentConfig(Config):
    DEBUG = True
    HOST = '127.0.0.1'
    PORT = '4000'
    threaded = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///users.db'
    UPLOAD_FOLDER = "./static"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
