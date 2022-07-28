import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { Button, ErrorMessage, Input, Logomark } from "../../components";
import { useEditPassword } from "../../hooks/useEditPassword";
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

export function ResetPassword() {
  const navigate = useNavigate();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleNewPassword, setVisibleNewPassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);

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
    newPasword: "",
  };

  const onSubmit = () => {
    const values = getValues();
    console.log(values);
    body.oldPassword = values.password;
    body.newPasword = values.confirmPassword;
  };

  const handleVisiblePassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  const handleVisibleNewPassword = () => {
    setVisibleNewPassword(!visibleNewPassword);
  };

  const handleVisibleConfirmPassword = () => {
    setVisibleConfirmPassword(!visibleConfirmPassword);
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
          name="password"
          render={({ field: { onChange, value } }) => (
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
              {" "}
              <MdIcons.MdLockOpen />
              {visiblePassword ? (
                <IoIcons.IoMdEye
                  className={style.passwordVisible}
                  onClick={handleVisiblePassword}
                />
              ) : (
                <IoIcons.IoMdEyeOff
                  className={style.passwordVisible}
                  onClick={handleVisiblePassword}
                />
              )}
            </Input>
          )}
        />
        <ErrorMessage classNameErrorMessage={style.error}>
          {" "}
          {errors.password?.message}
        </ErrorMessage>

        <div className={style.spanButtons}>
          <Button variant="green" className={style.button}>
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
