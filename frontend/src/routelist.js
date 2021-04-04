import Home from './pages/Home';
import Login from './pages/Login';
import User from './pages/User';
import EditUser from './pages/User/edit-user';
import Todo from './pages/Todo';

const routes = [
  {
    component: Home,
    name: 'Home',
    path: '/home',
    private: true,
  },
  {
    component: Login,
    name: 'Login',
    path: '/login',
    private: false,
    visible: false,
  },
  {
    component: User,
    name: 'User',
    path: '/user',
    private: true,
  },
  {
    component: EditUser,
    name: 'User',
    path: '/user/:id',
    private: true,
    visible: false,
  },
  {
    component: Todo,
    name: 'Todo',
    path: '/todos',
    private: true,
  },
];

export default routes;
