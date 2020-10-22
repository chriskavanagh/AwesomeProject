import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useSelector} from 'react-redux';
//import {SET_USER} from '../store/actions/types';
//import {setUser} from '../store/actions/userActions';

const AppButton = ({onPress, title}) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

function Main() {
  const user = useSelector((state) => state.userReducer.user);
  // console.log(`myUser ${JSON.stringify(user.email)}`);

  const addTodo = () => {
    firestore()
      .collection('cart')
      .add({
        items: ['Beef & Dried Tofu', 'Beef & Broccoli', 'Tuna Sushi'],
        total: '49.95',
        type: 'delivery',
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

  /* if (!user) {
    return (
      <View style={{flex: 1}}>
        <LoginScreen />
      </View>
    );
  } */

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {user ? (
        <Text style={styles.txt}>{user.email}</Text>
      ) : (
        <Text style={styles.txt}>Welcome</Text>
      )}
      <AppButton onPress={addTodo} title={'Add Data'} />
      {user && (
        <Text onPress={signOut} style={{fontSize: 18, color: 'tomato'}}>
          Sign Out
        </Text>
      )}
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
    marginVertical: 10,
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
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default Main;
