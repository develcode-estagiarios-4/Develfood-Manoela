import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as HiIcons from "react-icons/hi";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import stepper from "../../assets/img/signUpStepperI.png";
import { ButtonSignUp, InputSignUp, Logomark } from "../../components";
import { useAuth } from "../../context";
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
  cnpj: yup
    .string()
    .min(14, "Insira um CNPJ válido")
    .required("O campo CNPJ é obrigatório"),
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

    console.log(body);
    console.log(values);
    navigate("/signupsecond");
  };
  return (
    <span className={style.spanSignUp}>
      <form className={style.signUpForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.spanLogomark}>
          <Logomark />
        </div>
        <img src={stepper} alt="First stepper" className={style.stepper} />
        <Controller
          control={control}
          rules={{ required: true }}
          name="email"
          render={({ field: { onChange, value } }) => (
            <InputSignUp
              placeholder="Email"
              type="input"
              value={value}
              control={control}
              onChange={onChange}
            >
              <HiIcons.HiOutlineMail />
            </InputSignUp>
          )}
        />
        <div className={style.formValidation}>{errors.email?.message}</div>
        <Controller
          control={control}
          rules={{ required: true }}
          name="password"
          render={({ field: { onChange, value } }) => (
            <InputSignUp
              placeholder="Senha"
              type="password"
              value={value}
              control={control}
              onChange={onChange}
            >
              <MdIcons.MdLockOpen />
            </InputSignUp>
          )}
        />
        <div className={style.formValidation}>{errors.password?.message}</div>
        <Controller
          control={control}
          rules={{ required: true }}
          name="cnpj"
          render={({ field: { onChange, value } }) => (
            <InputSignUp
              placeholder="Cnpj"
              type="input"
              value={value}
              control={control}
              onChange={onChange}
            >
              <IoIcons.IoMdCard />
            </InputSignUp>
          )}
        />
        <div className={style.formValidation}>{errors.cnpj?.message}</div>
        <ButtonSignUp type="button"> Continuar</ButtonSignUp>
      </form>
    </span>
  );
}
