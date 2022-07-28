import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as Stwitch,
} from "react-router-dom";

import {
  Menu,
  Home,
  Requests,
  Perfil,
  SignIn,
  SignUpFirst,
  SignUpSecond,
  SignUpThird,
  PromotionForm,
  SignUpSuccess,
  Promotions,
  PlateForm,
  EditPassword,
  ResetPassword,
} from "../pages";
import { ResetPasswordSecond } from "../pages/ResetPasswordSecond";
import { ResetPasswordToken } from "../pages/ResetPasswordToken";

export function Routes() {
  return (
    <BrowserRouter>
      <Stwitch>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/promotion" element={<Promotions />} />
        <Route path="/signupfirst" element={<SignUpFirst />} />
        <Route path="/signupsecond" element={<SignUpSecond />} />
        <Route path="/signupthird" element={<SignUpThird />} />
        <Route path="/promotion/new" element={<PromotionForm />} />
        <Route path="/promotion/edit/:id" element={<PromotionForm />} />
        <Route path="/plate/new" element={<PlateForm />} />
        <Route path="/plate/edit/:id" element={<PlateForm />} />
        <Route path="/signupsuccess" element={<SignUpSuccess />} />
        <Route path="/editpassword" element={<EditPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/resetpasswordToken" element={<ResetPasswordToken />} />
        <Route path="/resetpasswordSecond" element={<ResetPasswordSecond />} />

        <Route path="*" element={<Navigate to="/signin" />} />
      </Stwitch>
    </BrowserRouter>
  );
}
