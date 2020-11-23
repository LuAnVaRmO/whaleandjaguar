import React from 'react'
import {Link} from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap';
import {cleanCookies} from "universal-cookie/lib/utils";

 const handleSubmit = async (e) => {
     console.log(document.cookie);
     if(document.cookie) {
        cleanCookies();
        console.log("Cleaning...")
        console.log(document.cookie);
     }
 }
export const Navb = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Whale and Jaguar</Navbar.Brand>
            <Nav className="mr-auto">
                <Link className="nav-link" to="/login">Login</Link>
                <Link className="nav-link" to="/register">Register</Link>
                <Link className="nav-link" onClick={handleSubmit} to="/Logout">Logout</Link>
            </Nav>
        </Navbar>
    )
}
