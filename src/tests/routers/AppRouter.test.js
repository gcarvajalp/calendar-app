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

});
