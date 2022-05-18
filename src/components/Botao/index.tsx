import { ReactEventHandler, ReactNode } from "react";

import style from "./style.module.scss";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export function Button({ children, onClick }: IProps) {
  return (
    <button type="submit" onClick={onClick} className={style.botaoInput}>
      {children}
    </button>
  );
}
