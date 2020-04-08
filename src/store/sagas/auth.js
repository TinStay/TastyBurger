import { put, delay } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from 'axios';

export function* logoutSaga(action){
    yield localStorage.removeItem("token");
    yield localStorage.removeItem("expirationDate");
    yield localStorage.removeItem("userId");

    yield put(actions.logoutSucceed())
}

export function* checkAuthTimeoutSaga(action){
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* authUserSaga(action){
    put(actions.authStart());

        const authData = {
            email: action.email,
            password: action.password,
            returnSecureToken: true
        }

        const api_key= process.env.REACT_APP_FIREBASE_API_KEY;
        

        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${api_key}`;
       
        if(!action.isSignup){
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${api_key}`;
        }
        
        try{
            const response = yield axios.post(url, authData)
                // console.log(response)

            const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000)

            // Storing token and expiration date locally
            yield localStorage.setItem("token", response.data.idToken)
            yield localStorage.setItem("expirationDate", expirationDate)
            yield localStorage.setItem("userId",  response.data.localId)


            yield put(actions.authSuccess(response.data.idToken, response.data.localId))
            yield put(actions.checkAuthTimeout(response.data.expiresIn))
        } catch(error){
            yield put(actions.authFailure(error.response.data.error))
        }
}