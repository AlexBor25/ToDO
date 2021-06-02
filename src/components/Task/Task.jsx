import React from "react";
import PropTypes from "prop-types";

import { formatDistanceToNow } from 'date-fns';

import './task.css';

const Task = React.memo(({label, id, onCompletedItem, onDeleteItem, onEditItem, onLabelChange}) => {

    const [value, setValue] = React.useState(label);

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
            <span className="created">created 5 minutes ago</span>
            </label>
            <button onClick={() => onEditItem(id)} className="icon icon-edit"/>
            <button onClick={() => onDeleteItem(id)} className="icon icon-destroy"/>
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
};

Task.propTypes = {
    label: PropTypes.string,
    id: PropTypes.number,
    onCompletedItem: PropTypes.func,
    onDeleteItem: PropTypes.func,
    onEditItem: PropTypes.func,
    onLabelChange: PropTypes.func
};

export default Task;