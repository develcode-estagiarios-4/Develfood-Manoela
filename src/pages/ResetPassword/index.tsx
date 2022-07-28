import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as HiIcons from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { Button, ErrorMessage, Input, Logomark } from "../../components";
import { usePassword } from "../../hooks/usePassword";
import { useRestaurant } from "../../hooks/useRestaurant";
import style from "./style.module.scss";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Insira um e-mail válido")
    .required("O campo e-mail é obrigatório"),
});

export function ResetPassword() {
  const navigate = useNavigate();
  const { confirmEmail } = usePassword();

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

  const handleContinuar = () => {
    navigate("/resetpasswordToken");
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
      </form>
    </div>
  );
}
