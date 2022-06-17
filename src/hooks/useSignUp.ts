import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { IBodyContext } from "../interface/IBodyContext";
import { post } from "../services/apiRequest";

export function signUp() {
  const navigate = useNavigate();

  const [signUpSucceeded, setIsSignUpSucceeded] = useState(false);

  const signUpPost = async (data: IBodyContext) => {
    try {
      const response = await post("/user", data);
      if (response.status === 201) {
        setIsSignUpSucceeded(true);
        setTimeout(() => {
          navigate("/signupsuccess");
        }, 5000);
      }
    } catch (error) {
      if (error) alert(error);
    }
  };

  return { signUp, signUpPost, signUpSucceeded };
}
