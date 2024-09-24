import { useRoutes } from "react-router-dom";
import { AuthLayout } from "../Components";
import {  Home, PhimDetail, Register } from "../Pages";
import { Login } from "../Pages/Login";
import { PATH } from "../constants";
import { MainLayout } from "../Components/Layouts/MainLayout";
import { AdminLayout } from "../Components/Layouts/AdminLayout";
import { AdminFilm } from "../Pages/AdminFilm";
import { AddFilm } from "../Pages/AddFilm";
import { AdminUser } from "../Pages/AdminUser";

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
          path:PATH.adminFilm,
          element:<AdminFilm/>
        },
        {
          path:PATH.addFilm,
          element:<AddFilm/>
        }
      ]
    }
  ]);
