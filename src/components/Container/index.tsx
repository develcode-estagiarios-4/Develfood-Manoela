import { IContainer } from "../../interface/IContainer";
import Navbar from "../Navbar";
import style from "./style.module.scss";

export function Container({ children }: IContainer) {
  return (
    <>
      <Navbar />
      <main className={style.main}>{children}</main>
    </>
  );
}
