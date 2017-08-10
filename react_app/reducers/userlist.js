const initialState = [];

export default function userlistReducer(state = initialState, action) {
    switch(action.type) {
        case 'ACTION_USERLIST_SUCCESS': 
        return Object.assign(action.payload);
        default: return state;
    }
}