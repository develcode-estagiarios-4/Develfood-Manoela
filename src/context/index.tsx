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
}

export const authenticationContext = createContext({} as IAuthContextData);

export function AuthenticationProvider({ children }: IAuthProps) {
  const [authState, setAuthState] = useState({} as IPropContext);
  return (
    <authenticationContext.Provider value={{ authState, setAuthState }}>
      {children}
    </authenticationContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(authenticationContext);
  return context;
}
