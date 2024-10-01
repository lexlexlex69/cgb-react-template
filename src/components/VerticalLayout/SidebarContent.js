import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";

const SidebarContent = (props) => {
  const ref = useRef();
  const userDetails = useSelector((state) => state.user);
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname;
    const initMenu = () => {
      new MetisMenu("#side-menu");
      let matchingMenuItem = null;
      const ul = document.getElementById("side-menu");
      const items = ul.getElementsByTagName("a");
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    initMenu();
  }, [props.location.pathname]);

  useEffect(() => {
    ref.current.recalculate();
  });

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }

  const checkRole = (roles) => {
    var allowAccess = true;
    roles.map((role) => {
      if (userDetails.role === role) {
        return (allowAccess = true);
      }
    });
    return allowAccess;
  };

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            {checkRole([
              "Administrator",
              "Division Head",
              "Section Head",
              "Assistant Section Head",
              "Personnel",
            ]) ? (
              <>
                <li className="menu-title">{props.t("Menu")} </li>
                <li>
                  <Link to="/dashboard">
                    <i className="fas fa-chart-pie"></i>
                    <span>{props.t("Dashboard")}</span>
                  </Link>
                </li>

                <li className="menu-title">{props.t("Components")}</li>

                <li>
                  <Link to="/requested-services">
                    <i className="fas fa-mail-bulk"></i>
                    <span>{props.t("Requested Services")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/reports">
                    <i className="fas fa-file-signature"></i>
                    <span>{props.t("Reports")}</span>
                  </Link>
                </li>
                {checkRole([
                  "Administrator",
                  "Division Head",
                  "Section Head",
                  "Assistant Section Head",
                ]) && (
                  <>
                    <li className="menu-title">{props.t("Tools")}</li>
                    <li>
                      <Link to="/#" className="has-arrow">
                        <i className="fas fa-envelope-open-text"></i>
                        <span>{props.t("SMS Api")}</span>
                      </Link>
                      <ul className="sub-menu">
                        <li>
                          <Link to="/multipurpose-sms">
                            {props.t("Multipurpose")}
                          </Link>
                        </li>
                        <li>
                          <Link to="/vaxcert-sms">{props.t("Vaxcert")}</Link>
                        </li>
                      </ul>
                    </li>
                  </>
                )}

                {checkRole(["Administrator", "Division Head"]) && (
                  <>
                    <li className="menu-title">{props.t("User Management")}</li>
                    <li>
                      <Link to="/#" className="has-arrow">
                        <i className="fas fa-user-cog"></i>
                        <span>{props.t("User Controls")}</span>
                      </Link>
                      <ul className="sub-menu">
                        <li>
                          <Link to="/userverification">
                            {props.t("Verification")}
                          </Link>
                        </li>
                        <li>
                          <Link to="/usercontrols">{props.t("Controls")}</Link>
                        </li>
                        <li>
                          <Link to="/createuser">{props.t("Create User")}</Link>
                        </li>
                      </ul>
                    </li>
                  </>
                )}
              </>
            ) : checkRole(["Requestor"]) ? (
              <>
                <li className="menu-title">{props.t("Menu")} </li>
                <li>
                  <Link to="/dashboard">
                    <i className="fas fa-chart-pie"></i>
                    <span>{props.t("Dashboard")}</span>
                  </Link>
                </li>

                <li className="menu-title">{props.t("Services")} </li>
                <li>
                  <Link to="/request-service">
                    <i className="fas fa-user-cog"></i>
                    <span>{props.t("Request Service")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/request-tracker">
                    <i className="fas fa-search"></i>
                    <span>{props.t("Request Tracker")}</span>
                  </Link>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
