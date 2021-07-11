import { mount } from 'enzyme';
import AppRouter from '../../routers/AppRouter';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

//store.dispatch = jest.fn();


describe('<AppRouter/>', () => {

  test('snapshot', () => {

    const initState = {
      auth: {
        checking: true
      }
    };

    const store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h2').exists()).toBe(true);
  });

  test('debe mostrar la ruta publica', () => {

    const initState = {
      auth: {
        checking: false,
        uid: null
      }
    };

    const store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.login-container').exists()).toBe(true);
  });

  test('debe mostrar la ruta privada', () => {

    const initState = {
      ui: {
        modalOpen: false
      },
      auth: {
        checking: false,
        uid: '123',
        name: 'Prueba'
      },
      calendar: {
        events: [],
        activeEvent: null
      },
    };

    const store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.calendar-screen').exists()).toBe(true);

  });

});
