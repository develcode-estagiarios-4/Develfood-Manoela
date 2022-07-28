import { useState } from "react";

import { IEditPassword } from "../interface/IEditPassword";
import { put } from "../services/apiRequest";

export function useEditPassword() {
  const [editPasswordSuccessed, setEditPasswordSuccessed] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

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

  return {
    editPassword,
    editPasswordSuccessed,
    wrongPassword,
    setWrongPassword,
  };
}
