import { IContainer } from "../../interface/IContainer";
import Navbar from "../Navbar";
import NavbarDinamico from "../Navbar/navbar";
import style from "./style.module.scss";

export default function Container({ children }: IContainer) {
  return (
    <div>
      <Navbar />
      <main className={style.main}>{children}</main>
    </div>
  );
}
