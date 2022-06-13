import { useNavigate } from "react-router-dom";

import signUpSuccess from "../../assets/img/signUpSuccess.png";
import { Button, Logomark } from "../../components";
import style from "./style.module.scss";

export function SignUpSuccess() {
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigate("/signin");
  };

  return (
    <span className={style.spanSuccess}>
      <div className={style.successContent}>
        <div className={style.logomark}>
          <Logomark />
        </div>
        <div className={style.spanContentCenter}>
          <div className={style.spanContentSuccess}>
            <p className={style.sucessTitle}> Cadastro finalizado!</p>
            <img
              src={signUpSuccess}
              alt="Sign Up Succeed"
              className={style.imageSuccess}
            />
            <p className={style.textBody}>
              Parabéns! Agora você pode aproveitar nossas ofertas e <br />{" "}
              serviços e economizar com super cupons Develfood.
            </p>
            <Button
              variant="red"
              onClick={handleClick}
              className={style.buttonSuccess}
            >
              {" "}
              Concluir
            </Button>
          </div>
        </div>
      </div>
    </span>
  );
}
