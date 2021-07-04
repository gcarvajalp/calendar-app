import React from 'react'

const CalendarEvent = ({ event }) => {

  const { title, user, notes } = event;

  return (
    <div>
      <strong>{title}</strong>
      <span> - {user.name}</span>
    </div>
  )
}

export default CalendarEvent;
