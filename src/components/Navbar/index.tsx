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
            <div>Home</div>
          </Link>
        </li>
        <li>
          <Link to="/perfil" className={style.navbarMenu}>
            <FaIcons.FaUserCircle className={style.navbarIconUser} />
            <div>Perfil</div>
          </Link>
        </li>
        <li>
          <Link to="/menu" className={style.navbarMenu}>
            <MdIcons.MdRestaurant className={style.navbarIcons} />
            <div>Menu</div>
          </Link>
        </li>
        <li>
          <Link to="/requests" className={style.navbarMenu}>
            <MdIcons.MdPhone className={style.navbarIcons} />
            <div>Pedidos</div>
          </Link>
        </li>
        <li>
          <Link to="/promotion" className={style.navbarMenu}>
            <MdIcons.MdOutlineMoneyOffCsred className={style.navbarIcons} />
            <div>Promoções</div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
