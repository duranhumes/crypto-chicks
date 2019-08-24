import React from 'react';

import { Center, Row, Col } from '../../../styles';
import Wrapper from '../../../components/Wrapper';

function Edit() {
    return (
        <Wrapper>
            <Center alignTop={true}>
                <Row>
                    <Col columns={12}>
                        <Center>
                            <h1>Edit</h1>
                        </Center>
                    </Col>
                </Row>
            </Center>
        </Wrapper>
    );
}

export default Edit;
