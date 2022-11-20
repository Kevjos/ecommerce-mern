import { useState, useMemo, useContext } from "react";
import { createContext, useCallback } from "react";

const TOKEN = "TOKEN";
const IS_SELLER = "ROLS";
const IS_BUYER = "ROLB";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    window.localStorage.getItem(TOKEN) ?? false
  );

  const [isSeller, setIsSeller] = useState(
    window.localStorage.getItem(IS_SELLER) ?? false
  );

  const [isBuyer, setIsBuyer] = useState(
    window.localStorage.getItem(IS_BUYER) ?? false
  );

  const login = useCallback(function (token, rol) {
    window.localStorage.setItem(TOKEN, token);
    setIsAuthenticated(true);
    if (rol === "vendedor") {
      window.localStorage.setItem(IS_SELLER, rol);
      setIsBuyer(false);
      setIsSeller(true);
    }
    if (rol === "comprador") {
      setIsSeller(false);
      window.localStorage.setItem(IS_BUYER, rol);
      setIsBuyer(true);
    }
  }, []);

  const logout = useCallback(function () {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(IS_SELLER);
    window.localStorage.removeItem(IS_BUYER);
    setIsAuthenticated(false);
    setIsSeller(false);
    setIsBuyer(false);
  }, []);

  const value = useMemo(
    () => ({
      login,
      logout,
      isAuthenticated,
      isSeller,
      isBuyer,
    }),
    [login, logout, isAuthenticated, isSeller, isBuyer]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/*
AuthContextProvider.propTypes = {
  children: PropTypes.object,
};
*/

export function useAuthContext() {
  return useContext(AuthContext);
}
