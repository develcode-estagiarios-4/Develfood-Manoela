import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as FiIcons from "react-icons/fi";
import * as HiIcons from "react-icons/hi";
import * as MdIcons from "react-icons/md";
import * as yup from "yup";

import img from "../../assets/img/signIn.png";
import {
  ButtonSignIn,
  InputSignIn,
  Logomark,
  SignInLink,
  Loader,
} from "../../components";
import { useSignIn } from "../../hooks/useSignIn";
import style from "./style.module.scss";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Insira um e-mail válido")
    .required("O campo e-mail é obrigatório"),
  password: yup
    .string()
    .min(6, "Insira uma senha válida")
    .required("O campo senha é obrigatório"),
});

export function SignIn() {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { signInSucceeded, login } = useSignIn();

  const onSubmit = () => {
    const values = getValues();
    login({ email: values.email, password: values.password });
  };

  return (
    <>
      <div className={style.spanSignIn}>
        <form className={style.formRegister} onSubmit={handleSubmit(onSubmit)}>
          <div className={style.spanLogotype}>
            <Logomark />
          </div>
          <Controller
            control={control}
            rules={{ required: true }}
            name="email"
            render={({ field: { onChange, value } }) => (
              <InputSignIn
                placeholder="E-mail"
                control={control}
                type="text"
                value={value}
                onChange={onChange}
              >
                <HiIcons.HiOutlineMail />
              </InputSignIn>
            )}
          />
          <div className={style.formValidation}>{errors.email?.message}</div>

          <Controller
            control={control}
            rules={{ required: true }}
            name="password"
            render={({ field: { onChange, value } }) => (
              <InputSignIn
                placeholder="Senha"
                control={control}
                type="password"
                value={value}
                onChange={onChange}
              >
                <MdIcons.MdLockOpen />
              </InputSignIn>
            )}
          />
          <div className={style.formValidation}>{errors.password?.message}</div>

          <ButtonSignIn>Entrar</ButtonSignIn>
          <SignInLink to="/home"> Esqueci minha senha </SignInLink>
          <div className={style.signUpLink}>
            <SignInLink to="/signupfirst">
              <FiIcons.FiLogIn className={style.iconSignUpLink} /> Criar conta
            </SignInLink>
          </div>
        </form>
      </div>
      <div className={style.spanImage}>
        <img
          src={img}
          className={style.imageSignIn}
          alt="Chef cutting tomatoes"
        />
      </div>
      {signInSucceeded ? <Loader /> : " "}
    </>
  );
}
