import moment from "moment";
import { MouseEventHandler, useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import * as MdIcons from "react-icons/md";

import { IRequest } from "../../interface/IRequest";
import { formatCurrency } from "../../utils/textUtils";
import { RequestCardHover } from "../RequestCardHover";
import style from "./style.module.scss";

interface IProps {
  data: IRequest;
  initialStatus: any;
  className: any;
}

export function RequestCard({ data, initialStatus, className }: IProps) {
  const [{ isDragging }, dragRef] = useDrag({
    type: "card",
    item: { id: data.id, initialStatus },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const id = item.id.toString();
    },
  });
  const [top, setTop] = useState(false);
  const [requestHover, setRequestHover] = useState<number | null>(null);
  const [currentId, setCurrentId] = useState<number | null>(null);
  useEffect(() => {
    console.log(requestHover);
  }, [requestHover]);

  return (
    <div
      id={`${data.id}`}
      onMouseEnter={(e) => {
        setTop(true);
        // console.log(e.currentTarget.offsetTop);
        setRequestHover(data.id);
        if (currentId === null) {
          setCurrentId(data.id);
        }
        // console.log(currentTop);
        // console.log(e.clientY);
        console.log(data.id);
        // console.log(window.self);
      }}
      onMouseLeave={(e) => {
        setRequestHover(null);
        setTop(false);
      }}
      className={`${
        initialStatus.id <= 2 ? style.cardSpanLeft : style.cardSpanRight
      } ${style.defaultCard} ${className}  ${top && style.top}`}
      ref={dragRef}
      // style={top ? { top: "40%" } : {}}
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
  );
}
