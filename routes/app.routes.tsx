import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Dashboard } from '../pages';
const { Navigator, Screen } = createStackNavigator();

export default function AppRoutes() {
  return (
    <Navigator headerShown="false" initialRouteName="Dashboard">
      <Screen name="Dashboard" component={Dashboard} />
    </Navigator>
  );
}
