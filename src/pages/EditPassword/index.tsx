import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { Button, ErrorMessage, Input, Logomark } from "../../components";
import { usePassword } from "../../hooks/usePassword";
import { IEditPassword } from "../../interface/IEditPassword";
import style from "./style.module.scss";

const schema = yup.object().shape({
  password: yup.string().required("O campo é obrigatório"),
  newPassword: yup
    .string()
    .required("O campo é obrigatório")
    .min(6, "A senha deve contem no mínimo 6 dígitos"),
  confirmPassword: yup
    .string()
    .min(6, "A senha deve contem no mínimo 6 dígitos")
    .required("O campo é obrigatório")
    .test("passwords-match", "As senhas devem ser iguais", function (value) {
      return this.parent.newPassword === value;
    }),
});

export function EditPassword() {
  const navigate = useNavigate();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleNewPassword, setVisibleNewPassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
  const { editPassword, setWrongPassword, wrongPassword } = usePassword();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const body: IEditPassword = {
    oldPassword: "",
    newPassword: "",
  };

  const onSubmit = () => {
    const values = getValues();
    body.oldPassword = values.password;
    body.newPassword = values.confirmPassword;
    editPassword(body);
  };

  const handleVisiblePasswords = (value: string) => {
    if (value === "password") setVisiblePassword(!visiblePassword);
    if (value === "newPassword") setVisibleNewPassword(!visibleNewPassword);
    if (value === "confirmPassword")
      setVisibleConfirmPassword(!visibleConfirmPassword);
  };

  const handleVoltar = () => {
    navigate("/perfil");
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
          name="password"
          render={({ field: { onChange, value } }) => (
            <span
              onClick={() => setWrongPassword(false)}
              onKeyDown={() => setWrongPassword(false)}
              aria-hidden="true"
            >
              <Input
                onChange={onChange}
                type={visiblePassword ? "input" : "password"}
                control={control}
                value={value}
                classNameIcon={style.inputIcon}
                classNameSpan={style.spanInput}
                classNameInput={style.input}
                placeholder="Senha atual"
              >
                <MdIcons.MdLockOpen />
                {visiblePassword ? (
                  <IoIcons.IoMdEye
                    className={style.passwordVisible}
                    onClick={() => handleVisiblePasswords("password")}
                  />
                ) : (
                  <IoIcons.IoMdEyeOff
                    className={style.passwordVisible}
                    onClick={() => handleVisiblePasswords("password")}
                  />
                )}
              </Input>
            </span>
          )}
        />
        <ErrorMessage classNameErrorMessage={style.error}>
          {errors.password?.message}
        </ErrorMessage>
        {wrongPassword && (
          <ErrorMessage classNameErrorMessage={style.error}>
            Senha incorreta. Tente novamente
          </ErrorMessage>
        )}

        <Controller
          control={control}
          rules={{ required: true }}
          name="newPassword"
          render={({ field: { onChange, value } }) => (
            <Input
              onChange={onChange}
              type={visibleNewPassword ? "input" : "password"}
              value={value}
              control={control}
              classNameIcon={style.inputIcon}
              classNameSpan={style.spanInput}
              classNameInput={style.input}
              placeholder="Nova senha"
            >
              <MdIcons.MdLockOpen />
              {visibleNewPassword ? (
                <IoIcons.IoMdEye
                  className={style.passwordVisible}
                  onClick={() => handleVisiblePasswords("newPassword")}
                />
              ) : (
                <IoIcons.IoMdEyeOff
                  className={style.passwordVisible}
                  onClick={() => handleVisiblePasswords("newPassword")}
                />
              )}
            </Input>
          )}
        />
        <ErrorMessage classNameErrorMessage={style.error}>
          {errors.newPassword?.message}
        </ErrorMessage>

        <Controller
          control={control}
          rules={{ required: true }}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <Input
              onChange={onChange}
              type={visibleConfirmPassword ? "input" : "password"}
              control={control}
              value={value}
              classNameIcon={style.inputIcon}
              classNameSpan={style.spanInput}
              classNameInput={style.input}
              placeholder="Confirmar senha"
            >
              <MdIcons.MdLockOpen />
              {visibleConfirmPassword ? (
                <IoIcons.IoMdEye
                  className={style.passwordVisible}
                  onClick={() => handleVisiblePasswords("confirmPassword")}
                />
              ) : (
                <IoIcons.IoMdEyeOff
                  className={style.passwordVisible}
                  onClick={() => handleVisiblePasswords("confirmPassword")}
                />
              )}
            </Input>
          )}
        />
        <ErrorMessage classNameErrorMessage={style.error}>
          {errors.confirmPassword?.message}
        </ErrorMessage>

        <div className={style.spanButtons}>
          <Button
            variant="green"
            className={style.button}
            onClick={handleVoltar}
          >
            Voltar
          </Button>
          <Button variant="red" className={style.button} type="submit">
            Continuar
          </Button>
        </div>
      </form>
    </div>
  );
}
