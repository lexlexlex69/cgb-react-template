import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { requestedServiceSlice } from "features/filters/requestedServiceSlice";
import {
  getUnreadUserNotifications,
  getNotificationStatus,
  getAllUserNotifications,
} from "features/notifications/userNotificationsSlice";
import { getPersonnel } from "features/user/userListSlice";
import { Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import { notificationSlice } from "features/filters/notificationSlice";
import { connect } from "react-redux";

// Import Routes all
import { authProtectedRoutes, publicRoutes } from "./routes";

// Import all middleware
import Authmiddleware from "./routes/route";

// layouts Format
import VerticalLayout from "./components/VerticalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";
// Import scss
import "./assets/scss/theme.scss";
import "./assets/css/tableStyle.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import { getOffices } from "features/office/officeSlice";
import {
  getRequestStatusList,
  getStatusList,
} from "features/status/statusSlice";
import { getDivision, getUserRoles } from "features/user/userListSlice";
import { getRequestTypes } from "features/request/requestTypeSlice";
import { useHistory } from "react-router-dom/";
import Notifications from "components/Notifications";
// Importing package.json file to access its properties
import packageJson from "../package.json";

// Inside your React component

const App = (props) => {
  document.title = packageJson.name;
  const dispatch = useDispatch();
  const history = useHistory();
  axios.defaults.baseURL =
    window.location.protocol + "//" + process.env.REACT_APP_API;
  // axios.defaults.baseURL = 'https://test.butuan.gov.ph/itsm_version3_backend/public'
  axios.defaults.headers.post["Accept"] = "application/json";
  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.defaults.withCredentials = true;
  axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("authToken");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 403) {
        // window.location.href = '/logout';
        // window.location.href = '/pages-forbidden';
        // history.replace("/pages-forbidden");
        console.log(error.response.status);
      } else if (error.response.status === 503) {
        // window.location.href = '/pages-maintenance';
        // history.replace("/pages-forbidden");
        console.log(error.response.status);
      }
      return Promise.reject(error);
    }
  );
  const userDetails = useSelector((state) => state.user);
  const requestParams = useSelector((state) => state.requestFilter.params);
  const notificationParams = useSelector(
    (state) => state.notificationFilter.params
  );
  const pusher = useSelector((state) => state.pusher.pusherData);
  function getLayout() {
    let layoutCls = VerticalLayout;
    return layoutCls;
  }
  useEffect(() => {
    dispatch(getOffices({ history: props.history }));
  }, []);
  useEffect(() => {
    if (userDetails.role) {
      dispatch(getNotificationStatus({ history: props.history }));
      dispatch(getUnreadUserNotifications({ history: props.history }));
      dispatch(
        getAllUserNotifications({
          history: props.history,
          filter: notificationParams,
        })
      );
      dispatch(getRequestTypes({ history: props.history }));
      dispatch(getRequestStatusList({ history: props.history }));
      dispatch(getStatusList({ history: props.history }));
      if (userDetails.role === "Personnel") {
        dispatch(
          requestedServiceSlice.actions.setParams({
            requestStatus: { label: "WORK IN PROGRESS", value: 6 },
            requestDetails: "",
          })
        );
      } else {
        dispatch(
          requestedServiceSlice.actions.setParams({
            requestStatus: { label: "OPEN", value: 4 },
            requestDetails: "",
          })
        );
      }
    }
  }, [userDetails]);

  useEffect(() => {
    if (pusher) {
      if (
        userDetails.role === "Administrator" ||
        userDetails.role === "Division Head"
      ) {
        dispatch(getUserRoles({ history: props.history }));
      }
    }
  }, [pusher]);
  // //**End */

  useEffect(() => {
    if (
      (userDetails.role === "Administrator" ||
        userDetails.role === "Division Head") &&
      requestParams
    ) {
      dispatch(getPersonnel({ history: props.history }));
      dispatch(getDivision({ history: props.history }));
    }
  }, [userDetails.role, requestParams]);

  const Layout = getLayout();
  return (
    <React.Fragment>
      <Router basename="/">
        <Switch>
          {publicRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              exact
            />
          ))}

          {authProtectedRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={Layout}
              component={route.component}
              key={idx}
              isAuthProtected={true}
              exact
            />
          ))}
          <Redirect to="/not-found" />
        </Switch>
      </Router>

      <Notifications />
    </React.Fragment>
  );
};
App.propTypes = {
  layout: PropTypes.any,
};
const mapStateToProps = (state) => {
  return {
    layout: state.Layout,
  };
};
export default connect(mapStateToProps, null)(App);
