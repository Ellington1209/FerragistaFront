import { actionTypes } from '../actions/auth.actions';
import initialState from './initialState';


const authReducer = (state = initialState.auth, action) => {
    switch(action.type){
        case actionTypes.CHANGE:
            return {
                ...state,
                credentials:{
                    ...state.credentials,
                    ...action.payload
                }
            }
        case actionTypes.GET_TOKEN:
            return { ...state, ...action.token}

        case actionTypes.SUCCESS:
            return { ...state, success:action }

        default:
                return state;
    }
}
export default authReducer;