import { ReactNode } from "react";

import style from "./style.module.scss";

interface ICommentCard {
  children: ReactNode;
}
export function CommentCard({ children }: ICommentCard) {
  return <div className={style.commentCardSpan}>{children}</div>;
}
