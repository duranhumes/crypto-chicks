import React, { useState, useEffect } from 'react';

import builder from '../../../api/builder';
import { promiseWrapper } from '../../../utils';
import { Center, Row, Col } from '../../../styles';
import ProfileCard from '../../../components/ProfileCard';
import TransactionList from '../../../components/TransactionList';
import { vendorsEndpoint, transactionsEndpoint } from '../../../api/endpoints';

const apiInstance = builder();

function View(props) {
    const [vendorData, vendorDataOnChange] = useState({});
    const [transactionData, transactionDataOnChange] = useState([]);

    const fetchTransactionData = async (params = {}) => {
        const { vendorId } = params;
        if (!vendorId) return;

        const [response, responseErr] = await promiseWrapper(
            apiInstance.get(`${transactionsEndpoint}/vendor/${vendorId}`)
        );

        if (!responseErr) {
            transactionDataOnChange(response.data.data);
        }
    };

    const fetchVendorData = async (params = {}) => {
        const { vendorId } = params;
        if (!vendorId) return;

        const [response, responseErr] = await promiseWrapper(
            apiInstance.get(`${vendorsEndpoint}/${vendorId}`)
        );

        if (!responseErr) {
            vendorDataOnChange(response.data.data);
        }
    };

    const validateVendorData = async (initialStateData, params) => {
        // Check if vendor data was passed based on
        // the click of the item in the vendors list page
        if (initialStateData) {
            vendorDataOnChange(initialStateData);
        } else {
            await fetchVendorData(params);
        }
    };

    const { location, match } = props;
    useEffect(() => {
        validateVendorData(location.state, match.params);
        fetchTransactionData(match.params);
    }, [location.state, match.params]);

    return (
        <Center alignTop={true}>
            <Row>
                <Col columns={12}>
                    <Center>
                        <h1>View</h1>
                        <hr />
                        <h1>Vendor</h1>
                        <ProfileCard data={vendorData} />
                        <hr />
                        <h1>Transactions</h1>
                        <TransactionList data={transactionData} />
                    </Center>
                </Col>
            </Row>
        </Center>
    );
}

export default View;
