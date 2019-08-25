import React, { useState } from 'react';

import builder from '../../../api/builder';
import { promiseWrapper } from '../../../utils';
import { Center, Row, Col } from '../../../styles';
import { vendorsEndpoint } from '../../../api/endpoints';

import Form from '../components/form';

const apiInstance = builder();

function Create(props) {
    const [apiResponseMsg, apiResponseMsgOnChange] = useState('');
    const handleSubmit = async values => {
        const [response, responseErr] = await promiseWrapper(
            apiInstance.post(vendorsEndpoint, values)
        );
        if (responseErr) {
            return setResponseMsg(responseErr.data.message);
        }

        setResponseMsg(response.data.message);
        props.history.push('/vendors');
    };

    const setResponseMsg = msg => {
        apiResponseMsgOnChange(msg);
        const timeout = setTimeout(() => {
            setResponseMsg('');
            clearTimeout(timeout);
        }, 9500);
    };

    return (
        <Center alignTop={true}>
            <Row>
                <Col columns={12}>
                    <Center>
                        <h1>Create A Vendor</h1>
                        <p id="response-msg">{apiResponseMsg}</p>
                        <Form onSubmit={handleSubmit} />
                    </Center>
                </Col>
            </Row>
        </Center>
    );
}

export default Create;
