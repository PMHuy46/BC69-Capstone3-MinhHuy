import { useRoutes } from "react-router-dom";
import { AuthLayout } from "../Components";
import { PATH } from "../constants";
import { AddFilm, AddUser, AdminFilm, Home, Login, PhimDetail, Register, ShowTime } from "../Pages";
import { MainLayout } from "../Components/Layouts/MainLayout";
import { AdminLayout } from "../Components/Layouts/AdminLayout";
import { AdminUser } from "../Pages/Admin/AdminUser";


export const routers = () =>
  useRoutes([
    {
      element: <AuthLayout />,
      children : [
        {
          path: PATH.register,
          element: <Register />,
        },
        {
          path: PATH.login,
          element: <Login />,
        },
      ],
    },
    {
        element:<MainLayout/>,
        children:[
            {
                index:true,
                element:<Home/>
            },
            {
                path:PATH.phimDetail,
                element:<PhimDetail/>
            }
        ]
    },
    {
      element:<AdminLayout/>,
      children:[
        {
          path:PATH.admin,
          element:<AdminUser/>
        },
        {
          path:PATH.addUser,
          element:<AddUser/>
        },
        {
          path:PATH.adminFilm,
          element:<AdminFilm/>
        },
        {
          path:PATH.addFilm,
          element:<AddFilm />
        },
        {
          path:PATH.showtime,
          element:<ShowTime/>
        }
      ]
    }
  ]);
