/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from '../../utils/api';
import ModalComponent from '../Modal';
import './Todo.scss';
import { TodoContext } from '../../pages/Todo/TodoContextProvider';

function TodoList() {
  const [todos, setTodos] = useContext(TodoContext);
  const [edit, setEdit] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState('');

  const handleChecked = async (event, editTodo) => {
    const { checked: completed } = event.target;

    const newTodos = todos.map((todo) => {
      if (todo._id === editTodo._id) {
        return {
          ...todo,
          completed,
        };
      }

      return todo;
    });

    try {
      await axios.put(`/api/todo/${editTodo._id}`, { ...editTodo, completed });
      setTodos(newTodos);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleEdit = (todo) => {
    setEdit(todo);
    setShowModal(!showModal);
  };

  const handleRemove = async ({ _id }) => {
    const newTodos = todos.filter((todo) => todo._id !== _id);

    try {
      await axios.delete(`/api/todo/${_id}`);
      setTodos(newTodos);
      toast.success('Tarefa removida com sucesso');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const onEdit = async () => {
    const newTodo = todos.map((todo) => {
      if (todo._id === edit._id) {
        return {
          ...todo,
          name: text,
        };
      }
      return todo;
    });

    if (!text) {
      toast.error('Tarefa vazia!');
      return;
    }

    try {
      await axios.put(`/api/todo/${edit._id}`, { ...edit, name: text });
      setTodos(newTodo);
    } catch (error) {
      toast.error(error.response.data.message);
    }

    setShowModal(!showModal);
    setText('');
  };

  return (
    <>
      <Table bordered hover className="todos">
        <thead>
          <tr>
            <th>Status</th>
            <th width="60%">Task</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo._id} className="todo">
              <td>
                <input
                  checked={todo.completed}
                  onChange={(event) => handleChecked(event, todo)}
                  type="checkbox"
                />
              </td>
              <td>
                <span className={todo.completed ? 'done' : ''}>{todo.name}</span>
              </td>
              <td>
                <Button
                  onClick={() => handleEdit(todo)}
                >
                  {' Edit'}
                </Button>
                <Button
                  onClick={() => handleRemove(todo)}
                  className="ml-2"
                  variant="danger"
                >
                  {' Remove'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ModalComponent
        onSave={() => onEdit()}
        show={showModal}
        toggle={() => handleEdit()}
        title="De um novo valor para o seu todo"
      >
        <Form>
          <Form.Group>
            <Form.Label>
              Valor Atual:
              {' '}
              {edit?.name}
            </Form.Label>
            <Form.Control
              value={text}
              onChange={({ target: { value } }) => setText(value)}
            />
          </Form.Group>
        </Form>
      </ModalComponent>
    </>
  );
}

export default TodoList;
