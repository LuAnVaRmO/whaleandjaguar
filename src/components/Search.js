import React, { useState } from "react";
import {  Nav } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const API = process.env.REACT_APP_API;

export const Search = () => {

    const [url, setUrl] = useState('');
    const [number, setNumber] = useState('');

    const [sentiment, setSentiment] = useState('');
    const [classifications, setClassifications] = useState('');
    const [concepts, setConcepts] = useState('');

    const [entities, setEntities] = useState('');
    const [person, setPersonEntities] = useState('');
    const [organizations, setOrganizations] = useState('');
    const [location, setLocation] = useState('');
    const [keyword, setKeyword] = useState('');
    const [date, setDate] = useState('');

    const [summary, setSummary] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${API}/index`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url,
                number
            })
        })
        const data = await res.json();

        setSentiment(data['sentiment']);
        setClassifications(data['classifications']);

        setEntities(data['entities']['entities']);
        setPersonEntities(entities['person']);
        setOrganizations(entities['organization']);
        setLocation(entities['location']);
        setKeyword(entities['keyword']);
        setDate(entities['date']);
        setConcepts(data['concepts']['concepts']);
        setSummary(data['summary']['sentences']);
    }

    return (
        <div className="Col p-2">
            <form onSubmit={handleSubmit} className="card card-body">
                <input
                    type="text"
                    onChange={(e) => setUrl(e.target.value)}
                    value={url}
                    className="form-control"
                    placeholder="URL"
                    autoFocus
                />
                <input
                    type="text"
                    onChange={(e) => setNumber(e.target.value)}
                    value={number}
                    className="form-control"
                    placeholder="Number of sentences"
                />
                <button className="btn btn-primary btn-block">Analize</button>
            </form>
            <br />
            { sentiment ?
           <Tab.Container id="left-tabs-example" defaultActiveKey="sentiment">
                      <Row>
                        <Col sm={3}>
                          <Nav variant="pills" className="flex-column">
                              <Nav.Item>
                                  <Nav.Link eventKey="text">Text captured</Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                  <Nav.Link eventKey="sentiment">Sentiment</Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                  <Nav.Link eventKey="classification">Classification</Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                  <Nav.Link eventKey="entities">Entities</Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                  <Nav.Link eventKey="concepts">Concepts</Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                  <Nav.Link eventKey="summary">Summary</Nav.Link>
                              </Nav.Item>
                          </Nav>
                        </Col>
                        <Col md={9}>
                          <Tab.Content>
                              <Tab.Pane eventKey="text">
                                  <h4>Text analized</h4>
                                <p>{ sentiment['text'] }</p>
                              </Tab.Pane>
                              <Tab.Pane eventKey="sentiment">
                                  <div><h5>Polarity: </h5> <p>{ sentiment['polarity'] }</p></div>
                                  <div><h5>Polarity confidence:</h5> <p>{ sentiment['polarity_confidence'] }</p></div>
                                  <div><h5>Subjectivity: </h5><p>{ sentiment['subjectivity'] }</p></div>
                                  <div><h5>Subjectivity confidence:</h5><p>{ sentiment['subjectivity_confidence'] }</p></div>
                              </Tab.Pane>
                              <Tab.Pane eventKey="classification">
                                  <p>Categories:</p>
                                  { classifications ?
                                     classifications['categories'] && classifications['categories'].length>0 ?
                                        classifications['categories'].map((ob) =>
                                            <ul><p className="font-weight-bold text-capitalize">{ob['label'].toString()}</p>
                                                    <li>Code: {ob['code'].toString()}</li>
                                                    <li>Confidence: {ob['confidence'].toString()}</li>
                                                </ul>
                                        )
                                         : 'Empty'
                                    : 'Empty'
                                }
                                <p>Language: { classifications['language']==='en' ? 'English' : classifications['language'] }</p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="entities">
                                <h3>Person: </h3>
                                <ul>
                                    { !person ? '' :
                                        Object.keys(person).map((key) =>
                                    <li>{person[key]}</li>
                                )}
                                </ul>
                                <h3>Organizations: </h3>
                                <ul>
                                    { !organizations ? '' :
                                        Object.keys(organizations).map((key) =>
                                    <li>{organizations[key]}</li>
                                )}
                                </ul>
                                  <h3>Location: </h3>
                                <ul>
                                    { !location ? '' :
                                        Object.keys(location).map((key) =>
                                    <li>{location[key]}</li>
                                )}
                                </ul>
                                  <h3>Keywords: </h3>
                                <ul>
                                    { !keyword ? '' :
                                        Object.keys(keyword).map((key) =>
                                    <li>{keyword[key]}</li>
                                )}
                                </ul>
                                  <h3>Date: </h3>
                                <ul>
                                    { !date ? '' :
                                        Object.keys(date).map((key) =>
                                    <li>{date[key]}</li>
                                )}
                                </ul>
                            </Tab.Pane>
                            <Tab.Pane eventKey="concepts">
                                {Object.keys(concepts).map((key) =>
                                    <ul><h3>{key}</h3>
                                        <li>Support: {concepts[key]['support']}</li>
                                    </ul>
                                )}
                            </Tab.Pane>
                             <Tab.Pane eventKey="summary">
                                 <h3>Number of summaries =  {number}</h3>
                                 <ul>
                                     { Object.keys(summary).map((key) =>
                                         <li>{summary[key]}</li>
                                     )}
                                 </ul>
                            </Tab.Pane>
                          </Tab.Content>
                        </Col>
                      </Row>
                    </Tab.Container>
                : ''
            }
       </div>
    )
}
