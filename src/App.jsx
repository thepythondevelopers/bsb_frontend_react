// https://api.postman.com/collections/17046099-8a04e4fb-2e34-4d9c-948f-3c2910a20fdc?access_key=PMAT-01GKGWASPCMY1FN12FF1FXEJ22
// use baseurl : 54.87.14.216
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Header from "./shared/Header/Header";
import Sidebar from "./shared/Sidebar/Sidebar";
import Standorte from "./pages/Standorte/Standorte";
import Dashboard from "./pages/Dashboard/Dashboard";
import Locations from "./pages/Locations/Locations";
import TicketSystem from "./pages/TicketSystem/TicketSystem";
import Support from "./pages/Support/Support";
import Login from "./auth/Login/Login";
import Register from "./auth/Register/Register";
import ForgetPassword from "./auth/ForgetPassword/ForgetPassword";
import ResetPassword from "./auth/ResetPassword/ResetPassword";
import Packages from "./pages/Packages/Packages";
import MakePayment from "./pages/Packages/MakePayment/MakePayment";
import ThankYou from "./pages/Packages/ThankYou/ThankYou";
import User from "./admin/User/User";
import SingleUser from "./admin/SingleUser/SingleUser";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import TermCondition from "./pages/TermCondition/TermCondition";
import OfficerRegulation from "./pages/OfficerRegulation/OfficerRegulation";
import Officer from "./components/Officer";
import WorkReleaseCertificate from "./pages/WorkReleaseCertificate/WorkReleaseCertificate";
import Evacuation from "./pages/Evacuation/Evacuation";
import EvacuationTemplate from "./templates/Evacuation/Evacuation";
import FireProtection from "./pages/FireProtection/FireProtection";
import Deutsch from "./templates/BSO_A/Deutsch";
import Happenings from "./pages/Happenings/Happenings";
import ReleaseCertificate from "./templates/Release_Certificate/releaseCertificate";
const API = process.env.REACT_APP_API_BASE_URL;
console.log("base url::", `${process.env.REACT_APP_API_BASE_URL}`);
// const API = "http://localhost:8000";

const App = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [isActiveModule, setIsActiveModule] = useState(true);
  const [isActiveModuleDocument, setIsActiveModuleDocument] = useState(true);
  const [isActiveModulePlan, setIsActiveModulePlan] = useState(true);
  const [isActiveEventModule, setIsActiveEventModule] = useState(true);
  const [isBoarFixed, setIsBoarFixed] = useState(false);

  const user = JSON.parse(localStorage.getItem("user-info"));
  const userError = user?.error;
  const token = user?.token;
  const [standoteDrop, setStandoteDrop] = useState({
    event_calender: 1,
    note: 1,
    board_fixed: 0,
  });

  useEffect(() => {
    if (userError) {
      localStorage.clear();
    }
  });
  return (
    <>
      <div className="app">
        <div className="main-wrapper">
          <BrowserRouter>
            <Sidebar
              sideClass={`main-aside ${isActive ? "main-aside-active" : ""}`}
            />
            <div className="main-content">
              <Header
                clickfunc={() => setIsActive(!isActive)}
                addClass={isActive ? "remove-icon" : ""}
                isTaskModule={setIsActiveModule}
                taskModule={isActiveModule}
                isEventModule={setIsActiveEventModule}
                eventCalenderModule={isActiveEventModule}
                isModulefixed={setIsBoarFixed}
                modulefixed={isBoarFixed}
                isDocumentModule={setIsActiveModuleDocument}
                isPlanModule={setIsActiveModulePlan}
                eventDocumentModule={isActiveModuleDocument}
                eventPlanModule={isActiveModulePlan}
              />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/locations" element={<Locations />} />
                <Route path="/deutsch" element={<Deutsch />} />
                <Route path="/ticket-system" element={<TicketSystem />} />
                <Route path="/support" element={<Support />} />
                <Route
                  path="/standorte"
                  element={
                    <Standorte
                      isTaskModule={setIsActiveModule}
                      taskModule={isActiveModule}
                      isDocumentModule={setIsActiveModuleDocument}
                      isPlanModule={setIsActiveModulePlan}
                      isEventModule={setIsActiveEventModule}
                      eventCalenderModule={isActiveEventModule}
                      eventDocumentModule={isActiveModuleDocument}
                      eventPlanModule={isActiveModulePlan}
                      modulefixed={isBoarFixed}
                    />
                  }
                />
                <Route path="/packages" element={<Packages />} />
                <Route path="/packages/payment" element={<MakePayment />} />
                <Route path="/thank-you" element={<ThankYou />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/register" element={<Register />} />
                <Route path="/user" element={<User />} />
                <Route path="/user/:_id" element={<SingleUser />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/term-conditions" element={<TermCondition />} />
                <Route
                  path="/officer-regulation"
                  element={<OfficerRegulation />}
                />
                <Route
                  path="/work-release-certificate"
                  element={<WorkReleaseCertificate />}
                />
                <Route path="/evacuation" element={<Evacuation />} />
                <Route path="/document-management" element={<Officer />} />
                <Route
                  path="/fire-protection-report"
                  element={<FireProtection />}
                />
                <Route
                  path="/templates/evacuation"
                  element={<EvacuationTemplate />}
                />
                <Route path="happenings" element={<Happenings />} />
                <Route
                  path="releaseCertificate"
                  element={<ReleaseCertificate />}
                />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
};

export default App;
