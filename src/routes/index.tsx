import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as Stwitch,
} from "react-router-dom";

import {
  Menu,
  Home,
  Pedidos,
  Perfil,
  SignIn,
  SignUpFirst,
  SignUpSecond,
  SignUpThird,
  SignUpSuccess,
  Promotions,
} from "../pages";

export function Routes() {
  return (
    <BrowserRouter>
      <Stwitch>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/promotion" element={<Promotions />} />
        <Route path="/signupfirst" element={<SignUpFirst />} />
        <Route path="/signupsecond" element={<SignUpSecond />} />
        <Route path="/signupthird" element={<SignUpThird />} />
        <Route path="/signupsuccess" element={<SignUpSuccess />} />
        <Route path="*" element={<Navigate to="/signin" />} />
      </Stwitch>
    </BrowserRouter>
  );
}
