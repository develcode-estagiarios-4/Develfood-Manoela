import { Container } from "../../components/Container";
import style from "./style.module.scss";

export function Perfil() {
  return (
    <Container>
      <div className={style.perfil}>Olá Nome do Restaurante</div>
    </Container>
  );
}
