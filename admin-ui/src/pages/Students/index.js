import React from 'react';
import { Route } from 'react-router-dom';

import Wrapper from '../../components/Wrapper';
import Header from './components/header';

import Create from './pages/create';
import Index from './pages/index';
import View from './pages/view';

function Students() {
    return (
        <Wrapper>
            <Header />
            <Route path="/students" exact={true} component={Index} />
            <Route path="/students/create" exact={true} component={Create} />
            <Route path="/students/:studentId" component={View} />
        </Wrapper>
    );
}

export default Students;
