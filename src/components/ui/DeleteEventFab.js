import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { eventStartDelete } from '../../actions/events';

const DeleteEventFab = () => {

  const dispatch = useDispatch();
  const { activeEvent } = useSelector(state => state.calendar)

  const handleClickDelete = () => {
    dispatch(eventStartDelete(activeEvent));
  }

  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={handleClickDelete}
    >
      <i className="fas fa-trash"></i>
      <span> Borrar evento</span>
    </button>
  )
}

export default DeleteEventFab
