import { useNavigate } from "react-router-dom";

import { Container } from "../../components/Container";
import style from "./style.module.scss";

export function Home() {
  const navigate = useNavigate();

  function handleClick() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <Container>
      <button type="button" onClick={handleClick}>
        log out
      </button>
    </Container>
  );
}
