import style from "./style.module.scss";

export function NoPromotion() {
  return (
    <p className={style.promocoesText}>
      Você não possui promoções ativas no <br /> momento.
      <br /> Clique no botão acima para adicionar uma <br /> =D
    </p>
  );
}
