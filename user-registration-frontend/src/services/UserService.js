import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/users/';

const getUsers = () => axios.get(API_URL);
const addUser = (user) => axios.post(API_URL, user);
const updateUser = (id, user) => axios.put(`${API_URL}${id}/`, user);
const deleteUser = (id) => axios.delete(`${API_URL}${id}/`);

export default {
  getUsers,
  addUser,
  updateUser,
  deleteUser
};
