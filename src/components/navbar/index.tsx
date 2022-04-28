import { Link } from "react-router-dom";

import style from "./style.module.scss";

function Navbar() {
  return (
    <nav className={style.navbar}>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/perfil">Perfil</Link>
        </li>
        <li>
          <Link to="/menu">Menu</Link>
        </li>
        <li>
          <Link to="/pedidos">Pedidos</Link>
        </li>
        <li>
          <Link to="/promocoes">Promoções</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
