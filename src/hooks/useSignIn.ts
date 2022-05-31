import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context";
import api from "../services/api";

export interface IUsuario {
  email: string;
  password: string;
}

const url = "https://develfood-3.herokuapp.com/auth";

export function useSignIn() {
  const navigate = useNavigate();
  const { setAuthState } = useAuth();

  const [signInSucceeded, setSignInSucceeded] = useState(false);

  const login = async (data: IUsuario) => {
    try {
      const response = await api.post(url, data);
      if (response.status === 200) {
        setSignInSucceeded(true);
        setAuthState(response.data);
        setTimeout(() => {
          navigate("/home");
        }, 5000);
      }
    } catch (error) {
      alert("Usuário não encontrado!");
    }
  };

  return { signInSucceeded, login, setSignInSucceeded };
}
