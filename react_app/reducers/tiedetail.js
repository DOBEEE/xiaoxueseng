const initialState = [];

export default function tiedetailReducer(state = initialState, action) {
  switch(action.type) {
    case 'ACTION_COMMENT_SUCCESS': 
        state.comments.push(action.payload);
        return Object.assign({},state);
    case 'ACTION_TIEDETAIL_SUCCESS': 
        return Object.assign({},action.payload);
  default: return state;
  }
}