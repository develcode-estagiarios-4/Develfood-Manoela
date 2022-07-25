import moment from "moment";

import { IComment } from "../../interface/IComment";
import { StarRating } from "../StarRating";
import style from "./style.module.scss";

export interface ICommentProps {
  data: IComment;
}

export function EvaluationCard({ data }: ICommentProps) {
  return (
    <div className={style.commentCardSpan}>
      <textarea className={style.comment}>{`“${data.observation}”`}</textarea>
      <div className={style.grade}>
        <StarRating grade={data.grade} fontSize={2.6} />
      </div>
      <div className={style.date}>
        {moment(data.evaluationDate).format("DD/MM/YYYY")}
      </div>
    </div>
  );
}
