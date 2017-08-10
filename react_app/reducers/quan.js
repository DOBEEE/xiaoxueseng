const initialState = {};

export default function quanReducer(state = initialState, action) {

    switch(action.type) {
        case 'FETCH_QUAN_SUCCESS': 
            return Object.assign(action.payload);
        default: return state;
    }
}