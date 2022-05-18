import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as Stwitch,
} from "react-router-dom";

import { Menu, Home, Pedidos, Perfil, Promocoes, Login } from "../pages";

export function Routes() {
  return (
    <BrowserRouter>
      <Stwitch>
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/promocoes" element={<Promocoes />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Stwitch>
    </BrowserRouter>
  );
}
