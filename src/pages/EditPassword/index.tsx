import { useEffect } from "react";
import * as MdIcons from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { Button, Input, Logomark } from "../../components";
import { Container } from "../../components/Container";
import { useRestaurant } from "../../hooks/useRestaurant";
import style from "./style.module.scss";

export function EditPassword() {
  const navigate = useNavigate();
  const { restaurantAuth, getRestaurant, getRestaurantAuth } = useRestaurant();

  useEffect(() => {
    getRestaurantAuth();
  }, []);
  useEffect(() => {
    console.log(restaurantAuth);
  }, [restaurantAuth]);

  const oi = () => {
    console.log("Oi");
  };

  return (
    <div className={style.spanPage}>
      <div className={style.logoMark}>
        {" "}
        <Logomark />
      </div>
      <div className={style.spanInputs}>
        <Input
          onChange={oi}
          control={oi}
          className={style.inputEditPassword}
          placeholder="Senha atual"
        >
          {" "}
          <MdIcons.MdLockOpen />
        </Input>
        ;
        <Input
          onChange={oi}
          control={oi}
          className={style.inputEditPassword}
          placeholder="Nova senha"
        >
          {" "}
          <MdIcons.MdLockOpen />
        </Input>
        ;
        <Input
          onChange={oi}
          control={oi}
          className={style.inputEditPassword}
          placeholder="Confirmar senha"
        >
          {" "}
          <MdIcons.MdLockOpen />
        </Input>
        ;
      </div>

      <div className={style.spanButtons}>
        <Button variant="green" className={style.button}>
          Voltar
        </Button>
        <Button variant="red" className={style.button}>
          Continuar
        </Button>
      </div>
    </div>
  );
}
