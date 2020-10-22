import React from 'react';
//import auth from '@react-native-firebase/auth';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

export default function TestScreen({navigation}) {
  /* const renders = React.useRef(0);
  console.log(renders); */
  const user = useSelector((state) => state.userReducer.user);
  console.log(user);

  //const user = auth().currentUser;

  return (
    <View style={styles.container}>
      {user ? (
        <Text style={styles.txt}>{user.email}</Text>
      ) : (
        <Text style={styles.txt}>Please Sign In</Text>
      )}
      <View style={styles.btn}>
        <Button
          onPress={() => navigation.navigate('Main')}
          title="Go To Main"
          color="#841584"
        />
        {/* <Text>renders: {renders.current++}</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    marginVertical: 30,
    fontSize: 22,
  },
  btn: {
    width: '65%',
  },
});
