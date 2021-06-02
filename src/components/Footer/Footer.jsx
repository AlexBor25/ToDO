import TasksFilter from "../TasksFilter/TasksFilter";

import './footer.css';

const Footer = ({todoCount, filter, onFilterChange, onClearCompleted}) => {
    return (
        <footer className="footer">
          <span className="todo-count">{todoCount} items left</span>
          <TasksFilter filter={filter}
                       onFilterChange={onFilterChange} />
          <button onClick={onClearCompleted} className="clear-completed">Clear completed</button>
        </footer>
    );
};

export default Footer;