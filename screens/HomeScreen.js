import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';

export default function HomeScreen() {
  const user = useSelector((state) => state.userReducer.user);
  console.log(user);

  //const user = auth().currentUser;

  return (
    <View style={styles.container}>
      {user ? <Text>{user.email}</Text> : <Text>Please Sign In</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
