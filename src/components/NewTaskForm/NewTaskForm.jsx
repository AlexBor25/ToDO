import React from 'react';
import PropTypes from "prop-types";

import './newTaskForm.css';

export default class NewTaskForm extends React.Component {

    state = {
        label: ''
    }

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAddItem(this.state.label);
        this.setState({
            label: ''
        });
    };

    render() {
        return (
            <form className="header" onSubmit={this.onSubmit}>
                <h1>Todos</h1>
                <input
                className="new-todo"
                onChange={this.onLabelChange}
                value={this.state.label}
                placeholder="What needs to be done?"
                autoFocus
                />
          </form>
        );
    };
};

NewTaskForm.defaultProps = {
    onAddItem: () => {},
};

NewTaskForm.propTypes = {
    onAddItem: PropTypes.func
};