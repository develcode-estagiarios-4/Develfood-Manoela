import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { IUsuario } from "./useSignIn";

const url = "https://develfood-3.herokuapp.com/user";

export function signUp() {
  const navigate = useNavigate();

  const [signUpSucceeded, setIsSignUpSucceeded] = useState(false);

  const signUpPost = async (data: any) => {
    try {
      const response = await api.post(url, data);
      if (response.status === 201) {
        setIsSignUpSucceeded(true);
        setTimeout(() => {
          navigate("/signin");
        }, 5000);
      }
    } catch (error) {
      if (error) alert(error);
    }
  };

  return { signUp, signUpPost, signUpSucceeded };
}
