import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
//import { useDispatch } from "react-redux";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [newUser, setUser] = useState({});
  const [current, setCurrent] = useState();
  //const dispatch = useDispatch();

  /* const onFooterLinkPress = () => {
    navigation.navigate('Registration');
  }; */

  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  function onAuthStateChanged(user) {
    setUser(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    console.log(subscriber);
    return subscriber; // unsubscribe on unmount
  }, []);

  const onLoginPress = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log(newUser);
        console.log('You are signed in!');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('Email address already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        {newUser != null ? (
          <Text style={styles.userTxt}>
            You're already logged in as {newUser.email}
          </Text>
        ) : (
          <Text style={styles.userTxt} style={styles.userTxt}>
            Please log in. . .
          </Text>
        )}
      </View>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
        {/* <Image style={styles.logo} source={require('../../assets/icon.png')} /> */}
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text.trim())}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text.trim())}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={onLoginPress}>
          <Text style={styles.buttonTitle}>Log in</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Don't have an account?{' '}
            {/* <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Sign up
            </Text> */}
          </Text>
          <TouchableOpacity onPress={signOut}>
            <Text style={styles.footerLink}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: 'grey',
  },
  logo: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: 'center',
    margin: 30,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  button: {
    backgroundColor: '#788eec',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 18,
    color: '#2e2e2d',
  },
  footerLink: {
    color: '#788eec',
    fontWeight: 'bold',
    fontSize: 18,
  },
  txt: {
    fontSize: 21,
    color: 'white',
    alignSelf: 'center',
    marginVertical: 75,
  },
  userContainer: {
    marginTop: 40,
    alignSelf: 'center',
    marginVertical: 30,
    marginBottom: 50,
  },
  userTxt: {
    color: 'white',
    fontSize: 16,
  },
});
