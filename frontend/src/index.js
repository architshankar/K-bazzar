import './index.css';
import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from './components/Home'
import Login from './components/Login';
import Signup from './components/Signup';
import AddProduct from './components/AddProduct';
import LikedProducts from './components/LikedProducts';
import ProductDetail from './components/ProductDetail';
import CatagoriePage from './components/CatagoryPage';
import MyProducts from './components/MyProducts';
import MyProfile from './components/MyProfile';
import AdminPanel from './components/AdminPanel';
import SearchPage from './components/SearchPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home/>),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
  {
    path: "/login",
    element: (<Login/>),
  },
  {
    path: "/signup",
    element: (<Signup/>),
  },
  {
    path: "/add-product",
    element: (<AddProduct/>),
  },
  {
    path: "/liked-products",
    element: (<LikedProducts/>),
  },
  {
    path: "/product/:productId",   //:id is called a param
    element: (<ProductDetail/>),
  },
  {
    path: "/catagory/:catName?",
    element: (<CatagoriePage/>),
  },
  {
    path: "/my-products",
    element: (<MyProducts />),
  },{
    path: "/my-profile",
    element: (<MyProfile />),
  },
  {
    path: "/admin-panel",
    element: (<AdminPanel />),
  },
  {
    path: "/search",
    element: (<SearchPage />),
  },
  
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

