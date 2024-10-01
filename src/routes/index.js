import React from "react";
import { Redirect } from "react-router-dom";

//ITSM Components***********/
import RequestedServices from "../pages/RequestedServices/index";
import Reports from "../pages/Reports/index";
import MultipurposeSMS from "../pages/Tools/MultipurposeSMS/index";
import VaxcertSMS from "../pages/Tools/VaxcertSMS/index";
import Verification from "../pages/UserControls/Verification/index";
import Controls from "../pages/UserControls/Controls/index";
import RequestService from "pages/Services/RequestService/index";
import RequestTracker from "pages/Services/RequestTracker/index";
import CreateUser from "pages/UserControls/CreateUser/index";
//********************** */

// Profile
import UserProfile from "../pages/Authentication/user-profile";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

// Dashboard
import Dashboard from "../pages/Dashboard/index";

import NotificationsPage from "pages/Notification";

import CryptoIcoLanding from "../pages/Crypto/CryptoIcoLanding/index";

import PagesMaintenance from "../pages/Utility/pages-maintenance";
import PagesComingsoon from "../pages/Utility/pages-comingsoon";
import PagesForbidden from "../pages/Utility/pages-forbidden";

import Pages404 from "../pages/Utility/pages-404";
import Pages500 from "../pages/Utility/pages-500";

const authProtectedRoutes = [
  // Profile Routes
  { path: "/profile", component: UserProfile },
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
  //**Profile Routes -end */

  // Requestor Routes
  { path: "/request-service", component: RequestService },
  { path: "/request-tracker", component: RequestTracker },
  //** Requestor Routes -end*/
];

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },

  { path: "/pages-maintenance", component: PagesMaintenance },
  { path: "/pages-forbidden", component: PagesForbidden },
  { path: "/pages-comingsoon", component: PagesComingsoon },
  { path: "/pages-500", component: Pages500 },
  { path: "/crypto-ico-landing", component: CryptoIcoLanding },
  { path: "/not-found", component: Pages404 },
];

export { authProtectedRoutes, publicRoutes };
