/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Table from '../Table';
import axios from '../../utils/api';

function ListView({ columns, endpoint, fetch }) {
  const [rows, setRows] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(endpoint);
      setRows(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetch]);

  return (
    <Table columns={columns} rows={rows} />
  );
}

export default ListView;
