/* eslint-disable react/jsx-no-constructed-context-values */
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { IBodyContext } from "../interface/IBodyContext";

interface IAuthProps {
  children: ReactNode;
}

interface IAuthContextData {
  authState: string;
  setAuthState: React.Dispatch<React.SetStateAction<string>>;
  body: IBodyContext;
}

export const authenticationContext = createContext({} as IAuthContextData);

export function AuthenticationProvider({ children }: IAuthProps) {
  const [authState, setAuthState] = useState("");

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
