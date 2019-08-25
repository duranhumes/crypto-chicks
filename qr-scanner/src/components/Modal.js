import React, { useState } from 'react';
import { Text, View, Image, Button, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

export default function Modal(props) {
    const student = {
        id: '326f9dba2b34498ebc07eda350d106d3',
        school_id: '242',
        name: 'Student 1',
        photo_url: 'https://api.adorable.io/avatars/285/abott@adorable.png',
    };
    const [isModalVisible, isModalVisibleOnChange] = useState(true);

    const toggleModal = () => {
        isModalVisibleOnChange(!isModalVisible);
    };

    // const { student } = props;
    return (
        <View>
            <Button title="Show modal" onPress={toggleModal} />
            <RNModal isVisible={isModalVisible}>
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
            </RNModal>
        </View>
    );
}
