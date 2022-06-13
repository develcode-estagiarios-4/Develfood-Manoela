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
  Promocoes,
  SignIn,
  SignUpFirst,
  SignUpSecond,
  SignUpThird,
  RegisterPromotion,
  SignUpSuccess,
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
        <Route path="/promocoes" element={<Promocoes />} />
        <Route path="/signupfirst" element={<SignUpFirst />} />
        <Route path="/signupsecond" element={<SignUpSecond />} />
        <Route path="/signupthird" element={<SignUpThird />} />
        <Route path="/promotionregister" element={<RegisterPromotion />} />
        <Route path="/signupsuccess" element={<SignUpSuccess />} />
        <Route path="*" element={<Navigate to="/signin" />} />
      </Stwitch>
    </BrowserRouter>
  );
}
