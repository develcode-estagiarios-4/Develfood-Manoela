import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import { Link } from "react-router-dom";

import style from "./style.module.scss";

interface INavbarClosed {
  isitHome: boolean;
}
function Navbar({ isitHome }: INavbarClosed) {
  const navbarClosed = isitHome;
  return (
    <nav
      className={navbarClosed ? style.navbarClosed : style.navbarActive}
      id="navbar"
    >
      <ul>
        <li>
          <Link to="/home" className={style.navbarMenu}>
            <MdIcons.MdHome className={style.icons} />
            <div className={navbarClosed ? style.menuNone : style.menu}>
              Home
            </div>
          </Link>
        </li>
        <li>
          <Link to="/perfil" className={style.navbarMenu}>
            <FaIcons.FaUserCircle className={style.iconUser} />
            <div className={navbarClosed ? style.menuNone : style.menu}>
              Perfil
            </div>
          </Link>
        </li>
        <li>
          <Link to="/menu" className={style.navbarMenu}>
            <MdIcons.MdRestaurant className={style.icons} />
            <div className={navbarClosed ? style.menuNone : style.menu}>
              Menu
            </div>
          </Link>
        </li>
        <li>
          <Link to="/pedidos" className={style.navbarMenu}>
            <MdIcons.MdPhone className={style.icons} />
            <div className={navbarClosed ? style.menuNone : style.menu}>
              Pedidos
            </div>
          </Link>
        </li>
        <li>
          <Link to="/promotion" className={style.navbarMenu}>
            <MdIcons.MdOutlineMoneyOffCsred className={style.icons} />
            <div className={navbarClosed ? style.menuNone : style.menu}>
              Promoções
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;
