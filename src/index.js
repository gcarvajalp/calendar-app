import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CalendarApp from './CalendarApp';
import './styles.css';
import './modal.css';
import './datepicker.css';

ReactDOM.render(
  <React.StrictMode>
    <CalendarApp />
  </React.StrictMode>,
  document.getElementById('root')
);
