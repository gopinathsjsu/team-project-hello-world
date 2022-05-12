import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Bookings from './pages/bookings/mangebooking';

function App() {
    return (
        <Router>
            <Switch>
                <Route path='/bookings'>
                    <Bookings />
                </Route>
                <Route path='/signup'>
                    <Signup />
                </Route>
                <Route path='/login'>
                    <Login />
                </Route>
                <Route path='/'>
                    <Login />
                </Route>
            </Switch>
        </Router>
    )
}

export default App;