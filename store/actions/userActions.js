import {SET_USER} from './types';

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: {
      user: user,
    },
  };
};

// with implicit return statement. . .
/* export const setUser = (user) => ({  
    type: SET_USER,
    payload: {
      user: user,
    },
}); */

/* export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
}; */

/* export const addItem = (id, quantity, notes) => {
  return {
    type: "ADD_ITEM",
    payload: {
      id: id,
      quantity: quantity,
      notes: notes,
    },
  };
};

dispatch(addItem(id, value, notes.trim())); */
