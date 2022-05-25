import { useState } from "react";

import api from "../services/api";

export const body = {
  email: "",
  password: "",
  creationDate: "",
  role: {
    id: 1,
  },
  restaurant: {
    name: "",
    cnpj: "",
    phone: "",
    photo: "",
    foodTypes: [{ id: 1 }, { id: 4 }],
    address: {
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      zipCode: "",
      state: "",
      nickname: "",
    },
  },
};

const url = "https://develfood-3.herokuapp.com/user";

export function signUp() {
  const [singUpSucceded, isSingUpSucceded] = useState(false);
  const signUpPost = async (data: any) => {
    try {
      const response = await api.post(url, data);
      if (response.status === 500) {
        isSingUpSucceded(true);
      }
    } catch (error: any) {
      if (error) alert(error);
    }
  };

  return { signUp, signUpPost, singUpSucceded };
}
