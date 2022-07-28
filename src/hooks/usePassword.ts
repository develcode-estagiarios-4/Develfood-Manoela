import { useState } from "react";

import { IEditPassword } from "../interface/IEditPassword";
import { IResetPassword } from "../interface/IResetPassword";
import { put, post } from "../services/apiRequest";

export function usePassword() {
  const [editPasswordSuccessed, setEditPasswordSuccessed] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [recoveryToken, setRecoveryToken] = useState(false);

  const editPassword = async (data: IEditPassword) => {
    try {
      const response = await put("/change-password/logged", data);
      console.log(response);
      setEditPasswordSuccessed(true);
      setTimeout(() => {
        setEditPasswordSuccessed(false);
      }, 3000);
    } catch (error) {
      console.log(error);
      setWrongPassword(true);
    }
  };

  const confirmEmail = async (email: string) => {
    try {
      const response = await post(`/reset-password?email=${email}`);
      setRecoveryToken(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const changePassword = async (data: IResetPassword) => {
    try {
      const response = await put("/reset-password/change-password", data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    confirmEmail,
    changePassword,
    editPassword,
    editPasswordSuccessed,
    wrongPassword,
    setWrongPassword,
    recoveryToken,
  };
}
