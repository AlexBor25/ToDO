import React from 'react';
import './tasksFilter.css';

export default class TasksFilter extends React.Component {

  buttons = [
    {name: 'all', label: 'All'},
    {name: 'active', label: 'Active'},
    {name: 'completed', label: 'Completed'},
  ]

  classNames = 'selected';

  render() {

    const {filter, onFilterChange} = this.props;

    const btns = this.buttons.map(({name, label}) => {
    const isActive = filter === name;
    
      return (
        <li key={name}>
            <button onClick={() => onFilterChange(name)}
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
};