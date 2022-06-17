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
      setSignInSucceeded(true);
      console.log(response.data.token);
      localStorage.setItem("token", response.data.token);
      setTimeout(() => {
        navigate("/home");
      }, 5000);
    } catch (error) {
      alert("Usuário não encontrado!");
    }
  };

  return { signInSucceeded, login };
}
