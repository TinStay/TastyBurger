import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () =>{
    return{
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = (authData) =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
}
export const authFailure = (error) =>{
    return{
        type: actionTypes.AUTH_FAILURE,
        error: error
    };
}
export const auth = (email, password) =>{
    return dispatch =>{
        dispatch(authStart());
        axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]")
    }
    
}