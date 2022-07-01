import { useEffect, useState } from "react";
import { useDrop } from "react-dnd";

import { useRequest } from "../../hooks/useRequest";
import { IRequest } from "../../interface/IRequest";
import { IRequestStatus } from "../../interface/IRequestStatus";
import { RequestCard } from "../RequestCard";
import style from "./style.module.scss";

interface IProps {
  status: { status: string; id: number };
  onMoveCard: (id: number, body: IRequestStatus) => void;
  requestsList: any;
}

export function Column({ status, onMoveCard, requestsList }: IProps) {
  const { requests, setRequests } = useRequest();

  const body: IRequestStatus = {
    status: "",
  };

  const [{ isOver }, drop] = useDrop({
    accept: "card",
    drop: (index: any) => {
      body.status = status.status;
      if (index.initialStatus.id < status.id) {
        onMoveCard(index.id, body);
        setRequests(requests.filter((item) => item.id !== index.id));
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <td ref={drop} className={style.requestSpan}>
      <div className={style.column}>
        {requestsList !== undefined &&
          requestsList.length > 0 &&
          requestsList.map(
            (request: IRequest) =>
              request.status === status.status && (
                <div key={request.id}>
                  <RequestCard data={request} initialStatus={status} />
                </div>
              )
          )}
      </div>
    </td>
  );
}
