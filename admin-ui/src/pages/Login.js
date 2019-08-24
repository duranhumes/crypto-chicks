import React, { useState } from 'react';

import {
    Center,
    Row,
    Col,
    InputWrapper,
    Label,
    Input,
    Button,
} from '../styles';
import Wrapper from '../components/Wrapper';

function Login() {
    const [userInputValues, userInputValuesOnChange] = useState({});

    const onChangeFields = (field, value) => {
        userInputValuesOnChange({ ...userInputValues, [field]: value });
    };

    const fields = [
        {
            label: 'E-Mail: ',
            field: 'email',
            props: {
                type: 'email',
                onChange: ({ target: { value = '' } }) =>
                    onChangeFields('email', value),
            },
        },
        {
            label: 'Password: ',
            field: 'password',
            props: {
                type: 'password',
                onChange: ({ target: { value = '' } }) =>
                    onChangeFields('password', value),
            },
        },
    ];

    const renderFields = () =>
        fields.map(f => (
            <InputWrapper key={f.props.field}>
                <Label>{f.label} </Label>
                <Input {...f.props} />
            </InputWrapper>
        ));

    const submitForm = e => {
        e.preventDefault();
        console.log(userInputValues);
    };

    return (
        <Wrapper>
            <Center alignTop={true}>
                <Row>
                    <Col columns={12}>
                        <Center>
                            <form>
                                {renderFields()}
                                <Button onClick={submitForm}>Submit</Button>
                            </form>
                        </Center>
                    </Col>
                </Row>
            </Center>
        </Wrapper>
    );
}

export default Login;
