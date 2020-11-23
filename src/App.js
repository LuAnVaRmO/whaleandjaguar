import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Navb } from "./components/Navbar";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Search } from "./components/Search";
import { Index } from "./components/Home";

function App() {
  return (
      <Router>
      <Navb />

      <div className="container p-4">
        <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/search" component={Search} />
            <Route path="/" component={Index} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
