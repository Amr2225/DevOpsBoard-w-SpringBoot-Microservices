import { createBrowserRouter } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  DevProjectList,
  RejectProjects,
  AddProjects,
  AssignDevelopers,
  ViewAttachments,
} from "../Pages";

import { TasksBoard, AuthGuard } from "../Components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthGuard />,
    children: [
      {
        path: "/teamleader",
        element: <HomePage />, //Change its name later
        children: [
          {
            path: "/teamleader/dashboard/:projectId",
            element: <TasksBoard />,
          },
          {
            path: "/teamleader/AssignDevs/:projectId",
            element: <AssignDevelopers />,
          },
          {
            path: "/teamleader/addprojects",
            element: <AddProjects />,
          },
          {
            path: "/teamleader/view-attachments",
            element: <ViewAttachments />,
          },
        ],
      },
      {
        path: "/dev",
        element: <HomePage />,
        children: [
          {
            path: "/dev/dashboard/:projectId",
            element: <TasksBoard />,
          },
          {
            path: "/dev/projectlist",
            element: <DevProjectList />,
          },
          {
            path: "/dev/rejectedlist",
            element: <RejectProjects />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "*",
    element: (
      <h1 className='text-center mt-10 text-3xl text-neutral-50 font-bold'>404 Not Found</h1>
    ),
  },
]);

export default router;
