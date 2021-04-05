/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Page from '../../components/Page';
import axios from '../../utils/api';

function EditUser({ history }) {
  const { _id } = useParams();
  const [input, setInput] = useState({
    name: '',
    email: '',
  });

  const isNew = _id === 'new';
  const isValid = input.name && input.email;

  const fetchUser = async () => {
    const response = await axios.get(`/api/user/${_id}`);
    setInput(response.data);
  };

  useEffect(() => {
    if (!isNew) {
      fetchUser();
    }
  }, []);

  const handleChange = (event) => {
    const { target: { name, value } } = event;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isValid) {
      try {
        if (isNew) {
          await axios.post('/api/user', input);
          toast.success('Usuário criado com sucesso!');
        } else {
          await axios.put(`/api/user/${_id}`, input);
          toast.success('Usuário editado com sucesso!');
        }
        history.push('/user');
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error('Nome e/ou email vazio');
    }
  };

  return (
    <Page title={isNew ? 'Novo Usuário' : 'Editar Usuário'}>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            value={input.name}
            name="name"
            required
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            name="email"
            value={input.email}
            onChange={handleChange}
          />
        </Form.Group>
      </Form>
      <Button
        type="submit"
        onClick={handleSubmit}
        disabled={!isValid}
      >
        Submit
      </Button>
    </Page>
  );
}

export default EditUser;
