const initialState = {};

export default function loginReducer(state = initialState, action) {
    switch(action.type) {
        case 'FETCH_LOGIN_SUCCESS': 
        return Object.assign(action.payload);
        default: return state;
    }
}