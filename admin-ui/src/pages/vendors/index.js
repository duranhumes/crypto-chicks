import React from 'react';
import { Route } from 'react-router-dom';

import Wrapper from '../../components/Wrapper';
import Header from './components/header';

import Create from './pages/create';
import Index from './pages/index';
import Edit from './pages/edit';

function Vendors() {
    return (
        <Wrapper>
            <Header />
            <Route path="/vendors" exact={true} component={Index} />
            <Route path="/vendors/create" exact={true} component={Create} />
            <Route path="/vendors/:vendorId" component={Edit} />
        </Wrapper>
    );
}

export default Vendors;
