import React, { useState } from 'react';

import builder from '../../../api/builder';
import { promiseWrapper } from '../../../utils';
import Wrapper from '../../../components/Wrapper';
import { Center, Row, Col } from '../../../styles';
import { studentsEndpoint } from '../../../api/endpoints';

import Form from '../components/form';

const apiInstance = builder();

function Create() {
    const [apiResponseMsg, apiResponseMsgOnChange] = useState('');
    const handleSubmit = async values => {
        const [response, responseErr] = await promiseWrapper(
            apiInstance.post(studentsEndpoint, values)
        );
        if (responseErr) {
            return setResponseMsg(responseErr.data.message);
        }

        setResponseMsg(response.data.message);
    };

    const setResponseMsg = msg => {
        apiResponseMsgOnChange(msg);
        const timeout = setTimeout(() => {
            setResponseMsg('');
            clearTimeout(timeout);
        }, 9500);
    };

    return (
        <Wrapper>
            <Center alignTop={true}>
                <Row>
                    <Col columns={12}>
                        <Center>
                            <h1>Create A Student</h1>
                            <p id="response-msg">{apiResponseMsg}</p>
                            <Form onSubmit={handleSubmit} />
                        </Center>
                    </Col>
                </Row>
            </Center>
        </Wrapper>
    );
}

export default Create;
