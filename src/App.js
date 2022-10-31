import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import { Router } from '@reach/router'

//import { RegisterVendedor, HomePrincipal, IniciarSesion } from "./pages";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RegisterVendedor from "./pages/RegisterVendedor";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterComprador from "./pages/RegisterComprador";
import RegisterProduct from "./pages/RegisterProduct";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Menu />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/singupcomprador" element={<RegisterComprador />} />
        <Route path="/singupvendedor" element={<RegisterVendedor />} />
        <Route path="/registerproduct" element={<RegisterProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
/*
function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/singupvendedor">Singup vendedor</Link>
        </li>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}
*/
export default App;
