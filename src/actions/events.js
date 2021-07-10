import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepare-events";
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
          _id: uid,
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

export const eventStartUpdate = (event) => {
  return async (dispatch) => {
    try {

      const resp = await fetchWithToken(`event/${event.id}`, event, 'PUT');
      const body = await resp.json();

      if (body?.updated) {
        dispatch(eventUpdated(event));
      } else {
        return Swal.fire('Error', body.message, 'error');
      }

    } catch (error) {
      console.error(error);
      Swal.fire('Error', error, 'error');
    }
  }
}

const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event
});

export const eventStartDelete = (event) => {
  return async (dispatch) => {

    try {

      const resp = await fetchWithToken(`event/${event.id}`, {}, 'DELETE');
      const body = await resp.json();

      if (body?.event) {
        dispatch(eventDeleted(event));
      } else {
        return Swal.fire('Error', body.message, 'error');
      }

    } catch (error) {
      return Swal.fire('Error', error, 'error');
    }

  }
}

const eventDeleted = (event) => ({
  type: types.eventDeleted
});

export const eventStartLoading = () => {
  return async (dispatch) => {

    try {

      const resp = await fetchWithToken('event');
      const body = await resp.json();

      const events = prepareEvents(body.events);

      dispatch(eventLoaded(events));

    } catch (error) {
      return Swal.fire('Error', error, 'error');
    }

  }
}

export const eventLoaded = (events) => ({
  type: types.eventLoaded,
  payload: events
});

export const eventLogout = () => ({
  type: types.eventLogout
});