/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, ReactNode, useContext, useState } from "react";

interface IAuthProps {
  children: ReactNode;
}

interface IPropContext {
  token: string;
  type: string;
}
interface IAuthContextData {
  authState: IPropContext;
  setAuthState: React.Dispatch<React.SetStateAction<IPropContext>>;
  body: any;
}

export const authenticationContext = createContext({} as IAuthContextData);

export function AuthenticationProvider({ children }: IAuthProps) {
  const [authState, setAuthState] = useState({} as IPropContext);

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
      photo: "",
      foodTypes: "",
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
    <authenticationContext.Provider value={{ authState, setAuthState, body }}>
      {children}
    </authenticationContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(authenticationContext);
  return context;
}
