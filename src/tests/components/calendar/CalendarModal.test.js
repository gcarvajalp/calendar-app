import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import moment from 'moment';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import CalendarModal from '../../../components/calendar/CalendarModal';
import { eventClearActiveEvent, eventStartUpdate, eventStartAddNew } from '../../../actions/events';
import { act } from '@testing-library/react';
import Swal from 'sweetalert2';



jest.mock('../../../actions/events', () => ({
  eventStartUpdate: jest.fn(),
  eventClearActiveEvent: jest.fn(),
  eventStartAddNew: jest.fn(),
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

const initState = {
  ui: {
    modalOpen: true
  },
  auth: {
    checking: false,
    uid: '123',
    name: 'Prueba'
  },
  calendar: {
    events: [],
    activeEvent: {
      title: 'Hola Mundo',
      notes: 'algunas notas',
      start: now.toDate(),
      end: nowPlus1.toDate(),
    }
  }
};

const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarModal />
  </Provider>
)

describe('<CalendarModal/>', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  })

  test('debe de mostrar el modal', () => {

    //expect(wrapper.find('.modal').exists()).toBe(true);
    expect(wrapper.find('Modal').prop('isOpen')).toBe(true);

  });

  test('debe llamar la acción de actualizar y cerrar el modal', () => {

    wrapper.find('form').simulate('submit', {
      preventDefault() { }
    });

    expect(eventStartUpdate).toHaveBeenCalledWith(initState.calendar.activeEvent);
    expect(eventClearActiveEvent).toHaveBeenCalledWith();
  });

  test('debe mostrar error si falta el título', () => {

    wrapper.find('form').simulate('submit', {
      preventDefault() { }
    });

    expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(true);
  });

  test('debe de crear un nuevo evento', () => {

    const initState = {
      ui: {
        modalOpen: true
      },
      auth: {
        checking: false,
        uid: '123',
        name: 'Prueba'
      },
      calendar: {
        events: [],
        activeEvent: null
      }
    };

    const store = mockStore(initState);
    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <CalendarModal />
      </Provider>
    );

    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Pruebas'
      }
    });

    wrapper.find('form').simulate('submit', {
      preventDefault() { }
    });

    expect(eventStartAddNew).toHaveBeenCalledWith({
      end: expect.anything(),
      start: expect.anything(),
      title: 'Pruebas',
      notes: ''
    });

    expect(eventClearActiveEvent).toHaveBeenCalled();

  });

  test('debe validar las fechas', () => {

    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Pruebas'
      }
    });

    const today = new Date();

    act(() => {
      wrapper.find('DateTimePicker').at(1).prop('onChange')(today);
    });

    wrapper.find('form').simulate('submit', {
      preventDefault() { }
    });

    expect(Swal.fire).toHaveBeenCalledWith('Error', 'la fecha de termino debe ser mayor a la fecha de inicio', 'error');

  });


});
