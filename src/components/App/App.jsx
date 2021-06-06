import "./App.css";
import React from "react";
import Footer from "../Footer/Footer";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import TaskList from "../TaskList/TaskList";
import initialState from "../../initialState";

const App = () =>  {

  const [state, setState] = React.useState(initialState);

  const onCompletedItem = (id) => {
    setState((prev) => ({
        ...prev,
        tasks: prev.tasks.map((item) => {
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

  const onFilterItem = (items, filter) => {
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

  const onDeleteItem = (id) => {
    setState((prev) => {
      const index = prev.tasks.findIndex((el) => el.id === id);
      return {
        tasks: [...prev.tasks.slice(0, index), ...prev.tasks.slice(index + 1)],
      };
    });
  };

  const onEditItem = (id) => {
    setState((prev) => ({
        ...prev,
        tasks: prev.tasks.map((task) => (task.id === id ? { ...task, edit: !task.edit } : task)),
      }));
  };

  const onFilterChange = (filter) => {
    setState((prev) => ({
      ...prev,
      filter
    }));
  };

  const onLabelChange = (id, label) => {
    setState((prev) => ({
        ...prev,
        tasks: prev.tasks.map((task) => (task.id === id ? { ...task, label } : task))
      }));
  };

  const onAddItem = (label, min, sec) => {
    const newItem = {
      label,
      completed: false,
      edit: false,
      id: new Date().getTime(),
      date: new Date(),
      time: Number(min) * 60 + Number(sec),
    };
    setState((prev) => ({
      ...prev,
      tasks: [...prev.tasks, newItem],
      }));
  };

  const onClearCompleted = () => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.filter(item => !item.completed)
      }));
  };

  const { tasks, filter } = state;

  const doneCount = tasks.filter((el) => el.completed).length;

  const todoCount = tasks.length - doneCount;

  const visibleItem = onFilterItem(tasks, filter);

  return (
    <section className="todoapp">
      <NewTaskForm onAddItem={onAddItem} />
      <section className="main">
        <TaskList
          items={visibleItem}
          onCompletedItem={onCompletedItem}
          onDeleteItem={onDeleteItem}
          onLabelChange={onLabelChange}
          onEditItem={onEditItem}
        />
        <Footer todoCount={todoCount}
                onFilterChange={onFilterChange}
                onClearCompleted={onClearCompleted}
                filter={filter} />
      </section>
    </section>
  );
};

export default App;