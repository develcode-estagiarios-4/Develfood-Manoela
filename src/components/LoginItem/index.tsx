import { ReactNode } from "react";
import { Link, To } from "react-router-dom";

import style from "./style.module.scss";

interface ILoginItem {
  children: ReactNode;
  to: To;
}
export function LoginItem({ children, to }: ILoginItem) {
  return (
    <Link to={to} className={style.passwordText}>
      {children}
    </Link>
  );
}
