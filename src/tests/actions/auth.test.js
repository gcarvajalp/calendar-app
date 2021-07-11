import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

import { login, startLogin, startRegister, startChecking } from '../../actions/auth';
import { types } from '../../types/types';
import * as fetchModule from '../../helpers/fetch';

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();

let token = '';

describe('action auth', () => {

  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });


  test('startlogin correcto', async () => {

    const email = 'otro@gmail.com';
    const password = '123456';

    await store.dispatch(startLogin(email, password));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String)
      }
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
    expect(localStorage.setItem).toHaveBeenCalledWith('token-init-data', expect.any(Number));

    token = localStorage.setItem.mock.calls[0][1];
    //console.log(localStorage.setItem.mock.calls[0][1]);
  });

  test('startLogin incorrecto', async () => {

    let email = 'otro@gmail.com';
    let password = 'passwordIncorrecta';

    await store.dispatch(startLogin(email, password));
    let actions = store.getActions();

    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith("Error", expect.any(String), "error");

    email = 'emailIncorrecto@gmail.com';
    password = '123456';

    await store.dispatch(startLogin(email, password));
    actions = store.getActions();

    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith("Error", expect.any(String), "error");

  });

  test('startRegister correcto', async () => {

    fetchModule.fetchWithoutToken = jest.fn(() => ({
      json() {
        return {
          message: 'auth register',
          uid: '123',
          name: 'userName',
          token: 'ABC123'
        }
      }
    }));

    const name = 'userName';
    const email = 'newUser@gmail.com';
    const password = '123456';

    await store.dispatch(startRegister(name, email, password));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: '123',
        name: 'userName',
      }
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ABC123');
    expect(localStorage.setItem).toHaveBeenCalledWith('token-init-data', expect.any(Number));
  });

  test('startChecking correcto', async () => {

    fetchModule.fetchWithToken = jest.fn(() => ({
      json() {
        return {
          message: 'auth register',
          uid: '123',
          name: 'userName',
          token: 'ABC123'
        }
      }
    }));

    await store.dispatch(startChecking());
    const actions = store.getActions();

    //console.log(actions);
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: '123',
        name: 'userName'
      }
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ABC123');
    expect(localStorage.setItem).toHaveBeenCalledWith('token-init-data', expect.any(Number));

  });

});
