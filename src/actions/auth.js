import Swal from "sweetalert2";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";


export const startLogin = (email, password) => {
  return async (dispatch) => {
    
    const resp = await fetchWithoutToken('auth', { email, password }, 'POST');
    const body = await resp.json();

    if (body?.token) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-data', new Date().getTime());
      dispatch(login({
        uid: body.uid,
        name: body.name
      }))
    } else {
      Swal.fire('Error', body.message, 'error');
    }
  }
}

export const startRegister = (name, email, password) => {
  return async (dispatch) => {
    const resp = await fetchWithoutToken('auth/new', { name, email, password }, 'POST');
    const body = await resp.json();

    if (body?.token) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-data', new Date().getTime());

      dispatch(login({
        uid: body.uid,
        name: body.name
      }));

    } else {
      Swal.fire('Error', body.message, 'error');
    }
  }
}

export const startChecking = () => {
  return async (dispatch) => {

    const resp = await fetchWithToken('auth/renew');
    const body = await resp.json();

    if (body?.token) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-data', new Date().getTime());

      dispatch(login({
        uid: body.uid,
        name: body.name
      }))
    } else {
      dispatch(checkingFinish());
      //Swal.fire('Error', body.message, 'error');
    }

  }
}

export const checkingFinish = () => ({
  type: types.authCheckingFinish
});

export const login = (user) => ({
  type: types.authLogin,
  payload: user
});

export const startLogout = () => {
  return async (dispatch) => {

    localStorage.clear();
    dispatch(logout());
  }
}

export const logout = () => ({
  type: types.authLogout
})