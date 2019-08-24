import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Students from './pages/Students';

export default function Routes() {
    return (
        <Router>
            <Route path="/" exact={true} component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/students" component={Students} />
        </Router>
    );
}
