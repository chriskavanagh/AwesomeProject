import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function LoginScreen({navigation}) {
  const user = useSelector((state) => state.userReducer.user);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onFooterLinkPress = () => {
    navigation.navigate('Registration');
  };

  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  const onLoginPress = () => {
    setError(null);
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setLoading(false);
        console.log('You are signed in!');
      })
      //.then(() => navigation.navigate('Test'))
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setLoading(false);
          setError('The Email Address Is Already In Use');
          console.log('Email address already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          setLoading(false);
          setError('Your Email Address Is Invalid');
          console.log('That email address is invalid!');
        }
        if (error.code === 'auth/user-not-found') {
          setLoading(false);
          setError('User Not Found');
          console.log('That email address is invalid!');
        }
        if (error.code === 'auth/wrong-password') {
          setLoading(false);
          setError('Your Password Is Invalid');
          console.log('Bad Password');
        }
        console.error(error);
      });
  };

  if (loading) {
    return (
      <View style={{marginTop: 150}}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        {user != null ? (
          <Text style={styles.userTxt}>You're logged in as {user.email}</Text>
        ) : (
          <Text style={styles.userTxt} style={styles.userTxt}>
            Please log in. . .
          </Text>
        )}
      </View>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
        {/* <Image style={styles.logo} source={require('../../assets/icon.png')} /> */}
        <View>{error ? <Text style={styles.error}>{error}</Text> : null}</View>
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
          <View>
            <Text style={styles.footerText}>Don't have an account? </Text>
          </View>
          <View>
            <Text
              onPress={() => navigation.navigate('Registration')}
              style={styles.footerLink}>
              Sign up
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={signOut}>
              <Text style={styles.footerLink}>Log Out</Text>
            </TouchableOpacity>
          </View>
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
    flexDirection: 'column',
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
  error: {
    color: 'red',
    fontSize: 17,
    textAlign: 'center',
  },
});
