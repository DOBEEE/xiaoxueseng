const initialState = [];

export default function signupReducer(state = initialState, action) {
  switch(action.type) {
  case 'FETCH_SIGNUP_SUCCESS': 
  return Object.assign({},action.payload);
  default: return state;
  }
}