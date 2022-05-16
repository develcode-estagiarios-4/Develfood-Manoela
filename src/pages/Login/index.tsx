import { useState } from "react";
import * as FiIcons from "react-icons/fi";
import * as HiIcons from "react-icons/hi";
import * as MdIcons from "react-icons/md";
import { Link } from "react-router-dom";

import img from "../../assets/img/login.png";
import { Button } from "../../components/Botao";
import { Input } from "../../components/Input";
import { Logotipo } from "../../components/Logotipo";
import { useLogin } from "../../hooks/useLogin";
import { Loader } from "../Loader";
import style from "./style.module.scss";

export function Login() {
  const [emailUser, setEmail] = useState("");
  const [passwordUser, setPassword] = useState("");
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const { loginEfetuado, login } = useLogin();

  const user = {
    email: emailUser,
    password: passwordUser,
  };
  const mensagemErro = {
    erroEmail: "Insira um e-mail válido",
    erroPassword: "Insira uma Password válida",
  };

  const validateEmail = (event: any) => {
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

  const validatePassword = (event: any) => {
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

  const handleClickEnter = (event: any) => {
    event.preventDefault();
    login(user);
  };

  const handleChangeEmail = (event: any) => {
    validateEmail(event);
    setEmail(event);
  };

  const handleChangePassword = (event: any) => {
    validatePassword(event);
    setPassword(event);
  };

  return (
    <>
      <div className={style.spanLogin}>
        <form className={style.formRegister}>
          <Logotipo />
          <Input
            placeholder="E-mail"
            type="text"
            value={emailUser}
            onChange={handleChangeEmail}
          >
            <HiIcons.HiOutlineMail />
          </Input>
          {isEmailError ? (
            <span className={style.emailValidation}>
              {mensagemErro.erroEmail}
            </span>
          ) : (
            " "
          )}
          <Input
            placeholder="Password"
            type="password"
            value={passwordUser}
            onChange={handleChangePassword}
          >
            <MdIcons.MdLockOpen />
          </Input>{" "}
          {isPasswordError ? (
            <span className={style.emailValidation}>
              {mensagemErro.erroPassword}
            </span>
          ) : (
            " "
          )}
          <Button type="submit" onClick={handleClickEnter}>
            Entrar
          </Button>
          <div>
            <Link to="/home" className={style.passwordText}>
              Esqueci minha Password
            </Link>

            <Link to="/home" className={style.newAccount}>
              <FiIcons.FiLogIn className={style.iconNewAccount} />
              Criar conta
            </Link>
          </div>
        </form>
      </div>
      <div className={style.spanImage}>
        <img src={img} className={style.imageLogin} alt="pagina de login" />
      </div>
      {loginEfetuado ? <Loader /> : " "}
    </>
  );
}