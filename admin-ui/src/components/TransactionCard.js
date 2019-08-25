import React from 'react';

import { Row, Col, List, ListItem, Image } from '../styles';

export default function TransactionCard(props) {
    const { data } = props;

    return (
        data.length > 0 && (
            <List>
                {data.map(d => (
                    <ListItem key={d.id}>
                        <Row>
                            <Col columns={4}>
                                <Image src={d.photo_url} />
                            </Col>
                            <Col columns={8}>
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
