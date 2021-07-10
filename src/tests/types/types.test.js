import { types } from "../../types/types";

describe('types', () => {

  test('los types deben ser iguales', () => {

    expect(types).toEqual({
      uiOpenModal: '[UI] Open Modal',
      uiCloseModal: '[UI] Close Modal',

      eventStartAddNew: '[event] Start add new',
      eventAddNew: '[event] Add New',
      eventSetActive: '[event] Set Active',
      eventClearActiveEvent: '[event] Clear active event',
      eventLogout: '[event] Event logout',

      eventUpdated: '[event] Event updated',
      eventDeleted: '[event] Event deleted',
      eventLoaded: '[event] Events loadedd',

      authCheckingFinish: '[Auth] Finish checking login state',
      authStartLogin: '[Auth] Start login',
      authLogin: '[Auth] Login',
      authStartRegister: '[Auth] Start register',
      authStartTokenRenew: '[Auth] Start token renew',
      authLogout: '[Auth] Start logout'
    });

  });

})
