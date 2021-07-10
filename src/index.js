import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CalendarApp from './CalendarApp';
import './styles.css';
import './modal.css';
import './datepicker.css';


console.log(process.env.NODE_ENV);

ReactDOM.render(
  <React.StrictMode>
    <CalendarApp />
  </React.StrictMode>,
  document.getElementById('root')
);
