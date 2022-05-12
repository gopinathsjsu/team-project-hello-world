import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import HotelList from "./pages/HotelList";
import Navbar from "./components/Navbar";
function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup"></Route>
        <Route exact path="/hotels">
          <HotelList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
