import React, { useEffect, useState } from 'react';

import builder from '../../../api/builder';
import { promiseWrapper } from '../../../utils';
import { studentsEndpoint } from '../../../api/endpoints';
import { Center, Row, Col, List, ListItem, Image } from '../../../styles';

const apiInstance = builder();

function Index(props) {
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
        <Center alignTop={true}>
            <Row>
                <Col columns={12}>
                    <Center>
                        <h1>List of Students</h1>
                        {listOfStudents.length > 0 ? (
                            <List>
                                {listOfStudents.map(student => (
                                    <ListItem
                                        key={student.id}
                                        linked={true}
                                        onClick={() =>
                                            props.history.push(
                                                `/students/${student.id}`,
                                                student
                                            )
                                        }
                                    >
                                        <Row>
                                            <Col columns={4}>
                                                <Image
                                                    src={student.photo_url}
                                                />
                                            </Col>
                                            <Col columns={8}>
                                                ID: {student.id}
                                                <br />
                                                Name: {student.name}
                                                <br />
                                                School ID: {student.school_id}
                                                <br />
                                            </Col>
                                        </Row>
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
    );
}

export default Index;
