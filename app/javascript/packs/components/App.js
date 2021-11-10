import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./signUp";
import LogIn from "./login";
import Navbar from "./navbar";
import Students from "./students";
import Home from "./home";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/" component={Home} />
        <Route exact path="/signUp" component={SignUp} />
        <Route exact path="/students" component={Students} />
      </Switch>
    </Router>
  );
};

export default App;
