import { useNavigate } from "react-router-dom";

import { Button, Logomark } from "../../components";
import { useAuth } from "../../context";
import style from "./style.module.scss";

export function ResetPasswordSecond() {
  const { recoveryToken } = useAuth();

  const navigate = useNavigate();

  const handleContinuar = () => {
    navigate("/resetpasswordThird");
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
          Copie ou anote este código, ele seráutilizado para <b /> você
          finalizar a recuperação de senha!
        </div>
        <div className={style.token}>{recoveryToken.token.slice(39)}</div>
        <div className={style.spanButtons}>
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
