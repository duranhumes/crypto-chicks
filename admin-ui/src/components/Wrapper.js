import React from 'react';

import { Container, Top } from '../styles';

function Wrapper({ children }) {
    return (
        <Container>
            <Top>Admin UI</Top>
            {children}
        </Container>
    );
}

export default Wrapper;
