import React from 'react';
import PropTypes from "prop-types";

import './newTaskForm.css';

export default class NewTaskForm extends React.Component {

  state = {
    label: '',
    min: '',
    sec: ''
  }

  onValueChange = (event) => {
    this.setState((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  onSubmit = (event) => {
    event.preventDefault();
    // eslint-disable-next-line react/destructuring-assignment
    this.props.onAddItem(this.state.label, this.state.min, this.state.sec);
    this.setState({
      label: '',
      min: '',
      sec: ''
    });
  };

  render() {

    const {label, min, sec} = this.state;

    return (
      <header className="header">
        <h1>Todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            onChange={this.onValueChange}
            value={label}
            name="label"
            placeholder="What needs to be done?"
            /* eslint-disable-next-line jsx-a11y/no-autofocus */
            autoFocus
          />
          <input className="new-todo-form__timer"
                 type='number'
                 min='0'
                 max='59'
                 value={min}
                 onChange={this.onValueChange}
                 name="min"
                 placeholder="Min" />
          <input className="new-todo-form__timer"
                 type='number'
                 min='0'
                 max='59'
                 value={sec}
                 onChange={this.onValueChange}
                 name="sec"
                 placeholder="Sec" />
          <button aria-label="submit" type="submit" />
        </form>
      </header>
    );
  };
};

NewTaskForm.defaultProps = {
  onAddItem: () => {},
};

NewTaskForm.propTypes = {
  onAddItem: PropTypes.func
};