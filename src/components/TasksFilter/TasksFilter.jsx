import React from 'react';
import PropTypes from "prop-types";

import './tasksFilter.css';

const TasksFilter = ({filter, onFilterChange}) => {

  const buttons = [
    {name: 'all', label: 'All'},
    {name: 'active', label: 'Active'},
    {name: 'completed', label: 'Completed'},
  ];

  const btns = buttons.map(({name, label}) => {
    const isActive = filter === name;
    return (
      <li key={name}>
        <button type='button' onClick={() => onFilterChange(name)}
                  className={isActive ? 'selected' : ''}>{label}</button>
      </li>
      );
    });

    return (
      <ul className="filters">
        {btns}
      </ul>
  );
};


TasksFilter.defaultProps = {
  filter: 'all',
  onFilterChange: () => {}
};

TasksFilter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func
};

export default TasksFilter;