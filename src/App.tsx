import { Routes } from "./routes";
import "./styles/index.scss";
import { AuthenticationProvider, useAuth } from "./context";

export default function App() {
  return (
    <AuthenticationProvider>
      <Routes />
    </AuthenticationProvider>
  );
}
