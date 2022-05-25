import { ReactNode } from "react";
import { Link, To } from "react-router-dom";

import style from "./style.module.scss";

interface ISignInLink {
  children: ReactNode;
  to: To;
}
export function SignInLink({ children, to }: ISignInLink) {
  return (
    <Link to={to} className={style.signInLink}>
      {children}
    </Link>
  );
}
