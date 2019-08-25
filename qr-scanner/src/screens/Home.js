import React from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import { NavigationService } from '../services/NavigationService';

export default class Home extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: 'teal',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={() =>
                        NavigationService.navigate('Scanner', { student: true })
                    }
                >
                    <Text
                        style={{
                            fontSize: 80,
                            textTransform: 'uppercase',
                            color: 'white',
                        }}
                    >
                        Students
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: 'navy',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={() =>
                        NavigationService.navigate('Scanner', { vendor: true })
                    }
                >
                    <Text
                        style={{
                            fontSize: 80,
                            textTransform: 'uppercase',
                            color: 'white',
                        }}
                    >
                        Vendors
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
