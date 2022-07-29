import { useEffect, useState } from "react";

import { IContainer } from "../../interface/IContainer";
import Navbar from "../Navbar";
import style from "./style.module.scss";

export function Container({ children, setIsNavbarInvisible }: IContainer) {
  const [isHome, setIsHome] = useState(false);
  useEffect(() => {
    if (setIsNavbarInvisible) {
      setIsHome(true);
    }
  }, []);
  return (
    <>
      <Navbar isitHome={isHome} />
      <main className={setIsNavbarInvisible ? style.icons : style.menuShowing}>
        {children}
      </main>
    </>
  );
}
