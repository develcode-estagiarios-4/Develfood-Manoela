import { ReactNode } from "react";

import style from "./style.module.scss";

interface IErrorMessage {
  children: ReactNode | any;
}
export function CommentCard({ children }: IErrorMessage) {
  return <div className={style.errorMessage}>{children}</div>;
}
