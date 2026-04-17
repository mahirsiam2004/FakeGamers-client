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
import GameDetails from "../pages/GameDetails/GameDetails";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import ManageNews from "../pages/Dashboard/ManageNews/ManageNews";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import AllGames from "../pages/Dashboard/AllGames/AllGames";

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
          Component:Dashboard,
          children: [
            {
              path: 'addGames',
              Component: AddGames
            },
            {
              path: 'myGames',
              Component: MyGames
            },
            {
              path: 'myDownloads',
              Component: MyDownloads
            },
            {
              path: 'updateGames/:id',
              Component: UpdateGames
            },
            {
              path: 'manageNews',
              Component: ManageNews
            },
            {
              path: 'manageUsers',
              Component: ManageUsers
            },
            {
              path: 'allGames',
              Component: AllGames
            }
          ]
        },
        {
          path:'/profile',
          Component:MyProfile
        },
        {
          path:'/details/:id',
          Component:GameDetails
        },
        {
          path:'/payment/success',
          Component:PaymentSuccess
        },
    ]
  },
]);
