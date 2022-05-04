import { IContainer } from "../../interface/IContainer";
import Navbar from "../Navbar";

export default function Container({ children }: IContainer) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
