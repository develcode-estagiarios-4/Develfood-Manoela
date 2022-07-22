import { StarRating } from "../StarRating";
import style from "./style.module.scss";

export interface IComment {
  message: string;
  date: string;
  grade: number;
}

export interface ICommentProps {
  data: IComment;
}

export function CommentCard({ data }: ICommentProps) {
  return (
    <div className={style.commentCardSpan}>
      <div className={style.comment}>{data.message}</div>
      <div className={style.grade}>
        <StarRating grade={data.grade} fontSize={3} />
      </div>
      <div className={style.date}>{data.date}</div>
    </div>
  );
}
