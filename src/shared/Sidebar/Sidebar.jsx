import React from "react";
import "./style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Sidebar = (props) => {
  const location = useLocation();
  console.log("location::", location);
  let pathArr = location.pathname.split("/");
  const user = JSON.parse(localStorage.getItem("user-info"));
  const userEmail = user?.user?.user_email;
  pathArr.shift();
  return (
    <>
      {![
        "login",
        "register",
        "packages",
        "thank-you",
        "forget-password",
        "reset-password",
        "term-conditions",
      ].includes(pathArr[0].toLowerCase()) && (
        <div className={props.sideClass}>
          <div className="sidebarCont">
            <div className="logo">
              <NavLink to="/">
                <img src="/assets/images/logo.png" alt="" />
                <h4 className="removeOnActive">
                  BSB <br />
                  Management
                </h4>
              </NavLink>
            </div>
            <div className="ctm-navbar">
              <h6 className="removeOnActive">MAIN</h6>
              <ul className="navbar-menu">
                <li>
                  <NavLink to="/">
                    <svg className="icon" aria-labelledby="Dashboard Icon">
                      <title id="dashboard">Dashboard Icon</title>
                      <use
                        xlinkHref="/assets/svg-icons/icons.svg#dashboard"
                        xlinkTitle="Dashboard Icon"
                      ></use>
                    </svg>
                    <span className="removeOnActive">Dashboard</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="standorte">
                    <svg className="icon" aria-labelledby="Standorte Icon">
                      <title id="standorte">Standorte Icon</title>
                      <use
                        xlinkHref="/assets/svg-icons/icons.svg#standorte"
                        xlinkTitle="Standorte Icon"
                      ></use>
                    </svg>
                    <span className="removeOnActive">Standorte</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="ticket-system">
                    <svg className="icon" aria-labelledby="User Icon">
                      <title id="users">User Icon</title>
                      <use
                        xlinkHref="/assets/svg-icons/icons.svg#users"
                        xlinkTitle="User Icon"
                      ></use>
                    </svg>
                    <span className="removeOnActive">TicketSystem</span>
                  </NavLink>
                </li>
                {/*<li>
                    <NavLink to="locations">
                      <svg className="icon" aria-labelledby="User Icon">
                        <title id="location">Location Icons</title>
                        <use
                          xlinkHref="/assets/svg-icons/icons.svg#location"
                          xlinkTitle="User Icon"
                        ></use>
                      </svg>
                      <span className="removeOnActive">Locations</span>
                    </NavLink>
                  </li>*/}
                {/*<li>
                  <NavLink to="document-management">
                    <svg className="icon" aria-labelledby="User Icon">
                        <title id="standorte">Location Icons</title>
                        <use
                          xlinkHref="/assets/svg-icons/icons.svg#standorte"
                          xlinkTitle="User Icon"
                        ></use>
                      </svg>
                    <span className="removeOnActive">Officer</span>
                  </NavLink>
                </li>*/}
                {/*<li>
                  <NavLink to="deutsch">
                    <span className="removeOnActive">BSO-A</span>
                  </NavLink>
                </li>*/}
                <li>
                  <NavLink to="work-release-certificate">
                    {/* <svg className="icon" aria-labelledby="User Icon">
                        <title id="standorte">Location Icons</title>
                        <use
                          xlinkHref="/assets/svg-icons/icons.svg#standorte"
                          xlinkTitle="User Icon"
                        ></use>
                      </svg> */}
                    <span className="removeOnActive">Release Certificate</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="evacuation">
                    {/* <svg className="icon" aria-labelledby="User Icon">
                        <title id="standorte">Location Icons</title>
                        <use
                          xlinkHref="/assets/svg-icons/icons.svg#standorte"
                          xlinkTitle="User Icon"
                        ></use>
                      </svg> */}
                    <span className="removeOnActive">Evacuation</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="officer-regulation">
                    {/* <svg className="icon" aria-labelledby="User Icon">
                        <title id="standorte">Location Icons</title>
                        <use
                          xlinkHref="/assets/svg-icons/icons.svg#standorte"
                          xlinkTitle="User Icon"
                        ></use>
                      </svg> */}
                    <span className="removeOnActive">Fire Regulation</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="fire-protection-report">
                    {/* <svg className="icon" aria-labelledby="User Icon">
                        <title id="standorte">Location Icons</title>
                        <use
                          xlinkHref="/assets/svg-icons/icons.svg#standorte"
                          xlinkTitle="User Icon"
                        ></use>
                      </svg> */}
                    <span className="removeOnActive">Fire Protection</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="happenings">
                    {/* <svg className="icon" aria-labelledby="User Icon">
                        <title id="standorte">Location Icons</title>
                        <use
                          xlinkHref="/assets/svg-icons/icons.svg#standorte"
                          xlinkTitle="User Icon"
                        ></use>
                      </svg> */}
                    <span className="removeOnActive">Happenings</span>
                  </NavLink>
                </li>
              </ul>

              {/* pages dropdown */}
              <h6 className="removeOnActive">Pages</h6>
              <ul className="navbar-menu">
                <li>
                  <NavLink to="settings">
                    <svg className="icon" aria-labelledby="Setting Icon">
                      <title id="settings">Setting Icon</title>
                      <use
                        xlinkHref="/assets/svg-icons/icons.svg#settings"
                        xlinkTitle="Setting Icon"
                      ></use>
                    </svg>
                    <span className="removeOnActive">Settings</span>
                  </NavLink>
                </li>
                {userEmail === "admin@yopmail.com" ? (
                  <li>
                    <NavLink to="user">
                      <svg className="icon" aria-labelledby="User Icon">
                        <title id="users">User Icon</title>
                        <use
                          xlinkHref="/assets/svg-icons/icons.svg#users"
                          xlinkTitle="User Icon"
                        ></use>
                      </svg>
                      <span className="removeOnActive">User</span>
                    </NavLink>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>
            {/* <div className="copyright removeOnActive">
              <p>
                Copyright © 2022 <br /> <a href="/#">www.enmeldung.com</a>
                <br /> All rights reserved
              </p>
            </div> */}
            <ul className="navbar-menu">
              <li>
                <a href="/#">
                  <svg className="icon" aria-labelledby="Brifcase Icon">
                    <title id="brifcase">Brifcase Icon</title>
                    <use
                      xlinkHref="/assets/svg-icons/icons.svg#brifcase"
                      xlinkTitle="Brifcase Icon"
                    ></use>
                  </svg>
                  <span className="removeOnActive">Store</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
