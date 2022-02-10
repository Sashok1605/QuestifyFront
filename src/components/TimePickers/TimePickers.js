import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/lab';
import { DateTimePicker } from '@mui/lab';
import { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';

import s from './TimePickers.module.css';

export default function TimeDatePicker({ time }) {
  const [value, setValue] = useState('week');

  const onChange = data => {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let dayName = days[data.getDay()];
    const hours = data.getHours();
    const minutes = data.getMinutes();
    const times = `${hours}:${minutes}`;
    const dateNaw = new Date().getDate();
    if (data.getDate() === new Date().getDate()) {
      dayName = 'Today';
    } else if (Number(data.getDate()) === Number(dateNaw) + 1) {
      dayName = 'Tomorrow';
    } else if (Number(data.getDate()) >= Number(dateNaw) + 7) {
      const day = data.getDate();
      const month = monthNames[data.getMonth() + 1];
      dayName = `${day}/${month}`;
    }
    setValue({ dayName });
    time({ time: times, dayName, data });
  };

  return (
    <div className={s.rooter}>
      <LocalizationProvider className={s.rooter} dateAdapter={AdapterDateFns}>
        <DateTimePicker
          renderInput={props => <TextField {...props} />}
          value={value}
          onChange={onChange}
          ampm={false}
          ampmInClock={true}
          className={s.rooter}
          clearable={true}
          hideTabs={true}
          disableHighlightToday={true}
          disableMaskedInput={true}
          disableCloseOnSelect={false}
          disablePast={true}
          loading={false}
          showTodayButton={true}
          showToolbar={true}
          FormControlContext={false}
        />
      </LocalizationProvider>
    </div>
  );
}
