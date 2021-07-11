import { fetchWithToken, fetchWithoutToken } from '../../helpers/fetch';

describe('helper fetch', () => {

  test('fetchWithoutToken debe funcionar correctamente', async () => {

    const resp = await fetchWithoutToken(
      'auth',
      { email: 'otro@gmail.com', password: '123456' },
      'POST');

    expect(resp instanceof Response).toBe(true);
    const body = await resp.json();

    expect(body.message).toBe('auth login');

  });

});
