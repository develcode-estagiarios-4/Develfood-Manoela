/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, ReactNode, useContext, useState } from "react";

import { IBodyContext } from "../interface/IBodyContext";

interface IAuthProps {
  children: ReactNode;
}

interface IAuthContextData {
  authState: string;
  setAuthState: React.Dispatch<React.SetStateAction<string>>;
  body: IBodyContext;
  recoveryToken: { token: string };
}

export const authenticationContext = createContext({} as IAuthContextData);

export function AuthenticationProvider({ children }: IAuthProps) {
  const [authState, setAuthState] = useState("");
  const recoveryToken = { token: "" };

  const body = {
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
      photo: {
        code: "",
      },
      foodTypes: [],
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

  return (
    <authenticationContext.Provider
      value={{
        authState,
        setAuthState,
        body,
        recoveryToken,
      }}
    >
      {children}
    </authenticationContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(authenticationContext);
  return context;
}
