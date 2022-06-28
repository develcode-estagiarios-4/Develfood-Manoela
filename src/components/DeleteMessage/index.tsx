import * as MdIcons from "react-icons/md";

import { Button } from "../Button";
import style from "./style.module.scss";

interface IDeleteMessageProps {
  onDelete: () => void;
  cancelDelete: () => void;
}

export function DeleteMessage({ onDelete, cancelDelete }: IDeleteMessageProps) {
  const handleDelete = () => {
    onDelete();
  };

  const handleDontDelete = () => {
    cancelDelete();
  };

  return (
    <div className={style.deleteMessage}>
      <MdIcons.MdClear className={style.iconExit} onClick={handleDontDelete} />
      Você tem certeza que deseja <br /> realizar essa ação?
      <div className={style.buttonSpan}>
        <Button
          variant="red"
          className={style.buttonDeleteMessage}
          onClick={handleDelete}
        >
          Sim
        </Button>
        <Button
          variant="green"
          className={style.buttonDeleteMessage}
          onClick={handleDontDelete}
        >
          Não
        </Button>
      </div>
    </div>
  );
}
