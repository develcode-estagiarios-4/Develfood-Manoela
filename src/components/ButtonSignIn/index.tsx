import { ReactNode } from "react";

import style from "./style.module.scss";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  //  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export function ButtonSignIn({ children, onClick }: IProps) {
  return (
    <button type="submit" className={style.buttonSignIn}>
      {children}
    </button>
  );
}
