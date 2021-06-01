import "./App.css";
import Footer from "../Footer/Footer";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import TaskList from "../TaskList/TaskList";
import React, { Component } from "react";
import initialState from "../../initialState";

class App extends Component {
  maxId = 10;

  state = initialState;

  onCompletedItem = (id) => {
    this.setState((state) => {
      return {
        ...state,
        tasks: state.tasks.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              completed: !item.completed,
            };
          }
          return item;
        }),
      };
    });
  };

  onDeleteItem = (id) => {
    this.setState(({ tasks }) => {
      const index = tasks.findIndex((el) => el.id === id);
      return {
        tasks: [...tasks.slice(0, index), ...tasks.slice(index + 1)],
      };
    });
  };

  onEditItem = (id) => {
    this.setState((state) => {
      return {
        ...state,
        tasks: state.tasks.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              edit: !item.edit,
            };
          }
          return item;
        }),
      };
    });
  };

  onAddItem = (label) => {
    const newItem = {
      label,
      completed: false,
      edit: false,
      id: this.maxId++,
    };
    this.setState(({ tasks }) => {
      return {
        tasks: [...tasks, newItem],
      };
    });
  };

  render() {
    const { tasks } = this.state;

    const doneCount = tasks.filter((el) => el.completed).length;

    const todoCount = tasks.length - doneCount;

    return (
      <section className="todoapp">
        <NewTaskForm onAddItem={this.onAddItem} />
        <section className="main">
          <TaskList
            items={tasks}
            onCompletedItem={this.onCompletedItem}
            onDeleteItem={this.onDeleteItem}
            onEditItem={this.onEditItem}
          />
          <Footer todoCount={todoCount} />
        </section>
      </section>
    );
  }
}

export default App;
