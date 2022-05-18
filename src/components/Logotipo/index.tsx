import NameDevelfood from "../../assets/img/develfood.png";
import Logo from "../../assets/img/logo-develfood.png";
import style from "./style.module.scss";

export function Logotipo() {
  return (
    <span className={style.spanLogotipo}>
      <img className={style.logoDevelfood} src={Logo} alt="imagem" />
      <img className={style.nameDevelfood} src={NameDevelfood} alt="imagem" />
    </span>
  );
}
