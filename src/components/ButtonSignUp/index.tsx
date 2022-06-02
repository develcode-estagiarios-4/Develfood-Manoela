import { ReactNode } from "react";

import style from "./style.module.scss";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  // onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type: "submit" | "reset" | "button" | undefined;
}
export function ButtonSignUp({ children, type }: IProps) {
  return (
    <button type="submit" className={style.botaoInput}>
      {children}
    </button>
  );
}
