import { useEffect, useState } from "react";

import { IContainer } from "../../interface/IContainer";
import Navbar from "../Navbar";
import style from "./style.module.scss";

export function Container({ children, active }: IContainer) {
  const [isHome, setIsHome] = useState(false);
  useEffect(() => {
    if (active) {
      setIsHome(true);
    }
  }, []);
  useEffect(() => {
    console.log(isHome);
  }, [isHome]);
  return (
    <>
      <Navbar isitHome={isHome} />
      <main className={active ? style.icons : style.main}>{children}</main>
    </>
  );
}
