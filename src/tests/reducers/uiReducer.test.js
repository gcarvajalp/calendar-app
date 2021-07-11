import { uiCloseModal, uiOpenModal } from "../../actions/ui";
import { uiReducer } from "../../reducers/uiReducer";
import { types } from "../../types/types";

const initState = {
  modalOpen: false
};

describe('uiReducer', () => {

  test('debe retornar el estado por defecto ', () => {

    const state = uiReducer(initState, {});
    expect(state).toEqual(initState)

  });

  test('debe abrir y cerrar el modal', () => {

    const openModal = uiOpenModal();
    const state = uiReducer(initState, openModal);

    expect(state).toEqual({
      modalOpen: true
    });

    const closeModal = uiCloseModal();
    const stateClose = uiReducer(state, closeModal);

    expect(stateClose).toEqual({
      modalOpen: false
    })

  });


});
