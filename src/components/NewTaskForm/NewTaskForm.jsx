import React from 'react';
import PropTypes from "prop-types";

import './newTaskForm.css';

const NewTaskForm = ({onAddItem}) => {

  const [state, setState] = React.useState({
    label: '',
    min: '',
    sec: ''
  });

  const {label, min, sec} = state;

  const onValueChange = (event) => {
    setState((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    onAddItem(label, min, sec);
    setState({
      label: '',
      min: '',
      sec: ''
    });
  };

  return (
    <header className="header">
      <h1>Todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input
          className="new-todo"
          onChange={onValueChange}
          value={label}
          name="label"
          placeholder="What needs to be done?"
          autoFocus
        />
        <input className="new-todo-form__timer"
               type='number'
               min='0'
               max='59'
               value={min}
               onChange={onValueChange}
               name="min"
               placeholder="Min" />
        <input className="new-todo-form__timer"
               type='number'
               min='0'
               max='59'
               value={sec}
               onChange={onValueChange}
               name="sec"
               placeholder="Sec" />
        <button aria-label="submit" type="submit" />
      </form>
    </header>
  );
};

NewTaskForm.defaultProps = {
  onAddItem: () => {},
};

NewTaskForm.propTypes = {
  onAddItem: PropTypes.func
};

export default NewTaskForm;