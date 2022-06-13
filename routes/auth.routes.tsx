import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Home, Login, Register } from '../pages';
const { Navigator, Screen } = createStackNavigator();

export default function AuthRoutes() {
  return (
    <Navigator headerShown="false" initialRouteName="Home">
      <Screen name="Home" component={Home} />
      <Screen name="Login" component={Login} />
      <Screen name="Register" component={Register} />
    </Navigator>
  );
}
