const initialState = [];

export default function tieReducer(state = initialState, action) {
  switch(action.type) {
  case 'FETCH_TIE_SUCCESS': return [...action.payload];
  default: return state;
  }
}