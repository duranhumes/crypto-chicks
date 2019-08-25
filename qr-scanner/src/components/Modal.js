import React from 'react';
import { Text, View, Image, Button, TouchableOpacity } from 'react-native';
import RNModal from 'react-native-modal';

export default function Modal(props) {
    const noop = () => {};
    const { data, denyOnPress = noop, approveOnPress = noop } = props;

    return (
        <View>
            <Button title="Show modal" onPress={props.toggleModal} />
            <RNModal isVisible={props.isModalVisible}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                    }}
                >
                    <View
                        style={{
                            width: 125,
                            height: 125,
                            marginBottom: 20,
                        }}
                    >
                        <Image
                            style={{ flex: 1, width: 125, height: 125 }}
                            source={{ uri: data.photo_url }}
                        />
                    </View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                        ID: {data.id}
                    </Text>
                    <Text style={{ fontSize: 35, fontWeight: 'bold' }}>
                        Name: {data.name}
                    </Text>
                    <Text style={{ fontSize: 35, fontWeight: 'bold' }}>
                        School ID: {data.school_id}
                    </Text>
                    <View
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            marginTop: 50,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'teal',
                                borderRadius: 10,
                                marginRight: 40,
                                padding: 20,
                            }}
                            onPress={() => approveOnPress(data)}
                        >
                            <Text
                                style={{
                                    fontSize: 30,
                                    textTransform: 'uppercase',
                                    color: 'white',
                                }}
                            >
                                Approve
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'red',
                                borderRadius: 10,
                                padding: 20,
                            }}
                            onPress={() => denyOnPress(data)}
                        >
                            <Text
                                style={{
                                    fontSize: 30,
                                    textTransform: 'uppercase',
                                    color: 'black',
                                }}
                            >
                                Deny
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={{ marginTop: 70 }}
                        onPress={props.toggleModal}
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
            </RNModal>
        </View>
    );
}
