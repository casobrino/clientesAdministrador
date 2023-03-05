import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout";
import ErrorPage from "./components/ErrorPage";
import Index, {loader as clientesLoader} from "./pages/Index";
import NuevoCliente, { action as actionNuevoCliente } from "./pages/NuevoCliente";
import EditarCliente, {loader as editarClienteLoader, action as editarAction} from "./pages/EditarCliente";
import {action as eliminarClienteAction} from './components/Cliente'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index:true,
        element: <Index/>, 
        loader: clientesLoader,
        errorElement: <ErrorPage/>
      },
      {
        path: "/clientes/nuevo",
        element: <NuevoCliente />,
        action: actionNuevoCliente,
        errorElement: <ErrorPage/>
      },{
        path:"/clientes/:id/editar",
        element: <EditarCliente/>,
        loader: editarClienteLoader,  
        action: editarAction,
        errorElement: <ErrorPage/>
      },
      {
        path:"/clientes/:id/eliminar",
        action: eliminarClienteAction,
        errorElement: <ErrorPage/>
      }
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
