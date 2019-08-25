import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    Button,
    TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import * as Permissions from 'expo-permissions';
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
    const student = {
        id: '25e073558d53483c97767fd8bacece3d',
        name: 'Duran Humes',
        photo_url: 'https://api.adorable.io/avatars/285/abott@adorable.png',
        school_id: '236',
    };
    const [isModalVisible, isModalVisibleOnChange] = useState(true);

    const toggleModal = () => {
        isModalVisibleOnChange(!isModalVisible);
    };

    // const { student } = props;
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
                            <View
                                style={{
                                    width: 125,
                                    height: 125,
                                    marginBottom: 20,
                                }}
                            >
                                <Image
                                    style={{ flex: 1, width: 125, height: 125 }}
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
                    <TouchableOpacity
                        style={{ marginTop: 30 }}
                        onPress={toggleModal}
                    >
                        <Text
                            style={{
                                fontSize: 30,
                                textTransform: 'uppercase',
                                color: 'blue',
                            }}
                        >
                            Close
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}
