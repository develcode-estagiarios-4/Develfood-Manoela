import moment from "moment";
import { useDrag } from "react-dnd";
import * as MdIcons from "react-icons/md";

import { IRequest } from "../../interface/IRequest";
import { formatCurrency } from "../../utils/textUtils";
import style from "./style.module.scss";

interface IProps {
  data: IRequest;
  initialStatus: { id: number; status: string };
  topCard: number;
}

export function RequestCardHover({ topCard, data, initialStatus }: IProps) {
  const [, dragRef] = useDrag({
    type: "card",
    item: { id: data.id, initialStatus },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const positionTop = topCard - 275;
  return (
    <div
      style={{
        zIndex: "2",
        position: "absolute",
        top: positionTop,
        pointerEvents: "none",
      }}
    >
      <div
        className={`${
          initialStatus.id <= 2 ? style.cardSpanLeft : style.cardSpanRight
        } ${style.defaultCard} `}
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
      </div>
    </div>
  );
}
