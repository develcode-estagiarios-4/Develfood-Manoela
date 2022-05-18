import { IContainer } from "../../interface/IContainer";
import Navbar from "../Navbar";
import NavbarDinamico from "../NavbarDinamico/index";
import style from "./style.module.scss";

export default function Container({ children }: IContainer) {
  return (
    <>
      <Navbar />
      <main className={style.main}>{children}</main>
    </>
  );
}
