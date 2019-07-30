import keys from '../../config/keys';
import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, FETCH_USER } from './types';


export const signup = (formProps, callback)=> async dispatch =>{
    try{
        const response = await axios.post(`${keys.siteUrl}/signup`, formProps);
    dispatch({type: AUTH_USER, payload: response.data.token});
    localStorage.setItem('token', response.data.token);
    callback(); /* history callback */
    } catch (e){
        dispatch({type: AUTH_ERROR, payload: "Email in use"});
    }
};

export const signin = (formProps, callback)=> async dispatch =>{
    try{
        const response = await axios.post(`${keys.siteUrl}/signin`, formProps);
    dispatch({type: AUTH_USER, payload: response.data.token});
    dispatch({type: AUTH_ERROR, payload: "nothing"});
    localStorage.setItem('token', response.data.token);
    callback(); /* history callback */
    } catch (e){
        dispatch({type: AUTH_ERROR, payload: "Invalid login credentials"});
    }
};

export const fetchUser = ()=> async dispatch=>{
    const res = await axios.get("/api/current_user");
    dispatch({type: FETCH_USER, payload: res.data})
}

export const signout = ()=>async dispatch =>{
    localStorage.removeItem('token');
    dispatch({type: AUTH_USER, payload: ''});
    dispatch({type: AUTH_ERROR, payload: ''});
}


