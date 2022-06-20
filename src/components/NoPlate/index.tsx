import style from "./style.module.scss";

export function NoPlate() {
  return (
    <p className={style.promocoesText}>
      Você não possui pratos ativas no <br /> momento.
      <br /> Clique no botão acima para adicionar um <br /> =D
    </p>
  );
}
