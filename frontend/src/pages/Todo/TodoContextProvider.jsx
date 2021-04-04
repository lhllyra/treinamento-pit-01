import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from '../../utils/api';

export const TodoContext = createContext();

// eslint-disable-next-line react/prop-types
export default function TodoContextProvider({ children }) {
  const [todos = [], setTodos] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/todo');
      setTodos(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TodoContext.Provider value={[todos, setTodos, fetchData]}>
      {children}
    </TodoContext.Provider>
  );
}
