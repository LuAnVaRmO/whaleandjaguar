import React from "react";
import {Link} from "react-router-dom";


export const Index = () => {
    return (
        <div>
            <h1>Whale and Jaguar Technical Test</h1>
            <p>I have been encouraged and challenged to create and REST API, and UI to the user  can put an URL and a quantity of summaries, and can get an NLP analisis.</p>
            <p>I am using the SDK for python for get analisys to:</p>
            <ol>
                <li>sentiment</li>
                <li>classification</li>
                <li>entities</li>
                <li> concepts</li>
                <li>summarize.</li>
            </ol>
            <p>Just copy the URL of the article that you want to analize, and push button "analize" to see results!</p>
            <form className="card card-body border-0" to="/register">
                <Link className="btn btn-primary btn-danger nav-link" to="/register">START HERE</Link>
            </form>
        </div>
)
}