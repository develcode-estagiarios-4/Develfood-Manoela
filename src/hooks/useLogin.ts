import { useState } from "react";

import api from "../services/api";

interface IUsuario {
  email: any;
  password: any;
}

const url = "https://develfood-3.herokuapp.com/auth";

export function useLogin() {
  const [loginEfetuado, setLoginEfetuado] = useState(false);
  const [token, setToken] = useState(false);

  const login = async (data: IUsuario) => {
    try {
      const response = await api.post(url, data);
      if (response.status === 200) {
        setLoginEfetuado(true);
        setToken(response.data.token);
      }
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return { loginEfetuado, login };
}
