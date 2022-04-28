import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as Stwitch,
} from "react-router-dom";

import Navbar from "../components/navbar";
import Home from "../pages/home";
import Menu from "../pages/menu";
import Pedidos from "../pages/pedidos";
import Perfil from "../pages/perfil";
import Promocoes from "../pages/promocoes";

export function Routes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Stwitch>
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/promocoes" element={<Promocoes />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Stwitch>
    </BrowserRouter>
  );
}
