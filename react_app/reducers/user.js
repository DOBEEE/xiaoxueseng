const initialState = [];

export default function userReducer(state = initialState, action) {
    switch(action.type) {
        case 'ACTION_USER_SUCCESS': return Object.assign({},action.payload);
        case 'ACTION_COMMENT_USER': 
            state.comments = action.payload;
            return Object.assign({},state);
        case 'ACTION_STAR_USER': 
            state.stars = action.payload;
            return Object.assign({},state);
        case 'ACTION_DEL_USER': 
            if (action.payload.type == 'tie') {
                state.ties.splice(action.payload.index, 1);
            }else if (action.payload.type == 'comment'){
                state.comments.splice(action.payload.index, 1);
            } else {
                state.stars.splice(action.payload.index, 1);
            }
            return Object.assign({},state);
        default: return state;
    }
}