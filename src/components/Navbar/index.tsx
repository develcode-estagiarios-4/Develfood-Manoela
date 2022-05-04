import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import { Link } from "react-router-dom";

import style from "./style.module.scss";

function Navbar() {
  return (
    <nav className={style.navbar}>
      <ul>
        <li>
          <Link to="/home" className={style.navbarMenu}>
            <MdIcons.MdHome className={style.navbarIcons} />
            Home
          </Link>
        </li>
        <li>
          <Link to="/perfil" className={style.navbarMenu}>
            <FaIcons.FaUserCircle className={style.navbarIcons} />
            Perfil
          </Link>
        </li>
        <li>
          <Link to="/menu" className={style.navbarMenu}>
            <MdIcons.MdRestaurant className={style.navbarIcons} />
            Menu
          </Link>
        </li>
        <li>
          <Link to="/pedidos" className={style.navbarMenu}>
            <MdIcons.MdPhone className={style.navbarIcons} />
            Pedidos
          </Link>
        </li>
        <li>
          <Link to="/promocoes" className={style.navbarMenu}>
            <MdIcons.MdOutlineMoneyOffCsred className={style.navbarIcons} />
            Promoções
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
