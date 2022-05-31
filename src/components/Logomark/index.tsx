import logotype from "../../assets/img/develfoodLogotype.png";
import symbol from "../../assets/img/develfoodSymbol.png";
import style from "./style.module.scss";

export function Logomark() {
  return (
    <span className={style.spanLogomark}>
      <img className={style.symbol} src={symbol} alt="imagem" />
      <img className={style.logotype} src={logotype} alt="imagem" />
    </span>
  );
}
