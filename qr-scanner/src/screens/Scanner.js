import React from 'react';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Text, View, StyleSheet, Button } from 'react-native';

import builder from '../api/builder';
import Modal from '../components/Modal';
import { promiseWrapper } from '../utils';
import {
    studentsEndpoint,
    vendorsEndpoint,
    transactionsEndpoint,
} from '../api/endpoints';

const apiInstance = builder();

const dummyData = [
    {
        school_id: '242',
        name: 'Student 1',
        id: '7420A1ACFC8B40C8A417E96FCB6CB9BF',
        photo_url: 'https://api.adorable.io/avatars/285/abott@adorable.png',
    },
    {
        school_id: '242',
        name: 'Vendor 1',
        id: '3E0C1A0544724AD7817EF2119B3F35C6',
    },
];

const getTempData = isStudent => {
    return isStudent ? dummyData[0] : dummyData[1];
};

export default class Scanner extends React.Component {
    state = {
        hasCameraPermission: null,
        scanned: false,
        userData: {},
        isModalVisible: true,
    };

    async componentDidMount() {
        this.getPermissionsAsync();
    }

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    };

    handleBarCodeScanned = async ({ data }) => {
        this.setState(prevState => ({ ...prevState, scanned: true }));
        const { student, vendor } = this.props.navigation.state.params;
        if (!student || vendor) return;

        const endpoint = student ? studentsEndpoint : vendorsEndpoint;
        const [qrData, qrDataErr] = await promiseWrapper(
            apiInstance.get(`${endpoint}/${data}`)
        );

        if (!qrDataErr) {
            this.setState(prevState => ({
                ...prevState,
                userData: qrData.data.data,
            }));
        }
    };

    handleDenyOnPress = async denyData => {
        const data = dummyData.find(d => d.id !== denyData.id);

        const [response, responseErr] = await promiseWrapper(
            apiInstance.post(transactionsEndpoint, {
                vendor_id: data.id,
                student_id: denyData.id,
                approved: false,
            })
        );

        this.toggleModal();

        console.log('response.data', response.data);
        console.log('responseErr', responseErr);
    };

    handleApproveOnPress = async approveData => {
        const data = dummyData.find(d => d.id !== approveData.id);

        const [response, responseErr] = await promiseWrapper(
            apiInstance.post(transactionsEndpoint, {
                vendor_id: data.id,
                student_id: approveData.id,
                approved: true,
            })
        );

        this.toggleModal();

        console.log('response.data', response.data);
        console.log('responseErr', responseErr);
    };

    toggleModal = () => {
        this.setState(prevState => ({
            ...prevState,
            isModalVisible: !prevState.isModalVisible,
        }));
    };

    render() {
        const { hasCameraPermission, scanned, isModalVisible } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }

        const { student } = this.props.navigation.state.params;
        const modalData = getTempData(!!student);

        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                }}
            >
                <BarCodeScanner
                    onBarCodeScanned={
                        scanned ? undefined : this.handleBarCodeScanned
                    }
                    style={StyleSheet.absoluteFillObject}
                />

                {scanned && (
                    <>
                        <Button
                            title={'Tap to Scan Again'}
                            onPress={() =>
                                this.setState({
                                    scanned: false,
                                    isModalVisible: true,
                                })
                            }
                        />
                        <Modal
                            data={modalData}
                            denyOnPress={this.handleDenyOnPress}
                            approveOnPress={this.handleApproveOnPress}
                            toggleModal={this.toggleModal}
                            isModalVisible={isModalVisible}
                        />
                    </>
                )}
            </View>
        );
    }
}
