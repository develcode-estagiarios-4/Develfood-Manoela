import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { Button, Logomark } from "../../components";
import { usePassword } from "../../hooks/usePassword";
import style from "./style.module.scss";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Insira um e-mail válido")
    .required("O campo e-mail é obrigatório"),
});

export function ResetPasswordSecond() {
  const navigate = useNavigate();
  const { confirmEmail, recoveryToken } = usePassword();

  const handleContinuar = () => {
    navigate("/resetpasswordToken");
  };

  const handleVoltar = () => {
    navigate("/resetpassword");
  };

  return (
    <div className={style.spanPage}>
      <div className={style.logoMark}>
        {" "}
        <Logomark />
      </div>
      <div className={style.spanInputs}>
        Código de Validação
        <div className={style.message}>
          Copie ou anote este código, ele será <b /> utilizado para você
          finalizar a recuperação de senha!
        </div>
        {recoveryToken}
        <div className={style.spanButtons}>
          <Button
            variant="green"
            className={style.button}
            onClick={handleVoltar}
          >
            Voltar
          </Button>
          <Button
            variant="red"
            className={style.button}
            type="submit"
            onClick={handleContinuar}
          >
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
}
