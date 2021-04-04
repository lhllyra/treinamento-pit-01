/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import {
  Row, Form, Col, Button,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import './Todo.scss';
// import TodoList from './TodoList';
import axios from '../../utils/api';
import { TodoContext } from '../../pages/Todo/TodoContextProvider';

export default function TodoForm() {
  const [todos, setTodos] = useContext(TodoContext);
  const [input, setInput] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!input.trim()) {
      toast.error('Tarefa vazia!');
      return;
    }

    try {
      const response = await axios.post('/api/todo', { name: input, isDone: false, id: Math.floor(Math.random() * 1000) });

      setTodos([
        ...todos,
        response.data.data,
      ]);

      setInput('');

      toast.info('Tarefa Criada com sucesso');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onChange = ({ target: { value } }) => {
    setInput(value);
  };

  return (
    <Form className="mb-3" onSubmit={handleSubmit}>
      <Row>
        <Col lg={9} xl={9}>
          <Form.Group>
            <Form.Control
              value={input}
              onChange={onChange}
              placeholder="Insira aqui sua tarefa"
            />
          </Form.Group>
        </Col>
        <Col>
          <Button type="submit">Nova tarefa</Button>
        </Col>
      </Row>
    </Form>
  );
}
