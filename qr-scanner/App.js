import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import Modal from 'react-native-modal';

import { BarCodeScanner } from 'expo-barcode-scanner';

import builder from './api/builder';
import { promiseWrapper } from './utils';
import { studentsEndpoint } from './api/endpoints';

const apiInstance = builder();

export default class App extends React.Component {
    state = {
        hasCameraPermission: null,
        scanned: false,
        userData: {},
    };

    async componentDidMount() {
        this.getPermissionsAsync();
    }

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    };

    handleBarCodeScanned = async ({ data }) => {
        this.setState({ scanned: true });
        const [qrUrl, qrUrlErr] = await promiseWrapper(
            apiInstance.get(`${studentsEndpoint}/${data}`)
        );
        if (!qrUrlErr) {
            this.setState(prevState => ({
                ...prevState,
                userData: qrUrl.data.data,
            }));
        }

        alert(`The user is ${qrUrl.data.data.name}`);
    };

    render() {
        const { hasCameraPermission, scanned } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }

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
                            onPress={() => this.setState({ scanned: false })}
                        />
                        <UserModal student={this.state.userData} />
                    </>
                )}
            </View>
        );
    }
}

function UserModal(props) {
    const [isModalVisible, isModalVisibleOnChange] = useState(true);

    const toggleModal = () => {
        isModalVisibleOnChange(!isModalVisible);
    };

    const { student } = props;
    return (
        <View>
            <Button title="Show modal" onPress={toggleModal} />
            <Modal isVisible={isModalVisible}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'grey',
                    }}
                >
                    {student && (
                        <>
                            <View style={{ width: '100%', height: '100%' }}>
                                <Image
                                    style={{ width: 225, height: 225 }}
                                    source={{ uri: student.photo_url }}
                                />
                            </View>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                                ID: {student.id}
                            </Text>
                            <Text style={{ fontSize: 35, fontWeight: 'bold' }}>
                                Name: {student.name}
                            </Text>
                            <Text style={{ fontSize: 35, fontWeight: 'bold' }}>
                                School ID: {student.school_id}
                            </Text>
                        </>
                    )}
                    <Button title="Hide modal" onPress={toggleModal} />
                </View>
            </Modal>
        </View>
    );
}
