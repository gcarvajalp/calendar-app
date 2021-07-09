import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";


export const eventStartAddNew = (event) => {

  return async (dispatch, getState) => {

    const { uid, name } = getState().auth;

    try {

      const resp = await fetchWithToken('event/', event, 'POST');
      const body = await resp.json();

      if (body?.event) {

        event.id = body.event.id;
        event.user = {
          id: uid,
          name
        }

        dispatch(eventAddNew(event));
      } else {
        Swal.fire('Error', body.message, 'error');
      }

    } catch (error) {
      return Swal.fire('Error', error, 'error');
    }


  }
}

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event
});

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event
});

export const eventClearActiveEvent = () => ({
  type: types.eventClearActiveEvent
});

export const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event
});

export const eventDeleted = (event) => ({
  type: types.eventDeleted
});