import React, { createContext } from "react";

interface IUsuarioContext {
  token: "string";
}

const UsuarioContext = createContext<IUsuarioContext>({} as IUsuarioContext);
