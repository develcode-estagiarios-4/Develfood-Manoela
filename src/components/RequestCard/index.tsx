import moment from "moment";
import { useDrag } from "react-dnd";
import * as MdIcons from "react-icons/md";

import { IRequest } from "../../interface/IRequest";
import { formatCurrency } from "../../utils/textUtils";
import style from "./style.module.scss";

interface IProps {
  data: IRequest;
  initialStatus: any;
}

export function RequestCard({ data, initialStatus }: IProps) {
  const [{ isDragging }, dragRef] = useDrag({
    type: "card",
    item: { id: data.id, initialStatus },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
    },
  });

  return (
    <div
      className={
        initialStatus.id <= 2 ? style.cardSpanLeft : style.cardSpanRight
      }
      id={initialStatus.id !== 1 ? style.requestCard : ""}
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
            Quantidade: {`${item.quantity}x`} <br /> Valor do prato:
            {item.price}
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
