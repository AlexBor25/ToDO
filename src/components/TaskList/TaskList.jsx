import Task from "../Task/Task";

import './taskList.css';
import React from "react";

const TaskList = ({items, onCompletedItem, onDeleteItem, onEditItem}) => {

  return (
      <ul className="todo-list">
        {items.map(({completed, edit, id, label}) => {

          let classNames = '';

          if(completed){
            classNames += ' completed';
          }
          if(edit){
            classNames += ' edit';
          }

          return <li className={classNames} key={id}><Task
            onCompletedItem={onCompletedItem}
            id={id}
            label={label}
            onDeleteItem={onDeleteItem}
            onEditItem={onEditItem} /></li>
        })}
      </ul>
  );
}

export default TaskList;