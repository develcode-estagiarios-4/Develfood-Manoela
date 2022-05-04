import { IContainer } from "../../interface/IContainer";
import Navbar from "../Navbar";
import style from "./style.module.scss";

export default function Container({ children }: IContainer) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
