import React from 'react';
import { Route } from 'react-router-dom';

import Create from './pages/create';
import Index from './pages/index';
import Edit from './pages/edit';

function Students() {
    return (
        <>
            <Route path="/students" exact={true} component={Index} />
            <Route path="/students/create" exact={true} component={Create} />
            <Route path="/students/:studentId" component={Edit} />
        </>
    );
}

export default Students;
