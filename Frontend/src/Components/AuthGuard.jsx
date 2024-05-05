import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = () => {
  const { isAuthed, userData } = useSelector((state) => state.user);

  if (!isAuthed) {
    return <Navigate to='/Login' />;
  }

  if (userData.role === "1") {
    return (
      <>
        <Navigate to='/dev' />
        <Outlet />
      </>
    );
  } else if (userData.role === "2") {
    return (
      <>
        <Navigate to='/teamleader' />
        <Outlet />
      </>
    );
  }

  return <Outlet />;
};

export default AuthGuard;
