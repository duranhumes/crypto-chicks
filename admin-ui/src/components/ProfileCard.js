import React from 'react';

import { Row, Col, List, ListItem, Image } from '../styles';

export default function ProfileCard(props) {
    const { data } = props;

    return (
        <List>
            <ListItem key={data.id}>
                <Row>
                    <Col columns={4}>
                        <Image src={data.photo_url} />
                    </Col>
                    <Col columns={8}>
                        ID: {data.id}
                        <br />
                        Name: {data.name}
                        <br />
                        School ID: {data.school_id}
                        <br />
                    </Col>
                </Row>
            </ListItem>
        </List>
    );
}
