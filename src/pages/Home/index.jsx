import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";

import Container from "../../components/Container";
import { useAuth } from "../../context";
import useUsers from "../../hooks/useUsers";
import style from "./style.module.scss";

const USER_DATA = {
  name: "Manoela",
  email: "manoela@manoela",
  gender: "female",
  status: "active",
};

export function Home() {
  const { authState, setAuthState } = useAuth();
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

  const handleToken = () => {
    console.log({ authState });
  };

  return (
    <Container>
      <button type="button" onClick={handleToken}>
        Token
      </button>
      <button type="button" onClick={() => handleCreateUser(USER_DATA)}>
        Cadastrar
      </button>
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.id}>
            <div>
              {user.name} - id: {user.id}
            </div>
            <button type="button" onClick={() => handleDeleteUser(user.id)}>
              Excluir
            </button>
          </div>
        ))
      ) : (
        <div>
          <Skeleton count={3} width="30%" />
        </div>
      )}
    </Container>
  );
}
