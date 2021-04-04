import React, { useContext } from 'react';

import { toast } from 'react-toastify';
import Page from '../../components/Page';
import TodoForm from '../../components/Todo/TodoForm';
import TodoList from '../../components/Todo/TodoList';
import TodoContextProvider, { TodoContext } from './TodoContextProvider';

import axios from '../../utils/api';

function Todo() {
  const [todos,, fetchData] = useContext(TodoContext);

  const deleteAll = async () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const todo of todos) {
      if (todo.isDone) {
        // eslint-disable-next-line no-await-in-loop
        await axios.delete(`/todo/${todo.id}`);
        toast.info(`Task ${todo.name} removed with success`);
      }
    }
    fetchData();
  };

  return (
    <Page title="Todo App">
      <TodoForm />
      <TodoList />

      <button
        type="button"
        className="btn btn-info"
        onClick={deleteAll}
      >
        Clear Todos
      </button>

      <p>{`Todo count: ${todos.length}`}</p>
    </Page>
  );
}

export default () => (
  <TodoContextProvider>
    <Todo />
  </TodoContextProvider>
);
