import "./App.css";
import React, { Component } from "react";
import Footer from "../Footer/Footer";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import TaskList from "../TaskList/TaskList";
import initialState from "../../initialState";

class App extends Component {
  maxId = 10;

  state = {
    tasks: initialState.tasks,
    filter: 'all'
  };

  onCompletedItem = (id) => {
    this.setState(({tasks}) => ({
        ...tasks,
        tasks: tasks.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              completed: !item.completed,
            };
          }
          return item;
        }),
      }));
  };

  onFilterItem = (items, filter) => {
    switch(filter){
      case 'all':
        return items;
      case 'active': 
        return items.filter(item => !item.completed);
      case 'completed': 
        return items.filter(item => item.completed);
      default: 
        return items;
    }
  }

  onDeleteItem = (id) => {
    this.setState(({ tasks }) => {
      const index = tasks.findIndex((el) => el.id === id);
      return {
        tasks: [...tasks.slice(0, index), ...tasks.slice(index + 1)],
      };
    });
  };

  onEditItem = (id) => {
    this.setState(({tasks}) => ({
        ...tasks,
        tasks: tasks.map((task) => (task.id === id ? { ...task, edit: !task.edit } : task)),
      }));
  };

  onFilterChange = (filter) => {
    this.setState({filter});
  };

  onLabelChange = (id, label) => {
    this.setState(({tasks}) => ({
        ...tasks,
        tasks: tasks.map((task) => (task.id === id ? { ...task, label } : task))
      }));
  };

  onAddItem = (label) => {
    const newItem = {
      label,
      completed: false,
      edit: false,
      // eslint-disable-next-line no-plusplus
      id: this.maxId++,
      date: new Date(),
    };
    this.setState(({ tasks }) => ({
        tasks: [...tasks, newItem],
      }));
  };

  onClearCompleted = () => {
    this.setState(({tasks}) => ({
        tasks: tasks.filter(item => !item.completed)
      }));
  };

  render() {
    const { tasks, filter } = this.state;

    const doneCount = tasks.filter((el) => el.completed).length;

    const todoCount = tasks.length - doneCount;

    const visibleItem = this.onFilterItem(tasks, filter);

    return (
      <section className="todoapp">
        <NewTaskForm onAddItem={this.onAddItem} />
        <section className="main">
          <TaskList
            items={visibleItem}
            onCompletedItem={this.onCompletedItem}
            onDeleteItem={this.onDeleteItem}
            onLabelChange={this.onLabelChange}
            onEditItem={this.onEditItem}
          />
          <Footer todoCount={todoCount}
                  onFilterChange={this.onFilterChange}
                  onClearCompleted={this.onClearCompleted}
                  filter={filter} />
        </section>
      </section>
    );
  }
}

export default App;
