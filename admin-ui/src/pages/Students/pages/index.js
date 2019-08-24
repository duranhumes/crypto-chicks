import React, { useEffect, useState } from 'react';

import builder from '../../../api/builder';
import { promiseWrapper } from '../../../utils';
import Wrapper from '../../../components/Wrapper';
import { Center, Row, Col, List, ListItem } from '../../../styles';
import { studentsEndpoint } from '../../../api/endpoints';

const apiInstance = builder();

function Index() {
    const [listOfStudents, listOfStudentsOnChange] = useState([]);

    const fetchStudents = async () => {
        const [response, responseErr] = await promiseWrapper(
            apiInstance.get(studentsEndpoint)
        );

        if (responseErr) return [];
        listOfStudentsOnChange(response.data.data);
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
                            <h1>List of Students</h1>
                            {listOfStudents.length > 0 ? (
                                <List>
                                    {listOfStudents.map(student => (
                                        <ListItem key={student.id}>
                                            ID: {student.id}
                                            <br />
                                            Name: {student.name}
                                            <br />
                                            School ID: {student.school_id}
                                            <br />
                                        </ListItem>
                                    ))}
                                </List>
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
