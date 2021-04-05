/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from '../../utils/api';
import Page from '../../components/Page';
import ListView from '../../components/ListView';

function User({ history }) {
  const [fetch, setFetch] = useState(0);
  const removeUser = async (id) => {
    try {
      await axios.delete(`/api/user/${id}`);
      toast.success('Usuário Deletado');
      setFetch(fetch + 1);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const editUser = (id) => {
    history.push(`/user/${id}`);
  };

  const columns = [
    {
      name: '_id',
      value: '#',
    },
    {
      name: 'name',
      value: 'Name',
    },
    {
      name: 'email',
      value: 'Email',
    },
    {
      name: '#',
      value: 'Actions',
      render: (_, { _id }) => (
        <div>
          <Button onClick={() => editUser(_id)} className="mr-2">
            Editar
          </Button>
          <Button onClick={() => removeUser(_id)} variant="danger">
            Remover
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Page title="User">
      <Link className="btn btn-primary" to="/user/new">
        Novo Usuário
      </Link>
      <div>
        <ListView
          fetch={fetch}
          columns={columns}
          endpoint="/api/user"
        />
      </div>
    </Page>
  );
}

export default User;
