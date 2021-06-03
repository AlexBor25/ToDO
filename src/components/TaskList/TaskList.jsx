import React from "react";
import PropTypes from "prop-types";

import Task from "../Task/Task";

import './taskList.css';

const TaskList = ({items, onCompletedItem, onDeleteItem, onEditItem, onLabelChange}) => {

  return (
      <ul className="todo-list">
        {items.map(({completed, edit, id, label,  date}) => {

          let classNames = '';

          if(completed){
            classNames += ' completed';
          }
          if(edit){
            classNames += ' editing';
          }

          return <li className={classNames} key={id}><Task
            onCompletedItem={onCompletedItem}
            id={id}
            date={date}
            label={label}
            onDeleteItem={onDeleteItem}
            onLabelChange={onLabelChange}
            onEditItem={onEditItem} /></li>
        })}
      </ul>
  );
};

TaskList.defaultProps = {
  tasks: [],
  onCompletedItem: () => {},
  onDeleteItem: () => {},
  onEditItem: () => {},
  onLabelChange: () => {},
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  onCompletedItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  onLabelChange: PropTypes.func
};

export default TaskList;