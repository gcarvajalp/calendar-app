import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from '../ui/Navbar';
import CalendarEvent from './CalendarEvent';
import CalendarModal from './CalendarModal';
import { messages } from '../../helpers/calendar-messages-es';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive } from '../../actions/events';
import AddNewFab from '../ui/AddNewFab';
import DeleteEventFab from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment);

/* const events = [{
  title: 'Cumpleaños del jefe',
  start: moment().toDate(),
  end: moment().add(2, 'hours').toDate(),
  bgcolor: '#fafafa',
  notes: 'Comprar el pastel',
  user: {
    _id: 123,
    name: 'Fernando'
  }
}]; */

const CalendarScreen = () => {

  const dispatch = useDispatch();
  //TODO: leer del store, los eventos
  const { events, activeEvent } = useSelector(state => state.calendar);

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  const eventStyleGFetter = (event, start, end, isSelected) => {

    const style = {
      backgroundColor: '#367CF7',
      borderRarius: '0px',
      opacity: 0.8,
      display: 'block'
    };

    return { style };
  }

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  }

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  }

  const onViewChange = (e) => {
    console.log('onViewChange', e);
    localStorage.setItem('lastView', e);
    setLastView(e);
  }

  const onSelectSlot = (e) => {
    console.log(e);
    dispatch(eventClearActiveEvent());
  }

  return (
    <div className="calendar-screen">

      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGFetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        selectable={true}
        onView={onViewChange}
        view={lastView}
        components={{
          event: CalendarEvent
        }}
      />

      <CalendarModal />
      {
        activeEvent && (<DeleteEventFab />)
      }
      <AddNewFab />
    </div>
  )
}

export default CalendarScreen;
