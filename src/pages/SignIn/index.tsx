import { useEffect, useState } from "react";
import * as FiIcons from "react-icons/fi";
import * as HiIcons from "react-icons/hi";
import * as MdIcons from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

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

export function SignIn() {
  const navigate = useNavigate();

  const [emailUser, setEmail] = useState("");
  const [passwordUser, setPassword] = useState("");
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isUnputEmpty, setIsUnputEmpty] = useState(false);

  const { signInSucceeded, login } = useSignIn();
  const user = {
    email: emailUser,
    password: passwordUser,
  };
  const mensagemErro = {
    erroEmail: "Insira um e-mail válido",
    erroPassword: "Insira uma senha válida",
    erroEmpty: "Preencha todos os campos",
  };
  const validateEmail = (event: string) => {
    if (event.length > 0) {
      if (!event.includes("@")) {
        setIsEmailError(true);
      } else {
        setIsEmailError(false);
      }
    } else {
      setIsEmailError(false);
    }
  };
  const validatePassword = (event: string) => {
    if (event.length > 0) {
      if (event.length < 6) {
        setIsPasswordError(true);
      } else {
        setIsPasswordError(false);
      }
    } else {
      setIsPasswordError(false);
    }
  };

  const handleClickEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (
      user.email.length === 0 ||
      user.password.length === 0 ||
      isPasswordError === true ||
      isEmailError === true
    ) {
      setIsUnputEmpty(true);
    } else {
      login(user);
    }
    event.preventDefault();
    console.log(user);
  };
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    validateEmail(event.target.value);
    setIsUnputEmpty(false);
    setEmail(event.target.value);
    console.log(emailUser);
  };
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    validatePassword(event.target.value);
    setIsUnputEmpty(false);
    setPassword(event.target.value);
    console.log(passwordUser);
  };

  return (
    <>
      <div className={style.spanSignIn}>
        <form className={style.formRegister}>
          <div className={style.spanLogotype}>
            <Logomark />
          </div>
          <InputSignIn
            placeholder="E-mail"
            type="text"
            value={emailUser}
            onChange={handleChangeEmail}
          >
            <HiIcons.HiOutlineMail />
          </InputSignIn>
          {isEmailError ? (
            <span className={style.formValidation}>
              {mensagemErro.erroEmail}
            </span>
          ) : (
            " "
          )}
          <InputSignIn
            placeholder="Senha"
            type="password"
            value={passwordUser}
            onChange={handleChangePassword}
          >
            <MdIcons.MdLockOpen />
          </InputSignIn>{" "}
          {isPasswordError ? (
            <span className={style.formValidation}>
              {mensagemErro.erroPassword}
            </span>
          ) : (
            " "
          )}
          {isUnputEmpty ? (
            <span className={style.formValidation}>
              {mensagemErro.erroEmpty}
            </span>
          ) : (
            " "
          )}
          <ButtonSignIn onClick={handleClickEnter}>Entrar</ButtonSignIn>
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
