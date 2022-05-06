import { Link } from "react-router-dom";

import style from "./navbarMenu.module.scss";
import { navbarData } from "./navdata";

export default function NavbarDinamico() {
  return (
    <div className={style.sidebar}>
      <ul>
        {navbarData.map((item, index) => {
          return (
            <li>
              <Link
                to={item.link}
                className={
                  item.link === "/home" ? style.menuHome : style.menuNormal
                }
              >
                <div>{item.icon}</div>
                <div>{item.title}</div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
