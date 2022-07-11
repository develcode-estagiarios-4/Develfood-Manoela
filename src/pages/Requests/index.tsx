import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Column } from "../../components/Column";
import { Container } from "../../components/Container";
import { WarningModal } from "../../components/WarmingModal";
import { useRequest } from "../../hooks/useRequest";
import { IRequest } from "../../interface/IRequest";
import { IRequestStatus } from "../../interface/IRequestStatus";
import style from "./style.module.scss";

export function Requests() {
  const { updateRequest, getRequests, requests } = useRequest();
  const [warningModal, setWarningModal] = useState(false);
  const [onUpdate, setOnUpdate] = useState<IPutRequest>();
  const [currentRequests, setCurrentRequests] = useState<IRequest[]>([]);

  interface IPutRequest {
    requestId: number;
    status: IRequestStatus;
  }

  useEffect(() => {
    getRequests();
  }, []);

  useEffect(() => {
    setCurrentRequests(requests);
  }, [requests]);

  const requestStatus = [
    { status: "PEDIDO_REALIZADO", id: 1 },
    { status: "PEDIDO_EM_REALIZAÇÃO", id: 2 },
    { status: "PEDIDO_À_CAMINHO", id: 3 },
    { status: "PEDIDO_FINALIZADO", id: 4 },
  ];

  const handleMove = (id: number, body: IRequestStatus) => {
    setOnUpdate({ requestId: id, status: body });
    setWarningModal(true);
  };

  const handleUpdate = () => {
    if (onUpdate) {
      updateRequest(onUpdate?.requestId, onUpdate?.status);
      const index = requests.findIndex(
        (item) => item.id === onUpdate?.requestId
      );
      currentRequests[index].status = onUpdate?.status.status;
    }
    setWarningModal(false);
  };

  const handleCancleUpdate = () => {
    setWarningModal(false);
  };

  console.log(requests);
  return (
    <Container>
      <DndProvider backend={HTML5Backend}>
        <div className={style.requests}>Seus pedidos</div>
        {warningModal && (
          <div className={style.spanWarn}>
            <WarningModal
              onReject={handleCancleUpdate}
              onAccept={handleUpdate}
            />{" "}
          </div>
        )}
        <div className={style.tableSpan}>
          <table cellSpacing="0" className={style.table}>
            <thead>
              <tr>
                <th className={style.title}>Esperando Aceitação </th>
                <th className={style.title}>Em Preparo</th>
                <th className={style.title}>Em Rota</th>
                <th className={style.title}>Entregue</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {requestStatus.map((status) => (
                  <Column
                    requestsList={currentRequests}
                    initialData={status}
                    key={status.id}
                    onMoveCard={(id, body) => handleMove(id, body)}
                  />
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </DndProvider>
    </Container>
  );
}
