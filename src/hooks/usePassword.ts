import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context";
import { IEditPassword } from "../interface/IEditPassword";
import { IResetPassword } from "../interface/IResetPassword";
import { put, post } from "../services/apiRequest";

export function usePassword() {
  const navigate = useNavigate();
  const { recoveryToken } = useAuth();
  const [wrongPassword, setWrongPassword] = useState(false);

  const editPassword = async (data: IEditPassword) => {
    try {
      const response = await put("/change-password/logged", data);
      if (response.status === 204) {
        navigate("/signin", { state: "true" });
        setWrongPassword(false);
      } else {
        setWrongPassword(true);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const confirmEmail = async (email: string) => {
    try {
      const response = await post(`/reset-password?email=${email}`);
      if (response.status === 200) {
        navigate("/resetpasswordSecond");
        recoveryToken.token = response.data;
      } else {
        setWrongPassword(true);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const changePassword = async (data: IResetPassword) => {
    try {
      const response = await put("/reset-password/change-password", data);
      if (response.status === 204) {
        navigate("/signin", { state: "true" });
      } else {
        setWrongPassword(true);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  return {
    confirmEmail,
    changePassword,
    editPassword,
    wrongPassword,
    setWrongPassword,
    recoveryToken,
  };
}
