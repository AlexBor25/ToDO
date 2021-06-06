import React from "react";
import PropTypes from "prop-types";

import { formatDistanceToNow, format } from 'date-fns';

import './task.css';

const Task = React.memo(({label, id, onCompletedItem, onDeleteItem, onEditItem, onLabelChange, time, date}) => {

  const [value, setValue] = React.useState(label);
  const [timer, setTimer] = React.useState(time);
  const [pause, setPause] = React.useState(true);

  const [formateDate, setFormateDate] = React.useState(
    formatDistanceToNow(date, { addSuffix: true, includeSeconds: true })
  );

  const refresh = React.useCallback(() => {
    const newFormateDate = formatDistanceToNow(date, { addSuffix: true, includeSeconds: true });
    if (newFormateDate !== formateDate) {
      setFormateDate(newFormateDate);
    }
  }, [date, formateDate]);

  React.useEffect(() => {
    const timerId = setInterval(refresh, 1000);
    return () => clearInterval(timerId);
  }, [refresh]);

  React.useEffect(() => {
    const timerId = setInterval(() => {
      setTimer((timeout) => {
        if (timeout > 0) {
          return timeout - 1;
        }
        clearInterval(timerId);
        return 0;
      });
    }, 1000);
    if (pause) {
      clearInterval(timerId);
    }
    return () => {
      clearInterval(timerId);
    };
  }, [pause]);

  const changeValue = (event) => {
    setValue(event.target.value);
  };

  const changeLabel = () => {
    onEditItem(id);
    onLabelChange(id, value);
  };

  const blurInp = (event) => {
    if(event.key === 'Enter') {
      event.target.blur();
    }
  };

  return (
    <>
      <div className="view">
        <input className="toggle" onClick={() => onCompletedItem(id)} type="checkbox" />
        <label>
          <span className="title">{label}</span>
          <span className="description">
            <button type='button' className="icon icon-play" onClick={() => setPause(false)} />
            <button type='button' className="icon icon-pause" onClick={() => setPause(true)} />
            {format(timer * 1000, 'mm:ss')}
                </span>
          <span className="description">{formateDate}</span>
        </label>
        <button type='button' onClick={() => onEditItem(id)} className="icon icon-edit"/>
        <button type='button' onClick={() => onDeleteItem(id)} className="icon icon-destroy"/>
      </div>
      <input type="text" className="edit"
             onChange={(event) => changeValue(event)}
             onKeyDown={blurInp}
             onBlur={changeLabel}
             value={value} />
    </>
  );
});

Task.defaultProps = {
  label: 'Введите задачу',
  id: null,
  onCompletedItem: () => {},
  onDeleteItem: () => {},
  onEditItem: () => {},
  onLabelChange: () => {},
  date: new Date(),
  time: 0
};

Task.propTypes = {
  label: PropTypes.string,
  id: PropTypes.number,
  time: PropTypes.number,
  onCompletedItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  onLabelChange: PropTypes.func,
  date: PropTypes.instanceOf(Date),
};

export default Task;