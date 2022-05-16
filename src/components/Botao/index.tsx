import { ReactNode } from "react";

import style from "./style.module.scss";

interface IProps {
  onClick: (event: any) => void;
  children: ReactNode;
  type: "button" | "submit" | "reset" | undefined;
}

export function Button({ onClick, children, type }: IProps) {
  return (
    <button onClick={onClick} type="submit" className={style.botaoInput}>
      {children}
    </button>
  );
}
