import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import RegisterVendedor from "./pages/RegisterVendedor";
import RegisterComprador from "./pages/RegisterComprador";
import RegisterProduct from "./pages/RegisterProduct";
import PrivateRoute from "./components/router/PrivateRoute";
import PublicRoute from "./components/router/PublicRoute";
import {
  LOGIN,
  LOGOUT,
  SELLER,
  BUYER,
  REGISTERPRODUCT,
  EDITPRODUCT,
  HOME,
  LOGOUTBUY,
  BUYERHOME,
  PRODUCTS,
} from "./config/router/paths";
import { AuthContextProvider } from "./contexts/authContext";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import Login from "./pages/Login";
import HomeSeller from "./pages/HomeSeller";
import EditProduct from "./pages/EditProduct";
import BuyerHome from "./pages/BuyerHome";
import NotFoundPage from "./pages/NotFoundPage";
import Logout from "./pages/Logout";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Toaster />
        <Menu />

        <Routes>
          <Route path={HOME} element={<Home />} />
          <Route path="/" element={<PublicRoute />}>
            <Route index element={<Home />} />

            <Route path="/singupcomprador" element={<RegisterComprador />} />
            <Route path="/singupvendedor" element={<RegisterVendedor />} />
            <Route path={LOGIN} element={<Login />} />
          </Route>

          <Route path={SELLER} element={<PrivateRoute />}>
            <Route index element={<HomeSeller />} />
            <Route path={PRODUCTS} element={<HomeSeller />} />
            <Route path={REGISTERPRODUCT} element={<RegisterProduct />} />
            <Route path={EDITPRODUCT} element={<EditProduct />} />
            <Route path={LOGOUT} element={<Logout />} />
          </Route>

          <Route path={BUYER} element={<PrivateRoute />}>
            <Route index element={<BuyerHome />} />
          </Route>
          {/*
          <Route path={PRIVATE} element={<PrivateRoute />}>
            <Route path={SELLER} element={<Seller />}>
              <Route index element={<Seller />} />
              <Route path={REGISTERPRODUCT} element={<RegisterProduct />} />
            </Route>

            <Route path={BUYER} element={<Buyer />}>
              <Route index element={<Buyer />} />
            </Route>
            <Route path={LOGOUT} element={<Logout />} />
          </Route>;
          */}

          {/* <Route path="/cart" element={<Cart />} />*/}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}
export default App;
