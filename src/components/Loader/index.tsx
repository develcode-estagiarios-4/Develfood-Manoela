import { SpinnerCircular } from "spinners-react";

import symbol from "../../assets/img/develfoodSymbol.png";
import style from "./style.module.scss";

export function Loader() {
  return (
    <div className={style.loaderContainer}>
      <img src={symbol} className={style.loader} alt="logotipo Develfood" />
      <SpinnerCircular color="#C20C18" size="130" />
    </div>
  );
}
