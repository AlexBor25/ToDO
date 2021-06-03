import React from "react";
import PropTypes from 'prop-types';

import TasksFilter from "../TasksFilter/TasksFilter";

import './footer.css';

const Footer = ({todoCount, filter, onFilterChange, onClearCompleted}) => (
        <footer className="footer">
          <span className="todo-count">{todoCount} items left</span>
          <TasksFilter filter={filter}
                       onFilterChange={onFilterChange} />
          <button type='button' onClick={onClearCompleted} className="clear-completed">Clear completed</button>
        </footer>
    );

Footer.defaultProps = {
  filter: '',
  todoCount: null,
  onFilterChange: () => {},
  onClearCompleted: () => {}
};

Footer.propTypes = {
  filter: PropTypes.string,
  todoCount: PropTypes.number,
  onFilterChange: PropTypes.func,
  onClearCompleted: PropTypes.func
};

export default Footer;