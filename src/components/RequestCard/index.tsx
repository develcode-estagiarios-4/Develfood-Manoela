/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import moment from "moment";
import { useState } from "react";
import { useDrag } from "react-dnd";
import * as MdIcons from "react-icons/md";

import { IRequest } from "../../interface/IRequest";
import { formatCurrency } from "../../utils/textUtils";
import { RequestCardHover } from "../RequestCardHover";
import style from "./style.module.scss";

interface IProps {
  data: IRequest;
  initialStatus: { status: string; id: number };
}

export function RequestCard({ data, initialStatus }: IProps) {
  const [, dragRef] = useDrag({
    type: "card",
    item: { id: data.id, initialStatus },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [requestCardPositionTop, setRequestCardPositionTop] =
    useState<number>(0);

  const [isRequestCardHover, setIsRequestCardHover] = useState(false);

  const onRequestCardMouseEnter = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const requestCardPositionTopCurrent =
      e.currentTarget.getBoundingClientRect().top;
    setRequestCardPositionTop(requestCardPositionTopCurrent);
    if (requestCardPositionTopCurrent > 240) setIsRequestCardHover(true);
  };

  const onRequestCardMouseLeave = () => {
    setIsRequestCardHover(false);
  };

  return (
    <>
      <div
        onMouseOver={onRequestCardMouseEnter}
        id={`requestCard_${data.id}`}
        onMouseEnter={onRequestCardMouseEnter}
        onMouseLeave={onRequestCardMouseLeave}
        className={`${
          initialStatus.id <= 2 ? style.cardSpanLeft : style.cardSpanRight
        } ${style.defaultCard}`}
        ref={dragRef}
      >
        <MdIcons.MdFastfood className={style.icon} />
        <div className={style.requestItens}>
          {data.requestItems.map((item) => (
            <div key={item.id} className={style.item}>
              Nome do prato: {item.plateDTO.name} <br />
              {item.observation.length > 0 ? (
                <div className={style.observation}>
                  {" "}
                  Observação: {item.observation}{" "}
                </div>
              ) : (
                ""
              )}
              Quantidade: {`${item.quantity}x`}
              <br /> Valor do prato: {formatCurrency(item.price)}
            </div>
          ))}
          <div className={style.line} />
        </div>
        <div className={style.request}>
          Data do pedido: {moment(data.dateLastUpdated).format("DD/MM/YYYY")}{" "}
          <br />
          Valor total do pedido: {formatCurrency(data.totalValue)} <br />
          Tipo de pagamento {data.paymentType === "card" ? "cartão" : ""}
        </div>
        <div className={style.cardInformation}>
          Para mais informações, deixe <br /> o mouse sobre o card
        </div>
      </div>
      {isRequestCardHover && (
        <RequestCardHover
          topCard={requestCardPositionTop}
          data={data}
          initialStatus={initialStatus}
        />
      )}
    </>
  );
}
