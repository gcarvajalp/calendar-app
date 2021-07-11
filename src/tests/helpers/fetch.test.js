import { fetchWithToken, fetchWithoutToken } from '../../helpers/fetch';

describe('helper fetch', () => {

  let token = '';

  test('fetchWithoutToken debe funcionar correctamente', async () => {

    const resp = await fetchWithoutToken(
      'auth',
      { email: 'otro@gmail.com', password: '123456' },
      'POST');

    expect(resp instanceof Response).toBe(true);
    const body = await resp.json();

    expect(body.message).toBe('auth login');

    token = body.token;
  });

  test('fetchWithToken debe funcionar correctamente', async () => {

    localStorage.setItem('token', token);
    const resp = await fetchWithToken('event/cualquiercosa', {}, 'DELETE');
    const body = await resp.json();

    expect(resp instanceof Response).toBe(true);
    expect(body.message).toBe('Problemas, contactese con su proveedor');


  });

});
