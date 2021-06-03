import React from "react";
import PropTypes from "prop-types";

import { formatDistanceToNow } from 'date-fns';

import './task.css';

const Task = React.memo(({label, id, onCompletedItem, onDeleteItem, onEditItem, onLabelChange,  date}) => {

    const [value, setValue] = React.useState(label);

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

    const changeValue = (e) => {
        setValue(e.target.value);
    };

    const changeLabel = () => {
        onEditItem(id);
        onLabelChange(id, value);
    };

    const blurInp = (e) => {
        if(e.key === 'Enter') {
            e.target.blur();
        }
    };

    return (
        <>
        <div className="view">
            <input className="toggle" onClick={() => onCompletedItem(id)} type="checkbox" />
            <label>
            <span className="description">{label}</span>
            <span className="created">{formateDate}</span>
            </label>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button type='button' onClick={() => onEditItem(id)} className="icon icon-edit"/>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button type='button' onClick={() => onDeleteItem(id)} className="icon icon-destroy"/>
        </div>
        <input type="text" className="edit"
               onChange={(e) => changeValue(e)}
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
    date: new Date()
};

Task.propTypes = {
    label: PropTypes.string,
    id: PropTypes.number,
    onCompletedItem: PropTypes.func,
    onDeleteItem: PropTypes.func,
    onEditItem: PropTypes.func,
    onLabelChange: PropTypes.func,
    date: PropTypes.instanceOf(Date),
};

export default Task;