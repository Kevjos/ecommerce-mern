import { lazy, Suspense } from "react";
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
import { CartProvider } from "./contexts/cartContext";
import Menu from "./components/Menu";
const Login = lazy(() => import("./pages/Login"));
const HomeSeller = lazy(() => import("./pages/HomeSeller"));
const EditProduct = lazy(() => import("./pages/EditProduct"));
const BuyerHome = lazy(() => import("./pages/BuyerHome"));
const Cart = lazy(() => import("./pages/Cart"));
const Loading = lazy(() => import("./components/Loading"));
const Home = lazy(() => import("./pages/Home"));
const Logout = lazy(() => import("./pages/Logout"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
  return (
    <AuthContextProvider>
      <CartProvider>
        <BrowserRouter>
          <Toaster />
          <Menu />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path={HOME} element={<Home />} />
              <Route path="/" element={<PublicRoute />}>
                <Route index element={<Home />} />

                <Route
                  path="/singupcomprador"
                  element={<RegisterComprador />}
                />
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
              <Route path="/cart" element={<Cart />} />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CartProvider>
    </AuthContextProvider>
  );
}
export default App;
