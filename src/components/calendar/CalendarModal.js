import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { uiCloseModal } from '../../actions/ui';
import { eventStartAddNew, eventClearActiveEvent, eventUpdated } from '../../actions/events';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');
const initEvent = {
  title: '',
  notes: '',
  start: now.toDate(),
  end: nowPlus1.toDate()
};

const CalendarModal = () => {

  const dispatch = useDispatch();
  const { modalOpen } = useSelector(state => state.ui);
  const { activeEvent } = useSelector(state => state.calendar);


  const [startDate, setStartDate] = useState(now.toDate());
  const [endDate, setEndDate] = useState(nowPlus1.toDate());
  const [titleValid, setTitleValid] = useState(true);


  const [formValues, setFormValues] = useState(initEvent);

  const { title, notes, start, end } = formValues;

  useEffect(() => {

    if (activeEvent) {
      setFormValues({ ...activeEvent });
    } else {
      setFormValues(initEvent);
    }

  }, [activeEvent, setFormValues]);

  const handleStartDate = (e) => {
    setStartDate(e);
    setFormValues({
      ...formValues,
      start: e
    })
  }

  const handleEndDate = (e) => {
    setEndDate(e);
    setFormValues({
      ...formValues,
      end: e
    })
  }

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const closeModal = () => {
    //TODO: cerrar el modal
    dispatch(uiCloseModal());
    dispatch(eventClearActiveEvent());
    setFormValues(initEvent);
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire('Error', 'la fecha de termino debe ser mayor a la fecha de inicio', 'error');
    }

    if (title.trim().length < 2) {
      return setTitleValid(false);
    }

    //TODO: realizar grabacion en BD
    if (activeEvent) {
      dispatch(eventUpdated(formValues));

    } else {
      dispatch(eventStartAddNew(formValues));
    }

    setTitleValid(true);
    closeModal();

  }

  return (
    <div>
      <Modal
        isOpen={modalOpen}
        //onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={200}
        className="modal"
        overlayClassName="modal-fondo">

        <h2>
          {(activeEvent) ? 'Editar Elemento' : 'Nuevo Elemento'}
        </h2>
        <hr />
        <form className="container" onSubmit={handleSubmitForm}>
          <div className="form-group">
            <label>Fecha y hora inicio</label>
            <DateTimePicker
              onChange={handleStartDate}
              value={startDate}
              className="form-control"
            />

          </div>

          <div className="form-group">
            <label>Fecha y hora fin</label>
            <DateTimePicker
              onChange={handleEndDate}
              value={endDate}
              minDate={startDate}
              className="form-control"
            />

          </div>

          <hr />

          <div className="form-group">
            <label>Título y notas</label>
            <input
              type="text"
              className={`form-control ${!titleValid ? 'is-invalid' : null} `}
              name="title"
              value={title}
              onChange={handleInputChange}
              autoComplete="off"
              required />
            <small
              id="emailHep"
              className="form-text text-muted">
              Una descripción corta
            </small>
          </div>

          <div className="form-group">
            <textarea
              type="text"
              className="form-control"
              placeholder="Notas"
              rows="5"
              value={notes}
              onChange={handleInputChange}
              name="notes">
            </textarea>
          </div>

          <button
            className="btn btn-outline-primary btn-block"
            type="submit">
            <i className="far fa-save"></i>
            <span> {(activeEvent) ? 'Editar' : 'Guardar'}</span>
          </button>

        </form>

      </Modal>
    </div>
  )
}

export default CalendarModal;
