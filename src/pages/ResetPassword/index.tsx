import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as HiIcons from "react-icons/hi";
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
  const { confirmEmail, wrongPassword, setWrongPassword } = usePassword();

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
        <Logomark />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={style.spanInputs}>
        <Controller
          control={control}
          rules={{ required: true }}
          name="email"
          render={({ field: { onChange, value } }) => (
            <span
              onClick={() => setWrongPassword(false)}
              onKeyDown={() => setWrongPassword(false)}
              aria-hidden="true"
            >
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
                <HiIcons.HiOutlineMail />
              </Input>
            </span>
          )}
        />
        <ErrorMessage classNameErrorMessage={style.error}>
          {wrongPassword && (
            <ErrorMessage classNameErrorMessage={style.error}>
              E-mail não encontrado. Tente novamente.
            </ErrorMessage>
          )}
          {errors.email?.message}
        </ErrorMessage>

        <div className={style.spanButtons}>
          <Button variant="red" className={style.button} type="submit">
            Continuar
          </Button>
        </div>
      </form>
    </div>
  );
}
