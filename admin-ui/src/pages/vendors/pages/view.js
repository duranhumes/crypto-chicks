import React from 'react';

import { Center, Row, Col } from '../../../styles';

function View() {
    return (
        <Center alignTop={true}>
            <Row>
                <Col columns={12}>
                    <Center>
                        <h1>View</h1>
                    </Center>
                </Col>
            </Row>
        </Center>
    );
}

export default View;
