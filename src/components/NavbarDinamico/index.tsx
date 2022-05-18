import { useState } from "react";
import * as MdIcons from "react-icons/md";
import { Link } from "react-router-dom";

import { navbarData } from "./navbarData";
import style from "./style.module.scss";

export default function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    //    <ul className={sidebar ? style.sidebarHome : style.navbarActive}>
    //      <li>
    //        <Link to="/home" className={style.navbarMenu} onClick={showSidebar}>
    //          <div className={style.navbarIcons}>
    //            <MdIcons.MdHome />
    //          </div>
    //          <div className={style.menuNone}>Home</div>
    //        </Link>
    //      </li>
    //     {navbarData.map((item, index) => {
    //       return (
    //          <li>
    //            <Link
    //              to={item.link}
    //              // eslint-disable-next-line react/no-array-index-key
    //             key={index}
    //              className={style.navbarMenu}
    //            >
    //              <div className={style.navbarIcons}>{item.icon}</div>
    //              <div className={style.menuNone}>{item.title}</div>
    //            </Link>
    //          </li>
    //        );
    //      })}
    //    </ul>
    //  );
    // }
    <div>ola</div>
  );
}
