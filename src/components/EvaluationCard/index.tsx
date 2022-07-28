import moment from "moment";

import { IEvaluation } from "../../interface/IEvaluation";
import { StarRating } from "../StarRating";
import style from "./style.module.scss";

export interface IEvaluationProps {
  data: IEvaluation;
}

export function EvaluationCard({ data }: IEvaluationProps) {
  return (
    <div className={style.commentCardSpan}>
      <textarea className={style.comment}>{`“${data.observation}”`}</textarea>
      <div className={style.grade}>
        <StarRating
          grade={data.grade}
          fontSize={2.6}
          colorEmptyStar="grey"
          strokeWidth={50}
        />
      </div>
      <div className={style.date}>
        {moment(data.evaluationDate).format("DD/MM/YYYY")}
      </div>
    </div>
  );
}
