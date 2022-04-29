import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as Stwitch,
} from "react-router-dom";

import Navbar from "../components/NavBar";
import { Home, Menu, Pedidos, Perfil, Promocoes } from "../pages";

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
