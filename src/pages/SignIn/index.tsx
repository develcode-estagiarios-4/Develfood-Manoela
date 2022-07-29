import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as FiIcons from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import * as MdIcons from "react-icons/md";
import { useLocation } from "react-router-dom";
import * as yup from "yup";

import img from "../../assets/img/signIn.png";
import { Logomark, SignInLink, Loader, AlertMessage } from "../../components";
import { Button } from "../../components/Button";
import { ErrorMessage } from "../../components/ErrorMessage";
import { Input } from "../../components/Input";
import { usePassword } from "../../hooks/usePassword";
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
  const { state } = useLocation();
  const [editPasswordAlert, setEditPasswordAlert] = useState(false);

  const onSubmit = () => {
    const values = getValues();
    login({ email: values.email, password: values.password });
  };

  useEffect(() => {
    if (state === "true") {
      setEditPasswordAlert(true);
      setTimeout(() => {
        setEditPasswordAlert(false);
      }, 3000);
    }
  }, [state]);

  return (
    <>
      {editPasswordAlert && (
        <AlertMessage variant="green">Senha editada com sucesso</AlertMessage>
      )}
      <div className={style.spanSignIn}>
        <form className={style.formRegister} onSubmit={handleSubmit(onSubmit)}>
          <div className={style.spanLogotype}>
            <Logomark />
          </div>
          <div className={style.spanForm}>
            <Controller
              control={control}
              rules={{ required: true }}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="E-mail"
                  control={control}
                  type="input"
                  value={value}
                  onChange={onChange}
                  classNameSpan={style.inputSignIn}
                >
                  <HiOutlineMail />
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
                  classNameSpan={style.inputSignIn}
                >
                  <MdIcons.MdLockOpen />
                </Input>
              )}
            />
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          </div>
          <Button variant="red" type="submit" className={style.buttonSignIn}>
            Entrar
          </Button>
          <div className={style.signInLink}>
            <div>
              <SignInLink to="/resetpassword"> Esqueci minha senha </SignInLink>
            </div>
            <div>
              <SignInLink to="/signupfirst">
                <FiIcons.FiLogIn className={style.iconSignUpLink} /> Criar conta
              </SignInLink>
            </div>
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
