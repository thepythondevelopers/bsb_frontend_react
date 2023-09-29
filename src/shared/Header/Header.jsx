import React, { useState, useRef, useEffect, ReactDOM } from "react";
import "./style.css";
import { useLocation, useNavigate, Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LockIcon from "@mui/icons-material/Lock";
import { decodeToken } from "react-jwt";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../Redux/Action/Action";
import { getLocation } from "../../Redux/Action/Action";
import { getSelectedLocationId } from "../../Redux/Action/Action";
const API = process.env.REACT_APP_API_BASE_URL;

const Header = (props) => {
  const [openDropdrown, setOpenDropdrown] = useState(false);
  const [standorte, setStandorte] = useState(false);
  const [addModule, setAddModule] = useState(false);
  const [fixBoard, setFixBoard] = useState(false);
  const selectedLocationId = useSelector((state) => state.locationIdReducer);
  const location = useLocation();
  const dropDownCont = useRef(null);
  const singleUserDetail = useSelector((state) => state?.userReducer?.user);
  const locations = useSelector((state) => state.locationReducer.locations);
  const dispatch = useDispatch();
  let pathArr = location.pathname.split("/");
  pathArr.shift();
  let user = JSON.parse(localStorage.getItem("user-info"));
  const token = user?.token;
  const navigate = useNavigate();
  const logoutFunc = () => {
    localStorage.removeItem("user-info");
    toast.error("Logout Successfull");
    navigate("/login");
  };
  const handleClickOutside = (event) => {
    if (dropDownCont.current && !dropDownCont.current.contains(event.target)) {
      setFixBoard(false);
      setAddModule(false);
      setStandorte(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  useEffect(() => {
    getLocationData();
  }, []);

  const removeNote = () => {
    props.isTaskModule(true);
    setAddModule(false);
  };
  const removeCalender = () => {
    props.isEventModule(true);
    setAddModule(false);
  };
  const removeBothCalender = () => {
    props.isEventModule(true);
    props.isTaskModule(true);
    props.isDocumentModule(true);
    props.isPlanModule(true);
    setAddModule(false);
  };

  const handleStandorteDrop = (e) => {
    dispatch(getSelectedLocationId(e.target.value));
  };

  // ============================================= get user Data ======================================================
  const [locationData, setLocationData] = useState([]);
  // getUserInfo
  const getUserInfo = (data) => {
    return fetch(`${API}/get-profile`, {
      method: "POST",
      headers: {
        "x-access-token": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res?.json())
      .then((json) => {
        dispatch(getUser(json));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // get location
  const getLocationData = (data) => {
    return fetch(`${API}/get-location-data`, {
      method: "GET",
      headers: {
        "x-access-token": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res?.json())
      .then((json) => {
        console.log("get all data::", json);
        if (json.length > 0) {
          dispatch(getLocation(json));
        } else {
          dispatch(getLocation(json));
        }
      })
      .catch((err) => {
        console.log("getLocationData", err);
      });
  };

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
        <header className="main-header">
          <div className="header-left">
            <div
              className={`menu-icon cmn-style ${props.addClass}`}
              onClick={props.clickfunc}
            >
              <svg className="icon icon-right" aria-labelledby="dropdownButton">
                <title id="dropdownButton">dropdownButton</title>
                <use
                  xlinkHref="/assets/svg-icons/icons.svg#dropdownButton"
                  xlinkTitle="dropdownButton"
                ></use>
              </svg>
              <svg className="icon icon-left" aria-labelledby="dropdownButton">
                <title id="dropdownButton">dropdownButton</title>
                <use
                  xlinkHref="/assets/svg-icons/icons.svg#dropdownButton"
                  xlinkTitle="dropdownButton"
                ></use>
              </svg>
            </div>
            {[
              "document-management",
              "standorte",
              "work-release-certificate",
              "evacuation",
              "officer-regulation",
            ].includes(pathArr[0].toLowerCase()) && (
              <>
                <FormControl
                  sx={{ m: 1, minWidth: 120 }}
                  className="ctm-selectDrop"
                >
                  <Select
                    value={selectedLocationId}
                    onChange={(e) => {
                      handleStandorteDrop(e);
                    }}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    {/*<MenuItem value="">
                          Standorte
                        </MenuItem>*/}
                    {locations.length > 0 &&
                      locations.map((curelem, index) => {
                        console.log("curelem", curelem);
                        return (
                          <MenuItem key={index} value={curelem?._id}>
                            {curelem?.show_as}
                          </MenuItem>
                        );
                      })}
                    {locations.length <= 0 ? (
                      <div></div>
                    ) : (
                      <div>
                        <Link to={"/locations"} className="itemLink">
                          Standortverwaltung
                        </Link>
                      </div>
                    )}
                  </Select>
                </FormControl>
              </>
            )}
            {["standorte"].includes(pathArr[0].toLowerCase()) && (
              <>
                <div className="dropdown" ref={dropDownCont}>
                  <button
                    className={`btn dropdown-toggle ${addModule ? "show" : ""}`}
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded={`${addModule ? "true" : "false"}`}
                    onClick={() => {
                      setAddModule(!addModule);
                    }}
                  >
                    Modul hinzufügen
                  </button>
                  <ul
                    className={`dropdown-menu ${addModule ? "show" : ""}`}
                    aria-labelledby="dropdownMenuButton1"
                  >
                    {props.taskModule ? (
                      ""
                    ) : (
                      <li>
                        <button
                          className="dropdown-item"
                          href="#"
                          onClick={() => removeNote()}
                        >
                          Aufgaben
                        </button>
                      </li>
                    )}
                    {props.eventCalenderModule ? (
                      ""
                    ) : (
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => removeCalender()}
                        >
                          Kalender
                        </button>
                      </li>
                    )}
                    {props.eventDocumentModule ? (
                      ""
                    ) : (
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            props.isDocumentModule(true);
                            setAddModule(false);
                          }}
                        >
                          Document
                        </button>
                      </li>
                    )}
                    {props.eventPlanModule ? (
                      ""
                    ) : (
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            props.isPlanModule(true);
                            setAddModule(false);
                          }}
                        >
                          Plan
                        </button>
                      </li>
                    )}
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => removeBothCalender()}
                      >
                        alle Module öffnen
                      </button>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => removeBothCalender()}
                      >
                        Position Reset
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="dropdown">
                  <button
                    className={`btn `}
                    onClick={() => {
                      props.isModulefixed(!props.modulefixed);
                    }}
                  >
                    Board Fixieren
                    {props.modulefixed ? (
                      <LockIcon className="board-fixed" color="action" />
                    ) : (
                      ""
                    )}
                  </button>
                  {/* <ul className={`dropdown-menu ${fixBoard ? "show" : ""}`} aria-labelledby="dropdownMenuButton1">
                        <li>
                          <a className="dropdown-item" href="#">
                            City / Street Nr
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            City / Street Nr
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            City / Street Nr
                          </a>
                        </li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#">Standorte anlegen</a></li>
                      </ul> */}
                </div>
              </>
            )}
          </div>
          <div className="header-right">
            <div className="searchIcon cmn-style">
              <svg className="icon" aria-labelledby="Search Icon">
                <title id="search">Search Icon</title>
                <use
                  xlinkHref="/assets/svg-icons/icons.svg#search"
                  xlinkTitle="Search Icon"
                ></use>
              </svg>
            </div>
            <div className="bellIcom cmn-style">
              <svg className="icon" aria-labelledby="Bell Icon">
                <title id="bell">Bell Icon</title>
                <use
                  xlinkHref="/assets/svg-icons/icons.svg#bell"
                  xlinkTitle="Bell Icon"
                ></use>
              </svg>
            </div>

            <div
              className="profileDropdown dropdown cmn-style"
              // onClick={() => { setOpenDropdrown(!openDropdrown) }}
            >
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {singleUserDetail.avatar ? (
                  <img
                    src={
                      process.env.REACT_APP_IMAGE_BASE_URL +
                      `/${singleUserDetail.avatar}`
                    }
                    alt="User"
                  />
                ) : (
                  <img src="/assets/images/avatar.png" alt="User" />
                )}
                <svg className="icon" aria-labelledby="Dropdown Icon">
                  <title id="dropdownButton">Dropdown Icon</title>
                  <use
                    xlinkHref="/assets/svg-icons/icons.svg#dropdownButton"
                    xlinkTitle="Dropdown Icon"
                  ></use>
                </svg>
              </button>
              <div
                className="dropdown-menu dropdownBox"
                aria-labelledby="dropdownMenuButton1"
              >
                <p>Currently in</p>
                <div className="dropProfileCard">
                  {singleUserDetail.avatar ? (
                    <img
                      src={
                        process.env.REACT_APP_IMAGE_BASE_URL +
                        `/${singleUserDetail.avatar}`
                      }
                      alt="User"
                    />
                  ) : (
                    <img src="/assets/images/avatar.png" alt="User" />
                  )}
                  <div className="dropProfileInfoCont">
                    <h4>
                      {singleUserDetail?.first_name}{" "}
                      {singleUserDetail?.last_name}
                    </h4>
                    <p>Personal</p>
                    <p>{singleUserDetail?.email}</p>
                  </div>
                </div>
                <ul className="dropProfileInfo">
                  <li>
                    <Link to="/settings">Settings</Link>
                  </li>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <button>Terms and privacy</button>
                  </li>
                  <li>
                    <Link to="/packages">Packages</Link>
                  </li>
                  {localStorage.getItem("user-info") ? (
                    <li onClick={logoutFunc}>Logout</li>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
            </div>
          </div>
        </header>
      )}
      <ToastContainer />
    </>
  );
};

export default Header;
