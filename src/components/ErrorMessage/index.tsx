import { ReactNode } from "react";
import { Link, To } from "react-router-dom";

import style from "./style.module.scss";

interface IErrorMessage {
  children: ReactNode;
}
export function ErrorMessage({ children }: IErrorMessage) {
  return <div className={style.errorMessage}>{children}</div>;
}
