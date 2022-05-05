import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";

import Container from "../../components/Container";
import useUsers from "../../hooks/useUsers";
import style from "./style.module.scss";

const USER_DATA = {
  name: "Manoela",
  email: "manoela@manoela",
  gender: "female",
  status: "active",
};

export function Home() {
  const {
    users,
    getUsers,
    getUser,
    user,
    deleteUser,
    clearUsersState,
    isDeleteUserSuccess,
    isCreateUserSuccess,
    createUser,
    isUpdateUserSuccess,
    updateUser,
  } = useUsers();

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (isDeleteUserSuccess) {
      alert("Usuário deletado");
      getUsers();
      clearUsersState();
    }
  }, [isDeleteUserSuccess]);

  useEffect(() => {
    if (isCreateUserSuccess) {
      alert("Usuário cadastrado com sucesso");
      getUsers();
      clearUsersState();
    }
  }, [isCreateUserSuccess]);

  useEffect(() => {
    if (isUpdateUserSuccess) {
      alert("Usuário atualizado com sucesso!");
      getUsers();
      clearUsersState();
    }
  }, [isUpdateUserSuccess]);

  const handleDeleteUser = (id) => {
    deleteUser(id);
  };

  const handleCreateUser = (userData) => {
    const newUserData = {
      ...userData,
      email:
        userData.email +
        Math.floor(Math.random() * (99999 - 10000 + 1)) +
        10000,
    };
    createUser(newUserData);
  };

  const handleUpdateUser = (id, userData) => {
    updateUser(id, userData);
  };

  return (
    <Container>
      <div className={style.home}>home</div>
      <button
        type="button"
        className={style.home}
        onClick={() => handleCreateUser(USER_DATA)}
      >
        Cadastrar
      </button>
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.id}>
            <div className={style.home}>
              {user.name} - id: {user.id}
            </div>
            <button
              type="button"
              className={style.home}
              onClick={() => handleDeleteUser(user.id)}
            >
              Excluir
            </button>
          </div>
        ))
      ) : (
        <div className={style.home}>
          <Skeleton count={3} width="30%" />
        </div>
      )}
    </Container>
  );
}