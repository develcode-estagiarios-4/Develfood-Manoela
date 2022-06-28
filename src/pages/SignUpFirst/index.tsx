import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as HiIcons from "react-icons/hi";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import stepper from "../../assets/img/signUpStepperI.png";
import { Logomark } from "../../components";
import { Button } from "../../components/Button";
import { ErrorMessage } from "../../components/ErrorMessage";
import { Input } from "../../components/Input";
import { useAuth } from "../../context";
import { cnpj } from "../../utils/textUtils";
import style from "./style.module.scss";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Insira um e-mail válido")
    .required("O campo e-mail é obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve ter no mínimo 6 carácteres")
    .required("O campo senha é obrigatório"),
  cnpj: yup.string().required("O campo CNPJ é obrigatório"),
});

export function SignUpFirst() {
  const { body } = useAuth();

  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    const values = getValues();

    body.email = values.email;
    body.password = values.password;
    body.restaurant.cnpj = values.cnpj;
    navigate("/signupsecond");
  };
  return (
    <span className={style.spanSignUp}>
      <form className={style.signUpForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.spanLogomark}>
          <Logomark />
        </div>
        <img src={stepper} alt="First stepper" className={style.stepper} />
        <div className={style.spanForm}>
          <Controller
            control={control}
            rules={{ required: true }}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Email"
                control={control}
                type="input"
                value={value}
                onChange={onChange}
              >
                <HiIcons.HiOutlineMail />
              </Input>
            )}
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <Controller
            control={control}
            rules={{ required: true }}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                control={control}
                type="password"
                value={value}
                onChange={onChange}
              >
                <MdIcons.MdLockOpen />
              </Input>
            )}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>

          <Controller
            control={control}
            rules={{ required: true }}
            name="cnpj"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Cnpj"
                control={control}
                type="input"
                value={cnpj(value)}
                onChange={onChange}
              >
                <IoIcons.IoMdCard />
              </Input>
            )}
          />
          <ErrorMessage>{errors.cnpj?.message}</ErrorMessage>
        </div>

        <Button variant="red" type="submit" className={style.buttonSignUp}>
          Continuar
        </Button>
      </form>
    </span>
  );
}
