import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as HiIcons from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { Button, ErrorMessage, Input, Logomark } from "../../components";
import { usePassword } from "../../hooks/usePassword";
import style from "./style.module.scss";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Insira um e-mail válido")
    .required("O campo e-mail é obrigatório"),
});

export function ResetPassword() {
  const { confirmEmail, wrongPassword } = usePassword();

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
    confirmEmail(values.email);
  };

  return (
    <div className={style.spanPage}>
      <div className={style.logoMark}>
        {" "}
        <Logomark />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={style.spanInputs}>
        <Controller
          control={control}
          rules={{ required: true }}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              onChange={onChange}
              type="input"
              control={control}
              value={value}
              classNameIcon={style.inputIcon}
              classNameSpan={style.spanInput}
              classNameInput={style.input}
              placeholder="Email"
            >
              {" "}
              <HiIcons.HiOutlineMail />
            </Input>
          )}
        />
        <ErrorMessage classNameErrorMessage={style.error}>
          {" "}
          {errors.email?.message}
        </ErrorMessage>
        {wrongPassword && (
          <ErrorMessage classNameErrorMessage={style.error}>
            Este e-mail
          </ErrorMessage>
        )}
        <div className={style.spanButtons}>
          <Button variant="red" className={style.button} type="submit">
            Continuar
          </Button>
        </div>
      </form>
    </div>
  );
}
