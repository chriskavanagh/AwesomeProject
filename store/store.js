import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import {createStore, applyMiddleware} from 'redux';
//import {ReactReduxFirebaseProvider, getFirebase} from 'react-redux-firebase';
//import {createFirestoreInstance, getFirestore} from 'redux-firestore';

/* const middlewares = [thunk.withExtraArgument(getFirebase)];

const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares)),
); */

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
