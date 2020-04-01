import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () =>{
    return{
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = (token, userId) =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
}
export const authFailure = (error) =>{
    return{
        type: actionTypes.AUTH_FAILURE,
        error: error
    };
}

export const logout = () =>{
    return {
        type: actionTypes.AUTH_LOGOUT,

    }
}

export const checkAuthTimeout =( expirationTime) =>{
    return dispatch =>{
        setTimeout( () =>{
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const auth = (email, password, isSignup) =>{
    return dispatch =>{
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=api_key"
       
        if(!isSignup){
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=api_key"
        }
        
        axios.post(url, authData).
        then( response =>{
            console.log(response)

            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(checkAuthTimeout(response.data.expiresIn))
        }
        ).catch(error => {
            dispatch(authFailure(error.response.data.error))
        
    })
}
    
}