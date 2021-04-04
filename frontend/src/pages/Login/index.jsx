/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Button, Form, FormControl, FormLabel,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import Page from '../../components/Page';
import axios from '../../utils/api';
import { tokenKey } from '../../utils/constants';

function Login({ history }) {
  const [isLogin, setLogin] = useState(true);
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const response = await axios.post('/api/auth', input);
        localStorage.setItem(tokenKey, response.data.token);
        toast.info('Bem Vindo! Como estamos hoje?');
        history.push('/home');
      } else {
        await axios.post('/api/user', input);
        toast.info('Cadastro efetuado com sucesso.');
        setLogin(true);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const title = isLogin ? 'Login' : 'Cadastrar';
  const buttonTitle = isLogin ? 'Realizar cadastro' : 'Realizar Login';
  return (
    <Page title={title}>
      <Form onSubmit={handleSubmit}>

        {!isLogin && (
        <Form.Group>
          <FormLabel>Nome</FormLabel>
          <FormControl
            type="text"
            name="name"
            value={input.name}
            onChange={handleChange}
          />
        </Form.Group>
        )}

        <Form.Group>
          <FormLabel>Email</FormLabel>
          <FormControl
            type="email"
            name="email"
            value={input.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <FormLabel>Senha</FormLabel>
          <FormControl
            type="password"
            name="password"
            value={input.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit">{title}</Button>

        <div className="mt-4">
          <Button
            onClick={() => setLogin(!isLogin)}
          >
            {buttonTitle}
          </Button>
        </div>
      </Form>
    </Page>
  );
}

export default Login;
