import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Column } from "../../components/Column/Column";
import { Container } from "../../components/Container";
import { WarningModal } from "../../components/WarmingModal";
import { useRequest } from "../../hooks/useRequest";
import { IRequestStatus } from "../../interface/IRequestStatus";
import style from "./style.module.scss";

export function Requests() {
  const { updateRequest, getRequests, requests } = useRequest();
  const [warmingModal, setWarmingModal] = useState(false);
  const [onUpdate, setOnUpdate] = useState<IPutRequest>();

  interface IPutRequest {
    requestId: number;
    status: IRequestStatus;
  }

  const requestStatus = [
    { status: "PEDIDO_REALIZADO", id: 1 },
    { status: "PEDIDO_EM_REALIZAÇÃO", id: 2 },
    { status: "PEDIDO_À_CAMINHO", id: 3 },
    { status: "PEDIDO_FINALIZADO", id: 4 },
  ];

  const handleMove = (id: number, body: IRequestStatus) => {
    console.log(id, body);
    setOnUpdate({ requestId: id, status: body });
    setWarmingModal(true);
  };

  useEffect(() => {
    getRequests();
  }, []);

  const handleUpdate = () => {
    if (onUpdate) {
      updateRequest(onUpdate?.requestId, onUpdate?.status);
    }
    setWarmingModal(false);
    getRequests();
  };

  const handleCancleUpdate = () => {
    setWarmingModal(false);
  };

  return (
    <Container>
      <DndProvider backend={HTML5Backend}>
        <div className={style.requests}>Seus pedidos</div>
        {warmingModal && (
          <div className={style.spanWarn}>
            <WarningModal
              onReject={handleCancleUpdate}
              onAccept={handleUpdate}
            />{" "}
          </div>
        )}
        <div className={style.tableSpan}>
          {" "}
          <table cellSpacing="0" className={style.table}>
            <tr>
              <td className={style.title}>Esperando Aceitação </td>
              <td className={style.title}>Em Preparo</td>
              <td className={style.title}>Em Rota</td>
              <td className={style.title}>Entregue</td>
            </tr>
            <tr>
              {requestStatus.map((status) => (
                <Column
                  requestsList={requests}
                  status={status}
                  key={status.id}
                  onMoveCard={(id, body) => handleMove(id, body)}
                />
              ))}
            </tr>
          </table>
        </div>
      </DndProvider>
    </Container>
  );
}
