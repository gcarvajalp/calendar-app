import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

const initState = {
  checking: true
}

describe('authReducer', () => {

  test('debe retornar el estado por defecto', () => {

    const state = authReducer(initState, {});
    expect(state).toEqual(initState);

  });

  test('debe logearse correctamente', () => {

    const action = {
      type: types.authLogin,
      payload: {
        uid: '123',
        name: 'Gabriel'
      }
    }

    const state = authReducer(initState, action);

    expect(state).toEqual({
      ...initState,
      checking: false,
      uid: '123',
      name: 'Gabriel'
    });
  });

  test('debe deslogearse correctamente', () => {

    const state = authReducer(initState, {
      type: types.authLogout
    });

    expect(state).toEqual({ checking: false });
  });

});
