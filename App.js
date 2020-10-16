import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import LoginScreen from './screens/LoginScreen';
import firestore from '@react-native-firebase/firestore';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';

const AppButton = ({onPress, title}) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

function App() {
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  const addTodo = () => {
    firestore()
      .collection('cart')
      .add({
        items: ['California Roll', 'Spicy Tuna Roll', 'Egg Roll'],
        total: '49.95',
        type: 'pickup',
      })
      .then(() => {
        console.log('Order added!');
      });
  };

  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View style={{flex: 1}}>
        <LoginScreen user={user} setUser={setUser} />
      </View>
    );
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.txt}>Welcome, {user.email}</Text>
      <AppButton onPress={addTodo} title={'Add Data'} />
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
  footerLink: {
    color: '#788eec',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default App;
