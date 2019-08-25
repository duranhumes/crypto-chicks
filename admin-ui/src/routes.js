import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Vendors from './pages/vendors';
import Students from './pages/students';

export default function Routes() {
    return (
        <Router>
            <Route path="/" exact={true} component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/students" component={Students} />
            <Route path="/vendors" component={Vendors} />
        </Router>
    );
}
