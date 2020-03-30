import axios from "axios";
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";

export function fetchAuth(email, password, isLogin) {
    return async function (dispatch) {
        let url = '';
        let authData = {
            email,
            password,
            returnSecureToken: true
        };

        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
        }

        try {
            const response = await axios.post(
                `${url}AIzaSyDg1jCeefcPioaiXSoGbozj2A1i4f9vAsc`,
                authData
            );
            const data = response.data;

            //Время до которого действителен token
            const expirationData = new Date(new Date().getTime() + data.expiresIn * 1000);

            //сохранение сессии подключения
            localStorage.setItem('token', data.idToken);
            localStorage.setItem('userId', data.localId);
            localStorage.setItem('expirationData', expirationData);

            dispatch(authSuccess());
            dispatch(autoLogout(data.expiresIn));

            console.log(response.data);
        } catch (e) {
            console.error(e);
        }
    }
}

//Выход по прошетсвии времени жизни token
export function autoLogout(time){
    return function (dispatch) {
        setTimeout(() => {
            dispatch(logout())
        }, time)
    }
}

//Очитстка сессии
export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationData');
    return {
       type: AUTH_LOGOUT
    }
}

export function authSuccess(token){
    return {
        type: AUTH_SUCCESS,
        token
    }
}