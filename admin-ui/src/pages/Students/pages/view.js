import React, { useState, useEffect } from 'react';

import builder from '../../../api/builder';
import { promiseWrapper } from '../../../utils';
import { Center, Row, Col } from '../../../styles';
import ProfileCard from '../../../components/ProfileCard';
import TransactionCard from '../../../components/TransactionCard';
import { studentsEndpoint, transactionsEndpoint } from '../../../api/endpoints';

const apiInstance = builder();

function View(props) {
    const [studentData, studentDataOnChange] = useState({});
    const [transactionData, transactionDataOnChange] = useState({});

    const fetchTransactionData = async (params = {}) => {
        const { studentId } = params;
        if (!studentId) return;

        const [response, responseErr] = await promiseWrapper(
            apiInstance.get(`${transactionsEndpoint}/student/${studentId}`)
        );

        if (!responseErr) {
            transactionDataOnChange(response.data.data);
        }
    };

    const fetchStudentData = async (params = {}) => {
        const { studentId } = params;
        if (!studentId) return;

        const [response, responseErr] = await promiseWrapper(
            apiInstance.get(`${studentsEndpoint}/${studentId}`)
        );

        if (!responseErr) {
            studentDataOnChange(response.data.data);
        }
    };

    const validateStudentData = async (initialStateData, params) => {
        // Check if student data was passed based on
        // the click of the item in the students list page
        if (initialStateData) {
            studentDataOnChange(initialStateData);
        } else {
            await fetchStudentData(params);
        }
    };

    const { location, match } = props;
    useEffect(() => {
        validateStudentData(location.state, match.params);
        fetchTransactionData(match.params);
    }, []);

    return (
        <Center alignTop={true}>
            <Row>
                <Col columns={12}>
                    <Center>
                        <h1>View</h1>
                        <hr />
                        <h1>Student</h1>
                        <ProfileCard data={studentData} />
                        <hr />
                        <h1>Transactions</h1>
                        <TransactionCard data={transactionData} />
                    </Center>
                </Col>
            </Row>
        </Center>
    );
}

export default View;
