const initialState = {};

export default function sessionReducer(state = initialState, action) {

    switch(action.type) {
        case 'FETCH_HEADER_SUCCESS': 
            return Object.assign(action.payload);
        default: return state;
    }
}