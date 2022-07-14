import { useEffect, useState } from "react";
import { act } from "react-dom/test-utils";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import { Link } from "react-router-dom";

import style from "./style.module.scss";

interface IOi {
  isitHome: any;
}

function Navbar({ isitHome }: IOi) {
  const oi = isitHome;
  console.log(oi);
  return (
    <nav className={oi ? style.navvvvvv : style.navbarActive}>
      <ul>
        <li>
          <Link to="/home" className={style.navbarMenu}>
            <MdIcons.MdHome className={oi ? style.MENU : style.navbarIcons} />
            <div className={oi && style.menuNone}>Home</div>
          </Link>
        </li>
        <li>
          <Link to="/perfil" className={style.navbarMenu}>
            <FaIcons.FaUserCircle
              className={oi ? style.MENU : style.navbarIconUser}
            />
            <div className={oi && style.menuNone}>Perfil</div>
          </Link>
        </li>
        <li>
          <Link to="/menu" className={style.navbarMenu}>
            <MdIcons.MdRestaurant
              className={oi ? style.MENU : style.navbarIconUser}
            />
            <div className={oi && style.menuNone}>Menu</div>
          </Link>
        </li>
        <li>
          <Link to="/pedidos" className={style.navbarMenu}>
            <MdIcons.MdPhone
              className={oi ? style.MENU : style.navbarIconUser}
            />
            <div className={oi && style.menuNone}>Pedidos</div>
          </Link>
        </li>
        <li>
          <Link to="/promotion" className={style.navbarMenu}>
            <MdIcons.MdOutlineMoneyOffCsred
              className={oi ? style.MENU : style.navbarIconUser}
            />
            <div className={oi && style.menuNone}>Promoções</div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
