import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { IUsuario } from "../interface/IUser";
import { post } from "../services/apiRequest";

export function useSignIn() {
  const navigate = useNavigate();

  const [signInSucceeded, setSignInSucceeded] = useState(false);

  const login = async (data: IUsuario) => {
    try {
      const response = await post("/auth", data);
      localStorage.setItem("token", response.data.token);
      if (response.status === 200) {
        setSignInSucceeded(true);
        setTimeout(() => {
          navigate("/home");
        }, 5000);
      }
    } catch (error) {
      alert("Usuário não encontrado!");
    }
  };

  return { signInSucceeded, login };
}
