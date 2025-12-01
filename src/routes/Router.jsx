import { Component } from "react";
import MainLayout from "../layouts/MainLayout";
import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import GamesPage from "../pages/Games/GamesPage";
import News from "../pages/News/News";
import Store from "../pages/Store/Store";
import Dashboard from "../pages/Dashboard/Dashboard";
import AddGames from "../pages/Dashboard/AddGames/AddGames";
import MyGames from "../pages/Dashboard/MyGames/MyGames";
import MyDownloads from "../pages/Dashboard/MyDownloads/MyDownloads";
import UpdateGames from "../pages/Dashboard/UpdateGames/UpdateGames";
import MyProfile from "../pages/Profile/MyProfile";

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
        {
          path:'/dashboard',
          Component:Dashboard
        },
        {
          path:'/addGames',
          Component:AddGames
        },
        {
          path:'/myGames',
          Component:MyGames
        },
        {
          path:'/myDownloads',
          Component:MyDownloads
        },
        {
          path:'/updateGames',
          Component:UpdateGames
        },
        {
          path:'/profile',
          Component:MyProfile
        },
    ]
  },
]);
