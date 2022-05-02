import { useState } from "react";

import { IUsers } from "../interface/IUsers";
import api from "../services/api";

const GET_USERS = "https://gorest.co.in/public/v2/users";
const GET_USER = "https://gorest.co.in/public/v2/users/";
const DELETE_USER = "https://gorest.co.in/public/v2/users/";
const CREATE_USER = "https://gorest.co.in/public/v2/users/";
const UPDATE_USER = "https://gorest.co.in/public/v2/users/";

export default function useUsers() {
  const [users, setUsers] = useState<IUsers[]>([]);
  const [user, setUser] = useState<IUsers>();

  const [isDeleteUserSuccess, setIsDeleteUserSuccess] = useState(false);
  const [isCreateUserSuccess, setIsCreateUserSuccess] = useState(false);
  const [isUpdateUserSuccess, setIsUpdateUserSuccess] = useState(false);

  const clearUsersState = () => {
    setIsDeleteUserSuccess(false);
    setIsCreateUserSuccess(false);
    setIsUpdateUserSuccess(false);
  };

  const getUsers = async () => {
    const response = await api.get(GET_USERS);
    setUsers(response.data);
  };

  const getUser = async (id: number) => {
    const response = await api.get(`${GET_USER}${id}`);
    setUser(response.data);
  };

  const deleteUser = async (id: number) => {
    const response = await api.delete(`${DELETE_USER}${id}`);
    if (response.status === 204) setIsDeleteUserSuccess(true);
  };

  const createUser = async (userData: IUsers) => {
    const response = await api.post(CREATE_USER, userData);
    console.log(response);
    if (response.status === 201) setIsCreateUserSuccess(true);
  };

  const updateUser = async (id: number, userData: IUsers) => {
    const response = await api.put(`${UPDATE_USER}${id}`, userData);
    if (response.status === 204) setIsUpdateUserSuccess(true);
  };

  return {
    users,
    getUsers,
    getUser,
    user,
    deleteUser,
    clearUsersState,
    isDeleteUserSuccess,
    createUser,
    isCreateUserSuccess,
    updateUser,
    isUpdateUserSuccess,
  };
}
