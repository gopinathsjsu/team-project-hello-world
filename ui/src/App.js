import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './pages/auth/Login';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/login'>
                    <Login/>
                </Route>
                <Route exact path='/signup'>
                </Route>
            </Switch>
        </Router>
    )
}

export default App;