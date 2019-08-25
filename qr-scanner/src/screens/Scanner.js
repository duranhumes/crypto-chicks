import React from 'react';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Text, View, StyleSheet, Button } from 'react-native';

import builder from '../api/builder';
import { promiseWrapper } from '../utils';
import { studentsEndpoint, vendorsEndpoint } from '../api/endpoints';

const apiInstance = builder();

export default class Scanner extends React.Component {
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
        const { student, vendor } = this.props.navigation.state.params;
        if (!student || vendor) return;

        const endpoint = student ? studentsEndpoint : vendorsEndpoint;
        const [qrData, qrDataErr] = await promiseWrapper(
            apiInstance.get(`${endpoint}/${data}`)
        );
        if (!qrDataErr) {
            this.setState(prevState => ({
                ...prevState,
                scanned: true,
                userData: qrData.data.data,
            }));
        }
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
