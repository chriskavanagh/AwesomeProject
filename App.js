import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './routes/TabNavigator';
import {SET_USER} from './store/actions/types';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';

function App() {
  const [initializing, setInitializing] = useState(true);
  const dispatch = useDispatch();

  // Handle user state changes
  function onAuthStateChanged(user) {
    dispatch({type: SET_USER, payload: user});
    //dispatch(setUser(user));
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

export default App;
