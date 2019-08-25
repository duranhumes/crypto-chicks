import React, { useState, useEffect } from 'react';

import builder from '../api/builder';
import { promiseWrapper } from '../utils';
import { Row, Col, List, ListItem } from '../styles';
import { studentsEndpoint, vendorsEndpoint } from '../api/endpoints';

const apiInstance = builder();

export default function TransactionList(props) {
    const [transactionData, updateTransactionData] = useState([]);
    const fetchTransactions = (data = []) => {
        data.forEach(async d => {
            const [studentResponse, studentResponseErr] = await promiseWrapper(
                apiInstance.get(`${studentsEndpoint}/${d.student_id}`)
            );

            const [vendorResponse, vendorResponseErr] = await promiseWrapper(
                apiInstance.get(`${vendorsEndpoint}/${d.vendor_id}`)
            );

            updateTransactionData(prevData => [
                ...prevData,
                {
                    ...d,
                    created_at: new Date(d.created_at).toLocaleString(),
                    student: !studentResponseErr
                        ? studentResponse.data.data
                        : {},
                    vendor: !vendorResponseErr ? vendorResponse.data.data : {},
                },
            ]);
        });
    };

    useEffect(() => {
        fetchTransactions(props.data);
    }, [props.data]);

    return (
        transactionData.length > 0 && (
            <List>
                {transactionData.map(d => (
                    <ListItem key={d.id}>
                        <Row>
                            <Col columns={12}>
                                ID: {d.id}
                                <br />
                                Vendor Name: {d.vendor.name}
                                <br />
                                Student Name: {d.student.name}
                                <br />
                                Date: {d.created_at}
                                <br />
                            </Col>
                        </Row>
                    </ListItem>
                ))}
            </List>
        )
    );
}
