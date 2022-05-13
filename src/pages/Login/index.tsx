import { Formik } from "formik";
import { useEffect, useState } from "react";
import * as FiIcons from "react-icons/fi";
import * as HiIcons from "react-icons/hi";
import * as MdIcons from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

import img from "../../assets/img/login.png";
import { Button } from "../../components/Botao";
import { Input } from "../../components/Input";
import { Logotipo } from "../../components/Logotipo";
import { useLogin } from "../../hooks/useLogin";
import { Loader } from "../Loader";
import style from "./style.module.scss";

export function Login() {
  const [emailUsuario, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { loginEfetuado, createCadastro } = useLogin();

  const usuario = {
    email: emailUsuario,
    password: senha,
  };

  const handleClick = () => {
    createCadastro(usuario);
  };

  return (
    <>
      <div className={style.spanLogin}>
        <form className={style.formRegister}>
          <Logotipo />
          <Input
            placeholder="E-mail"
            type="text"
            value={emailUsuario}
            onChange={(newValue) => setEmail(newValue)}
          />
          <Input
            placeholder="Senha"
            type="password"
            value={senha}
            onChange={(newValue) => setSenha(newValue)}
          />
          <Button onClick={handleClick}>Entrar</Button>
          <div>
            <Link to="/home" className={style.passwordText}>
              Esqueci minha senha
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
