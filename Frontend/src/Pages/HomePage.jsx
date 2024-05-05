import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { Sidebar } from "../Components";

const HomePage = () => {
  const { userData, isAuthed } = useSelector((state) => state.user);

  if (!isAuthed) {
    return <Navigate to='/login' />;
  }

  return (
    <div className='flex flex-row overflow-y-hidden '>
      <Sidebar />
      <section className='flex flex-col p-10 pr-0 pl-5 w-full overflow-y-hidden'>
        <h1 className='text-2xl text-neutral-100'>
          Welcome Back,
          <span className='font-bold text-violet-600 capitalize'> {userData.userName}</span>
        </h1>
        <Outlet />
      </section>
    </div>
  );
};

export default HomePage;
