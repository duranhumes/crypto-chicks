import * as React from 'react';
import {
    createStackNavigator,
    createSwitchNavigator,
    createAppContainer,
} from 'react-navigation';

import { NavigationService } from './src/services/NavigationService';

const MainNavigator = createStackNavigator(
    {
        Home: {
            getScreen: () => require('./src/screens/Home').default,
        },
        Scanner: {
            getScreen: () => require('./src/screens/Scanner').default,
        },
    },
    {
        mode: 'modal',
        navigationOptions: {
            header: null,
        },
    }
);

const AppNavigator = createAppContainer(
    createSwitchNavigator(
        {
            Main: MainNavigator,
        },
        {
            initialRouteName: 'Main',
        }
    )
);

export default class App extends React.Component {
    render() {
        return (
            <AppNavigator
                ref={r => NavigationService.setTopLevelNavigator(r)}
            />
        );
    }
}
