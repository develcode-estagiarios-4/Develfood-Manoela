import { ReactNode } from "react";

import style from "./style.module.scss";

export interface IComment {
  message: string;
  date: string;
}

export interface ICommentProps {
  data: IComment;
}

export function CommentCard({ data }: ICommentProps) {
  return (
    <div className={style.commentCardSpan}>
      <div className={style.comment}>{data.message}</div>
      <div className={style.grade}>AVALIAÇÃO</div>
      <div className={style.date}>{data.date}</div>
    </div>
  );
}
