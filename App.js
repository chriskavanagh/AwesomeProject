import 'react-native-gesture-handler';
import React from 'react';
import LoginScreen from './screens/LoginScreen';
import firestore from '@react-native-firebase/firestore';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

/* if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
} */

/* const AppButton = ({onPress, title}) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
); */

function App() {
  const addTodo = () => {
    firestore()
      .collection('Users')
      .add({
        name: 'Missy Kavanagh',
        age: 20,
      })
      .then(() => {
        console.log('User added!');
      });
  };

  return (
    <View style={{flex: 1}}>
      <LoginScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 10,
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  txt: {
    padding: 20,
    fontSize: 20,
  },
});

export default App;
