const initialState = [];

export default function homeReducer(state = initialState, action) {
    switch(action.type) {
        case 'FETCH_HOME_SUCCESS': return Object.assign({}, action.payload);
        case 'CLICK_HOME_LIKE':
            state.content[action.payload.key].like = action.payload.like;
            state.content[action.payload.key].islike = action.payload.islike;
            
            return Object.assign({}, state);
        case 'CLICK_HOME_STAR': 
            
            state.content[action.payload.key].star = action.payload.star;
            state.content[action.payload.key].isstar = action.payload.isstar;
            return Object.assign({},state);
        default: return state;
    }
}