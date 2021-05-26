import Task from "../Task/Task";

import './taskList.css';

const TaskList = () => {
    return (
        <ul className="todo-list">
          <li className="completed">
            <Task />
          </li>
          <li className="editing">
            <Task />
          </li>
          <li>
            <Task />
          </li>
        </ul>
    );
}

export default TaskList;