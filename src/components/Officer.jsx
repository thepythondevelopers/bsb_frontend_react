import * as React from "react";
import { useState, useEffect } from "react";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OfficerModal from "../modal/OfficerModal/OfficerModal";
import CloseIcon from "@mui/icons-material/Close";
import ListIcon from "@mui/icons-material/List";
import { useSelector, useDispatch } from "react-redux";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { useRef } from "react";
import colors from "../demo-data/ChangeColor";

const API = process.env.REACT_APP_API_BASE_URL;

function Officer() {
  var [displayTick, setdisplayTick] = useState(false);

  const [percentage, setPercentage] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const selectedLocationId = useSelector((state) => state.locationIdReducer);

  const [managing_director, setManaging_director] = useState({
    name: "",
    first_name: "",
    contact_number: null,
    email: "",
  });

  const [functionModelBox, setFunctionModelBox] = useState(false);
  const [functionModelColor, setFunctionModelColor] = useState(false);
  const dropDownCont = useRef(null);

  // change color functionUpload
  const [colorFunctionUploadClass, setColorFunctionUploadClass] = useState(
    colors[0].id
  );
  const [colorFunctionName, setColorFunctionName] = useState("Red");
  const [colorFunctionUploadClassTaskbar] = useState(colors);
  const listFunctionUploadTitles = colorFunctionUploadClassTaskbar.map(
    (item, index) => (
      <li
        key={index}
        onClick={() => {
          setColorFunctionUploadClass(item.id);
          setFunctionModelBox(false);
          setColorFunctionName(item.color);
        }}
        className={`${item.color} ${
          colorFunctionUploadClass === item.id
            ? "tab-title tab-title--active"
            : "tab-title"
        }`}
      >
        {item.color}
      </li>
    )
  );

  const [deputy_managing_director, setDeputy_managing_director] = useState({
    name: "",
    first_name: "",
    contact_number: null,
    email: "",
  });

  const [object_director, setObject_director] = useState({
    name: "",
    first_name: "",
    contact_number: null,
    email: "",
  });

  const [responsible_fire_protection, setResponsible_fire_protection] =
    useState({
      name: "",
      first_name: "",
      contact_number: null,
      email: "",
    });

  const [fire_protection_officer, setFire_protection_officer] = useState({
    name: "",
    first_name: "",
    contact_number: null,
    email: "",
  });

  const [helpers, setHelpers] = useState({
    number_target: null,
    actual_target: null,
  });

  var [officer, setOfficer] = useState({
    managing_director: managing_director,
    location: selectedLocationId,
    deputy_managing_director: deputy_managing_director,
    object_director: object_director,
    responsible_fire_protection: responsible_fire_protection,
    fire_protection_officer: fire_protection_officer,
    helpers: helpers,
  });

  // Use Effect
  useEffect(() => {
    console.log("selected location id is::", selectedLocationId);
    if (selectedLocationId) {
      //get data from officer collection
      getOfficerApi();
    }
  }, [selectedLocationId, displayTick]);

  function Open_Modal() {
    setOpenModal(true);
    setOfficer({ ...officer, location: selectedLocationId });
    return fetch(`${API}/get-officer`, {
      method: "POST",
      headers: {
        "x-access-token": JSON.parse(localStorage.getItem("user-info")).token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ location: selectedLocationId }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("response from get officer api::", json);
        return fetch(`${API}/get-location/${selectedLocationId}`, {
          method: "GET",
          headers: {
            "x-access-token": JSON.parse(localStorage.getItem("user-info"))
              .token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((resp) => {
            console.log("response from get location api::", resp);
            console.log((resp.no_of_members * resp.percentage) / 100);
            if (json.length > 0) {
              document.getElementById("director_name").value =
                json[0].managing_director.name;
              document.getElementById("director_first_name").value =
                json[0].managing_director.first_name;
              document.getElementById("director_email").value =
                json[0].managing_director.email;
              document.getElementById("director_number").value =
                json[0].managing_director.contact_number;
              document.getElementById("objectManager_name").value =
                json[0].object_director.name;
              document.getElementById("objectManager_first_name").value =
                json[0].object_director.first_name;
              document.getElementById("objectManager_email").value =
                json[0].responsible_fire_protection.email;
              document.getElementById("objectManager_number").value =
                json[0].responsible_fire_protection.contact_number;
              document.getElementById("fireProtector_officer_name").value =
                json[0].fire_protection_officer.name;
              document.getElementById(
                "fireProtector_officer_first_name"
              ).value = json[0].fire_protection_officer.first_name;
              document.getElementById("fireProtector_officer_email").value =
                json[0].fire_protection_officer.email;
              document.getElementById("fireProtector_officer_number").value =
                json[0].fire_protection_officer.contact_number;
              document.getElementById("DeputyManager_name").value =
                json[0].deputy_managing_director.name;
              document.getElementById("DeputyManager_first_name").value =
                json[0].deputy_managing_director.first_name;
              document.getElementById("DeputyManager_email").value =
                json[0].deputy_managing_director.email;
              document.getElementById("DeputyManager_number").value =
                json[0].deputy_managing_director.contact_number;
              document.getElementById("responsibleOfficer_name").value =
                json[0].responsible_fire_protection.name;
              document.getElementById("responsibleOfficer_first_name").value =
                json[0].responsible_fire_protection.first_name;
              document.getElementById("responsibleOfficer_email").value =
                json[0].responsible_fire_protection.email;
              document.getElementById("responsibleOfficer_number").value =
                json[0].responsible_fire_protection.contact_number;
              document.getElementById("evacuationHelper_name").value =
                (resp.no_of_members * resp.percentage) / 100;
              document.getElementById("evacuationHelper_first_name").value =
                json[0].helpers.actual_target;
              setPercentage(resp.percentage);
              setOfficer({
                ...officer,
                location: selectedLocationId,
                managing_director: {
                  name: json[0].managing_director.name,
                  first_name: json[0].managing_director.first_name,
                  contact_number: json[0].managing_director.contact_number,
                  email: json[0].managing_director.email,
                },
                object_director: {
                  name: json[0].object_director.name,
                  first_name: json[0].object_director.first_name,
                  contact_number: json[0].object_director.contact_number,
                  email: json[0].object_director.email,
                },
                deputy_managing_director: {
                  name: json[0].deputy_managing_director.name,
                  first_name: json[0].deputy_managing_director.first_name,
                  contact_number:
                    json[0].deputy_managing_director.contact_number,
                  email: json[0].deputy_managing_director.email,
                },
                responsible_fire_protection: {
                  name: json[0].responsible_fire_protection.name,
                  first_name: json[0].responsible_fire_protection.first_name,
                  contact_number:
                    json[0].responsible_fire_protection.contact_number,
                  email: json[0].responsible_fire_protection.email,
                },
                fire_protection_officer: {
                  name: json[0].fire_protection_officer.name,
                  first_name: json[0].fire_protection_officer.first_name,
                  contact_number:
                    json[0].fire_protection_officer.contact_number,
                  email: json[0].fire_protection_officer.email,
                },
                helpers: {
                  number_target: (resp.no_of_members * resp.percentage) / 100,
                  actual_target: json[0].helpers.actual_target,
                },
              });
            } else {
              document.getElementById("evacuationHelper_name").value =
                (resp.no_of_members * resp.percentage) / 100;
              setOfficer((previousState) => {
                return {
                  ...previousState,
                  helpers: {
                    number_target: (resp.no_of_members * resp.percentage) / 100,
                    actual_target: null,
                  },
                };
              });
            }
          })
          .catch((err) => {
            console.log("getLocationAPI error::", err);
            toast.error(err);
          });
      })
      .catch((err) => {
        console.log("getOfficerAPI error::", err);
        toast.error(err);
      });
  }

  const soc = () => {
    // console.log((officer.helpers.actual_target >= (officer.helpers.number_target*percentage)/100));
    // return
    if (officer.helpers.actual_target >= officer.helpers.number_target) {
      //alert("working");
      //console.log("target:: ",json[0].helpers.number_target," percentage:: ",percentage);
      setdisplayTick(true);
    } else {
      //alert("not working");
      setdisplayTick(false);
    }

    console.log("officer form::", officer);
    if (!officer.fire_protection_officer.first_name)
      toast.error("Please fill all the mandatory fields.");
    else if (!officer.fire_protection_officer.name)
      toast.error("Please fill all the mandatory fields.");
    else if (!officer.fire_protection_officer.email)
      toast.error("Please fill all the mandatory fields.");
    else if (!officer.fire_protection_officer.contact_number)
      toast.error("Please fill all the mandatory fields.");
    else if (!officer.managing_director.first_name)
      toast.error("Please fill all the mandatory fields.");
    else if (!officer.managing_director.name)
      toast.error("Please fill all the mandatory fields.");
    else if (!officer.managing_director.email)
      toast.error("Please fill all the mandatory fields.");
    else if (!officer.managing_director.contact_number)
      toast.error("Please fill all the mandatory fields.");
    else {
      const c_user = JSON.parse(localStorage.getItem("user-info"));
      const c_token = c_user?.token;
      return fetch(`${API}/create-officer`, {
        method: "POST",
        headers: {
          "x-access-token": c_token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(officer),
      })
        .then((res) => res.json())
        .then((json) => {
          console.log("response from create officer api::", json);
          if (
            json.message === "Updated Successfully." ||
            json.message === "Saved Successfully."
          ) {
            toast.success(json.message);
            getOfficerApi();
            setOfficer({
              ...officer,
              location: selectedLocationId,
              managing_director: {
                name: "",
                first_name: "",
                contact_number: null,
                email: "",
              },
              object_director: {
                name: "",
                first_name: "",
                contact_number: null,
                email: "",
              },
              deputy_managing_director: {
                name: "",
                first_name: "",
                contact_number: null,
                email: "",
              },
              responsible_fire_protection: {
                name: "",
                first_name: "",
                contact_number: null,
                email: "",
              },
              fire_protection_officer: {
                name: "",
                first_name: "",
                contact_number: null,
                email: "",
              },
              helpers: {
                number_target: null,
                actual_target: null,
              },
            });
            setOpenModal(false);
          }
        })
        .catch((err) => {
          console.log("createOfficerAPI error::", err);
          toast.error(err);
        });
    }
  };

  // Input Fields
  const handleInput_managing_director = (e) => {
    //let handleInput_managing_director_err="";
    const name = e.target.name;
    const value = e.target.value;
    if (!value) {
      if (name === "name") {
        setOfficer({
          ...officer,
          managing_director: {
            name: "",
            first_name: officer.managing_director.first_name,
            email: officer.managing_director.email,
            contact_number: officer.managing_director.contact_number,
          },
        });
        document.getElementById("director_name_error").innerHTML =
          "* Director name cannot be left empty";
      }
      if (name === "first_name") {
        setOfficer({
          ...officer,
          managing_director: {
            name: officer.managing_director.name,
            first_name: "",
            email: officer.managing_director.email,
            contact_number: officer.managing_director.contact_number,
          },
        });
        document.getElementById("director_first_name_error").innerHTML =
          "* Director first name be left empty";
      }
      if (name === "contact_number") {
        setOfficer({
          ...officer,
          managing_director: {
            name: officer.managing_director.name,
            first_name: officer.managing_director.first_name,
            email: officer.managing_director.email,
            contact_number: null,
          },
        });
        document.getElementById("director_number_error").innerHTML =
          "* Director number cannot be left empty";
      }
      if (name === "email") {
        setOfficer({
          ...officer,
          managing_director: {
            name: officer.managing_director.name,
            first_name: officer.managing_director.first_name,
            email: "",
            contact_number: officer.managing_director.contact_number,
          },
        });
        document.getElementById("director_email_error").innerHTML =
          "* Director email cannot be left empty";
      }
    } else {
      if (name === "name") {
        //setManaging_director({ ...managing_director, [name]: value });
        setOfficer({
          ...officer,
          managing_director: {
            name: value,
            first_name: officer.managing_director.first_name,
            email: officer.managing_director.email,
            contact_number: officer.managing_director.contact_number,
          },
        });
        document.getElementById("director_name_error").innerHTML = "";
      }
      if (name === "first_name") {
        setOfficer({
          ...officer,
          managing_director: {
            name: officer.managing_director.name,
            first_name: value,
            email: officer.managing_director.email,
            contact_number: officer.managing_director.contact_number,
          },
        });
        document.getElementById("director_first_name_error").innerHTML = "";
      }
      if (name === "contact_number") {
        setOfficer({
          ...officer,
          managing_director: {
            name: officer.managing_director.name,
            first_name: officer.managing_director.first_name,
            email: officer.managing_director.email,
            contact_number: value,
          },
        });
        document.getElementById("director_number_error").innerHTML = "";
      }
      if (name === "email") {
        setOfficer({
          ...officer,
          managing_director: {
            name: officer.managing_director.name,
            first_name: officer.managing_director.first_name,
            email: value,
            contact_number: officer.managing_director.contact_number,
          },
        });
        document.getElementById("director_email_error").innerHTML = "";
      }
    }
    console.log("officer::", officer);
  };

  const handleInput_deputy_managing_director = (e) => {
    //let handleInput_deputy_managing_director_err="";
    const name = e.target.name;
    const value = e.target.value;
    if (!value) {
      if (name === "name") {
        setOfficer({
          ...officer,
          deputy_managing_director: {
            name: "",
            first_name: officer.deputy_managing_director.first_name,
            email: officer.deputy_managing_director.email,
            contact_number: officer.deputy_managing_director.contact_number,
          },
        });
      }
      if (name === "first_name") {
        setOfficer({
          ...officer,
          deputy_managing_director: {
            name: officer.deputy_managing_director.name,
            first_name: "",
            email: officer.deputy_managing_director.email,
            contact_number: officer.deputy_managing_director.contact_number,
          },
        });
      }
      if (name === "email") {
        setOfficer({
          ...officer,
          deputy_managing_director: {
            name: officer.deputy_managing_director.name,
            first_name: officer.deputy_managing_director.first_name,
            email: "",
            contact_number: officer.deputy_managing_director.contact_number,
          },
        });
      }
      if (name === "contact_number") {
        setOfficer({
          ...officer,
          deputy_managing_director: {
            name: officer.deputy_managing_director.name,
            first_name: officer.deputy_managing_director.first_name,
            email: officer.deputy_managing_director.email,
            contact_number: null,
          },
        });
      }
    } else {
      if (name === "name") {
        setOfficer({
          ...officer,
          deputy_managing_director: {
            name: value,
            first_name: officer.deputy_managing_director.first_name,
            email: officer.deputy_managing_director.email,
            contact_number: officer.deputy_managing_director.contact_number,
          },
        });
      }
      if (name === "first_name") {
        setOfficer({
          ...officer,
          deputy_managing_director: {
            name: officer.deputy_managing_director.name,
            first_name: value,
            email: officer.deputy_managing_director.email,
            contact_number: officer.deputy_managing_director.contact_number,
          },
        });
      }
      if (name === "contact_number") {
        setOfficer({
          ...officer,
          deputy_managing_director: {
            name: officer.deputy_managing_director.name,
            first_name: officer.deputy_managing_director.first_name,
            email: officer.deputy_managing_director.email,
            contact_number: value,
          },
        });
      }
      if (name === "email") {
        setOfficer({
          ...officer,
          deputy_managing_director: {
            name: officer.deputy_managing_director.name,
            first_name: officer.deputy_managing_director.first_name,
            email: value,
            contact_number: officer.deputy_managing_director.contact_number,
          },
        });
      }
    }
  };
  const handleInput_fire_protection_officer = (e) => {
    //let handleInput_fire_protection_officer_err="";
    const name = e.target.name;
    const value = e.target.value;
    if (!value) {
      if (name === "name") {
        setOfficer({
          ...officer,
          fire_protection_officer: {
            name: "",
            first_name: officer.fire_protection_officer.first_name,
            email: officer.fire_protection_officer.email,
            contact_number: officer.fire_protection_officer.contact_number,
          },
        });
        document.getElementById("fireProtector_officer_name_error").innerHTML =
          "* fire Protector officer name cannot be left empty";
      }
      if (name === "first_name") {
        setOfficer({
          ...officer,
          fire_protection_officer: {
            name: officer.fire_protection_officer.name,
            first_name: "",
            email: officer.fire_protection_officer.email,
            contact_number: officer.fire_protection_officer.contact_number,
          },
        });
        document.getElementById(
          "fireProtector_officer_first_name_error"
        ).innerHTML =
          "* fire Protector officer first name cannot be left empty";
      }
      if (name === "email") {
        setOfficer({
          ...officer,
          fire_protection_officer: {
            name: officer.fire_protection_officer.name,
            first_name: officer.fire_protection_officer.first_name,
            email: "",
            contact_number: officer.fire_protection_officer.contact_number,
          },
        });
        document.getElementById("fireProtector_officer_email_error").innerHTML =
          "* fire Protector officer email cannot be left empty";
      }
      if (name === "contact_number") {
        setOfficer({
          ...officer,
          fire_protection_officer: {
            name: officer.fire_protection_officer.name,
            first_name: officer.fire_protection_officer.first_name,
            email: officer.fire_protection_officer.email,
            contact_number: null,
          },
        });
        document.getElementById(
          "fireProtector_officer_number_error"
        ).innerHTML = "* fire Protector officer number cannot be left empty";
      }
    } else {
      if (name === "name") {
        setOfficer({
          ...officer,
          fire_protection_officer: {
            name: value,
            first_name: officer.fire_protection_officer.first_name,
            email: officer.fire_protection_officer.email,
            contact_number: officer.fire_protection_officer.contact_number,
          },
        });
        document.getElementById("fireProtector_officer_name_error").innerHTML =
          "";
      }
      if (name === "first_name") {
        setOfficer({
          ...officer,
          fire_protection_officer: {
            name: officer.fire_protection_officer.name,
            first_name: value,
            email: officer.fire_protection_officer.email,
            contact_number: officer.fire_protection_officer.contact_number,
          },
        });
        document.getElementById(
          "fireProtector_officer_first_name_error"
        ).innerHTML = "";
      }
      if (name === "contact_number") {
        setOfficer({
          ...officer,
          fire_protection_officer: {
            name: officer.fire_protection_officer.name,
            first_name: officer.fire_protection_officer.first_name,
            email: officer.fire_protection_officer.email,
            contact_number: value,
          },
        });
        document.getElementById(
          "fireProtector_officer_number_error"
        ).innerHTML = "";
      }
      if (name === "email") {
        setOfficer({
          ...officer,
          fire_protection_officer: {
            name: officer.fire_protection_officer.name,
            first_name: officer.fire_protection_officer.first_name,
            email: value,
            contact_number: officer.fire_protection_officer.contact_number,
          },
        });
        document.getElementById("fireProtector_officer_email_error").innerHTML =
          "";
      }
    }
  };

  const handleInput_object_director = (e) => {
    //let handleInput_object_director_err="";
    const name = e.target.name;
    const value = e.target.value;
    if (!value) {
      if (name === "name") {
        setOfficer({
          ...officer,
          object_director: {
            name: "",
            first_name: officer.object_director.first_name,
            email: officer.object_director.email,
            contact_number: officer.object_director.contact_number,
          },
        });
      }
      if (name === "first_name") {
        setOfficer({
          ...officer,
          object_director: {
            name: officer.object_director.name,
            first_name: "",
            email: officer.object_director.email,
            contact_number: officer.object_director.contact_number,
          },
        });
      }
      if (name === "contact_number") {
        setOfficer({
          ...officer,
          object_director: {
            name: officer.object_director.name,
            first_name: officer.object_director.first_name,
            email: officer.object_director.email,
            contact_number: null,
          },
        });
      }
      if (name === "email") {
        setOfficer({
          ...officer,
          object_director: {
            name: officer.object_director.name,
            first_name: officer.object_director.first_name,
            email: "",
            contact_number: officer.object_director.contact_number,
          },
        });
      }
    } else {
      if (name === "name") {
        setOfficer({
          ...officer,
          object_director: {
            name: value,
            first_name: officer.object_director.first_name,
            email: officer.object_director.email,
            contact_number: officer.object_director.contact_number,
          },
        });
      }
      if (name === "first_name") {
        setOfficer({
          ...officer,
          object_director: {
            name: officer.object_director.name,
            first_name: value,
            email: officer.object_director.email,
            contact_number: officer.object_director.contact_number,
          },
        });
      }
      if (name === "contact_number") {
        setOfficer({
          ...officer,
          object_director: {
            name: officer.object_director.name,
            first_name: officer.object_director.first_name,
            email: officer.object_director.email,
            contact_number: value,
          },
        });
      }
      if (name === "email") {
        setOfficer({
          ...officer,
          object_director: {
            name: officer.object_director.name,
            first_name: officer.object_director.first_name,
            email: value,
            contact_number: officer.object_director.contact_number,
          },
        });
      }
    }
  };

  const handleInput_responsible_fire_protection = (e) => {
    //let handleInput_responsible_fire_protection_err="";
    const name = e.target.name;
    const value = e.target.value;
    if (!value) {
      if (name === "name") {
        setOfficer({
          ...officer,
          responsible_fire_protection: {
            name: "",
            first_name: officer.responsible_fire_protection.first_name,
            email: officer.responsible_fire_protection.email,
            contact_number: officer.responsible_fire_protection.contact_number,
          },
        });
      }
      if (name === "contact_number") {
        setOfficer({
          ...officer,
          responsible_fire_protection: {
            name: officer.responsible_fire_protection.name,
            first_name: officer.responsible_fire_protection.first_name,
            email: officer.responsible_fire_protection.email,
            contact_number: null,
          },
        });
      }
      if (name === "first_name") {
        setOfficer({
          ...officer,
          responsible_fire_protection: {
            name: officer.responsible_fire_protection.name,
            first_name: "",
            email: officer.responsible_fire_protection.email,
            contact_number: officer.responsible_fire_protection.contact_number,
          },
        });
      }
      if (name === "email") {
        setOfficer({
          ...officer,
          responsible_fire_protection: {
            name: officer.responsible_fire_protection.name,
            first_name: officer.responsible_fire_protection.first_name,
            email: "",
            contact_number: officer.responsible_fire_protection.contact_number,
          },
        });
      }
    } else {
      if (name === "name") {
        setOfficer({
          ...officer,
          responsible_fire_protection: {
            name: value,
            first_name: officer.responsible_fire_protection.first_name,
            email: officer.responsible_fire_protection.email,
            contact_number: officer.responsible_fire_protection.contact_number,
          },
        });
      }
      if (name === "first_name") {
        setOfficer({
          ...officer,
          responsible_fire_protection: {
            name: officer.responsible_fire_protection.name,
            first_name: value,
            email: officer.responsible_fire_protection.email,
            contact_number: officer.responsible_fire_protection.contact_number,
          },
        });
      }
      if (name === "contact_number") {
        setOfficer({
          ...officer,
          responsible_fire_protection: {
            name: officer.responsible_fire_protection.name,
            first_name: officer.responsible_fire_protection.first_name,
            email: officer.responsible_fire_protection.email,
            contact_number: value,
          },
        });
      }
      if (name === "email") {
        setOfficer({
          ...officer,
          responsible_fire_protection: {
            name: officer.responsible_fire_protection.name,
            first_name: officer.responsible_fire_protection.first_name,
            email: value,
            contact_number: officer.fire_protection_officer.contact_number,
          },
        });
      }
    }
  };

  const handleInput_helpers = (e) => {
    //let handleInput_helpers_err="";
    const name = e.target.name;
    const value = e.target.value;
    if (!value) {
      if (name === "number_target") {
        setOfficer({
          ...officer,
          helpers: {
            number_target: null,
            actual_target: officer.helpers.actual_target,
          },
        });
      }
      if (name === "actual_target") {
        setOfficer({
          ...officer,
          helpers: {
            number_target: officer.helpers.number_target,
            actual_target: null,
          },
        });
      }
    } else {
      if (name === "number_target") {
        setOfficer({
          ...officer,
          helpers: {
            number_target: value,
            actual_target: officer.helpers.actual_target,
          },
        });
      }
      if (name === "actual_target") {
        setOfficer({
          ...officer,
          helpers: {
            number_target: officer.helpers.number_target,
            actual_target: value,
          },
        });
      }
    }
  };

  const getOfficerApi = (data) => {
    //alert("checking");
    const user = JSON.parse(localStorage.getItem("user-info"));
    const token = user?.token;
    return fetch(`${API}/get-officer`, {
      method: "POST",
      headers: {
        "x-access-token": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ location: selectedLocationId }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("response from get officer api::", json);
        if (json.length > 0) {
          document.getElementById("md-n").innerHTML =
            json[0].managing_director.name;
          document.getElementById("md-fn").innerHTML =
            json[0].managing_director.first_name;
          document.getElementById("dmd-n").innerHTML =
            json[0].deputy_managing_director.name;
          document.getElementById("dmd-fn").innerHTML =
            json[0].deputy_managing_director.first_name;
          document.getElementById("om-n").innerHTML =
            json[0].object_director.name;
          document.getElementById("om-fn").innerHTML =
            json[0].object_director.first_name;
          document.getElementById("rfp-n").innerHTML =
            json[0].responsible_fire_protection.name;
          document.getElementById("rfp-fn").innerHTML =
            json[0].responsible_fire_protection.first_name;
          document.getElementById("fpo-n").innerHTML =
            json[0].fire_protection_officer.name;
          document.getElementById("fpo-fn").innerHTML =
            json[0].fire_protection_officer.first_name;
          if (json[0].helpers.actual_target >= json[0].helpers.number_target) {
            console.log(
              "actual::",
              json[0].helpers.actual_target,
              "target:: ",
              json[0].helpers.number_target,
              " percentage:: ",
              percentage
            );
            setdisplayTick(true);
          } else {
            //alert("not working2");
            console.log(
              "target:: ",
              json[0].helpers.number_target,
              " actual:: ",
              json[0].helpers.actual_target
            );
            setdisplayTick(false);
          }
        } else {
          document.getElementById("md-n").innerHTML = "Name";
          document.getElementById("md-fn").innerHTML = "First Name";
          document.getElementById("dmd-n").innerHTML = "Name";
          document.getElementById("dmd-fn").innerHTML = "First Name";
          document.getElementById("om-n").innerHTML = "Name";
          document.getElementById("om-fn").innerHTML = "First Name";
          document.getElementById("rfp-n").innerHTML = "Name";
          document.getElementById("rfp-fn").innerHTML = "First Name";
          document.getElementById("fpo-n").innerHTML = "Name";
          document.getElementById("fpo-fn").innerHTML = "First Name";
          setdisplayTick(false);
        }
      })
      .catch((err) => {
        console.log("getOfficerAPI error::", err);
        toast.error(err);
      });
  };

  return (
    <>
      <div className="main-body">
        <div className="heading_box officerRegulation_head">
          {/* <h2 className="dasshboard_heading">Ticketing System</h2> */}
          <ul className="breadcrumb">
            <li>Dashboard</li>
            <li className="active">Document Management</li>
          </ul>
        </div>
        <div className="officerRegulation_body ">
          <div className="row">
            <div className="col-lg-6">
              <div className="officerRegulation_box">
                <div className="officerRegulation_cmn-box">
                  <div className="officerRegulation_innerbox">
                    <div
                      className={`officerRegulation_headingBox ${colorFunctionName}`}
                    >
                      <h5 className="officerRegulation_heading">
                        Funktionsträger
                      </h5>
                      <div className="moduleHeaderOption">
                        <div className="moduleDropown" ref={dropDownCont}>
                          {/* <button
                            className={`btn dropdown-toggle`}
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                          > */}
                          <ListIcon
                            className="dropIcon"
                            color="action"
                            onClick={() =>
                              setFunctionModelBox(!functionModelBox)
                            }
                          />

                          <div
                            className={`openDrop ${
                              functionModelBox ? "show" : ""
                            }`}
                          >
                            <ul className="openDropList">
                              <li
                                onClick={(e) => {
                                  setFunctionModelColor(!functionModelColor);
                                }}
                                ref={dropDownCont}
                              >
                                <ColorLensIcon
                                  className="color-lens"
                                  color="action"
                                />
                                <span className="drop-text">Farbe andern</span>
                                <ChevronRightIcon
                                  className="angle-right"
                                  color="action"
                                />

                                <div
                                  className={`colorList ${
                                    functionModelColor ? "show" : ""
                                  }`}
                                >
                                  {listFunctionUploadTitles}
                                </div>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item"
                                  onClick={(e) => {
                                    Open_Modal();
                                  }}
                                >
                                  <ListIcon
                                    className="dropIcon"
                                    color="action"
                                  />
                                  Change Data
                                </button>
                              </li>
                              <li>
                                <button className="dropdown-item">
                                  <CancelPresentationIcon
                                    className="cancel-board"
                                    color="action"
                                  />
                                  Auf Bord schließen
                                </button>
                              </li>
                            </ul>
                          </div>
                          {/* </button> */}
                          {/* <ul
                            className={`dropdown-menu`}
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <li>
                              <button className="dropdown-item">
                                <ColorLensIcon
                                  className="color-lens"
                                  color="action"
                                />
                                Farbe andern
                                <ChevronRightIcon
                                  className="angle-right"
                                  color="action"
                                />
                              </button>
                            </li> */}
                        </div>
                      </div>
                    </div>
                    {selectedLocationId !== "" ? (
                      <div class="doc-management-wrap">
                        <ul className="officer-list">
                          <li className="officer-item">
                            <div className="officer-box">
                              <h6 className="officer-heading">
                                Geschäftsführer<span>*</span>
                              </h6>
                              <p id="md-n">Name</p>
                              <p id="md-fn">first name</p>
                            </div>
                          </li>
                          <li className="officer-item">
                            <div className="officer-box">
                              <h6 className="officer-heading">
                                Stellv. Geschäftsführer
                              </h6>
                              <p id="dmd-n">Name</p>
                              <p id="dmd-fn">first name</p>
                            </div>
                          </li>
                          <li className="officer-item">
                            <div className="officer-box">
                              <h6 className="officer-heading">Objektmanager</h6>
                              <p id="om-n">Name</p>
                              <p id="om-fn">first name</p>
                            </div>
                          </li>
                          <li className="officer-item">
                            <div className="officer-box">
                              <h6 className="officer-heading">
                                Verantwortlicher Brandschutz
                              </h6>
                              <p id="rfp-n">Name</p>
                              <p id="rfp-fn">first name</p>
                            </div>
                          </li>
                          <li className="officer-item">
                            <div className="officer-box">
                              <h6 className="officer-heading">
                                Brandschutzbeauftragter<span>*</span>
                              </h6>
                              <p id="fpo-n">Name</p>
                              <p id="fpo-fn">first name</p>
                            </div>
                          </li>
                        </ul>
                        <div className="protector-officer">
                          <h6>Brandschutz & Evakuierungshelfer</h6>
                          {displayTick ? (
                            <svg
                              className="icon"
                              aria-labelledby="Check Circle Icon"
                            >
                              <title id="checkCircle">Check Circle Icon</title>
                              <use
                                xlinkHref="/assets/svg-icons/icons.svg#checkCircle"
                                xlinkTitle="Check Circle Icon"
                              ></use>
                            </svg>
                          ) : (
                            <span class="red-cross">X</span>
                          )}
                        </div>
                        {openModal && (
                          <OfficerModal
                            content={
                              <>
                                <div className="cmn_modal officerModal-Wrap">
                                  <CloseIcon
                                    className="closeModal"
                                    color="action"
                                    onClick={(e) => {
                                      setOpenModal(false);
                                    }}
                                  />
                                  <div className="officerModal">
                                    <div className="row">
                                      <div className="col-lg-6">
                                        <div className="officerBlock">
                                          <h5 className="officer-name">
                                            Geschäftsführer<span>*</span>
                                          </h5>
                                          <div className="officer-form">
                                            <div className="form-group">
                                              <label htmlFor="name">Name</label>
                                              <input
                                                type="text"
                                                name="name"
                                                id="director_name"
                                                className="form-control"
                                                onChange={(e) =>
                                                  handleInput_managing_director(
                                                    e
                                                  )
                                                }
                                              />
                                            </div>
                                            <div
                                              className="errors"
                                              id="director_name_error"
                                            ></div>
                                            <div className="form-group">
                                              <label htmlFor="first_name">
                                                Vorname:
                                              </label>
                                              <input
                                                type="text"
                                                name="first_name"
                                                id="director_first_name"
                                                className="form-control"
                                                onChange={(e) =>
                                                  handleInput_managing_director(
                                                    e
                                                  )
                                                }
                                              />
                                            </div>
                                            <div
                                              className="errors"
                                              id="director_first_name_error"
                                            ></div>
                                            <div className="form-group">
                                              <label htmlFor="contact_number">
                                                Telefonnummer:
                                              </label>
                                              <input
                                                type="text"
                                                name="contact_number"
                                                id="director_number"
                                                className="form-control"
                                                onChange={(e) =>
                                                  handleInput_managing_director(
                                                    e
                                                  )
                                                }
                                              />
                                            </div>
                                            <div
                                              className="errors"
                                              id="director_number_error"
                                            ></div>
                                            <div className="form-group">
                                              <label htmlFor="email">
                                                E-Mail:
                                              </label>
                                              <input
                                                type="text"
                                                name="email"
                                                id="director_email"
                                                className="form-control"
                                                onChange={(e) =>
                                                  handleInput_managing_director(
                                                    e
                                                  )
                                                }
                                              />
                                            </div>
                                            <div
                                              className="errors"
                                              id="director_email_error"
                                            ></div>
                                          </div>
                                        </div>
                                        <div className="officerBlock">
                                          <h5 className="officer-name">
                                            Objektmanager
                                          </h5>
                                          <div className="officer-form">
                                            <div className="form-group">
                                              <label htmlFor="name">Name</label>
                                              <input
                                                type="text"
                                                name="name"
                                                id="objectManager_name"
                                                className="form-control"
                                                onChange={(e) =>
                                                  handleInput_object_director(e)
                                                }
                                              />
                                            </div>
                                            <div
                                              className="errors"
                                              id="objectManager_name_error"
                                            ></div>
                                            <div className="form-group">
                                              <label htmlFor="first_name">
                                                Vorname:
                                              </label>
                                              <input
                                                type="text"
                                                name="first_name"
                                                id="objectManager_first_name"
                                                className="form-control"
                                                onChange={(e) =>
                                                  handleInput_object_director(e)
                                                }
                                              />
                                            </div>
                                            <div
                                              className="errors"
                                              id="objectManager_first_name_error"
                                            ></div>
                                            <div className="form-group">
                                              <label htmlFor="contact_number">
                                                Telefonnummer:
                                              </label>
                                              <input
                                                type="text"
                                                name="contact_number"
                                                id="objectManager_number"
                                                className="form-control"
                                                onChange={(e) =>
                                                  handleInput_object_director(e)
                                                }
                                              />
                                            </div>
                                            <div
                                              className="errors"
                                              id="objectManager_number_error"
                                            ></div>
                                            <div className="form-group">
                                              <label htmlFor="email">
                                                E-Mail:
                                              </label>
                                              <input
                                                type="text"
                                                name="email"
                                                id="objectManager_email"
                                                className="form-control"
                                                onChange={(e) =>
                                                  handleInput_object_director(e)
                                                }
                                              />
                                            </div>
                                            <div
                                              className="errors"
                                              id="objectManager_email_error"
                                            ></div>
                                          </div>
                                        </div>
                                        <div className="officerBlock">
                                          <h5 className="officer-name">
                                            Brandschutzbeauftragter*
                                          </h5>
                                          <div className="officer-form">
                                            <div className="form-group">
                                              <label htmlFor="name">Name</label>
                                              <input
                                                type="text"
                                                name="name"
                                                id="fireProtector_officer_name"
                                                className="form-control"
                                                onChange={(e) =>
                                                  handleInput_fire_protection_officer(
                                                    e
                                                  )
                                                }
                                              />
                                            </div>
                                            <div
                                              className="errors"
                                              id="fireProtector_officer_name_error"
                                            ></div>
                                            <div className="form-group">
                                              <label htmlFor="first_name">
                                                Vorname:
                                              </label>
                                              <input
                                                type="text"
                                                name="first_name"
                                                id="fireProtector_officer_first_name"
                                                className="form-control"
                                                onChange={(e) =>
                                                  handleInput_fire_protection_officer(
                                                    e
                                                  )
                                                }
                                              />
                                            </div>
                                            <div
                                              className="errors"
                                              id="fireProtector_officer_first_name_error"
                                            ></div>
                                            <div className="form-group">
                                              <label htmlFor="contact_number">
                                                Telefonnummer:
                                              </label>
                                              <input
                                                type="text"
                                                name="contact_number"
                                                id="fireProtector_officer_number"
                                                className="form-control"
                                                onChange={(e) =>
                                                  handleInput_fire_protection_officer(
                                                    e
                                                  )
                                                }
                                              />
                                            </div>
                                            <div
                                              className="errors"
                                              id="fireProtector_officer_number_error"
                                            ></div>
                                            <div className="form-group">
                                              <label htmlFor="email">
                                                E-Mail:
                                              </label>
                                              <input
                                                type="text"
                                                name="email"
                                                id="fireProtector_officer_email"
                                                className="form-control"
                                                onChange={(e) =>
                                                  handleInput_fire_protection_officer(
                                                    e
                                                  )
                                                }
                                              />
                                            </div>
                                            <div
                                              className="errors"
                                              id="fireProtector_officer_email_error"
                                            ></div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="col-lg-6">
                                        <div className="officerBlock">
                                          <h5 className="officer-name">
                                            Stellv. Geschäftsführer
                                          </h5>
                                          <div className="officer-form">
                                            <div className="form-group">
                                              <label htmlFor="name">Name</label>
                                              <input
                                                type="text"
                                                name="name"
                                                id="DeputyManager_name"
                                                className="form-control"
                                                onChange={(e) =>
                                                  handleInput_deputy_managing_director(
                                                    e
                                                  )
                                                }
                                              />
                                            </div>
                                            <div
                                              className="errors"
                                              id="DeputyManager_name_error"
                                            ></div>
                                            <div className="form-group">
                                              <label htmlFor="first_name">
                                                Vorname:
                                              </label>
                                              <input
                                                type="text"
                                                name="first_name"
                                                id="DeputyManager_first_name"
                                                className="form-control"
                                                onChange={(e) =>
                                                  handleInput_deputy_managing_director(
                                                    e
                                                  )
                                                }
                                              />
                                            </div>
                                            <div
                                              className="errors"
                                              id="DeputyManager_first_name_error"
                                            ></div>
                                            <div className="form-group">
                                              <label htmlFor="contact_number">
                                                Telefonnummer:
                                              </label>
                                              <input
                                                type="text"
                                                name="contact_number"
                                                id="DeputyManager_number"
                                                className="form-control"
                                                onChange={(e) =>
                                                  handleInput_deputy_managing_director(
                                                    e
                                                  )
                                                }
                                              />
                                            </div>
                                            <div
                                              className="errors"
                                              id="DeputyManager_number_error"
                                            ></div>
                                            <div className="form-group">
                                              <label htmlFor="email">
                                                E-Mail:
                                              </label>
                                              <input
                                                type="text"
                                                name="email"
                                                id="DeputyManager_email"
                                                className="form-control"
                                                onChange={(e) =>
                                                  handleInput_deputy_managing_director(
                                                    e
                                                  )
                                                }
                                              />
                                            </div>
                                            <div
                                              className="errors"
                                              id="DeputyManager_email_error"
                                            ></div>
                                          </div>
                                        </div>
                                        <div className="officerBlock">
                                          <h5 className="officer-name">
                                            Verantwortlicher Brandschutz
                                          </h5>
                                          <div className="officer-form">
                                            <div className="form-group">
                                              <label htmlFor="name">Name</label>
                                              <input
                                                type="text"
                                                name="name"
                                                id="responsibleOfficer_name"
                                                className="form-control"
                                                onChange={(e) =>
                                                  handleInput_responsible_fire_protection(
                                                    e
                                                  )
                                                }
                                              />
                                            </div>
                                            <div
                                              className="errors"
                                              id="responsibleOfficer_name_error"
                                            ></div>
                                            <div className="form-group">
                                              <label htmlFor="first_name">
                                                Vorname:
                                              </label>
                                              <input
                                                type="text"
                                                name="first_name"
                                                id="responsibleOfficer_first_name"
                                                className="form-control"
                                                onChange={(e) =>
                                                  handleInput_responsible_fire_protection(
                                                    e
                                                  )
                                                }
                                              />
                                            </div>
                                            <div
                                              className="errors"
                                              id="responsibleOfficer_first_name_error"
                                            ></div>
                                            <div className="form-group">
                                              <label htmlFor="contact_number">
                                                Telefonnummer:
                                              </label>
                                              <input
                                                type="text"
                                                name="contact_number"
                                                id="responsibleOfficer_number"
                                                className="form-control"
                                                onChange={(e) =>
                                                  handleInput_responsible_fire_protection(
                                                    e
                                                  )
                                                }
                                              />
                                            </div>
                                            <div
                                              className="errors"
                                              id="responsibleOfficer_number_error"
                                            ></div>
                                            <div className="form-group">
                                              <label htmlFor="email">
                                                E-Mail:
                                              </label>
                                              <input
                                                type="text"
                                                name="email"
                                                id="responsibleOfficer_email"
                                                className="form-control"
                                                onChange={(e) =>
                                                  handleInput_responsible_fire_protection(
                                                    e
                                                  )
                                                }
                                              />
                                            </div>
                                            <div
                                              className="errors"
                                              id="responsibleOfficer_email_error"
                                            ></div>
                                          </div>
                                        </div>
                                        <div className="officerBlock">
                                          <h5 className="officer-name">
                                            Brandschutz & Evakuierungshelfer
                                          </h5>
                                          <div className="officer-form">
                                            <div className="form-group">
                                              <label htmlFor="number_target">
                                                Soll
                                              </label>
                                              <input
                                                type="text"
                                                name="number_target"
                                                id="evacuationHelper_name"
                                                className="form-control"
                                                readOnly
                                                onChange={(e) =>
                                                  handleInput_helpers(e)
                                                }
                                              />
                                            </div>
                                            <div
                                              className="errors"
                                              id="evacuationHelper_name_error"
                                            ></div>
                                            <div className="form-group">
                                              <label htmlFor="actual_target">
                                                Ist
                                              </label>
                                              <input
                                                type="text"
                                                name="actual_target"
                                                id="evacuationHelper_first_name"
                                                className="form-control"
                                                onChange={(e) =>
                                                  handleInput_helpers(e)
                                                }
                                              />
                                            </div>
                                            <div
                                              className="errors"
                                              id="evacuationHelper_first_name_error"
                                            ></div>
                                          </div>
                                        </div>
                                        <div className="submitButton btn-group">
                                          <button
                                            className="btn cmn_yellow_bg"
                                            onClick={(e) => {
                                              soc();
                                            }}
                                          >
                                            <svg
                                              className="icon"
                                              aria-labelledby="Add Item"
                                            >
                                              <title id="addItem">
                                                Add Item
                                              </title>
                                              <use
                                                xlinkHref="/assets/svg-icons/icons.svg#addItem"
                                                xlinkTitle="Add Item"
                                              ></use>
                                            </svg>
                                            Speichern
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            }
                          />
                        )}
                      </div>
                    ) : (
                      <div>Select a location first</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Officer;
