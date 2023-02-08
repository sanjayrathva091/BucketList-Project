import { Box } from '@chakra-ui/react';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AboutPage from '../AboutPage';
import AddTodo from '../AddTodo';
import HomePage from '../HomePage';
import LoginCard from '../LoginCard';
import PageNotFound from '../PageNotFound';
import RegisterCard from '../RegisterCard';
import TodoList from '../TodoList';
import UpdateTodo from '../UpdateTodo';

const AllRoutes = () => {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/explorer/register" element={<RegisterCard />} />
        <Route path="/explorer/login" element={<LoginCard />} />
        <Route path="/explorer/todos" element={<TodoList />} />
        <Route path="/explorer/add/todo" element={<AddTodo />} />
        <Route path="/explorer/update/todo/:_id" element={<UpdateTodo />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Box>
  );
};

export default AllRoutes;
