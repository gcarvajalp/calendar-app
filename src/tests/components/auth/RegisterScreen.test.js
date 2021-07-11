import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';
import { startRegister } from '../../../actions/auth';

import RegisterScreen from '../../../components/auth/RegisterScreen';

jest.mock('../../../actions/auth', () => ({
  startRegister: jest.fn()
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <RegisterScreen />
    </MemoryRouter>
  </Provider>
)

describe('<RegisterScreen/>', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });


  test('No hay registro si las contraseñas son diferentes ', () => {

    wrapper.find('input[name="name"]').simulate('change', {
      target: {
        name: 'name',
        value: 'gabriel'
      }
    });

    wrapper.find('input[name="email"]').simulate('change', {
      target: {
        name: 'email',
        value: 'test@gmail.com'
      }
    });

    wrapper.find('input[name="password"]').simulate('change', {
      target: {
        name: 'password',
        value: '123456'
      }
    });

    wrapper.find('input[name="password2"]').simulate('change', {
      target: {
        name: 'password2',
        value: '1234567'
      }
    });

    wrapper.find('form').prop('onSubmit')({
      preventDefault() { }
    });

    expect(startRegister).not.toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'contraseñas no coinciden', 'warning');

  });

  test('Registro con contraseñas iguales', () => {

    wrapper.find('input[name="name"]').simulate('change', {
      target: {
        name: 'name',
        value: 'gabriel'
      }
    });

    wrapper.find('input[name="email"]').simulate('change', {
      target: {
        name: 'email',
        value: 'test@gmail.com'
      }
    });

    wrapper.find('input[name="password"]').simulate('change', {
      target: {
        name: 'password',
        value: '123456'
      }
    });

    wrapper.find('input[name="password2"]').simulate('change', {
      target: {
        name: 'password2',
        value: '123456'
      }
    });

    wrapper.find('form').prop('onSubmit')({
      preventDefault() { }
    });

    expect(Swal.fire).not.toHaveBeenCalled();
    expect(startRegister).toHaveBeenCalledWith("gabriel", "test@gmail.com", "123456");

  });


})
