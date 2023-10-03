import React, { useState, useEffect, useRef } from "react";
import AddCategory from "../DocumentManagentment/AddCategory";
import DocumentManagentment from "../DocumentManagentment/DocumentManagentment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListIcon from "@mui/icons-material/List";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import OfficeModal from "../../modal/OfficerModal/OfficerModal";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import SignatureCanvas from "react-signature-canvas";
import { useSelector, useDispatch } from "react-redux";

import "./style.css";
import DocumentModal from "../../modal/DocumentModal/DocumentModal";
import Evacuation_template from "../../templates/Evacuation/Evacuation";
import Download from "@mui/icons-material/Download";
import jsPDF from "jspdf";

import { Document, Page, PDFViewer, Image } from "@react-pdf/renderer";
import html2canvas from "html2canvas";
import DocumentModalOnly from "../DocumentManagentment/DocumentModalOnly";
import JoditEditor from "jodit-react";

const API = process.env.REACT_APP_API_BASE_URL;

const pdfRef = React.createRef();

var displayToast = false;

var edit_id = 0;

var def,
  def2,
  def3 = {};

var prev_def = {};

function Evacuation() {
  const [addDocument, setAddDocument] = useState(false);
  var [pdfFile, setPdfFile] = useState(null);
  // Tooltip design
  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }));

  const [editDocumentBox, setEditDocumentBox] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [categoryList, setCategoryList] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");

  const [openTemplate, setOpenTemplate] = useState(false);
  const [page, setPage] = useState(0);
  const formTitles = [
    "Allgemein",
    "1. Ablauf",
    "2. Räumungszeiten",
    "3. Mängelpunkte",
    "Vorwort​",
  ];
  const [sequence, setSequence] = useState("");
  const [evacuationFormData, setEvacuationFormData] = useState("");
  const selectedLocationId = useSelector((state) => state.locationIdReducer);
  const [apiData, setApiData] = useState(null);

  console.log("Selected location id::", selectedLocationId);

  // Form Functionality
  // Job functions
  const [general, setGeneral] = useState({
    company_name: "",
    state: "",
    zip_code: "",
    city: "",
    employees: "",
    floors: "",
    fire_alarm_system: false,
    evacuation_helper: false,
    exercise_announced: false,
    exercise_with_frog: false,
  });

  const [procedure, setProcedure] = useState({
    police: false,
    fire_department: false,
    others: false,
    fire_alarm_system2: false,
    fire_department_key_depot: false,
    others2: false,
    others_information: "",
    others2_information: "",
    assumed_situation: "",
    no_of_excercise_observation: "",
  });

  const [evacuationTime, setEvacuationTime] = useState({
    start_evacuation_drill: "",
    detection_damage_event: "",
    iffpw: "",
    arival: "",
    end_evacuation: "",
    assembly_way: "",
    total_time: "",
    building_cleared: "",
  });

  const [indexes, setIndexes] = React.useState([0]);
  const [deficiency, setDeficiency] = React.useState([]);

  const editor = useRef(null);

  const [deficiencyTab, setDeficiencyTab] = React.useState({});
  console.log("done deficiency:: ", deficiencyTab);
  const [counter, setCounter] = React.useState(1);
  const removeDeficiency = (e) => {
    console.log(e.split(".")[0] + "_des", " , ", e.split(".")[0] + "_title");
    var des = e.split(".")[0] + "_des";
    var title = e.split(".")[0] + "_title";
    document.getElementById(e).remove();
    document.getElementById(e + "tab").remove();
    delete deficiencyTab[des];
    delete deficiencyTab[title];
    setDeficiencyTab(deficiencyTab);
    console.log(deficiencyTab);
  };
  const addDeficiency = () => {
    prev_def = def3;
    setIndexes((prevIndexes) => [...prevIndexes, counter]);
    setCounter((prevCounter) => prevCounter + 1);
    let { title, description } = deficiencyTab;
    setDeficiency((prevDeficiency) => [
      ...prevDeficiency,
      { title, description },
    ]);
    setEvacuation({ ...evacuation, deficiency: deficiency });
  };
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  console.log("date", date);
  // certificateForm functions
  const [evacuation, setEvacuation] = useState({
    location: "",
    evacuation_nr: "",
    date: `${year}-${month}-${day}`,
    general: general,
    procedure: procedure,
    evacuation_time: evacuationTime,
    deficiency: deficiency,
  });

  // Input Fields
  const handleInput = (e) => {
    let handleInput_err = "";
    const name = e.target.name;
    const value = e.target.value;
    if (!value) {
      if (name === "evacuation_nr")
        document.getElementById("evacuation_error").innerHTML =
          "* Evacuation cannot be left empty";
      else
        document.getElementById("date_error").innerHTML =
          "* Date cannot be left empty";
    } else {
      if (name === "evacuation_nr")
        document.getElementById("evacuation_error").innerHTML = "";
      else document.getElementById("date_error").innerHTML = "";
    }
    setEvacuation({ ...evacuation, [name]: value });
    console.log("evacuation", evacuation);
  };

  const cache_evacuation = () => {
    var cache_evacuation = {
      location: selectedLocationId,
      general: general,
      procedure: procedure,
      evacuation_time: evacuationTime,
      deficiency: deficiencyTab,
    };
    createCacheEvacuationAPI(cache_evacuation, edit_id, "pdf");
  };

  const handleGeneralInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (!value) {
      if (name === "company_name")
        document.getElementById("company_name_error").innerHTML =
          "* Company name can't be left empty.";
      else if (name === "state")
        document.getElementById("state_error").innerHTML =
          "* Street Number can't be left empty.";
      else if (name === "zip_code")
        document.getElementById("zip_code_error").innerHTML =
          "* Zip code can't be left empty.";
      else if (name === "city")
        document.getElementById("city_error").innerHTML =
          "* City can't be left empty.";
      else if (name === "employees")
        document.getElementById("employees_error").innerHTML =
          "* Employees can't be left empty.";
      else
        document.getElementById("floors_error").innerHTML =
          "* Floors can't be left empty.";
    } else {
      if (name === "company_name")
        document.getElementById("company_name_error").innerHTML = "";
      else if (name === "state")
        document.getElementById("state_error").innerHTML = "";
      else if (name === "zip_code")
        document.getElementById("zip_code_error").innerHTML = "";
      else if (name === "city")
        document.getElementById("city_error").innerHTML = "";
      else if (name === "employees")
        document.getElementById("employees_error").innerHTML = "";
      else document.getElementById("floors_error").innerHTML = "";
    }
    setGeneral({ ...general, [name]: value });
    setEvacuation({ ...evacuation, general: general });
  };

  const handleEvacuationTimeInput = (e) => {
    if (
      evacuation.evacuation_time.start_evacuation_drill &&
      evacuation.evacuation_time.end_evacuation
    ) {
      function parseTime(s) {
        var c = s.split(":");
        return parseInt(c[0]) * 60 + parseInt(c[1]);
      }
      var min =
        parseTime(evacuation.evacuation_time.end_evacuation) -
        parseTime(evacuation.evacuation_time.start_evacuation_drill);
      if (min <= 0) {
        toast.error(
          "End time cannot be less than or equal to the starting of the evacuation"
        );
      } else {
        var tt = min;
      }
    }

    if (
      evacuation.evacuation_time.start_evacuation_drill &&
      evacuation.evacuation_time.arival
    ) {
      function parseTime(s) {
        var c = s.split(":");
        return parseInt(c[0]) * 60 + parseInt(c[1]);
      }
      var minutes =
        parseTime(evacuation.evacuation_time.arival) -
        parseTime(evacuation.evacuation_time.start_evacuation_drill);
      if (minutes <= 0) {
        toast.error(
          "Arrival time cannot be less than or equal to the starting of the evacuation"
        );
      } else {
        var time = minutes;
      }
    }
    const name = e.target.name;
    const value = e.target.value;
    if (!value) {
      if (name === "start_evacuation_drill")
        document.getElementById("start_evacuation_drill_error").innerHTML =
          "* Start of the evacuation drill can't be left empty.";
      else if (name === "detection_damage_event")
        document.getElementById("detection_damage_event_error").innerHTML =
          "* Detection Damage Event can't be left empty.";
      else if (name === "iffpw")
        document.getElementById("iffpw_error").innerHTML =
          "* Initial Feedback Fire Prevention Worker can't be left empty.";
      else if (name === "arival")
        document.getElementById("arival_error").innerHTML =
          "* Arrival at the assembly point by can't be left empty.";
      else if (name === "end_evacuation")
        document.getElementById("end_evacuation_error").innerHTML =
          "* End of the evacuation drill can't be left empty.";
      else if (name === "assembly_way")
        document.getElementById("assembly_way_error").innerHTML =
          "* Way to the assembly point can't be left empty.";
      else if (name === "total_time")
        document.getElementById("total_time_error").innerHTML =
          "* Total time required can't be left empty.";
      else
        document.getElementById("building_cleared_error").innerHTML =
          "* Building completely cleared after the alaram can't be left empty.";
    } else {
      if (name === "start_evacuation_drill")
        document.getElementById("start_evacuation_drill_error").innerHTML = "";
      else if (name === "detection_damage_event")
        document.getElementById("detection_damage_event_error").innerHTML = "";
      else if (name === "iffpw")
        document.getElementById("iffpw_error").innerHTML = "";
      else if (name === "arival")
        document.getElementById("arival_error").innerHTML = "";
      else if (name === "end_evacuation")
        document.getElementById("end_evacuation_error").innerHTML = "";
      else if (name === "assembly_way")
        document.getElementById("assembly_way_error").innerHTML = "";
      else if (name === "total_time")
        document.getElementById("total_time_error").innerHTML = "";
      else document.getElementById("building_cleared_error").innerHTML = "";
    }
    console.log(time);
    if (time && time !== "NaN:NaN") {
      if (tt && tt !== "NaN")
        setEvacuationTime({
          ...evacuationTime,
          [name]: value,
          building_cleared: time,
          total_time: tt,
        });
      else
        setEvacuationTime({
          ...evacuationTime,
          [name]: value,
          building_cleared: time,
          total_time: null,
        });
    } else {
      if (tt && tt !== "NaN")
        setEvacuationTime({
          ...evacuationTime,
          [name]: value,
          building_cleared: "",
          total_time: tt,
        });
      else
        setEvacuationTime({
          ...evacuationTime,
          [name]: value,
          building_cleared: "",
          total_time: null,
        });
    }
    setEvacuation({ ...evacuation, evacuation_time: evacuationTime });
  };

  const handleGeneralCheckbox = (e) => {
    const name = e.target.name;
    const value = e.target.checked;
    setGeneral({ ...general, [name]: value });
    setEvacuation({ ...evacuation, general: general });
    console.log("evacuation", evacuation);
  };
  const handleProcedureInput = (e) => {
    // const name = e.target.name;
    // const value = e.target.value;
    // setProcedure({ ...procedure, [name]: value });
    console.log("procedure", procedure);
    const name = e.target.name;
    const value = e.target.value;
    if (!value) {
      if (name === "no_of_exercise_observation") {
        document.getElementById("no_of_exercise_observation_error").innerHTML =
          "* No Of Exercise Observation can't be left empty.";
      }
    } else {
      if (name === "assumed_situation")
        document.getElementById("assumed_situation_error").innerHTML = "";
      else if (name === "others_information")
        document.getElementById("others_error").innerHTML = "";
      else
        document.getElementById("no_of_exercise_observation_error").innerHTML =
          "";
    }
    setProcedure({ ...procedure, [name]: value });
    setEvacuation({ ...evacuation, procedure: procedure });
  };
  const handleProcedureCheckbox = (e) => {
    const name = e.target.name;
    const value = e.target.checked;
    if (value) {
      if (name === "police") {
        document.getElementById("others_error").innerHTML = "";
        setProcedure({ ...procedure, police: value });
      }
      if (name === "fire_department") {
        document.getElementById("others_error").innerHTML = "";
        setProcedure({ ...procedure, fire_department: value });
      }
      if (name === "others") {
        document.getElementById("others_error").innerHTML = "";
        setProcedure({ ...procedure, others: value });
      }
      if (name === "fire_alarm_system2") {
        document.getElementById("others2_error").innerHTML = "";
        setProcedure({
          ...procedure,
          fire_alarm_system2: value,
          fire_department_key_depot: false,
          others2: false,
        });
      }
      if (name === "fire_department_key_depot") {
        document.getElementById("others2_error").innerHTML = "";
        setProcedure({
          ...procedure,
          fire_alarm_system2: false,
          fire_department_key_depot: value,
          others2: false,
        });
      }
      if (name === "others2") {
        document.getElementById("others2_error").innerHTML = "";
        setProcedure({
          ...procedure,
          fire_alarm_system2: false,
          fire_department_key_depot: false,
          others2: value,
        });
      }
    } else {
      if (name === "police") {
        setProcedure({ ...procedure, police: false });
      }
      if (name === "fire_department") {
        setProcedure({ ...procedure, fire_department: false });
      }
      if (name === "others") {
        setProcedure({ ...procedure, others: false });
      }
      if (name === "fire_alarm_system2") {
        setProcedure({ ...procedure, fire_alarm_system2: false });
      }
      if (name === "fire_department_key_depot") {
        setProcedure({ ...procedure, fire_department_key_depot: false });
      }
      if (name === "others2") {
        setProcedure({ ...procedure, others2: false });
      }
    }
    setEvacuation({ ...evacuation, procedure: procedure });
  };
  const handleDeficiencyInput = (e) => {
    //setDeficiencyTab({ ...deficiencyTab, [e.target.name]: e.target.value });
    console.log("title::name:", e.target.name, "value:", e.target.value);
    setDeficiencyTab((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
    //setEvacuation({ ...evacuation, deficiency: deficiencyTab });
  };

  const handleDeficiencyInputDescription = (e, name) => {
    //setDeficiencyTab({ ...deficiencyTab, [name]: e });
    console.log("description::name:", name, "value:", e);
    setDeficiencyTab((values) => ({ ...values, [name]: e }));

    //setEvacuation({ ...evacuation, deficiency: deficiencyTab });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setPage((currPage) => currPage + 1);
    console.log(
      "indexes:: ",
      indexes,
      " counter:: ",
      counter,
      " evacuation.deficiency:: ",
      evacuation.deficiency
    );
    console.log(
      "page::",
      page,
      "counter::",
      counter,
      "length",
      evacuation.deficiency.length
    );
    if (page == 3) {
      let { title, description } = deficiencyTab;
      setDeficiency((prevDeficiency) => [...prevDeficiency, deficiencyTab]);
      console.log("deficiencyTab", deficiencyTab);
    }

    setEvacuation({
      ...evacuation,
      location: selectedLocationId,
      general: general,
      procedure: procedure,
      evacuation_time: evacuationTime,
      deficiency: deficiencyTab,
    });
    console.log(
      "evacuation::",
      evacuation,
      " location id::",
      selectedLocationId
    );
  };

  // Create PDF
  const handleCreateDoc = (e, download_type) => {
    e.preventDefault();
    displayToast = false;
    console.log("evacuation::", evacuation);
    if (evacuation.date === "") {
      document.getElementById("date_error").innerHTML =
        "* Date cannot be left empty";
      if (displayToast === false) {
        toast.error(
          "We have found some empty fields please recheck the forms and fill it"
        );
        displayToast = true;
      }
    }
    if (evacuation.evacuation_nr === "") {
      document.getElementById("evacuation_error").innerHTML =
        "* Evacuation nr cannot be left empty";
      if (displayToast === false) {
        toast.error(
          "We have found some empty fields please recheck the forms and fill it"
        );
        displayToast = true;
      }
    }
    if (evacuation.general.employees === "") {
      document.getElementById("employees_error").innerHTML =
        "* Employees cannot be left empty";
      if (displayToast === false) {
        toast.error(
          "We have found some empty fields please recheck the forms and fill it"
        );
        displayToast = true;
      }
    }
    if (evacuation.general.floors === "") {
      document.getElementById("floors_error").innerHTML =
        "* Floors cannot be left empty";
    }
    if (evacuation.general.state === "") {
      document.getElementById("state_error").innerHTML =
        "* State cannot be left empty";
      if (displayToast === false) {
        toast.error(
          "We have found some empty fields please recheck the forms and fill it"
        );
        displayToast = true;
      }
    }
    if (evacuation.general.zip_code === "") {
      document.getElementById("zip_code_error").innerHTML =
        "* Zip code cannot be left empty";
      if (displayToast === false) {
        toast.error(
          "We have found some empty fields please recheck the forms and fill it"
        );
        displayToast = true;
      }
    }
    if (evacuation.general.company_name === "") {
      document.getElementById("company_name_error").innerHTML =
        "* Location cannot be left empty";
      if (displayToast === false) {
        toast.error(
          "We have found some empty fields please recheck the forms and fill it"
        );
        displayToast = true;
      }
    }
    if (evacuation.deficiency.description === "") {
      document.getElementById("deficiency_description_error").innerHTML =
        "* Description cannot be left empty";
      if (displayToast === false) {
        toast.error(
          "We have found some empty fields please recheck the forms and fill it"
        );
        displayToast = true;
      }
    }
    if (evacuation.deficiency.title === "") {
      document.getElementById("title_error").innerHTML =
        "* Deficiency cannot be left empty";
      if (displayToast === false) {
        toast.error(
          "We have found some empty fields please recheck the forms and fill it"
        );
        displayToast = true;
      }
    }
    if (evacuation.evacuation_time.start_evacuation_drill === "") {
      document.getElementById("start_evacuation_drill_error").innerHTML =
        "* Start evacuation drill cannot be left empty";
      if (displayToast === false) {
        toast.error(
          "We have found some empty fields please recheck the forms and fill it"
        );
        displayToast = true;
      }
    }
    if (evacuation.evacuation_time.detection_damage_event === "") {
      document.getElementById("detection_damage_event_error").innerHTML =
        "* Detection damage event cannot be left empty";
      if (displayToast === false) {
        toast.error(
          "We have found some empty fields please recheck the forms and fill it"
        );
        displayToast = true;
      }
    }
    if (evacuation.evacuation_time.iffpw === "") {
      document.getElementById("iffpw_error").innerHTML =
        "* Initial Feedback Fire Prevention Worker cannot be left empty";
      if (displayToast === false) {
        toast.error(
          "We have found some empty fields please recheck the forms and fill it"
        );
        displayToast = true;
      }
    }
    if (evacuation.evacuation_time.arival === "") {
      document.getElementById("arival_error").innerHTML =
        "* Arrival at the assembly point by cannot be left empty";
      if (displayToast === false) {
        toast.error(
          "We have found some empty fields please recheck the forms and fill it"
        );
        displayToast = true;
      }
    }
    if (evacuation.evacuation_time.end_evacuation === "") {
      document.getElementById("end_evacuation_error").innerHTML =
        "* End of the evacuation drill cannot be left empty";
      if (displayToast === false) {
        toast.error(
          "We have found some empty fields please recheck the forms and fill it"
        );
        displayToast = true;
      }
    }
    if (evacuation.evacuation_time.assembly_way === "") {
      document.getElementById("assembly_way_error").innerHTML =
        "* Way to the assembly point cannot be left empty";
      if (displayToast === false) {
        toast.error(
          "We have found some empty fields please recheck the forms and fill it"
        );
        displayToast = true;
      }
    }
    if (evacuation.evacuation_time.total_time === "") {
      document.getElementById("total_time_error").innerHTML =
        "* Total time required cannot be left empty";
      if (displayToast === false) {
        toast.error(
          "We have found some empty fields please recheck the forms and fill it"
        );
        displayToast = true;
      }
    }
    if (evacuation.evacuation_time.building_cleared === "") {
      document.getElementById("building_cleared_error").innerHTML =
        "* Building completely cleared after the alaram cannot be left empty";
      if (displayToast === false) {
        toast.error(
          "We have found some empty fields please recheck the forms and fill it"
        );
        displayToast = true;
      }
    }
    if (evacuation.procedure.assumed_situation === "") {
      document.getElementById("assumed_situation_error").innerHTML =
        "*Assumed situation cannot be empty.";
      if (displayToast === false) {
        toast.error(
          "We have found some empty fields please recheck the forms and fill it"
        );
        displayToast = true;
      }
    }
    if (!evacuation.procedure.police) {
      if (!evacuation.procedure.fire_department) {
        if (evacuation.procedure.others) {
          if (evacuation.procedure.others_information === "") {
            document.getElementById("others_error").innerHTML =
              "* Missing advance information to information an.";
            if (displayToast === false) {
              toast.error(
                "We have found some empty fields please recheck the forms and fill it"
              );
              displayToast = true;
            }
          }
        } else if (!evacuation.procedure.others) {
          document.getElementById("others_error").innerHTML =
            "* Missing advance information to information an.";
          if (displayToast === false) {
            toast.error(
              "We have found some empty fields please recheck the forms and fill it"
            );
            displayToast = true;
          }
        }
      }
    }
    if (!evacuation.procedure.fire_alarm_system2) {
      if (!evacuation.procedure.fire_department_key_depot) {
        if (evacuation.procedure.others2) {
          if (evacuation.procedure.others2_information === "") {
            document.getElementById("others2_error").innerHTML =
              "* Missing Meeting of the operational task force.";
            if (displayToast === false) {
              toast.error(
                "We have found some empty fields please recheck the forms and fill it"
              );
              displayToast = true;
            }
          }
        } else if (!evacuation.procedure.others2) {
          document.getElementById("others2_error").innerHTML =
            "* Missing Meeting of the operational task force.";
          if (displayToast === false) {
            toast.error(
              "We have found some empty fields please recheck the forms and fill it"
            );
            displayToast = true;
          }
        }
      }
    }
    if (evacuation.procedure.no_of_excercise_observation === "") {
      document.getElementById("no_of_exercise_observation_error").innerHTML =
        "* No Of Exercise Observation can't be left empty.";
      if (displayToast === false) {
        toast.error(
          "We have found some empty fields please recheck the forms and fill it"
        );
        displayToast = true;
      }
    }
    if (
      evacuation.evacuation_time.start_evacuation_drill &&
      evacuation.evacuation_time.detection_damage_event &&
      evacuation.evacuation_time.iffpw &&
      evacuation.evacuation_time.arival &&
      evacuation.evacuation_time.end_evacuation
    ) {
      function parseTime(s) {
        var c = s.split(":");
        return parseInt(c[0]) * 60 + parseInt(c[1]);
      }
      var a =
        parseTime(evacuation.evacuation_time.detection_damage_event) -
        parseTime(evacuation.evacuation_time.start_evacuation_drill);
      var b =
        parseTime(evacuation.evacuation_time.iffpw) -
        parseTime(evacuation.evacuation_time.detection_damage_event);
      var c =
        parseTime(evacuation.evacuation_time.arival) -
        parseTime(evacuation.evacuation_time.iffpw);
      var d =
        parseTime(evacuation.evacuation_time.end_evacuation) -
        parseTime(evacuation.evacuation_time.arival);
      if (a <= 0 || b <= 0 || c <= 0 || d <= 0) {
        toast.error("Time enteries are not correct");
        displayToast = true;
      }
    }
    if (displayToast === false) {
      console.log("evacuation data::", evacuation);
      if (download_type === "pdf") createEvacuationAPI(evacuation, "pdf");
      else createEvacuationAPI(evacuation, "word");
      setOpenTemplate(false);
    }
  };

  // create form
  const createForm = async (e) => {
    setPage((currPage) => (currPage = 0));
    e.preventDefault();
    setOpenTemplate(true);
    getLocationDetails();
    const user_email = JSON.parse(localStorage.getItem("user-info")).user
      .user_email;

    try {
      const res = await fetch(`${API}/total-evacuation/${user_email}`, {
        method: "GET",
        headers: {
          "x-access-token": token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();
      console.log("data from total evacuation::", json);
      setApiData(json);
      const currentYear = date.getFullYear();

      // Filter evacuations for the current year
      const currentYearEvacuations = json.filter((evacuation) =>
        evacuation.evacuation_nr.includes(`/${currentYear}`)
      );

      // Find the highest evacuation number for the current year
      const maxEvacuationNumber = currentYearEvacuations.reduce(
        (max, evacuation_1) => {
          const yearPart = evacuation_1.evacuation_nr.split("/")[0];
          const numPart = parseInt(yearPart);
          return numPart > max ? numPart : max;
        },
        0
      );

      // Increment the evacuation number for the current year or start from 1 if none exist
      const evacuationNumberForYear =
        maxEvacuationNumber === 0 ? 1 : maxEvacuationNumber + 1;

      // Create the new evacuation number
      const evacuation_length = `${evacuationNumberForYear}/${currentYear}`;

      setEvacuation({ ...evacuation, evacuation_nr: evacuation_length });
    } catch (err) {
      console.log("error::", err);
      toast.error(err);
    }
  };

  const getLocationDetails = async () => {
    try {
      const res = await fetch(`${API}/get-location/${selectedLocationId}`, {
        method: "GET",
        headers: {
          "x-access-token": token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();
      console.log("data from get location data::", json);
      setGeneral({
        ...general,
        company_name: json.company_name,
        state: json.street,
        city: json.city,
        zip_code: json.postal_code,
        employees: json.no_of_members,
      });
    } catch (err) {
      console.log("error::", err);
      toast.error(err);
    }
  };

  // Api
  const user = JSON.parse(localStorage.getItem("user-info"));
  const token = user?.token;

  //CacheEvacuationAPI

  const createCacheEvacuationAPI = async (data, id, format) => {
    console.log("format::", format);
    console.log("data from evacuation form::", data);
    try {
      const res = await fetch(`${API}/create-cache-evacuation/${id}`, {
        method: "POST",
        headers: {
          "x-access-token": token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      console.log("createFormAPI::", json);
      if (json.message === "Saved Successfully.") {
        toast.success("Cache Saved Successfully.");
        edit_id = 0;
        console.log("evacuation data::", evacuation);
        pdfDownloadFormAPI(json.data._id);
      } else if (json.message === "Updated Successfully.") {
        toast.success("Cache Updated Successfully.");
        edit_id = 0;
      } else {
        toast.error(json.message.message);
      }
      getEvacuationApi();
    } catch (err) {
      console.log("createFormAPI error::", err);
      toast.error(err);
    }
  };

  // Create Form
  const createEvacuationAPI = async (data, format) => {
    console.log("format::", format);
    console.log("data from evacuation form::", data);
    try {
      const res = await fetch(`${API}/create-evacuation`, {
        method: "POST",
        headers: {
          "x-access-token": token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      console.log("createFormAPI::", json);
      if (json.message === "Saved Successfully.") {
        toast.success(json.message);
        console.log("evacuation data::", evacuation);
        if (format === "pdf") pdfDownloadFormAPI(json.data._id);
        else wordDownloadFormAPI(json.data._id);
        setAddDocument(true);
        setCategoryList(false);
        <Evacuation_template data={evacuation} />;
        setGeneral({
          ...general,
          company_name: "",
          state: "",
          zip_code: "",
          employees: "",
          floors: "",
          fire_alarm_system: false,
          evacuation_helper: false,
          exercise_announced: false,
          exercise_with_frog: false,
        });
        setProcedure({
          ...procedure,
          police: false,
          fire_department: false,
          others: false,
          others_information: "",
          others2: false,
          others2_information: "",
          fire_alarm_system2: false,
          fire_department_key_depot: false,
          assumed_situation: "",
          no_of_excercise_observation: "",
        });
        setEvacuationTime({
          ...evacuationTime,
          start_evacuation_drill: "",
          detection_damage_event: "",
          iffpw: "",
          arival: "",
          end_evacuation: "",
          assembly_way: "",
          total_time: "",
          building_cleared: "",
        });
        setDeficiencyTab({
          ...deficiencyTab,
          ["description"]: "",
          ["title"]: "",
        });
        setEvacuation({
          ...evacuation,
          location: selectedLocationId,
          general: general,
          procedure: procedure,
          evacuation_time: evacuationTime,
          deficiency: deficiencyTab,
        });
      } else {
        toast.error(json.message.message);
      }
      getEvacuationApi();
    } catch (err) {
      console.log("createFormAPI error::", err);
      toast.error(err);
    }
  };
  // Get Form
  const getEvacuationApi = async (data) => {
    try {
      const res = await fetch(
        `${API}/get-evacuation-data/${selectedLocationId}`,
        {
          method: "GET",
          headers: {
            "x-access-token": token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const json = await res.json();
      console.log("form data form evacuation::", json);
      fetch(`${API}/get-cache-evacuation-data/${selectedLocationId}`, {
        method: "GET",
        headers: {
          "x-access-token": token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json2) => {
          setEvacuationFormData(json.concat(json2));
        });
    } catch (err) {
      console.log("getForm error::", err);
      setEvacuationFormData([]);
    }
  };

  // Delete TaskBar using API
  async function deleteFormAPI(id) {
    let result = await fetch(`${API}/delete-evacuation/${id}`, {
      method: "DELETE",
      headers: {
        "x-access-token": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log("result from delete evacuation::", result);
    if (result) {
      if (result.message === "Evacuation deleted successfully") {
        toast.success(result.message);
      } else if (result.message == "Cache Evacuation deleted successfully") {
        toast.success(result.message);
      } else if (
        result.message &&
        result.message !== "Evacuation deleted successfully" &&
        result.message !== "Cache Evacuation deleted successfully"
      ) {
        toast.error(result.message);
      } else {
        toast.error(result.error);
      }
    }
    getEvacuationApi();
  }

  async function editEvacuation(id) {
    edit_id = id;
    let result = await fetch(`${API}/get-evacuation/${id}`, {
      method: "GET",
      headers: {
        "x-access-token": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    // result.deficiency = result.deficiency.reduce((acc, ele, ind) => {
    //   const key = `obj${ind + 1}`;
    //   acc[key] = ele;
    //   return acc;
    // }, {});
    console.log("data from get evacuation::", result);
    if (result) {
      fetch(
        `${API}/total-evacuation/${
          JSON.parse(localStorage.getItem("user-info")).user.user_email
        }`,
        {
          method: "GET",
          headers: {
            "x-access-token": token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((json) => {
          //console.log("data from total evacuation::",json.length);
          var evc_arr = [];
          for (let i = 0; i < json.length; i++) {
            if (
              json[i].evacuation_nr.split("/")[1] ===
              JSON.stringify(date.getFullYear())
            ) {
              evc_arr.push(json[i].evacuation_nr.split("/")[0]);
            }
          }
          var arrOfNum = evc_arr.map((str) => {
            return Number(str);
          });
          if (arrOfNum.length === 0) {
            var evacuation_length = 1 + "/" + date.getFullYear();
          } else {
            var evacuation_length =
              arrOfNum.sort()[arrOfNum.length - 1] +
              1 +
              "/" +
              date.getFullYear();
          }
          setEvacuation({ ...evacuation, evacuation_nr: evacuation_length });
        })
        .catch((err) => {
          console.log("error::", err);
          toast.error(err);
        });

      setOpenTemplate(true);
      setGeneral({
        ...general,
        company_name: result.general.company_name,
        state: result.general.state,
        zip_code: result.general.zip_code,
        employees: result.general.employees,
        floors: result.general.floors,
        fire_alarm_system: result.general.fire_alarm_system,
        evacuation_helper: result.general.evacuation_helper,
        exercise_announced: result.general.exercise_announced,
        exercise_with_frog: result.general.exercise_with_frog,
      });
      setProcedure({
        ...procedure,
        police: result.procedure.police,
        fire_department: result.procedure.fire_department,
        others: result.procedure.others,
        others_information: result.procedure.others_information,
        others2: result.procedure.others2,
        others2_information: result.procedure.others2_information,
        fire_alarm_system2: result.procedure.fire_alarm_system2,
        fire_department_key_depot: result.procedure.fire_department_key_depot,
        assumed_situation: result.procedure.assumed_situation,
        no_of_excercise_observation:
          result.procedure.no_of_excercise_observation,
      });
      setEvacuationTime({
        ...evacuationTime,
        start_evacuation_drill: result.evacuation_time.start_evacuation_drill,
        detection_damage_event: result.evacuation_time.detection_damage_event,
        iffpw: result.evacuation_time.iffpw,
        arival: result.evacuation_time.arival,
        end_evacuation: result.evacuation_time.end_evacuation,
        assembly_way: result.evacuation_time.assembly_way,
        total_time: result.evacuation_time.total_time,
        building_cleared: result.evacuation_time.building_cleared,
      });
      setDeficiencyTab(result.deficiency);
      setEvacuation({
        ...evacuation,
        location: selectedLocationId,
        general: general,
        procedure: procedure,
        evacuation_time: evacuationTime,
        deficiency: deficiencyTab,
      });
      setIndexes((prevIndexes) => [
        ...prevIndexes,
        Math.floor(Object.keys(result.deficiency).length / 2),
      ]);
    }
  }

  async function pdfDownloadFormAPI(id) {
    try {
      let result = await fetch(`${API}/get-evacuation/${id}`, {
        method: "GET",
        headers: {
          "x-access-token": token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!result.ok) {
        throw new Error(`Failed to fetch data: ${result.statusText}`);
      }

      result = await result.json();
      console.log("result from get evacuation::", result);

      if (result) {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) {
          dd = "0" + dd;
        }
        if (mm < 10) {
          mm = "0" + mm;
        }
        var today = yyyy + "-" + mm + "-" + dd;
        document.getElementById("current_date").innerHTML = today;

        console.log("date::", result.date.substring(0, 10));
        document.getElementById("evacuation_date").innerHTML =
          result.date.substring(0, 10);

        const elementsToPrint = document.querySelectorAll("#body");
        const pdf = new jsPDF();

        for (let index = 0; index < elementsToPrint.length; index++) {
          if (index !== 0) {
            pdf.addPage();
          }

          const element = elementsToPrint[index];
          const canvas = await html2canvas(element);

          const imgData = canvas.toDataURL("image/png");
          pdf.addImage(
            imgData,
            "PNG",
            0,
            0,
            pdf.internal.pageSize.getWidth(),
            pdf.internal.pageSize.getHeight()
          );

          if (index === elementsToPrint.length - 1) {
            var file = new File([pdf.output("blob")], "evacuation.pdf", {
              type: "application/pdf",
            });

            console.log("pdf file:: ", file);
            setPdfFile(file);
          }
        }
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  }

  async function wordDownloadFormAPI(id) {
    let result = await fetch(`${API}/get-evacuation/${id}`, {
      method: "GET",
      headers: {
        "x-access-token": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log("result from get evacuation::", result);
    if (result) {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      var today = yyyy + "-" + mm + "-" + dd;
      document.getElementById("current_date").innerHTML = today;

      console.log("date::", result.date.substring(0, 10));
      document.getElementById("evacuation_date").innerHTML =
        result.date.substring(0, 10);

      var filename = "evacuation";
      var preHtml =
        "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
      var postHtml = "</body></html>";
      var html = preHtml + document.getElementById("body").innerHTML + postHtml;

      var blob = new Blob(["\ufeff", html], {
        type: "application/msword",
      });

      // Specify link url
      var url =
        "data:application/vnd.ms-word;charset=utf-8," +
        encodeURIComponent(html);

      // Specify file name
      filename = filename ? filename + ".doc" : "document.doc";

      // Create download link element
      var downloadLink = document.createElement("a");

      document.body.appendChild(downloadLink);

      if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        // Create a link to the file
        downloadLink.href = url;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
      }

      document.body.removeChild(downloadLink);
    }
  }

  // Use Effect
  useEffect(() => {
    getEvacuationApi();
    console.log("selected location id is::", selectedLocationId);
  }, [selectedLocationId]);

  return (
    <>
      <div className="main-body">
        <div className="heading_box officerRegulation_head">
          {/* <h2 className="dasshboard_heading">Ticketing System</h2> */}
          <ul className="breadcrumb">
            <li>Dashboard</li>
            <li className="active">Evacuation certificate</li>
          </ul>
        </div>
        <div className="officerRegulation_body ">
          <div className="row">
            <div className="col-lg-6">
              <div className="officerRegulation_box">
                <div className="officerRegulation_cmn-box">
                  <h5 className="officerRegulation_heading">
                    Evacuation certificate
                  </h5>
                  <div className="officerRegulation_innerbox">
                    <div className="officerRegulation_headingBox">
                      <h5 className="officerRegulation_heading">Evacuation</h5>
                      <div className="officerRegulation_headingWrap">
                        <div className="dropdown">
                          <button
                            className={`btn dropdown-toggle`}
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                          >
                            <ListIcon className="dropIcon" color="action" />
                          </button>
                          <ul
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
                      </div>
                    </div>
                    <div className="certificate-box-wrap">
                      <div className="certificate-box">
                        <div className="btn-group">
                          {selectedLocationId !== "" ? (
                            <button
                              className="btn cmn_red_bg"
                              onClick={(e) => {
                                createForm(e);
                              }}
                            >
                              Create
                            </button>
                          ) : (
                            <div></div>
                          )}
                          {selectedLocationId !== "" ? (
                            <div className="dropdown certificateFormWrap">
                              <button
                                className={`btn cmn_red_bg dropdown-toggle`}
                                type="button"
                                id="dropdownMenuButton2"
                                data-bs-toggle="dropdown"
                              >
                                Open
                              </button>
                              <ul
                                className={`dropdown-menu`}
                                aria-labelledby="dropdownMenuButton2"
                              >
                                {evacuationFormData.length > 0 ? (
                                  evacuationFormData?.map((curelem, index) => {
                                    //console.log("curelem", curelem);
                                    return (
                                      <>
                                        <li key={index}>
                                          <ul className="certificateFormCont">
                                            <li className="sequenceNo">
                                              {index + 1}
                                            </li>
                                            <li className="activity">
                                              {curelem?.evacuation_nr
                                                ? curelem?.evacuation_nr &&
                                                  curelem?.evacuation_nr
                                                : "Cache"}
                                            </li>
                                            <li className="workLocation">
                                              {curelem?.general?.company_name &&
                                                curelem?.general?.company_name}
                                            </li>
                                            {/*<li className="action"><span>Pdf <Download onClick={(e) => { pdfDownloadFormAPI(curelem._id) }} className="Download " color="action" /></span><span>Word <Download onClick={(e) => { wordDownloadFormAPI(curelem._id) }} className="Download " color="action" /></span><DeleteOutlinedIcon onClick={(e) => { deleteFormAPI(curelem._id) }} className="Delete " color="action" /></li>*/}
                                            <li className="Delete">
                                              <DeleteOutlinedIcon
                                                onClick={(e) => {
                                                  deleteFormAPI(curelem._id);
                                                }}
                                                color="action"
                                              />
                                            </li>
                                            <li className="Edit">
                                              <EditIcon
                                                onClick={(e) => {
                                                  editEvacuation(curelem._id);
                                                }}
                                                color="action"
                                              />
                                            </li>
                                          </ul>
                                        </li>
                                      </>
                                    );
                                  })
                                ) : (
                                  <li>
                                    <p>Not found any document</p>
                                  </li>
                                )}
                              </ul>
                            </div>
                          ) : (
                            <div>Select a Location first.</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {openTemplate && (
          <OfficeModal
            content={
              <>
                <div className="workCertificate cmn-modal">
                  <CloseIcon
                    className="closeModal"
                    color="action"
                    onClick={(e) => {
                      cache_evacuation();
                      setOpenTemplate(false);
                    }}
                  />
                  <div className="formPop" ref={pdfRef}>
                    <div className="form-head">
                      {formTitles.map((curElem, index) => {
                        return (
                          <>
                            <button
                              className={`${page >= index && "active"}`}
                              onClick={(e) => {
                                if (page > index) {
                                  setPage((currPage) => (currPage = index));
                                }
                              }}
                            >
                              {curElem}
                            </button>
                          </>
                        );
                      })}
                    </div>
                    <div className="formPop-body-wrap">
                      <div className="formPop-head">
                        <div className="form-group">
                          <label htmlFor="evacuation_nr">
                            Räumungsübung Nr.
                          </label>
                          <input
                            type="text"
                            name="evacuation_nr"
                            placeholder="zz/yyyy"
                            value={evacuation.evacuation_nr}
                            id="evacuation_nr"
                            readOnly
                            onChange={(e) => handleInput(e)}
                          />
                          <br />
                          <div className="errors" id="evacuation_error"></div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="date">Datum:</label>
                          <input
                            type="text"
                            name="date"
                            id="date"
                            placeholder="dd.mm.yyyy"
                            value={evacuation.date}
                            readOnly
                            onChange={(e) => handleInput(e)}
                          />
                          <br />
                          <div className="errors" id="date_error"></div>
                        </div>
                      </div>
                      <div className="formPop-forms">
                        {/* general */}
                        <div
                          className={`formPop-cmn ${page === 0 && "active"}`}
                          id="general"
                        >
                          <div className="formPop-body">
                            <div className="row align-items-end">
                              <div class="col-lg-6">
                                <div className="evacuation_list">
                                  <div className="form-group formPop-flex  genral-input">
                                    <label htmlFor="company_name">Firma:</label>
                                    <div className="text-box-flexwrap">
                                      <input
                                        className="input"
                                        type="text"
                                        name="company_name"
                                        placeholder="company name here"
                                        value={general.company_name}
                                        id="location"
                                        onChange={(e) => {
                                          handleGeneralInput(e);
                                        }}
                                      />
                                      <br />
                                    </div>
                                  </div>
                                  <div
                                    className="errors"
                                    id="company_name_error"
                                  ></div>
                                  <div className="form-group formPop-flex genral-input">
                                    <label htmlFor="state">Straße:</label>
                                    <div className="text-box-flexwrap">
                                      <input
                                        className="input"
                                        type="text"
                                        name="state"
                                        id="state"
                                        value={general.state}
                                        placeholder="Street number here"
                                        onChange={(e) => {
                                          handleGeneralInput(e);
                                        }}
                                      />
                                      <br />
                                    </div>
                                  </div>
                                  <div
                                    className="errors"
                                    id="state_error"
                                  ></div>
                                  <div className="form-group formPop-flex genral-input">
                                    <div className="zip_colmn">
                                      <span className="zip_code_label">
                                        PLZ. Ort:
                                      </span>
                                      <input
                                        className="input zipcode"
                                        type="text"
                                        name="zip_code"
                                        id="zip_code"
                                        value={general.zip_code}
                                        placeholder="ZIP CODE"
                                        onChange={(e) => {
                                          handleGeneralInput(e);
                                        }}
                                      />
                                      <input
                                        className="input"
                                        type="text"
                                        name="city"
                                        id="city"
                                        value={general.city}
                                        placeholder="city"
                                        onChange={(e) => {
                                          handleGeneralInput(e);
                                        }}
                                      />
                                      <br />
                                    </div>
                                  </div>
                                  <div
                                    className="errors"
                                    id="zip_code_error"
                                  ></div>
                                  <div className="errors" id="city_error"></div>
                                  <div className="form-group formPop-flex genral-input">
                                    <label htmlFor="employees">
                                      Mitarbeiter:
                                    </label>
                                    <div className="text-box-flexwrap">
                                      <input
                                        className="input"
                                        type="text"
                                        name="employees"
                                        id="employees"
                                        value={general.employees}
                                        placeholder="AnzahlMA"
                                        onChange={(e) => {
                                          handleGeneralInput(e);
                                        }}
                                      />
                                      <br />
                                    </div>
                                  </div>
                                  <div
                                    className="errors"
                                    id="employees_error"
                                  ></div>
                                  <div className="form-group formPop-flex genral-input">
                                    <label htmlFor="floors">Stockwerke:</label>
                                    <div className="text-box-flexwrap">
                                      <input
                                        className="input"
                                        type="text"
                                        name="floors"
                                        id="floors"
                                        value={general.floors}
                                        placeholder="#floors"
                                        onChange={(e) => {
                                          handleGeneralInput(e);
                                        }}
                                      />
                                      <br />
                                    </div>
                                  </div>
                                  <div
                                    className="errors"
                                    id="floors_error"
                                  ></div>
                                  <div className="form-group formPop-flex fire-alarm-system">
                                    <label htmlFor="fire_alarm_system">
                                      Brandmeldeanlage:
                                    </label>
                                    <div className="text-box-flexwrap">
                                      <div className="ctm-checkbox genral-checkbox">
                                        <label
                                          className="ctm-checkbox-container"
                                          htmlFor="fire_alarm_system"
                                          onChange={(e) => {
                                            handleGeneralCheckbox(e);
                                          }}
                                        >
                                          vorhanden
                                          <input
                                            type="checkbox"
                                            checked={general.fire_alarm_system}
                                            name="fire_alarm_system"
                                            id="fire_alarm_system"
                                          />
                                          <div className="ctm-checkbox-checkmark"></div>
                                          <br />
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="errors"
                                    id="fire_alarm_error"
                                  ></div>
                                  <div className="together-ticks form-group formPop-flex">
                                    <label htmlFor="evacuation_helper">
                                      Räumungshelfer:
                                    </label>
                                    <div className="text-box-flexwrap">
                                      <div className="ctm-checkbox genral-checkbox">
                                        <label
                                          className="ctm-checkbox-container"
                                          htmlFor="evacuation_helper"
                                          onChange={(e) => {
                                            handleGeneralCheckbox(e);
                                          }}
                                        >
                                          ausgebildet
                                          <input
                                            type="checkbox"
                                            checked={general.evacuation_helper}
                                            name="evacuation_helper"
                                            id="evacuation_helper"
                                          />
                                          <div className="ctm-checkbox-checkmark"></div>
                                          <br />
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="errors"
                                    id="evacuation_helper_error"
                                  ></div>
                                  <div className="form-group formPop-flex">
                                    <label htmlFor="exercise_announced">
                                      Übung angekündigt:
                                    </label>
                                    <div className="text-box-flexwrap">
                                      <div className="ctm-checkbox genral-checkbox">
                                        <label
                                          className="ctm-checkbox-container"
                                          htmlFor="exercise_announced"
                                          onChange={(e) => {
                                            handleGeneralCheckbox(e);
                                          }}
                                        >
                                          Ja
                                          <input
                                            type="checkbox"
                                            checked={general.exercise_announced}
                                            name="exercise_announced"
                                            id="exercise_announced"
                                          />
                                          <div className="ctm-checkbox-checkmark"></div>
                                          <br />
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="errors"
                                    id="exercise_error"
                                  ></div>
                                  <div className="together-ticks form-group formPop-flex">
                                    <label htmlFor="exercise_with_frog">
                                      Übung mit Nebel:
                                    </label>
                                    <div className="text-box-flexwrap">
                                      <div className="ctm-checkbox genral-checkbox">
                                        <label
                                          className="ctm-checkbox-container"
                                          htmlFor="exercise_with_frog"
                                          onChange={(e) => {
                                            handleGeneralCheckbox(e);
                                          }}
                                        >
                                          Ja
                                          <input
                                            type="checkbox"
                                            checked={general.exercise_with_frog}
                                            name="exercise_with_frog"
                                            id="exercise_with_frog"
                                          />
                                          <div className="ctm-checkbox-checkmark"></div>
                                          <br />
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="errors"
                                    id="exercise_with_frog_error"
                                  ></div>
                                </div>
                              </div>
                              <div class="col-lg-6">
                                <div className="staticPdf">
                                  <h6>Checklisten zum öffnen und drucken</h6>
                                  <ul className="pdfList">
                                    <li className="pdfItem">
                                      <img src="assets/images/download-pdf.png" />
                                      Anschreiben
                                    </li>
                                    <li className="pdfItem">
                                      <img src="assets/images/download-pdf.png" />
                                      Checkliste zur Vorbereitung
                                    </li>
                                    <li className="pdfItem">
                                      <img src="assets/images/download-pdf.png" />
                                      Checkliste für Beobachter
                                    </li>
                                    <li className="pdfItem">
                                      <img src="assets/images/download-pdf.png" />
                                      Vorlage zur Protokollerstellung
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Place of work */}
                        <div
                          className={`formPop-cmn ${page === 1 && "active"}`}
                          id="procedure"
                        >
                          <div className="formPop-body">
                            <h6>Im Vorfeld Information an:</h6>
                            <div className="formPop-flex">
                              <div className="ctm-checkbox">
                                <label
                                  className="ctm-checkbox-container"
                                  htmlFor="police"
                                  onChange={(e) => {
                                    handleProcedureCheckbox(e);
                                  }}
                                >
                                  Polizei
                                  <input
                                    type="checkbox"
                                    checked={procedure.police}
                                    name="police"
                                    id="police"
                                  />
                                  <div className="ctm-checkbox-checkmark"></div>
                                  <br />
                                </label>
                              </div>
                              <div className="ctm-checkbox">
                                <label
                                  className="ctm-checkbox-container"
                                  htmlFor="fire_department"
                                  onChange={(e) => {
                                    handleProcedureCheckbox(e);
                                  }}
                                >
                                  Feuerwehr
                                  <input
                                    type="checkbox"
                                    checked={procedure.fire_department}
                                    name="fire_department"
                                    id="fire_department"
                                  />
                                  <div className="ctm-checkbox-checkmark"></div>
                                  <br />
                                </label>
                              </div>
                              <div className="ctm-checkbox ctm-checbnoxInput">
                                <input
                                  type="text"
                                  name="others_information"
                                  id="others_information"
                                  onChange={(e) => handleProcedureInput(e)}
                                />
                                <label
                                  className="ctm-checkbox-container"
                                  htmlFor="others"
                                  onChange={(e) => {
                                    handleProcedureCheckbox(e);
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    checked={procedure.others}
                                    name="others"
                                    id="others"
                                  />
                                  <span className="ctm-checkbox-checkmark"></span>
                                  <br />
                                </label>
                              </div>
                              <span className="errors" id="others_error"></span>
                            </div>
                            <div className="formPop-flex">
                              <div className="form-group d-block">
                                <h6>Angenommene Lage:</h6>
                                <div className="text-box-flexwrap">
                                  <textarea
                                    maxlength="100"
                                    className="as_textarea"
                                    value={procedure.assumed_situation}
                                    name="assumed_situation"
                                    id="assumed_situation"
                                    onChange={(e) => handleProcedureInput(e)}
                                  />
                                  <br />
                                  <span
                                    className="errors"
                                    id="assumed_situation_error"
                                  ></span>
                                </div>
                              </div>
                            </div>
                            <div className="flex-it">
                              <h6 className="strech-heading">
                                Zusammenkunft der betrieblichen Einsatzleitung:​
                              </h6>
                              <div className="formPop-flex">
                                <div className="ctm-checkbox">
                                  <label
                                    className="ctm-checkbox-container"
                                    HtmlFor="fire_alarm_system2​"
                                    onChange={(e) => {
                                      handleProcedureCheckbox(e);
                                    }}
                                  >
                                    Brandmeldeanlage
                                    <input
                                      type="checkbox"
                                      checked={procedure.fire_alarm_system2}
                                      name="fire_alarm_system2"
                                      id="fire_alarm_system2"
                                    />
                                    <div className="ctm-checkbox-checkmark"></div>
                                    <br />
                                  </label>
                                </div>
                                <div className="ctm-checkbox">
                                  <label
                                    className="ctm-checkbox-container"
                                    HtmlFor="fire_department_key_depot​"
                                    onChange={(e) => {
                                      handleProcedureCheckbox(e);
                                    }}
                                  >
                                    Feuerwehrschlüsseldepot
                                    <input
                                      type="checkbox"
                                      checked={
                                        procedure.fire_department_key_depot
                                      }
                                      name="fire_department_key_depot"
                                      id="fire_department_key_depot"
                                    />
                                    <span className="ctm-checkbox-checkmark"></span>
                                    <br />
                                  </label>
                                </div>
                                <div className="ctm-checkbox ctm-checbnoxInput">
                                  <input
                                    type="text"
                                    name="others2_information"
                                    id="others2_information"
                                    onChange={(e) => handleProcedureInput(e)}
                                  />
                                  <label
                                    className="ctm-checkbox-container"
                                    htmlFor="others2"
                                    onChange={(e) => {
                                      handleProcedureCheckbox(e);
                                    }}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={procedure.others2}
                                      name="others2"
                                      id="others2"
                                    />
                                    <span className="ctm-checkbox-checkmark"></span>
                                    <br />
                                  </label>
                                </div>
                                <span
                                  className="errors"
                                  id="others2_error"
                                ></span>
                              </div>
                            </div>
                            <div className="formPop-flex">
                              <div className="form-group">
                                <label htmlFor="no_of_excercise_observation">
                                  <h6>Anzahl Übungsbeobachter:</h6>
                                </label>
                                <div className="text-box-flexwrap">
                                  <input
                                    type="text"
                                    value={
                                      procedure.no_of_excercise_observation
                                    }
                                    name="no_of_excercise_observation"
                                    id="no_of_excercise_observation"
                                    onChange={(e) => handleProcedureInput(e)}
                                  />
                                  <br />
                                </div>
                              </div>
                              <span
                                className="errors"
                                id="no_of_exercise_observation_error"
                              ></span>
                            </div>
                          </div>
                        </div>
                        {/* Work Order */}
                        <div
                          className={`formPop-cmn ${page === 2 && "active"}`}
                          id="workOrder"
                        >
                          <div className="formPop-body">
                            <div className="row align-items-end">
                              <div class="col-lg-6">
                                <div className="evacuation_list">
                                  <div className="evacuations_labels form-group formPop-flex  genral-input">
                                    <label
                                      className="evacuation-time"
                                      htmlFor="location"
                                    >
                                      Start der Räumungsübung:
                                    </label>
                                    <div className="text-box-flexwrap">
                                      <input
                                        className="input clock"
                                        type="time"
                                        name="start_evacuation_drill"
                                        placeholder="Hrs : Min"
                                        value={
                                          evacuationTime.start_evacuation_drill
                                        }
                                        id="start_evacuation_drill"
                                        onChange={(e) => {
                                          handleEvacuationTimeInput(e);
                                        }}
                                      />
                                      <br />
                                    </div>
                                    <span>Uhr</span>
                                  </div>
                                  <div
                                    className="errors"
                                    id="start_evacuation_drill_error"
                                  ></div>
                                  <div className="evacuations_labels form-group formPop-flex genral-input">
                                    <label
                                      className="evacuation-time"
                                      htmlFor="state"
                                    >
                                      Entdeckung/Detektion Schadensereignis:
                                    </label>
                                    <div className="text-box-flexwrap">
                                      <input
                                        className="input  clock"
                                        type="time"
                                        placeholder="Hrs : Min"
                                        name="detection_damage_event"
                                        id="detection_damage_event"
                                        value={
                                          evacuationTime.detection_damage_event
                                        }
                                        onChange={(e) => {
                                          handleEvacuationTimeInput(e);
                                        }}
                                      />
                                      <br />
                                    </div>
                                    <span>Uhr</span>
                                  </div>
                                  <div
                                    className="errors"
                                    id="detection_damage_event_error"
                                  ></div>
                                  <div className="evacuations_labels form-group formPop-flex genral-input">
                                    <label
                                      className="evacuation-time"
                                      htmlFor="zip_code"
                                    >
                                      Erste Rückmeldung Brandschutzhelfer:
                                    </label>
                                    <div className="text-box-flexwrap">
                                      <input
                                        className="input clock"
                                        type="time"
                                        placeholder="Hrs : Min"
                                        name="iffpw"
                                        id="iffpw"
                                        value={evacuationTime.iffpw}
                                        onChange={(e) => {
                                          handleEvacuationTimeInput(e);
                                        }}
                                      />
                                      <br />
                                    </div>
                                    <span>Uhr</span>
                                  </div>
                                  <div
                                    className="errors"
                                    id="iffpw_error"
                                  ></div>
                                  <div className="evacuations_labels form-group formPop-flex genral-input">
                                    <label
                                      className="evacuation-time"
                                      htmlFor="base_area"
                                    >
                                      Eintreffen am Sammelplatz bis:
                                    </label>
                                    <div className="text-box-flexwrap">
                                      <input
                                        className="input clock"
                                        type="time"
                                        placeholder="Hrs : Min"
                                        name="arival"
                                        id="arival"
                                        value={evacuationTime.arival}
                                        onChange={(e) => {
                                          handleEvacuationTimeInput(e);
                                        }}
                                      />
                                      <br />
                                    </div>
                                    <span>Uhr</span>
                                  </div>
                                  <span
                                    className="errors"
                                    id="arival_error"
                                  ></span>
                                  <div className="evacuations_labels form-group formPop-flex genral-input">
                                    <label
                                      className="evacuation-time"
                                      htmlFor="employees"
                                    >
                                      Räumungsende:
                                    </label>
                                    <div className="text-box-flexwrap">
                                      <input
                                        className="input clock"
                                        type="time"
                                        placeholder="Hrs : Min"
                                        name="end_evacuation"
                                        id="end_evacuation"
                                        value={evacuationTime.end_evacuation}
                                        onChange={(e) => {
                                          handleEvacuationTimeInput(e);
                                        }}
                                      />
                                      <br />
                                    </div>
                                    <span>Uhr</span>
                                  </div>
                                  <span
                                    className="errors"
                                    id="end_evacuation_error"
                                  ></span>
                                  <div className="evacuations_labels form-group formPop-flex genral-input">
                                    <label
                                      className="evacuation-time"
                                      htmlFor="floors"
                                    >
                                      Weg zum Sammelplatz:
                                    </label>
                                    <div className="text-box-flexwrap">
                                      <input
                                        className="min input"
                                        type="text"
                                        name="assembly_way"
                                        id="assembly_way"
                                        value={evacuationTime.assembly_way}
                                        onChange={(e) => {
                                          handleEvacuationTimeInput(e);
                                        }}
                                      />
                                      <br />
                                    </div>
                                    <span>Minute(s)</span>
                                  </div>
                                  <span
                                    className="errors"
                                    id="assembly_way_error"
                                  ></span>
                                  <div className="evacuations_labels form-group formPop-flex fire-alarm-system">
                                    <label
                                      className="evacuation-time"
                                      htmlFor="fire_alarm_system"
                                    >
                                      Gebäude komplett geräumt:
                                    </label>
                                    <div className="text-box-flexwrap">
                                      <input
                                        className="min input"
                                        type="text"
                                        name="total_time"
                                        id="toal_time"
                                        readOnly
                                        value={evacuationTime.total_time}
                                        onChange={(e) => {
                                          handleEvacuationTimeInput(e);
                                        }}
                                      />
                                      <br />
                                    </div>
                                    <span>Minute(s)</span>
                                  </div>
                                  <span
                                    className="errors"
                                    id="total_time_error"
                                  ></span>
                                  <div className="evacuations_labels form-group formPop-flex">
                                    <label
                                      className="evacuation-time"
                                      htmlFor="evacuation_helper"
                                    >
                                      Building completely cleared after the
                                      alaram:
                                    </label>
                                    <div className="text-box-flexwrap">
                                      <input
                                        className="input min building_input"
                                        type="text"
                                        name="building_cleared"
                                        id="building_cleared"
                                        value={evacuationTime.building_cleared}
                                        readOnly
                                      />
                                    </div>
                                    <span>Minute(s)</span>
                                  </div>
                                  <span
                                    className="errors"
                                    id="building_cleared_error"
                                  ></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* File Hazard */}
                        <div
                          className={`formPop-cmn ${page === 3 && "active"}`}
                          id="fileHazard"
                        >
                          <div className="formPop-body evacuationInputBox">
                            <ul className="tabs">
                              {indexes.map((index) => {
                                const fieldName = `${index + 1}. Mangel`;
                                return (
                                  <li
                                    key={index}
                                    className="active"
                                    id={fieldName}
                                  >
                                    Mangel
                                    <button
                                      onClick={(e) =>
                                        removeDeficiency(fieldName)
                                      }
                                    >
                                      X
                                    </button>
                                  </li>
                                );
                              })}
                              <li onClick={(e) => addDeficiency(e)}>+</li>
                            </ul>
                            {indexes.map((index) => {
                              const fieldName = `${index + 1}. Mangel:`;
                              const tabName = `${index + 1}. Mangel` + "tab";
                              const title_name = `${index + 1}_title`;
                              const des_name = `${index + 1}_des`;
                              return (
                                <div className="tabContent" id={tabName}>
                                  <div className="title d-flex">
                                    <label htmlFor="title">Mangel: </label>
                                    <input
                                      type="text"
                                      name={title_name}
                                      id="title"
                                      value={evacuation.deficiency[title_name]}
                                      onChange={(e) => {
                                        handleDeficiencyInput(e);
                                      }}
                                    />
                                    <br />
                                  </div>
                                  <span
                                    className="errors"
                                    id="title_error"
                                  ></span>
                                  <div className="description  d-flex">
                                    <label htmlFor="description">
                                      Beschreibung:{" "}
                                    </label>
                                    {/*<textarea
                                      name="description"
                                      id="description"
                                      cols="30"
                                      rows="10"
                                      onChange={(e) => {
                                        handleDeficiencyInput(e);
                                      }}
                                    ></textarea>*/}
                                    <JoditEditor
                                      ref={editor}
                                      value={evacuation.deficiency[des_name]}
                                      onChange={(e) => {
                                        handleDeficiencyInputDescription(
                                          e,
                                          des_name
                                        );
                                      }}
                                    />
                                  </div>
                                  <span
                                    className="errors"
                                    id="deficiency_description_error"
                                  ></span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="formPop-footer">
                        <div className="btn-group">
                          <button
                            className="btn cmn_red_bg"
                            onClick={(e) => {
                              setPage((currPage) => currPage - 1);
                            }}
                            disabled={page == 0}
                          >
                            <ArrowCircleLeftOutlinedIcon
                              className="prevbtn "
                              color="action"
                            />{" "}
                            zurück
                          </button>
                          {page == 4 ? (
                            <>
                              {/* <Pdf targetRef={pdfRef} filename="code-example.pdf">
                                                                        {({ toPdf }) => <button className="btn cmn_yellow_bg" onClick={hvb(e) => {handleCreatePdf(e); }} >Create PDF{toPdf}</button>}
                                                                </Pdf> */}
                              <button
                                className="btn cmn_yellow_bg"
                                onClick={(e) => {
                                  handleCreateDoc(e, "pdf");
                                }}
                              >
                                Create PDF
                              </button>
                              <button
                                className="btn cmn_yellow_bg"
                                onClick={(e) => {
                                  handleCreateDoc(e, "word");
                                }}
                              >
                                Create Word
                              </button>
                            </>
                          ) : (
                            <button
                              className="btn cmn_yellow_bg"
                              onClick={(e) => {
                                handleNextStep(e);
                              }}
                            >
                              weiter{" "}
                              <ArrowCircleRightOutlinedIcon
                                className="nextbtn "
                                color="action"
                              />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="space"></div>
                  </div>
                </div>
              </>
            }
          />
        )}
      </div>
      <div id="body" class="body">
        <table
          width="100%"
          className="table1"
          border="0"
          cellspacing="0"
          cellpadding="0"
        >
          <tr>
            <td class="column-top" width="80%" className="tr1">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <th class="column" className="th1">
                    <img
                      src="/assets/images/template-logo.png"
                      width="131"
                      height="64"
                      border="0"
                      alt=""
                    />
                  </th>

                  <th class="column" width="" className="th2">
                    Date:<span id="current_date"></span>
                  </th>
                </tr>
                <tr>
                  <td colspan="2">
                    <h2 class="main-head">Prologue</h2>
                    <p>
                      Diese Brandschutzordnung enthält Regeln für die
                      Brandverhütung und Anweisungen über das Verhalten und die
                      Maßnahmen bei Ausbruch eines Brandes. Die nachfolgenden
                      Regelungen dienen dem vorbeugenden Brandschutz im Gebäude.
                      Die Brandschutzordnung entbindet nicht von der
                      Verpflichtung, sonstige Arbeitsschutz- und
                      Unfallverhütungsvorschriften zu beachten und einzuhalten.
                    </p>
                    <p>Die Brandschutzordnung besteht aus 3 Teilen:</p>
                    <p>
                      Teil A (Aushang) richtet sich an alle Personen, die sich
                      (auch nur vorrübergehend) im Gebäude und auf dem Gelände
                      aufhalten.
                    </p>
                    <p>
                      Teil B (für Personen ohne besondere Brandschutzaufgaben)
                      richtet sich an Personen, die sich nicht nur vorübergehend
                      im Gebäude aufhalten.Inhalt von Teil B der
                      Brandschutzordnung sind die betrieblichen und
                      organisatorischen Maßnahmen zur Brandverhütung und die
                      Hinweise zum richtigen Verhalten im Gefahrenfall. Teil B
                      ist einmal jährlich zu unterweisen. Die Unterweisung ist
                      zu dokumentieren.
                    </p>
                    <p>
                      Teil C (für Personen mit besonderen Brandschutzaufgaben)
                      richtet sich an Personen, denen über ihre allgemeinen
                      Pflichten hinaus besondere Aufgaben im Brandschutz
                      übertragen wurden.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
            <td
              className="td1"
              class="column-top"
              width="20%"
              bgcolor="#ff8200"
            >
              <div class="verti">
                <h1 className="h1">Brandschutzordnung</h1>
                <h3 className="h3">Teil B nach DIN 14096</h3>
              </div>
            </td>
          </tr>
        </table>
        <table
          width="100%"
          className="table2"
          border="0"
          cellspacing="0"
          cellpadding="0"
        >
          <tr>
            <td
              class="column-top"
              width="100%"
              colspan="2"
              className="td3 page-break"
            >
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <th class="column" width="" className="th3">
                    <img
                      src="/assets/images/template-logo.png"
                      width="131"
                      height="64"
                      border="0"
                      alt=""
                    />
                  </th>
                </tr>
                <tr>
                  <td>
                    <p>
                      <i className="p1">
                        Variousevents such asfires,
                        leakageofhazardoussubstances, accidents, etc. cantrigger
                        an alarmwith subsequent evacuationof a company. In
                        principle, all
                        affectedpersonsmustthenbeevacuatedimmediately and
                        safelyfromtheendangeredarea.
                      </i>
                    </p>
                    <p>
                      The scope and time
                      intervalsoftheevacuationdrillweredetermined via a
                      riskassessment. The effectivenessoftheevacuation alert
                      signalstoemployeesmustbedeterminedthroughperiodictesting.
                    </p>
                    <p>
                      {" "}
                      An evacuationdrillis an exercise in
                      whichparticipantslearnhowtoact in theeventof an
                      emergencysituation, such as a
                      fireorotherhazardthatrequiresthemtoleavethebuilding. The
                      exercisecanbeconducted in a real orsimulatedbuilding and
                      usuallyinvolvesperformingevacuationprocedures and training
                      in theuseofemergencyexits and othersafetyequipment.{" "}
                    </p>
                    <p>
                      Conductingevacuationdrillsisimportanttoensurethateveryone
                      in thebuildingcanbeevacuatedquickly and safely in
                      theeventof an emergencysituation. After
                      thebuildingorareashavebeeninspected,
                      theexerciseleaderdeclarestheendoftheexercise at
                      theassemblypoint. Subsequently, a follow-upistobecarried
                      out and recorded. The
                      employeesaretobeinformedpromptlyaboutthefindingsfromtheevacuationexercises,
                      e.g. intranet, noticeboard, departmentalmeeting,
                      staffmeeting, etc.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <table
          width="100%"
          className="table3"
          border="0"
          cellspacing="0"
          cellpadding="0"
        >
          <tr>
            <td className="column-top td4" width="100%" colspan="2">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <th class="column" width="" className="th4">
                    <img
                      src="/assets/images/template-logo.png"
                      width="131"
                      height="64"
                      border="0"
                      alt=""
                    />
                  </th>
                </tr>
                <tr>
                  <td>
                    <h2 class="main-head h4">Inhalt</h2>
                    <ul>
                      <li>
                        PROLOGUE_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
                        _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ __ _ _ _ _1
                      </li>
                      <li>
                        1) ALLGEMEIN_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
                        _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _3
                      </li>
                      <li>
                        2) ABLAUF_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 4
                      </li>
                      <li>
                        3) RÄUMUNGSABLAUF UND /-ZEITEN _ _ _ _ _ _ _ _ _ _ _ _ _
                        _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
                        _ _ 4
                      </li>
                      <li>
                        4) ERGEBNISSE UND BEWERTUNG_ _ _ _ _ _ _ _ _ _ _ _ _ _ _
                        _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _4
                      </li>
                    </ul>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <table
          width="100%"
          className="table4"
          border="0"
          cellspacing="0"
          cellpadding="0"
        >
          <tr>
            <td
              class="column-top"
              width="100%"
              colspan="2"
              className="td5 page-break"
            >
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <th class="column" width="" className="th5">
                    <img
                      src="/assets/images/template-logo.png"
                      width="131"
                      height="64"
                      border="0"
                      alt=""
                    />
                  </th>
                </tr>
                <tr>
                  <td>
                    <h2 class="main-head">1) General</h2>
                    <table
                      width="100%"
                      className="table5"
                      border="0"
                      cellspacing="0"
                      cellpadding="0"
                    >
                      <tr>
                        <td>
                          <strong>Date:</strong>
                        </td>
                        <td>
                          <span id="evacuation_date"></span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Start of the exercise:</strong>
                        </td>
                        <td>
                          {evacuation.evacuation_time.start_evacuation_drill}{" "}
                          <span className="time_unit">Uhr</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Assumedsituation:</strong>
                        </td>
                        <td>{evacuation.procedure.assumed_situation}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Location: </strong>
                        </td>
                        <td>
                          {evacuation.general.city}
                          <br />
                          {evacuation.general.state}
                          <br />
                          {evacuation.general.zip_code}
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <strong>Employees: </strong>
                        </td>
                        <td>{evacuation.general.employees}</td>
                      </tr>

                      <tr>
                        <td>
                          <strong>Evacuationhelper:</strong>
                        </td>
                        <td>
                          {evacuation.general.evacuation_helper && "Educated"}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Firealarmsystem:</strong>
                        </td>
                        <td>
                          {evacuation.general.fire_alarm_system && "Available"}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Evacuationdrill:</strong>
                        </td>
                        <td>{evacuation.general.exercise_announced && "Ja"}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Exercise smoke:</strong>
                        </td>
                        <td>{evacuation.general.exercise_with_frog && "Ja"}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Exercise Observer:</strong>
                        </td>
                        <td>
                          {evacuation.procedure.no_of_excercise_observation}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Competences:</strong>
                        </td>
                        <td>
                          Herr Gagliardi, Rosario - Fachkraft für
                          Arbeitssicherheit
                          <br />
                          Herr Belz, Rolf - Sicherheitsfachkraft
                          <br />
                          Herr Goldschmidt, Christian - Brandschutzbeauftragter
                          <br />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>ffff</strong>
                        </td>
                        <td>ffff</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <table
          width="100%"
          className="table4"
          border="0"
          cellspacing="0"
          cellpadding="0"
        >
          <tr>
            <td
              class="column-top"
              width="100%"
              colspan="2"
              className="td5 page-break"
            >
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <th class="column" width="" className="th5">
                    <img
                      src="/assets/images/template-logo.png"
                      width="131"
                      height="64"
                      border="0"
                      alt=""
                    />
                  </th>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
      <div id="body" class="body">
        <table
          width="100%"
          className="table4"
          border="0"
          cellspacing="0"
          cellpadding="0"
        >
          <tr>
            <td
              class="column-top"
              width="100%"
              colspan="2"
              className="td5 page-break"
            >
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <th class="column" width="" className="th5">
                    <img
                      src="/assets/images/template-logo.png"
                      width="131"
                      height="64"
                      border="0"
                      alt=""
                    />
                  </th>
                </tr>

                <tr>
                  <td>
                    <h2 class="main-head">2) Procedure</h2>
                    <table
                      width="100%"
                      className="table5"
                      border="0"
                      cellspacing="0"
                      cellpadding="0"
                    >
                      <tr>
                        <td className="emp_in_bl">
                          <strong>Employees in building:</strong>
                        </td>
                        <td>300</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Fire department:</strong>
                        </td>
                        <td>
                          {evacuation.procedure.fire_department}
                          {evacuation.procedure.others_information}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Police:</strong>
                        </td>
                        <td>{evacuation.procedure.police && "Yes"}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>
                            Meeting of the operational task force:
                          </strong>
                        </td>
                        <td>
                          {evacuation.procedure.fire_alarm_system2}
                          {evacuation.procedure.fire_department_key_depot}
                          {evacuation.procedure.others2_information}
                          In accordance with the evacuation concept, the command
                          center was located in the area of the fire alarm
                          system. There, feedback was received from the
                          evacuation assistants regarding the evacuation status.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <table
          width="100%"
          className="table4"
          border="0"
          cellspacing="0"
          cellpadding="0"
        >
          <tr>
            <td class="column-top" width="100%" colspan="2" className="td5">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <th class="column" width="" className="th5">
                    <img
                      src="/assets/images/template-logo.png"
                      width="131"
                      height="64"
                      border="0"
                      alt=""
                    />
                  </th>
                </tr>
                <tr>
                  <td>
                    <h2 class="main-head">
                      3) Evacuation procedure and / times
                    </h2>
                    <h4>Evacuation time</h4>
                    <table
                      width="100%"
                      className="table5"
                      border="0"
                      cellspacing="0"
                      cellpadding="0"
                    >
                      <tr>
                        <td className="emp_in_bl">
                          <strong>Start der Räumungsübung:</strong>
                        </td>
                        <td>
                          <span id="soed">
                            {evacuation.evacuation_time.start_evacuation_drill}
                          </span>{" "}
                          <span className="time_unit">Uhr</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>
                            Entdeckung/Detektion Schadensereignis:
                          </strong>
                        </td>
                        <td>
                          <span id="dde">
                            {evacuation.evacuation_time.detection_damage_event}
                          </span>{" "}
                          <span className="time_unit">Uhr</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Erste Rückmeldung Brandschutzhelfer:</strong>
                        </td>
                        <td>
                          <span id="iffpw">
                            {evacuation.evacuation_time.iffpw}
                          </span>{" "}
                          <span className="time_unit">Uhr</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Eintreffen am Sammelplatz bis:</strong>
                        </td>
                        <td>
                          <span id="aatapb">
                            {evacuation.evacuation_time.arival}
                          </span>{" "}
                          <span className="time_unit">Uhr</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Räumungsende:</strong>
                        </td>
                        <td>
                          <span id="eofted">
                            {" "}
                            {evacuation.evacuation_time.end_evacuation}
                          </span>{" "}
                          <span className="time_unit">Uhr</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Weg zum Sammelplatz:</strong>
                        </td>
                        <td>
                          <span id="wttap">
                            {" "}
                            {evacuation.evacuation_time.assembly_way}
                          </span>{" "}
                          <span className="time_unit">Minuten</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Gesamtzeitbedarf:</strong>
                        </td>
                        <td>
                          <span id="ges">
                            {" "}
                            {evacuation.evacuation_time.total_time}
                          </span>{" "}
                          <span className="time_unit">Minuten*</span>
                        </td>
                      </tr>
                    </table>
                    <p class="comp_cleared">
                      *The building was{" "}
                      <span id="cc">
                        {" "}
                        {evacuation.evacuation_time.building_cleared}
                      </span>{" "}
                      <span className="time_unit">min</span> completely cleared
                      after the alarm.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <table
          width="100%"
          className="table4"
          border="0"
          cellspacing="0"
          cellpadding="0"
        >
          <tr>
            <td class="column-top" width="100%" colspan="2" className="td5">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <th class="column" width="" className="th5">
                    <img
                      src="/assets/images/template-logo.png"
                      width="131"
                      height="64"
                      border="0"
                      alt=""
                    />
                  </th>
                </tr>
                <tr>
                  <td>
                    <h2 class="main-head">4) Ergebnisse und Bewertung</h2>
                    <p>
                      Info: After the exercise, a debriefing was held with all
                      persons involved in the exercise with special tasks in
                      case of evacuation.
                    </p>
                    <div className="block2">
                      <p className="sod">Summary of deficiencies:</p>
                      <p>1.</p>
                      <p>2.</p>
                    </div>
                    <p className="desc">Description:</p>
                    <h3 class="heading1">Zu 1:</h3>
                    <p className="desc2"></p>
                    <h3 className="heading2">Empfehlung:</h3>

                    <p>Desc</p>

                    <strong className="signature">
                      Verantwortlich: Gerd Bär GmbH
                    </strong>
                    <h3 class="heading3">Zu 2: </h3>
                    <p>paragraph 1</p>
                    <h3 className="heading2">Empfehlung:</h3>
                    <p>description</p>

                    <strong className="signature">
                      Verantwortlich: Gerd Bär GmbH
                    </strong>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>

      <div style={{ position: "fixed" }} className="resizeable-body">
        <div
          style={{
            display: "none",
          }}
        >
          <AddCategory />
        </div>
        <DocumentModalOnly
          cateSearch={searchCategory}
          locSearch={searchLocation}
          catList={categoryList}
          setCatList={setCategoryList}
          addDoc={addDocument}
          setAddDoc={setAddDocument}
          editcat={editDocumentBox}
          setEditCat={setEditDocumentBox}
          pdfFile={pdfFile}
        />
      </div>
      <ToastContainer />
    </>
  );
}

export default Evacuation;
