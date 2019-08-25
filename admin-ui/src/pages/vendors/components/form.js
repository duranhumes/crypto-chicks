import React, { useState } from 'react';

import { InputWrapper, Label, Input, Button } from '../../../styles';

function Form(props) {
    const [userInputValues, userInputValuesOnChange] = useState({});

    const onChangeFields = (field, value) => {
        userInputValuesOnChange({ ...userInputValues, [field]: value });
    };

    const fields = [
        {
            label: 'Name: ',
            field: 'name',
            props: {
                type: 'text',
                onChange: ({ target: { value = '' } }) =>
                    onChangeFields('name', value),
            },
        },
        {
            label: 'School ID: ',
            field: 'school_id',
            props: {
                type: 'number',
                onChange: ({ target: { value = '' } }) =>
                    onChangeFields('school_id', value),
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

        if (props.onSubmit) {
            props.onSubmit(userInputValues);
        }
    };

    return (
        <>
            <form>
                {renderFields()}
                <Button onClick={submitForm}>Submit</Button>
            </form>
        </>
    );
}

export default Form;
