import React from 'react';
import TestScreen from '../screens/TestScreen';
import {createStackNavigator} from '@react-navigation/stack';
import Main from '../screens/Main';

const Stack = createStackNavigator();

export default function TestStack() {
  return (
    <Stack.Navigator
      initialRouteName="Test"
      screenOptions={{
        headerStyle: {backgroundColor: '#f96332'},
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="Test" component={TestScreen} />
      <Stack.Screen name="Main" component={Main} />
    </Stack.Navigator>
  );
}
