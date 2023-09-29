import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getLocation, getUser } from "../../Redux/Action/Action";
const API = process.env.REACT_APP_API_BASE_URL;

function Dashboard() {
  const navigate = useNavigate();
  const [locationData, setLocationData] = useState([]);
  const singleUserDetail = useSelector((state) => state?.userReducer?.user);
  const dispatch = useDispatch();
  const getToken = JSON.parse(localStorage.getItem("user-info"));
  const token = getToken?.token;
  useEffect(() => {
    setTimeout(() => {
      if (!localStorage.getItem("user-info")) {
        navigate("/login");
      }
    }, 500);
  }, []);

  // getUserInfo
  const getUserInfo = async (data) => {
    console.log("requested data for profile::", data);
    try {
      const res = await fetch(`${API}/get-profile`, {
        method: "POST",
        headers: {
          "x-access-token": token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      dispatch(getUser(json));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserInfo();
    getLocationData();
  }, []);

  // Get Location data
  const getLocationData = async (data) => {
    try {
      const res = await fetch(`${API}/get-location-data`, {
        method: "GET",
        headers: {
          "x-access-token": token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      let reverseTaskList = json;
      setLocationData(reverseTaskList);
      dispatch(getLocation(reverseTaskList));
    } catch (err) {
      console.log("getLocationData", err);
    }
    // dispatch(getLocation(data));
    // setLocationData(data);
  };

  return (
    <div className="main-body">
      <div className="heading_box">
        <h2 className="dasshboard_heading">Dashboard</h2>
        <ul className="breadcrumb">
          <li>Dashboard</li>
          <li className="active">User</li>
        </ul>
      </div>
      <div className="dashboard_body">
        <h2>
          Hi, Welcome Back <span>{singleUserDetail?.first_name}!</span>
        </h2>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <div className="dashboard-card">
                    <h4>Teams Strength</h4>
                    <div className="chart">
                      <Bar
                        data={{
                          labels: ["a", "b", "c", "d"],
                          datasets: [
                            {
                              labels: "This will be hide",
                              data: [1, 5, 3, 10],
                              backgroundColor: [
                                "#FABE7A",
                                "#F6866A",
                                "#59E6F6",
                                "#7661E2",
                              ],
                            },
                          ],
                        }}
                        options={{
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              display: false,
                              labels: {
                                boxWidth: 0,
                              },
                            },
                          },

                          scales: {
                            x: {
                              grid: {
                                display: false,
                                borderWidth: 0,
                              },
                              ticks: {
                                display: false,
                              },
                            },
                            y: {
                              grid: {
                                display: false,
                                borderWidth: 0,
                              },
                              ticks: {
                                display: false,
                              },
                            },
                          },
                        }}
                      />
                    </div>
                    <ul className="bar-dash-data">
                      <li className="a-data">Marketing</li>
                      <li className="b-data">HR</li>
                      <li className="c-data">Developers</li>
                      <li className="d-data">Design</li>
                    </ul>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="dashboard-card">
                    <h4>
                      Employees <span>Aug 25-Sept 25</span>
                    </h4>

                    <div className="chart-box">
                      <ul className="Employee-details">
                        <li>
                          <span className="Employee-item">Inactive</span>
                          <span className="Employee-number">254</span>
                        </li>
                        <li>
                          <span className="Employee-item">Active</span>
                          <span className="Employee-number">3000</span>
                        </li>
                        <li>
                          <span className="Employee-item">Total</span>
                          <span className="Employee-number">3254</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="dashboard-card">
                    <h4>Project Deliveries</h4>
                    <div className="chart">
                      <Line
                        data={{
                          labels: [
                            "Oct 2021",
                            "Nov 2021",
                            "Dec 2021",
                            "Jan 2022",
                            "Feb 2022",
                            "Mar 2022",
                          ],
                          datasets: [
                            {
                              label: "Achieved",
                              data: [6, 8, 7, 5, 8, 5],
                              fill: false,
                              borderColor: "#FB896B",
                            },
                            {
                              label: "Target",
                              data: [4, 5, 3, 6, 6.5, 4],
                              fill: false,
                              borderColor: "#6956E5",
                            },
                          ],
                        }}
                        heigh={500}
                        options={{
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              labels: {
                                boxWidth: 4,
                                boxHeight: 4,
                                boxRadius: 50,
                              },
                            },
                          },
                          scales: {
                            x: {
                              grid: {
                                // borderColor: 'red'
                              },
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <div className="dashboard-grid-box">
                <div className="dash-grid-box-item">
                  <h4>Top 10</h4>
                  <p className="dash-grid-box-info">Position in dribbble</p>
                  <p>20% Increase from Last Week</p>
                </div>
                <div className="dash-grid-box-item">
                  <h4>26</h4>
                  <p className="dash-grid-box-info">New employees onboarded</p>
                  <p>15% Increase from Last Month</p>
                </div>
                <div className="dash-grid-box-item">
                  <h4>500</h4>
                  <p className="dash-grid-box-info">
                    20% Increase from Last Week
                  </p>
                  <p>5% Increase from Last Week</p>
                </div>
              </div>
              <div className="notification">
                <div className="noti-head">
                  <h5>Notifications</h5>
                  <button className="btn">View All</button>
                </div>
                <ul>
                  <li className="notification-box-item">
                    <img src="assets/images/notifiaction-img.png" alt="" />
                    <div className="notification-box-cont">
                      <h6>Ellie joined team developers</h6>
                      <p>04 April, 2021 | 04:00 PM</p>
                    </div>
                  </li>
                  <li className="notification-box-item">
                    <img src="assets/images/notifiaction-img.png" alt="" />
                    <div className="notification-box-cont">
                      <h6>Ellie joined team developers</h6>
                      <p>04 April, 2021 | 04:00 PM</p>
                    </div>
                  </li>
                  {/* <li className="notification-box-item">
                                        <img src="assets/images/notifiaction-img.png" alt="" />
                                        <div className='notification-box-cont'>
                                            <h6>Ellie joined team developers</h6>
                                            <p>04 April, 2021 | 04:00 PM</p>
                                        </div>
                                    </li> */}
                  {/* <li className="notification-box-item">
                                        <img src="assets/images/notifiaction-img.png" alt="" />
                                        <div className='notification-box-cont'>
                                            <h6>Ellie joined team developers</h6>
                                            <p>04 April, 2021 | 04:00 PM</p>
                                        </div>
                                    </li>
                                    <li className="notification-box-item">
                                        <img src="assets/images/notifiaction-img.png" alt="" />
                                        <div className='notification-box-cont'>
                                            <h6>Ellie joined team developers</h6>
                                            <p>04 April, 2021 | 04:00 PM</p>
                                        </div>
                                    </li> */}
                </ul>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default Dashboard;
