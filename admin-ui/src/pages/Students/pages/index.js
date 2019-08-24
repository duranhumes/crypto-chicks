import React, { useEffect, useState } from 'react';

import builder from '../../../api/builder';
import { promiseWrapper } from '../../../utils';
import Wrapper from '../../../components/Wrapper';
import { Center, Row, Col } from '../../../styles';
import { studentsEndpoint } from '../../../api/endpoints';

const apiInstance = builder();

function Index() {
    const [listOfStudents, listOfStudentsOnChange] = useState([]);

    const fetchStudents = async () => {
        const [response, responseErr] = await promiseWrapper(
            apiInstance.get(studentsEndpoint)
        );

        if (responseErr) return [];
        listOfStudentsOnChange(response.data);
    };
    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <Wrapper>
            <Center alignTop={true}>
                <Row>
                    <Col columns={12}>
                        <Center>
                            <h1>Index</h1>
                            {listOfStudents.length > 0 ? (
                                listOfStudents.map(student => (
                                    <li key={student.id}>{student.name}</li>
                                ))
                            ) : (
                                <p>No students found</p>
                            )}
                        </Center>
                    </Col>
                </Row>
            </Center>
        </Wrapper>
    );
}

export default Index;
