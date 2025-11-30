import { Component } from "react";
import MainLayout from "../layouts/MainLayout";
import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import GamesPage from "../pages/Games/GamesPage";
import News from "../pages/News/News";
import Store from "../pages/Store/Store";

export const Router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children:[
        {
            index:true,
            Component:Home
        },
        {
          path:'/login',
          Component:Login
        },
        {
          path:'/register',
          Component:Register
        },
        {
          path:'/games',
          Component:GamesPage
        },
        {
          path:'/news',
          Component:News
        },
        {
          path:'/store',
          Component:Store
        },
    ]
  },
]);
