import style from "./style.module.scss";

export function DeleteMessage() {
  return (
    <div className={style.spanDeleteMessage}>
      <div className={style.deleteMessage}>
        Você tem certeza que deseja <br /> realizar essa ação?
      </div>
    </div>
  );
}
