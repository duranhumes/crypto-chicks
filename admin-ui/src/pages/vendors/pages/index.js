import React, { useEffect, useState } from 'react';

import builder from '../../../api/builder';
import { promiseWrapper } from '../../../utils';
import { Center, Row, Col, List, ListItem, Image } from '../../../styles';
import { vendorsEndpoint } from '../../../api/endpoints';

const apiInstance = builder();

function Index() {
    const [listOfVendors, listOfVendorsOnChange] = useState([]);

    const fetchVendors = async () => {
        const [response, responseErr] = await promiseWrapper(
            apiInstance.get(vendorsEndpoint)
        );

        if (responseErr) return [];
        listOfVendorsOnChange(response.data.data);
    };
    useEffect(() => {
        fetchVendors();
    }, []);

    return (
        <Center alignTop={true}>
            <Row>
                <Col columns={12}>
                    <Center>
                        <h1>List of Vendors</h1>
                        {listOfVendors.length > 0 ? (
                            <List>
                                {listOfVendors.map(vendor => (
                                    <ListItem key={vendor.id}>
                                        <Row>
                                            <Col columns={4}>
                                                <Image src={vendor.photo_url} />
                                            </Col>
                                            <Col columns={8}>
                                                ID: {vendor.id}
                                                <br />
                                                Name: {vendor.name}
                                                <br />
                                                School ID: {vendor.school_id}
                                                <br />
                                            </Col>
                                        </Row>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <p>No vendors found</p>
                        )}
                    </Center>
                </Col>
            </Row>
        </Center>
    );
}

export default Index;