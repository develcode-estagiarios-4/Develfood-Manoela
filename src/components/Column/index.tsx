import { useDrop } from "react-dnd";

import { IRequest } from "../../interface/IRequest";
import { IRequestStatus } from "../../interface/IRequestStatus";
import { RequestCard } from "../RequestCard";
import style from "./style.module.scss";

interface IProps {
  initialData: { status: string; id: number };
  onMoveCard: (id: number, body: IRequestStatus) => void;
  requestsList: IRequest[];
}

export function Column({ initialData, onMoveCard, requestsList }: IProps) {
  const body: IRequestStatus = {
    status: "",
  };

  const [, drop] = useDrop({
    accept: "card",
    drop: (index: {
      id: number;
      initialStatus: { id: number; status: string };
    }) => {
      body.status = initialData.status;
      if (index.initialStatus.id < initialData.id) {
        onMoveCard(index.id, body);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const hasRequestsList = requestsList !== undefined && requestsList.length > 0;

  return (
    <td ref={drop} className={style.tableColumn}>
      <div className={style.requestsContainer}>
        {hasRequestsList &&
          requestsList.map(
            (requestData: IRequest) =>
              requestData.status === initialData.status && (
                <RequestCard
                  key={requestData.id}
                  data={requestData}
                  initialStatus={initialData}
                />
              )
          )}
      </div>
    </td>
  );
}
