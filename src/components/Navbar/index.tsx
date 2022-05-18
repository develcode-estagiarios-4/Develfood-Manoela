import { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import { Link } from "react-router-dom";

import style from "./style.module.scss";

function Navbar() {
  // const [sidebar, setSidebar] = useState(false);
  // const showSidebar = () => {
  //  setSidebar(!false);
  //  console.log(sidebar);
  // };

  // const othermenu = () => {
  //  setSidebar(true);
  //  console.log(sidebar);
  // };

  return (
    <nav className={style.navbarActive}>
      <ul>
        <li>
          <Link to="/home" className={style.navbarMenu}>
            <MdIcons.MdHome className={style.navbarIcons} />
            <div className={style.menuNone}>Home</div>
          </Link>
        </li>
        <li>
          <Link to="/perfil" className={style.navbarMenu}>
            <FaIcons.FaUserCircle className={style.navbarIcons} />
            <div className={style.menuNone}>Perfil</div>
          </Link>
        </li>
        <li>
          <Link to="/menu" className={style.navbarMenu}>
            <MdIcons.MdRestaurant className={style.navbarIcons} />
            <div className={style.menuNone}>Menu</div>
          </Link>
        </li>
        <li>
          <Link to="/pedidos" className={style.navbarMenu}>
            <MdIcons.MdPhone className={style.navbarIcons} />
            <div className={style.menuNone}>Pedidos</div>
          </Link>
        </li>
        <li>
          <Link to="/promocoes" className={style.navbarMenu}>
            <MdIcons.MdOutlineMoneyOffCsred className={style.navbarIcons} />
            <div className={style.menuNone}>Promoções</div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
