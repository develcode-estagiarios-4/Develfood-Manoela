import * as VscIcons from "react-icons/vsc";

import { Button } from "../Button";
import style from "./style.module.scss";

const defaultProps = {
  className: "",
};

interface IDeleteMessageProps {
  onReject: () => void;
  onAccept: () => void;
  className?: string;
}

export function WarningModal({
  onAccept,
  onReject,
  className,
}: IDeleteMessageProps & typeof defaultProps) {
  const handleAccept = () => {
    onAccept();
  };

  const handleReject = () => {
    onReject();
  };

  return (
    <div className={`${style.modalSpan} ${className}`}>
      <VscIcons.VscChromeClose
        className={style.iconExit}
        onClick={handleReject}
      />
      Você tem certeza que deseja <br /> realizar essa ação?
      <div className={style.buttonSpan}>
        <Button variant="red" className={style.button} onClick={handleAccept}>
          Sim
        </Button>
        <Button variant="green" className={style.button} onClick={handleReject}>
          Não
        </Button>
      </div>
    </div>
  );
}

WarningModal.defaultProps = defaultProps;
