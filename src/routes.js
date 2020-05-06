import React from 'react';
import { Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Feed from './pages/Feed';
import New from './pages/New';

import logo from '../assets/logo.png';

const Routes = createAppContainer(
  createStackNavigator({
    Feed: {
      screen: Feed,
      navigationOptions: {
        title: 'Fotos'
      }
    },
    New: {
      screen: New,
      navigationOptions: {
        title: 'Publicar nova foto'
      }
    }
  }, {
    initialRouteName: 'New',
    defaultNavigationOptions: {
      headerTintColor: "#000",
      headerTitle: () => <Image style={{ marginHorizontal: 20 }} source={logo} />,
      headerBackTitle: null
    },
    mode: 'modal'
  })
);
export default Routes;