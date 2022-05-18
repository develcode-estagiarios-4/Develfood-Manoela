import { createContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api from "../services/api";

interface IUsuario {
  email: string;
  password: string;
}

const url = "https://develfood-3.herokuapp.com/auth";

export function useLogin() {
  const [loginEfetuado, setLoginEfetuado] = useState(false);
  const [token, setToken] = useState("");
  const tokenUser = "";

  const login = async (data: IUsuario) => {
    try {
      const response = await api.post(url, data);
      if (response.status === 200) {
        setLoginEfetuado(true);
        setToken(response.data.token);
        console.log(response.data.token);
      }
    } catch (error: any) {
      alert("Usuário não encontrado!");
    }
  };

  return { loginEfetuado, login, tokenUser };
}
