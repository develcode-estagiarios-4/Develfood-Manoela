import { SpinnerCircular } from "spinners-react";

import img from "../../assets/img/logo-develfood.png";
import style from "./style.module.scss";

export function Loader() {
  return (
    <div className={style.loaderContainer}>
      <img src={img} className={style.loader} alt="logotipo Develfood" />
      <SpinnerCircular color="#C20C18" size="130" />
    </div>
  );
}
