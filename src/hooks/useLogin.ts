import { useState } from "react";

import api from "../services/api";

interface IUsuario {
  email: any;
  password: any;
}

const url = "https://develfood-3.herokuapp.com/auth";

export function useLogin() {
  const [loginEfetuado, setLoginEfetuado] = useState(false);

  const createCadastro = async (cadastroData: IUsuario) => {
    const response = await api.post(url, cadastroData);
    if (response.status === 200) setLoginEfetuado(true);
  };

  return { loginEfetuado, createCadastro };
}
