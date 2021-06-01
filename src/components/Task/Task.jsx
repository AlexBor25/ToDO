import './task.css';
import React from "react";

const Task = React.memo(({label, id, onCompletedItem, onDeleteItem, onEditItem,}) => {

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
        <input type="text" className="edit" value="Editing task" />
        </> 
    );
})

export default Task;