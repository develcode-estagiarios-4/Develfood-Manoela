import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Container } from "../../components/Container";
import { useRestaurant } from "../../hooks/useRestaurant";
import style from "./style.module.scss";

export function Home() {
  const navigate = useNavigate();
  const { restaurant, getRestaurant } = useRestaurant();

  useEffect(() => {
    getRestaurant();
  }, []);

  function handleClick() {
    sessionStorage.clear();
    localStorage.clear();
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <Container>
      <div className={style.home}> {restaurant?.name} </div>
      <button type="button" onClick={handleClick}>
        log out
      </button>
    </Container>
  );
}
