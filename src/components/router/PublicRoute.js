import { Navigate, Outlet } from "react-router-dom";
import { SELLER, BUYER } from "../../config/router/paths";
import { useAuthContext } from "../../contexts/authContext";

export default function PublicRoute() {
  const { isAuthenticated, isSeller, isBuyer } = useAuthContext();

  if (isAuthenticated && isSeller) {
    return <Navigate to={SELLER} />;
  } else if (isAuthenticated && isBuyer) {
    return <Navigate to={BUYER} />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
