import React, { useState, useEffect, useRef } from "react";

import AddCategory from "../DocumentManagentment/AddCategory";
import DocumentModalOnly from "../DocumentManagentment/DocumentModalOnly";
import ListIcon from "@mui/icons-material/List";
// import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
// import Button from "@mui/material/Button";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
// import Typography from "@mui/material/Typography";
import OfficeModal from "../../modal/OfficerModal/OfficerModal";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import SignatureCanvas from "react-signature-canvas";
import { useSelector } from "react-redux";
// import Pdf from "react-to-pdf";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "react-router-dom";

// import ReleaseCertificate from "./releaseCertificate";
// import "./certificate.css";

const API = process.env.REACT_APP_API_BASE_URL;

const pdfRef = React.createRef();

var edit_id = 0;

const WorkReleaseCertificate = () => {
  const [updateCertificate, setupdate] = useState(false);
  const [addDocument, setAddDocument] = useState(false);
  const [editDocumentBox, setEditDocumentBox] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [categoryList, setCategoryList] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  // const [showComponent, setShowComponent] = useState(false);

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
  let sigCanvasFileHazard = useRef({});
  let sigCanvasExplosionHazard = useRef({});
  let sigCanvasClient = useRef({});
  let sigCanvasContractorSig = useRef({});
  let sigCanvasContractor = useRef({});

  const [openTemplate, setOpenTemplate] = useState(false);
  const [page, setPage] = useState(0);
  const formTitles = [
    "Job",
    "1. place of work",
    "2. work order",
    "3. fire hazard",
    "4. explosion hazard",
    "5. alerting",
    "6. client",
    "7. contractor",
  ];
  const [sequence, setSequence] = useState("");
  const [certificateFormData, setCertificateFormData] = useState("");
  console.log(certificateFormData);
  const selectedLocationId = useSelector((state) => state.locationIdReducer);

  console.log("Selected location id::", selectedLocationId);

  // Form Functionality
  // Job functions
  const [job, setJob] = useState({
    welding_cutting_process: 0,
    cutting_loop: 0,
    soldering: 0,
    defrost: 0,
    hot_gluing: 0,
    job_check_other: 0,
    other_text: "",
  });

  //   function for viewing the release certificate

  // const openNewTab = () => {
  //   const newTab = window.open("", "_blank");
  //   newTab.document.write("<html><head><title>ReleaseCertificate</title>");

  //   newTab.document.write(
  //     '<link rel="stylesheet" type="text/css" href="certificate.css">'
  //   );

  //   newTab.document.write("</head><body><div><table>");

  //   ReactDOM.render(<ReleaseCertificate />, newTab.document.body);

  //   newTab.document.write("</table></div></body></html>");
  //   newTab.document.close();
  // };

  // const handleClick = () => {
  //   setShowComponent(true);
  // };

  const handleJobCheckBoxChange = (e) => {
    let name = e.target.name;
    let value = e.target.checked;
    if (value == true) {
      setJob({ ...job, [name]: 1 });
    } else if (value == false) {
      setJob({ ...job, [name]: 0 });
    }
  };
  const handleJobInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setJob({ ...job, [name]: value });
  };

  // placesOfWork functions
  const [placesOfWork, sePlacesOfWork] = useState({
    work_location_position: "",
    perimeter: "",
    height: "",
    depth: "",
  });

  const handlePlaceWorkInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    sePlacesOfWork({ ...placesOfWork, [name]: value });
  };

  // workOrder functions
  const [workOrder, setWorkOrder] = useState({
    working_methods: "",
    to_be_caried_out: "",
  });

  const handleWorkOrderInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setWorkOrder({ ...workOrder, [name]: value });
  };

  // fileHazard functions
  const [fileHazard, setFileHazard] = useState({
    removal_of_moveable_material: 0,
    removal_of_wall_celling: 0,
    coverage_stationary_material: 0,
    sealing_of_openings: 0,
    file_hazard_other: 0,
    other_text: "",
    name: "",
    executed: "",
    signature: "",
    fire_extinguisher: 0,
    water: 0,
    powder: 0,
    co2: 0,
    other_agent: 0,
    other_agent_name: "",
    fire_blanket: 0,
    connected_water_hose: 0,
    bucket_filled_water: 0,
    notification_fire_department: 0,
    other_extingushing_agent: 0,
    other_extingushing_agent_name: "",
    firepost_name: 0,
    during_file_hazardas_work_name: 0,
    fire_guard_name: 0,
    after_completion_of_fire_hazardus: 0,
    duration: "",
    hours: "",
  });
  const handleFileHazardCheckBoxChange = (e) => {
    alert("working");
    let name = e.target.name;
    let value = e.target.checked;
    if (value == true) {
      setFileHazard({ ...fileHazard, [name]: 1 });
    } else if (value == false) {
      setFileHazard({ ...fileHazard, [name]: 0 });
    }
  };
  const handleFileHazardInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFileHazard({ ...fileHazard, [name]: value });
  };
  const formatIntoPngFileHazard = () => {
    if (sigCanvasFileHazard.current) {
      let dataURL = sigCanvasFileHazard.current.toDataURL();
      setFileHazard({ ...fileHazard, signature: dataURL });
      return dataURL;
    }
  };

  // explosionHazard functions
  const [explosionHazard, setExplosionHazard] = useState({
    removal_of_explosive_substance: 0,
    explosive_hazard_in_pipelines: 0,
    sealing_of_stationary_containers: 0,
    ventilation_measures: 0,
    setting_up_gas_detector: 0,
    setting_up_gas_detector_text: "",
    explosion_hazard_other: 0,
    other_text: "",
    name: "",
    executed: "",
    signature: "",
    monitoring: 0,
    monitoring_name: "",
    after_complete_fire_hazard: 0,
    after_complete_fire_hazard_hours: "",
    after_complete_fire_hazard_name: "",
  });
  const handleExplosionHazardCheckBoxChange = (e) => {
    let name = e.target.name;
    let value = e.target.checked;
    if (value == true) {
      setExplosionHazard({ ...explosionHazard, [name]: 1 });
    } else if (value == false) {
      setExplosionHazard({ ...explosionHazard, [name]: 0 });
    }
  };
  const handleExplosionHazardInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setExplosionHazard({ ...explosionHazard, [name]: value });
  };
  const formatIntoPngExplosionHazard = () => {
    if (sigCanvasExplosionHazard.current) {
      let dataURL = sigCanvasExplosionHazard.current.toDataURL();
      setExplosionHazard({ ...explosionHazard, signature: dataURL });
      return dataURL;
    }
  };

  // alerting functions
  const [alerting, setAlerting] = useState({
    fire_alarm: "",
    phone: "",
    fire_department_call_no: "",
  });

  const handleAlertingInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setAlerting({ ...alerting, [name]: value });
  };

  // client functions
  const [client, setClient] = useState({
    date: "",
    signature_of_plant_manager: "",
  });

  const handleClientInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setClient({ ...client, [name]: value });
  };
  const formatIntoPngClient = () => {
    if (sigCanvasClient.current) {
      let dataURL = sigCanvasClient.current.toDataURL();
      setClient({ ...client, signature_of_plant_manager: dataURL });
      return dataURL;
    }
  };

  // contractor functions
  const [contractor, setContractor] = useState({
    date: "",
    signature_of_contractor: "",
    signature: "",
  });

  const handleContractorInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setContractor({ ...contractor, [name]: value });
  };
  const formatIntoPngContractorSig = () => {
    if (sigCanvasContractorSig.current) {
      let sigCanvasContractorSigDataURL =
        sigCanvasContractorSig.current.toDataURL();
      setContractor({
        ...contractor,
        signature_of_contractor: sigCanvasContractorSigDataURL,
      });
      setCertificateForm({ ...certificateForm, contractor: contractor });
      // setCertificateForm({ ...certificateForm, contractor: {"signature_of_contractor": sigCanvasContractorSigDataURL} })
      // setCertificateForm({ ...certificateForm, contractor: contractor })
      return sigCanvasContractorSigDataURL;
    }
  };
  const formatIntoPngContractor = () => {
    if (sigCanvasContractor.current) {
      let sigCanvasContractorataURL = sigCanvasContractor.current.toDataURL();
      setContractor({ ...contractor, signature: sigCanvasContractorataURL });
      setCertificateForm({
        ...certificateForm,
        contractor: { ...contractor, signature: sigCanvasContractorataURL },
      });
      // setCertificateForm({ ...certificateForm, contractor: {"signature": sigCanvasContractorataURL} })
      return sigCanvasContractorataURL;
    }
  };
  // certificateForm functions
  const [certificateForm, setCertificateForm] = useState({
    location: "",
    sequence_no: "",
    job: job,
    places_of_work: placesOfWork,
    work_order: workOrder,
    file_hazard: fileHazard,
    explosion_hazard: explosionHazard,
    alerting: alerting,
    client: client,
    contractor: contractor,
  });

  const handleNextStep = (e) => {
    e.preventDefault();
    setPage((currPage) => currPage + 1);
    setCertificateForm({
      ...certificateForm,
      job: job,
      places_of_work: placesOfWork,
      work_order: workOrder,
      file_hazard: fileHazard,
      explosion_hazard: explosionHazard,
      alerting: alerting,
      client: client,
      contractor: contractor,
    });
  };

  // Create PDF
  const handleCreatePdf = (e) => {
    e.preventDefault();
    setCertificateForm({
      ...certificateForm,
      job: job,
      places_of_work: placesOfWork,
      work_order: workOrder,
      file_hazard: fileHazard,
      explosion_hazard: explosionHazard,
      alerting: alerting,
      client: client,
      contractor: contractor,
    });
    console.log("pdf certificate form::", certificateForm);
    /*if (!certificateForm.alerting.fire_alarm) {
      document.getElementById("fire_alarm_error").innerHTML =
        "* Fire alarm cannot be left empty";
    }
    if (!certificateForm.alerting.fire_department_call_no) {
      document.getElementById("fire_department_call_no_error").innerHTML =
        "* Fire department call no cannot be left empty";
    }
    if (!certificateForm.alerting.phone) {
      document.getElementById("phone_error").innerHTML =
        "* Phone cannot be left empty";
    }
    if (!certificateForm.client.date) {
      document.getElementById("client_date_error").innerHTML =
        "* Client date cannot be left empty";
    }
    if (!certificateForm.signature_of_plant_manager) {
      document.getElementById("signature_of_plant_manager_error").innerHTML =
        "* Signature of plant manager cannot be left empty";
    }
    if (!certificateForm.contractor.date) {
      document.getElementById("contractor_date_error").innerHTML =
        "* Contractor date cannot be left empty";
    }
    if (!certificateForm.contractor.signature) {
      document.getElementById("signature_error").innerHTML =
        "* Signature cannot be left empty";
    }
    if (!certificateForm.contractor.signature_of_contractor) {
      document.getElementById("signature_of_contractor_error").innerHTML =
        "* Signature of contractor cannot be left empty";
    }
    if (!certificateForm.explosion_hazard.after_complete_fire_hazard) {
      document.getElementById("after_complete_fire_hazard_error").innerHTML =
        "* After complete fire hazard cannot be left empty";
    }
    if (!certificateForm.explosion_hazard.after_complete_fire_hazard_hours) {
      document.getElementById(
        "after_complete_fire_hazard_hours_error"
      ).innerHTML = "* After complete fire hazard hours cannot be left empty";
    }
    if (!certificateForm.explosion_hazard.after_complete_fire_hazard_name) {
      document.getElementById(
        "after_complete_fire_hazard_name_error"
      ).innerHTML = "* After complete fire hazard name cannot be left empty";
    }
    if (!certificateForm.explosion_hazard.executed) {
      document.getElementById("explosion_hazard_executed_error").innerHTML =
        "* Executed cannot be left empty";
    }
    if (!certificateForm.explosion_hazard.explosive_hazard_in_pipelines) {
      document.getElementById("explosive_hazard_in_pipelines_error").innerHTML =
        "* Explosive hazard in pipelines cannot be left empty";
    }
    if (!certificateForm.explosion_hazard.monitoring) {
      document.getElementById("monitoring_error").innerHTML =
        "* Monitoring cannot be left empty";
    }
    if (!certificateForm.explosion_hazard.monitoring_name) {
      document.getElementById("monitoring_name_error").innerHTML =
        "* Monitoring name cannot be left empty";
    }
    if (!certificateForm.explosion_hazard.name) {
      document.getElementById("explosion_hazard_name_error").innerHTML =
        "* Name cannot be left empty";
    }
    if (!certificateForm.explosion_hazard.other) {
      document.getElementById("explosion_hazard_other_error").innerHTML =
        "* Other cannot be left empty";
    }
    if (!certificateForm.explosion_hazard.other_text) {
      document.getElementById("explosion_hazard_other_text_error").innerHTML =
        "* Other_text cannot be left empty";
    }
    if (!certificateForm.explosion_hazard.removal_of_explosive_substance) {
      document.getElementById(
        "removal_of_explosive_substance_error"
      ).innerHTML = "* Removal_of_explosive_substance cannot be left empty";
    }
    if (!certificateForm.explosion_hazard.sealing_of_stationary_containers) {
      document.getElementById(
        "sealing_of_stationary_containers_error"
      ).innerHTML = "* Sealing of stationary containers cannot be left empty";
    }
    if (!certificateForm.explosion_hazard.setting_up_gas_detector) {
      document.getElementById("setting_up_gas_detector_error").innerHTML =
        "* Setting up gas detector cannot be left empty";
    }
    if (!certificateForm.explosion_hazard.setting_up_gas_detector_text) {
      document.getElementById("setting_up_gas_detector_text_error").innerHTML =
        "* Setting up gas detector text cannot be left empty";
    }
    if (!certificateForm.explosion_hazard.signature) {
      document.getElementById("explosion_hazard_signature_error").innerHTML =
        "* Explosion hazard signature cannot be left empty";
    }
    if (!certificateForm.explosion_hazard.ventilation_measures) {
      document.getElementById("ventilation_measures_error").innerHTML =
        "* Ventilation measures cannot be left empty";
    }
    if (!certificateForm.file_hazard.after_completion_of_fire_hazardus) {
      document.getElementById(
        "after_completion_of_fire_hazardus_error"
      ).innerHTML = "* After completion of fire hazardus cannot be left empty";
    }
    if (!certificateForm.file_hazard.bucket_filled_water) {
      document.getElementById("bucket_filled_water_error").innerHTML =
        "* bucket_filled_water cannot be left empty";
    }
    if (!certificateForm.file_hazard.co2) {
      document.getElementById("co2_error").innerHTML =
        "* co2 cannot be left empty";
    }
    if (!certificateForm.file_hazard.connected_water_hose) {
      document.getElementById("connected_water_hose_error").innerHTML =
        "* Connected water hose cannot be left empty";
    }
    if (!certificateForm.file_hazard.coverage_stationary_material) {
      document.getElementById("coverage_stationary_material_error").innerHTML =
        "* Coverage stationary material cannot be left empty";
    }
    if (!certificateForm.file_hazard.duration) {
      document.getElementById("duration_error").innerHTML =
        "* Duration cannot be left empty";
    }
    if (!certificateForm.file_hazard.during_file_hazardas_work_name) {
      document.getElementById(
        "during_file_hazardas_work_name_error"
      ).innerHTML = "* During file hazardas work name cannot be left empty";
    }
    if (!certificateForm.file_hazard.executed) {
      document.getElementById("executed_error").innerHTML =
        "* Executed cannot be left empty";
    }
    if (!certificateForm.file_hazard.fire_blanket) {
      document.getElementById("fire_blanket_error").innerHTML =
        "* Fire_blanket cannot be left empty";
    }
    if (!certificateForm.file_hazard.fire_extinguisher) {
      document.getElementById("fire_extinguisher_error").innerHTML =
        "* Fire extinguisher cannot be left empty";
    }
    if (!certificateForm.file_hazard.fire_guard_name) {
      document.getElementById("fire_guard_name_error").innerHTML =
        "* Fire guard name cannot be left empty";
    }
    if (!certificateForm.file_hazard.firepost_name) {
      document.getElementById("firepost_name_error").innerHTML =
        "* Firepost name cannot be left empty";
    }
    if (!certificateForm.file_hazard.hours) {
      document.getElementById("hours_error").innerHTML =
        "* Hours cannot be left empty";
    }
    if (!certificateForm.file_hazard.name) {
      document.getElementById("file_hazard_name_error").innerHTML =
        "* name cannot be left empty";
    }
    if (!certificateForm.file_hazard.notification_fire_department) {
      document.getElementById("notification_fire_department_error").innerHTML =
        "* Notification fire department cannot be left empty";
    }
    if (!certificateForm.file_hazard.other) {
      document.getElementById("file_hazard_other_error").innerHTML =
        "* Other cannot be left empty";
    }
    if (!certificateForm.file_hazard.other_agent) {
      document.getElementById("other_agent_error").innerHTML =
        "* Other agent cannot be left empty";
    }
    if (!certificateForm.file_hazard.other_agent_name) {
      document.getElementById("other_agent_name_error").innerHTML =
        "* Other agent name cannot be left empty";
    }
    if (!certificateForm.file_hazard.other_extingushing_agent) {
      document.getElementById("other_extingushing_agent_error").innerHTML =
        "* Other extingushing agent cannot be left empty";
    }
    if (!certificateForm.file_hazard.other_extingushing_agent_name) {
      document.getElementById("other_extingushing_agent_name_error").innerHTML =
        "* Other extingushing agent name cannot be left empty";
    }
    if (!certificateForm.file_hazard.other_text) {
      document.getElementById("file_hazard_other_text_error").innerHTML =
        "* Other text cannot be left empty";
    }
    if (!certificateForm.file_hazard.powder) {
      document.getElementById("powder_error").innerHTML =
        "* Powder cannot be left empty";
    }
    if (!certificateForm.file_hazard.removal_of_moveable_material) {
      document.getElementById("removal_of_moveable_material_error").innerHTML =
        "* Removal of moveable material cannot be left empty";
    }
    if (!certificateForm.file_hazard.removal_of_wall_celling) {
      document.getElementById("removal_of_wall_celling_error").innerHTML =
        "* Removal of wall celling cannot be left empty";
    }
    if (!certificateForm.file_hazard.sealing_of_openings) {
      document.getElementById("sealing_of_openings_error").innerHTML =
        "* Sealing of openings cannot be left empty";
    }
    if (!certificateForm.file_hazard.signature) {
      document.getElementById("file_hazard_signature_error").innerHTML =
        "* Signature cannot be left empty";
    }
    if (!certificateForm.file_hazard.water) {
      document.getElementById("water_error").innerHTML =
        "* Water cannot be left empty";
    }
    if (!certificateForm.job.hot_gluing) {
      if (!certificateForm.job.soldering) {
        if (certificateForm.job.cutting_loop === 0) {
          if (!certificateForm.job.defrost) {
            if (!certificateForm.job.other) {
              document.getElementById("job_other_error").innerHTML =
                "* Atleast one must be selected";
            }
            if (certificateForm.job.other) {
              if (!certificateForm.job.other_text) {
                document.getElementById("job_other_text_error").innerHTML =
                  "* Other text cannot be left empty";
              }
            }
          }
        }
      }
    }
    if (!certificateForm.job.welding_cutting_process) {
      document.getElementById("welding_cutting_process_error").innerHTML =
        "* Welding cutting process cannot be left empty";
    }
    if (!certificateForm.location) {
      document.getElementById("location_error").innerHTML =
        "* Location cannot be left empty";
    }
    if (!certificateForm.places_of_work.depth) {
      document.getElementById("depth_error").innerHTML =
        "* Depth cannot be left empty";
    }
    if (!certificateForm.places_of_work.height) {
      document.getElementById("height_error").innerHTML =
        "* Height cannot be left empty";
    }
    if (!certificateForm.places_of_work.perimeter) {
      document.getElementById("perimeter_error").innerHTML =
        "* Perimeter cannot be left empty";
    }
    if (!certificateForm.places_of_work.work_location_position) {
      document.getElementById("work_location_position_error").innerHTML =
        "* Work location position cannot be left empty";
    }
    if (!certificateForm.sequence_no) {
      document.getElementById("sequence_no_error").innerHTML =
        "* Sequence_no cannot be left empty";
    }
    if (!certificateForm.work_order.to_be_caried_out) {
      document.getElementById("to_be_caried_out_error").innerHTML =
        "* To be caried out cannot be left empty";
    }
    if (!certificateForm.work_order.working_methods) {
      document.getElementById("working_methods_error").innerHTML =
        "* Working methods cannot be left empty";
    }*/
    createFormAPI(certificateForm);
    setOpenTemplate(false);
  };
  const handleUpdatePdf = (e) => {
    e.preventDefault();
    setCertificateForm({
      ...certificateForm,
      job: job,
      places_of_work: placesOfWork,
      work_order: workOrder,
      file_hazard: fileHazard,
      explosion_hazard: explosionHazard,
      alerting: alerting,
      client: client,
      contractor: contractor,
    });
    console.log("pdf certificate form::", certificateForm);
    updateFormAPI(certificateForm);
    setOpenTemplate(false);
  };

  const updateFormAPI = async (data) => {
    try {
      const res = await fetch(`${API}/update-form/${edit_id}`, {
        method: "PUT",
        headers: {
          "x-access-token": token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      console.log("json", json);
      if (json) {
        toast.success("Updated successully");
        setupdate(false);
      }
      setCertificateForm({
        location: "",
        sequence_no: "",
        job: job,
        places_of_work: placesOfWork,
        work_order: workOrder,
        file_hazard: fileHazard,
        explosion_hazard: explosionHazard,
        alerting: alerting,
        client: client,
        contractor: contractor,
      });
    } catch (err) {
      console.log("Update Error", err);
    }
  };

  // Create Word
  const handleCreateWord = (e) => {
    e.preventDefault();
    setCertificateForm({
      ...certificateForm,
      job: job,
      places_of_work: placesOfWork,
      work_order: workOrder,
      file_hazard: fileHazard,
      explosion_hazard: explosionHazard,
      alerting: alerting,
      client: client,
      contractor: contractor,
    });
    createFormAPI(certificateForm);
    setOpenTemplate(false);
  };

  async function pdfDownloadFormAPI(id) {
    let result = await fetch(`${API}/get-form/${id}`, {
      method: "GET",
      headers: {
        "x-access-token": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log("result from get work release::", result);
    /*if (result) {
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

      //console.log("date::", result.date.substring(0, 10));
      document.getElementById("evacuation_date").innerHTML =
        result.date.substring(0, 10);
      var doc = new jsPDF("p", "pt");
      doc.html(document.querySelector("#body"), {
        callback: function (pdf) {
          var file = new File([pdf.output()], "work_release.pdf", {
            type: "application/pdf",
          });
          console.log("pdf file:: ", file);
          setPdfFile(file);
        },
      });
    }*/
  }

  const createCacheReleaseAPI = async (data, id, format) => {
    console.log("format::", format);
    console.log("data from release form::", data);
    try {
      const res = await fetch(`${API}/create-cache-release/${id}`, {
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
        pdfDownloadFormAPI(json.data._id);
      } else if (json.message === "Updated Successfully.") {
        toast.success("Cache Updated Successfully.");
        edit_id = 0;
      } else {
        toast.error(json.message.message);
      }
      getFormAPI();
    } catch (err) {
      console.log("cacheFormAPI error::", err);
      toast.error(err);
    }
  };

  const cache_release_certificate = () => {
    let cache_release_certificate = {
      location: selectedLocationId,
      sequence_no: sequence.length + 1,
      job: job,
      places_of_work: placesOfWork,
      work_order: workOrder,
      file_hazard: fileHazard,
      explosion_hazard: explosionHazard,
      alerting: alerting,
      client: client,
      contractor: contractor,
    };
    createCacheReleaseAPI(cache_release_certificate, edit_id, "pdf");
  };

  async function editWorkRelease(id) {
    edit_id = id;
    setupdate(true);
    setOpenTemplate(true);
    let result = await fetch(`${API}/get-form/${id}`, {
      method: "GET",
      headers: {
        "x-access-token": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log("result from get work release::", result);
    setAlerting(result.alerting);
    setClient(result.client);
    setContractor(result.contractor);
    setExplosionHazard(result.explosion_hazard);
    setFileHazard(result.file_hazard);
    setJob(result.job);
    sePlacesOfWork(result.places_of_work);
    setWorkOrder(result.work_order);
  }

  // create form
  const createForm = (e) => {
    e.preventDefault();
    setOpenTemplate(true);
    setupdate(false);
    edit_id = 0;
    setCertificateForm({
      ...certificateForm,
      location: selectedLocationId,
      sequence_no: sequence.length + 1,
    });
    console.log("certificateForm:::", certificateForm);
  };

  // Api
  const user = JSON.parse(localStorage.getItem("user-info"));
  const token = user?.token;
  // Create Form
  const createFormAPI = (data) => {
    return fetch(`${API}/create-form`, {
      method: "POST",
      headers: {
        "x-access-token": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("createFormAPI::", json);
        if (json) {
          toast.success("Form submitted successfully");
          pdfDownloadFormAPI(json._id);
          setAddDocument(true);
          setCategoryList(false);
        }
        getFormAPI();
      })
      .catch((err) => {
        console.log("createFormAPI error::", err);
      });
  };
  // Get Form
  const getFormAPI = (data) => {
    return fetch(`${API}/get-form-data/${selectedLocationId}`, {
      method: "GET",
      headers: {
        "x-access-token": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("getForm::", json.length);
        fetch(`${API}/get-cache-release-data/${selectedLocationId}`, {
          method: "GET",
          headers: {
            "x-access-token": token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((json2) => {
            setSequence(json.concat(json2));
            setCertificateFormData(json.concat(json2));
          });
      })
      .catch((err) => {
        console.log("getForm error::", err);
      });
  };

  // Delete TaskBar using API
  async function deleteFormAPI(id) {
    let result = await fetch(`${API}/delete-form/${id}`, {
      method: "DELETE",
      headers: {
        "x-access-token": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    getFormAPI();
  }

  // Use Effect
  useEffect(() => {
    getFormAPI();
  }, [selectedLocationId]);

  return (
    <>
      <div className="main-body">
        <div className="heading_box officerRegulation_head">
          {/* <h2 className="dasshboard_heading">Ticketing System</h2> */}
          <ul className="breadcrumb">
            <li>Dashboard</li>
            <li className="active">Ticketing System</li>
          </ul>
        </div>
        <div className="officerRegulation_body ">
          <div className="row">
            <div className="col-lg-6">
              <div className="officerRegulation_box">
                <div className="officerRegulation_cmn-box">
                  <h5 className="officerRegulation_heading">
                    Work release certificate
                  </h5>
                  <div className="officerRegulation_innerbox">
                    <div className="officerRegulation_headingBox">
                      <h5 className="officerRegulation_heading">
                        Fire Hazardous Work Release Certificate
                      </h5>
                      <div className="officerRegulation_headingWrap">
                        {/* <button className='btn cmn_yellow_bg'>
                                                <svg className="icon" aria-labelledby="Add Item">
                                                    <title id="addItem">Add Item</title>
                                                    <use
                                                        xlinkHref="/assets/svg-icons/icons.svg#addItem"
                                                        xlinkTitle="Add Item"
                                                    ></use>
                                                </svg>
                                            </button> */}
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
                              {/* <CloudUploadOutlinedIcon className="cloudUplaod" color="action" /> */}
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
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                              >
                                Open
                              </button>
                              <ul
                                className={`dropdown-menu`}
                                aria-labelledby="dropdownMenuButton1"
                              >
                                {certificateFormData.length > 0 ? (
                                  certificateFormData?.map((curelem, index) => {
                                    return (
                                      <>
                                        <li key={index}>
                                          <ul className="certificateFormCont">
                                            <li className="sequenceNo">
                                              {index + 1}
                                            </li>
                                            <li className="activity">
                                              {curelem?.job?.cutting_loop ==
                                              true
                                                ? "Cutting loop"
                                                : ""}
                                              {curelem?.job?.defrost == true
                                                ? "defrost"
                                                : ""}
                                              {curelem?.job?.hot_gluing == true
                                                ? "Hot gluing"
                                                : ""}
                                              {curelem?.job?.soldering == true
                                                ? "Soldering"
                                                : ""}
                                              {curelem?.job
                                                ?.welding_cutting_process ==
                                              true
                                                ? "Welding cutting process"
                                                : ""}
                                              {curelem?.job?.other == true
                                                ? curelem?.job?.other_text
                                                : ""}
                                            </li>
                                            <li className="workLocation">
                                              {
                                                curelem?.places_of_work
                                                  ?.work_location_position
                                              }
                                            </li>
                                            <li
                                              className="action"
                                              onClick={(e) => {
                                                deleteFormAPI(curelem._id);
                                              }}
                                            >
                                              <DeleteOutlinedIcon
                                                className="Delete "
                                                color="action"
                                              />
                                            </li>
                                            <li className="Edit">
                                              <EditIcon
                                                onClick={(e) => {
                                                  editWorkRelease(curelem._id);
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
                      cache_release_certificate();
                      setOpenTemplate(false);
                    }}
                  />
                  <div className="formPop" ref={pdfRef}>
                    <div className="form-head">
                      <button
                        className={`${page >= 0 && "active"}`}
                        onClick={(e) => {
                          setPage((currPage) => (currPage = 0));
                        }}
                      >
                        Job
                      </button>
                      <button
                        className={`${page >= 1 && "active"}`}
                        onClick={(e) => {
                          setPage((currPage) => (currPage = 1));
                        }}
                      >
                        place of work
                      </button>
                      <button
                        className={`${page >= 2 && "active"}`}
                        onClick={(e) => {
                          setPage((currPage) => (currPage = 2));
                        }}
                      >
                        work order
                      </button>
                      <button
                        className={`${page >= 3 && "active"}`}
                        onClick={(e) => {
                          setPage((currPage) => (currPage = 3));
                        }}
                      >
                        fire hazard
                      </button>
                      <button
                        className={`${page >= 6 && "active"}`}
                        onClick={(e) => {
                          setPage((currPage) => (currPage = 6));
                        }}
                      >
                        explosion hazard
                      </button>
                      <button
                        className={`${page >= 9 && "active"}`}
                        onClick={(e) => {
                          setPage((currPage) => (currPage = 9));
                        }}
                      >
                        alerting
                      </button>
                      <button
                        className={`${page >= 10 && "active"}`}
                        onClick={(e) => {
                          setPage((currPage) => (currPage = 10));
                        }}
                      >
                        client
                      </button>
                      <button
                        className={`${page >= 11 && "active"}`}
                        onClick={(e) => {
                          setPage((currPage) => (currPage = 11));
                        }}
                      >
                        contractor
                      </button>
                      {/* {
                                            formTitles.map((curElem, index) => {
                                                return (
                                                    <>
                                                        <button className={`${page >= index && 'active'}`} onClick={(e) => {
                                                            if (page > index) {
                                                                setPage((currPage) => currPage = index)
                                                            }
                                                        }}>{curElem}</button>
                                                    </>
                                                )
                                            })
                                        } */}
                    </div>
                    <div className="formPop-body-wrap">
                      <div className="formPop-head">
                        <h6>Permit for work involving fire hazards </h6>
                        <div className="form-group">
                          <label htmlFor="sequence_no">Sequence Number:</label>
                          <input
                            type="text"
                            name="sequence_no"
                            id="sequence_no"
                            value={certificateForm.sequence_no}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="formPop-forms">
                        {/* JobForm */}
                        <div
                          className={`formPop-cmn ${page === 0 && "active"}`}
                          id="jobform"
                        >
                          <div className="formPop-body">
                            <h6>Type of activity:</h6>
                            <div className="formPop-flex">
                              <div className="ctm-checkbox">
                                <label
                                  className="ctm-checkbox-container"
                                  htmlFor="welding_cutting_process"
                                  onChange={(e) => {
                                    handleJobCheckBoxChange(e);
                                  }}
                                >
                                  Welding, cutting and allied processes (welding
                                  permit)
                                  <input
                                    type="checkbox"
                                    checked={job.welding_cutting_process}
                                    name="welding_cutting_process"
                                    id="welding_cutting_process"
                                  />
                                  <span className="ctm-checkbox-checkmark"></span>
                                </label>
                              </div>
                            </div>
                            <div
                              className="errors"
                              id="welding_cutting_process_error"
                            ></div>
                            <div className="formPop-flex">
                              <div className="ctm-checkbox">
                                <label
                                  className="ctm-checkbox-container"
                                  htmlFor="cutting_loop"
                                  onChange={(e) => {
                                    handleJobCheckBoxChange(e);
                                  }}
                                >
                                  Cutting loops
                                  <input
                                    type="checkbox"
                                    name="cutting_loop"
                                    id="cutting_loop"
                                    checked={job.cutting_loop}
                                  />
                                  <span className="ctm-checkbox-checkmark"></span>
                                </label>
                              </div>
                              <div
                                className="errors"
                                id="cutting_loop_error"
                              ></div>
                              <div className="ctm-checkbox">
                                <label
                                  className="ctm-checkbox-container"
                                  htmlFor="soldering"
                                  onChange={(e) => {
                                    handleJobCheckBoxChange(e);
                                  }}
                                >
                                  Soldering
                                  <input
                                    type="checkbox"
                                    name="soldering"
                                    id="soldering"
                                    checked={job.soldering}
                                  />
                                  <span className="ctm-checkbox-checkmark"></span>
                                </label>
                              </div>
                              <div
                                className="errors"
                                id="soldering_error"
                              ></div>
                              <div className="ctm-checkbox">
                                <label
                                  className="ctm-checkbox-container"
                                  htmlFor="defrost"
                                  onChange={(e) => {
                                    handleJobCheckBoxChange(e);
                                  }}
                                >
                                  Defrost
                                  <input
                                    type="checkbox"
                                    name="defrost"
                                    id="defrost"
                                    checked={job.defrost}
                                  />
                                  <span className="ctm-checkbox-checkmark"></span>
                                </label>
                              </div>
                              <div className="errors" id="defrost_error"></div>
                              <div className="ctm-checkbox">
                                <label
                                  className="ctm-checkbox-container"
                                  htmlFor="hot_gluing"
                                  onChange={(e) => {
                                    handleJobCheckBoxChange(e);
                                  }}
                                >
                                  Hot gluing
                                  <input
                                    type="checkbox"
                                    name="hot_gluing"
                                    id="hot_gluing"
                                    checked={job.hot_gluing}
                                  />
                                  <span className="ctm-checkbox-checkmark"></span>
                                </label>
                              </div>
                              <div
                                className="errors"
                                id="hot_gluing_error"
                              ></div>
                            </div>
                            <div className="formPop-flex">
                              <div className="ctm-checkbox ctm-checbnoxInput">
                                <input
                                  type="text"
                                  name="other_text"
                                  id="other_text"
                                  value={job.other_text}
                                  onChange={(e) => handleJobInputChange(e)}
                                />
                                <label
                                  className="ctm-checkbox-container"
                                  htmlFor="job_check_other"
                                  onChange={(e) => {
                                    handleJobCheckBoxChange(e);
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    name="job_check_other"
                                    id="job_check_other"
                                    checked={job.job_check_other}
                                  />
                                  <span className="ctm-checkbox-checkmark"></span>
                                </label>
                              </div>
                            </div>
                            <div className="errors" id="job_other_error"></div>
                            <div
                              className="errors"
                              id="job_other_text_error"
                            ></div>
                          </div>
                        </div>
                        {/* Place of work */}
                        <div
                          className={`formPop-cmn ${page === 1 && "active"}`}
                          id="placeForWork"
                        >
                          {/* <div className="formPop-head">
                                                    <h6>Permit for work involving fire hazards </h6>
                                                    <h6>Sequence Number: <span></span> </h6>
                                                </div> */}
                          <div className="formPop-body">
                            <div className="formPop-flex">
                              <div className="form-group">
                                <label htmlFor="work_location_position">
                                  Work location/position:
                                </label>
                                <div className="text-box-flexwrap">
                                  <input
                                    type="text"
                                    name="work_location_position"
                                    id="work_location_position"
                                    value={placesOfWork.work_location_position}
                                    onChange={(e) => {
                                      handlePlaceWorkInputChange(e);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div
                              className="errors"
                              id="work_location_position_error"
                            ></div>
                            <h6>Fire/explosion hazard area:</h6>
                            <p className="simple-formPop-text">
                              Spatial extent around the work site:{" "}
                            </p>
                            <div className="formPop-flex">
                              <div className="form-group">
                                <label htmlFor="perimeter">
                                  Perimeter (radius) of{" "}
                                </label>
                                <input
                                  type="text"
                                  name="perimeter"
                                  id="perimeter"
                                  value={placesOfWork.perimeter}
                                  onChange={(e) => {
                                    handlePlaceWorkInputChange(e);
                                  }}
                                />
                              </div>

                              <div className="form-group">
                                <label htmlFor="height">m, height of </label>
                                <input
                                  type="text"
                                  name="height"
                                  id="height"
                                  value={placesOfWork.height}
                                  onChange={(e) => {
                                    handlePlaceWorkInputChange(e);
                                  }}
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="depth">m, depth of </label>
                                <input
                                  type="text"
                                  name="depth"
                                  id="depth"
                                  value={placesOfWork.depth}
                                  onChange={(e) => {
                                    handlePlaceWorkInputChange(e);
                                  }}
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="">m</label>
                              </div>
                            </div>
                            <div className="errors" id="depth_error"></div>
                            <br />
                            <div className="errors" id="perimeter_error"></div>
                            <br />
                            <div className="errors" id="height_error"></div>
                          </div>
                        </div>
                        {/* Work Order */}
                        <div
                          className={`formPop-cmn ${page === 2 && "active"}`}
                          id="workOrder"
                        >
                          <div className="formPop-body">
                            <div className="formPop-flex">
                              <div className="form-group">
                                <label htmlFor="working_methods">
                                  Work Order:
                                  <span className="smallText-formPop">
                                    (e.g. cut off beams) <br /> Working method
                                  </span>
                                </label>
                                <div className="text-box-flexwrap">
                                  <input
                                    type="text"
                                    name="working_methods"
                                    id="working_methods"
                                    value={workOrder.working_methods}
                                    onChange={(e) => {
                                      handleWorkOrderInputChange(e);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div
                              className="errors"
                              id="working_methods_error"
                            ></div>
                            <div className="formPop-flex">
                              <div className="form-group">
                                <label htmlFor="to_be_caried_out">
                                  To be carried out by:
                                  <span className="smallText-formPop">
                                    (name, tel. no., etc.)
                                  </span>
                                </label>
                                <div className="text-box-flexwrap">
                                  <input
                                    type="text"
                                    name="to_be_caried_out"
                                    id="to_be_caried_out"
                                    value={workOrder.to_be_caried_out}
                                    onChange={(e) => {
                                      handleWorkOrderInputChange(e);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div
                              className="errors"
                              id="to_be_caried_out_error"
                            ></div>
                          </div>
                        </div>
                        {/* File Hazard */}
                        <div
                          className={`formPop-cmn ${
                            page > 2 && page < 6 && "active"
                          }`}
                          id="fileHazard"
                        >
                          <div className="formPop-body">
                            <h6>Safety measures in case of fire hazard </h6>
                            <div
                              className={`formPop-box ${
                                page === 3 && "active"
                              }`}
                            >
                              <p className="simple-formPop-text">
                                Eliminate the fire hazard
                              </p>
                              <div className="formPop-flex flex-wrap">
                                <div className="ctm-checkbox">
                                  <label
                                    className="ctm-checkbox-container"
                                    htmlFor="removal_of_moveable_material"
                                    onChange={(e) => {
                                      handleFileHazardCheckBoxChange(e);
                                    }}
                                  >
                                    Removal of movable combustible materials and
                                    objects - including dust deposits, if
                                    necessary
                                    <input
                                      type="checkbox"
                                      name="removal_of_moveable_material"
                                      id="removal_of_moveable_material"
                                      checked={
                                        fileHazard.removal_of_moveable_material
                                      }
                                    />
                                    <span className="ctm-checkbox-checkmark"></span>
                                  </label>
                                </div>
                                <div
                                  className="errors"
                                  id="removal_of_moveable_material_error"
                                ></div>
                                <div className="ctm-checkbox">
                                  <label
                                    className="ctm-checkbox-container"
                                    htmlFor="removal_of_wall_celling"
                                    onChange={(e) => {
                                      handleFileHazardCheckBoxChange(e);
                                    }}
                                  >
                                    Removal of wall and ceiling coverings
                                    insofar as they cover or conceal combustible
                                    materials or are themselves combustible
                                    <input
                                      type="checkbox"
                                      name="removal_of_wall_celling"
                                      id="removal_of_wall_celling"
                                      checked={
                                        fileHazard.removal_of_wall_celling
                                      }
                                    />
                                    <span className="ctm-checkbox-checkmark"></span>
                                  </label>
                                </div>
                                <div
                                  className="errors"
                                  id="removal_of_wall_celling_error"
                                ></div>
                                <div className="ctm-checkbox">
                                  <label
                                    className="ctm-checkbox-container"
                                    htmlFor="coverage_stationary_material"
                                    onChange={(e) => {
                                      handleFileHazardCheckBoxChange(e);
                                    }}
                                  >
                                    Covering stationary combustible materials
                                    and objects (e.g. wooden beams, walls,
                                    floors, objects, plastic parts) with
                                    suitable means and, if necessary, moistening
                                    them
                                    <input
                                      type="checkbox"
                                      name="coverage_stationary_material"
                                      id="coverage_stationary_material"
                                      checked={
                                        fileHazard.coverage_stationary_material
                                      }
                                    />
                                    <span className="ctm-checkbox-checkmark"></span>
                                  </label>
                                </div>
                                <div
                                  className="errors"
                                  id="coverage_stationary_material_error"
                                ></div>
                                <div className="ctm-checkbox">
                                  <label
                                    className="ctm-checkbox-container"
                                    htmlFor="sealing_of_openings"
                                    onChange={(e) => {
                                      handleFileHazardCheckBoxChange(e);
                                    }}
                                  >
                                    Sealing of openings (e.g. joints, cracks,
                                    wall openings, pipe openings, gutters,
                                    chimneys, shafts to adjacent areas by means
                                    of clay, plaster, mortar, damp earth, etc.)
                                    <input
                                      type="checkbox"
                                      name="sealing_of_openings"
                                      id="sealing_of_openings"
                                      checked={fileHazard.sealing_of_openings}
                                    />
                                    <span className="ctm-checkbox-checkmark"></span>
                                  </label>
                                  <div
                                    className="errors"
                                    id="sealing_of_openings_error"
                                  ></div>
                                </div>
                                <div className="ctm-checkbox ctm-checbnoxInput">
                                  <input
                                    type="text"
                                    name="other_text"
                                    id="other_text"
                                    value={fileHazard.other_text}
                                    onChange={(e) => {
                                      handleFileHazardInputChange(e);
                                    }}
                                  />
                                  <div className="ctm-checkbox">
                                    <label
                                      className="ctm-checkbox-container"
                                      htmlFor="file_hazard_other"
                                      onChange={(e) => {
                                        handleFileHazardCheckBoxChange(e);
                                      }}
                                    >
                                      <input
                                        type="checkbox"
                                        name="file_hazard_other"
                                        id="file_hazard_other"
                                        checked={fileHazard.file_hazard_other}
                                      />
                                      <span className="ctm-checkbox-checkmark"></span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="errors"
                                id="file_hazard_other_text_error"
                              ></div>
                              <div
                                className="errors"
                                id="file_hazard_other_error"
                              ></div>
                            </div>
                            <div
                              className={`formPop-box ${
                                page === 4 && "active"
                              }`}
                            >
                              <p className="simple-formPop-text">
                                Provision of extinguishing agents
                              </p>
                              <div className="formPop-flex">
                                <div className="ctm-checkbox">
                                  <label
                                    className="ctm-checkbox-container"
                                    htmlFor="fire_extinguisher"
                                    onChange={(e) => {
                                      handleFileHazardCheckBoxChange(e);
                                    }}
                                  >
                                    Fire extinguisher with
                                    <input
                                      type="checkbox"
                                      name="fire_extinguisher"
                                      id="fire_extinguisher"
                                      checked={fileHazard.fire_extinguisher}
                                    />
                                    <span className="ctm-checkbox-checkmark"></span>
                                  </label>
                                </div>
                                <div
                                  className="errors"
                                  id="fire_extinguisher_error"
                                ></div>
                                <div className="ctm-checkbox">
                                  <label
                                    className="ctm-checkbox-container"
                                    htmlFor="water"
                                    onChange={(e) => {
                                      handleFileHazardCheckBoxChange(e);
                                    }}
                                  >
                                    Water
                                    <input
                                      type="checkbox"
                                      name="water"
                                      id="water"
                                      checked={fileHazard.water}
                                    />
                                    <span className="ctm-checkbox-checkmark"></span>
                                  </label>
                                </div>
                                <div className="errors" id="water_error"></div>
                                <div className="ctm-checkbox">
                                  <label
                                    className="ctm-checkbox-container"
                                    htmlFor="powder"
                                    onChange={(e) => {
                                      handleFileHazardCheckBoxChange(e);
                                    }}
                                  >
                                    Powder
                                    <input
                                      type="checkbox"
                                      name="powder"
                                      id="powder"
                                      checked={fileHazard.powder}
                                    />
                                    <span className="ctm-checkbox-checkmark"></span>
                                  </label>
                                </div>
                                <div className="errors" id="powder_error"></div>
                                <div className="ctm-checkbox">
                                  <label
                                    className="ctm-checkbox-container"
                                    htmlFor="co2"
                                    onChange={(e) => {
                                      handleFileHazardCheckBoxChange(e);
                                    }}
                                  >
                                    CO2
                                    <input
                                      type="checkbox"
                                      name="co2"
                                      id="co2"
                                      checked={fileHazard.co2}
                                    />
                                    <span className="ctm-checkbox-checkmark"></span>
                                  </label>
                                </div>
                                <div className="errors" id="co2_error"></div>
                                <div className="ctm-checkbox ctm-checbnoxInput">
                                  <input
                                    type="text"
                                    name="other_agent_name"
                                    id="other_agent_name"
                                    value={fileHazard.other_agent_name}
                                    onChange={(e) => {
                                      handleFileHazardInputChange(e);
                                    }}
                                  />
                                  <label
                                    className="ctm-checkbox-container"
                                    htmlFor="other_agent"
                                    onChange={(e) => {
                                      handleFileHazardCheckBoxChange(e);
                                    }}
                                  >
                                    <input
                                      type="checkbox"
                                      name="other_agent"
                                      id="other_agent"
                                      checked={fileHazard.other_agent}
                                    />
                                    <span className="ctm-checkbox-checkmark"></span>
                                  </label>
                                </div>
                                <div
                                  className="errors"
                                  id="other_agent_name_error"
                                ></div>
                                <div
                                  className="errors"
                                  id="other_agent_error"
                                ></div>
                              </div>
                              <div
                                className={`formPop-flex formPop-block flex-wrap}`}
                              >
                                <div className="ctm-checkbox">
                                  <label
                                    className="ctm-checkbox-container"
                                    htmlFor="fire_blanket"
                                    onChange={(e) => {
                                      handleFileHazardCheckBoxChange(e);
                                    }}
                                  >
                                    Fire blankets
                                    <input
                                      type="checkbox"
                                      name="fire_blanket"
                                      id="fire_blanket"
                                      checked={fileHazard.fire_blanket}
                                    />
                                    <span className="ctm-checkbox-checkmark"></span>
                                  </label>
                                </div>
                                <div
                                  className="errors"
                                  id="fire_blanket_error"
                                ></div>
                                <div className="ctm-checkbox">
                                  <label
                                    className="ctm-checkbox-container"
                                    htmlFor="connected_water_hose"
                                    onChange={(e) => {
                                      handleFileHazardCheckBoxChange(e);
                                    }}
                                  >
                                    connected water hose
                                    <input
                                      type="checkbox"
                                      name="connected_water_hose"
                                      id="connected_water_hose"
                                      checked={fileHazard.connected_water_hose}
                                    />
                                    <span className="ctm-checkbox-checkmark"></span>
                                  </label>
                                </div>
                                <div
                                  className="errors"
                                  id="connected_water_hose_error"
                                ></div>
                                <div className="ctm-checkbox">
                                  <label
                                    className="ctm-checkbox-container"
                                    htmlFor="bucket_filled_water"
                                    onChange={(e) => {
                                      handleFileHazardCheckBoxChange(e);
                                    }}
                                  >
                                    bucket filled with water
                                    <input
                                      type="checkbox"
                                      name="bucket_filled_water"
                                      id="bucket_filled_water"
                                      checked={fileHazard.bucket_filled_water}
                                    />
                                    <span className="ctm-checkbox-checkmark"></span>
                                  </label>
                                </div>
                                <div
                                  className="errors"
                                  id="bucket_filled_water_error"
                                ></div>
                                <div className="ctm-checkbox">
                                  <label
                                    className="ctm-checkbox-container"
                                    htmlFor="notification_fire_department"
                                    onChange={(e) => {
                                      handleFileHazardCheckBoxChange(e);
                                    }}
                                  >
                                    Notification of the fire department
                                    <input
                                      type="checkbox"
                                      name="notification_fire_department"
                                      id="notification_fire_department"
                                      checked={
                                        fileHazard.notification_fire_department
                                      }
                                    />
                                    <span className="ctm-checkbox-checkmark"></span>
                                  </label>
                                </div>
                                <div
                                  className="errors"
                                  id="notification_fire_department_error"
                                ></div>
                                <div className="ctm-checkbox ctm-checbnoxInput">
                                  <input
                                    type="text"
                                    name="other_extingushing_agent_name"
                                    id="other_extingushing_agent_name"
                                    value={
                                      fileHazard.other_extingushing_agent_name
                                    }
                                    onChange={(e) => {
                                      handleFileHazardInputChange(e);
                                    }}
                                  />
                                  <label
                                    className="ctm-checkbox-container"
                                    htmlFor="other_extingushing_agent"
                                    onChange={(e) => {
                                      handleFileHazardCheckBoxChange(e);
                                    }}
                                  >
                                    <input
                                      type="checkbox"
                                      name="other_extingushing_agent"
                                      id="other_extingushing_agent"
                                      checked={
                                        fileHazard.other_extingushing_agent
                                      }
                                    />
                                    <span className="ctm-checkbox-checkmark"></span>
                                  </label>
                                </div>
                                <div
                                  className="errors"
                                  id="other_extingushing_agent_name_error"
                                ></div>
                                <div
                                  className="errors"
                                  id="other_extingushing_agent_error"
                                ></div>
                              </div>
                            </div>
                            <div
                              className={`formPop-box ${
                                page === 5 && "active"
                              }`}
                            >
                              <p className="simple-formPop-text">Firepost</p>
                              <div className="formPop-flex flexbox-two-Col-width">
                                <div className="ctm-checkbox">
                                  <label
                                    className="ctm-checkbox-container"
                                    htmlFor="during_file_hazardas_work_name"
                                    onChange={(e) => {
                                      handleFileHazardCheckBoxChange(e);
                                    }}
                                  >
                                    During the fire hazardous work
                                    <input
                                      type="checkbox"
                                      name="during_file_hazardas_work_name"
                                      id="during_file_hazardas_work_name"
                                      checked={
                                        fileHazard.during_file_hazardas_work_name
                                      }
                                    />
                                    <span className="ctm-checkbox-checkmark"></span>
                                  </label>
                                </div>
                                <div
                                  className="errors"
                                  id="during_file_hazardas_work_name_error"
                                ></div>
                                <div className="form-group">
                                  <label htmlFor="firepost_name">Name:</label>
                                  <div className="text-box-flexwrap">
                                    <input
                                      type="text"
                                      name="firepost_name"
                                      id="firepost_name"
                                      value={fileHazard.firepost_name}
                                      onChange={(e) => {
                                        handleFileHazardInputChange(e);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div
                                  className="errors"
                                  id="firepost_name_error"
                                ></div>
                              </div>
                              <p className="simple-formPop-text">Fire guard</p>
                              <div className="formPop-flex flexbox-two-Col-width">
                                <div className="ctm-checkbox">
                                  <label
                                    className="ctm-checkbox-container"
                                    htmlFor="after_completion_of_fire_hazardus"
                                    onChange={(e) => {
                                      handleFileHazardCheckBoxChange(e);
                                    }}
                                  >
                                    After completion of the fire hazardous work
                                    <input
                                      type="checkbox"
                                      name="after_completion_of_fire_hazardus"
                                      id="after_completion_of_fire_hazardus"
                                      checked={
                                        fileHazard.after_completion_of_fire_hazardus
                                      }
                                    />
                                    <span className="ctm-checkbox-checkmark"></span>
                                  </label>
                                </div>
                                <div
                                  className="errors"
                                  id="after_completion_of_fire_hazardus_error"
                                ></div>
                                <div className="form-group">
                                  <label htmlFor="fire_guard_name">Name:</label>
                                  <div className="text-box-flexwrap">
                                    <input
                                      type="text"
                                      name="fire_guard_name"
                                      id="fire_guard_name"
                                      value={fileHazard.fire_guard_name}
                                      onChange={(e) => {
                                        handleFileHazardInputChange(e);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div
                                  className="errors"
                                  id="fire_guard_name_error"
                                ></div>
                              </div>
                              <div className="formPop-flex">
                                <div className="form-group">
                                  <label htmlFor="duration">Duration: </label>
                                  <div className="text-box-flexwrap">
                                    <input
                                      type="text"
                                      name="duration"
                                      id="duration"
                                      value={fileHazard.name}
                                      onChange={(e) => {
                                        handleFileHazardInputChange(e);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div
                                  className="errors"
                                  id="duration_error"
                                ></div>
                                <div className="form-group">
                                  <label htmlFor="hours">Hour/s:</label>
                                  <div className="text-box-flexwrap">
                                    <input
                                      type="text"
                                      name="hours"
                                      id="hours"
                                      value={fileHazard.hours}
                                      onChange={(e) => {
                                        handleFileHazardInputChange(e);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="errors" id="hours_error"></div>
                              </div>
                            </div>
                            <div className="formPop-flex formFix">
                              <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <div className="text-box-flexwrap">
                                  <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={fileHazard.name}
                                    onChange={(e) => {
                                      handleFileHazardInputChange(e);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div
                              className="errors"
                              id="file_hazard_name_error"
                            ></div>
                            <div className="formPop-flex formFix">
                              <div className="form-group">
                                <label htmlFor="executed">Executed:</label>
                                <div className="text-box-flexwrap">
                                  <input
                                    type="text"
                                    name="executed"
                                    id="executed"
                                    value={fileHazard.executed}
                                    onChange={(e) => {
                                      handleFileHazardInputChange(e);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="errors" id="executed_error"></div>
                            <div className="formPop-flex signatureBox">
                              <div className="form-group">
                                <SignatureCanvas
                                  ref={sigCanvasFileHazard}
                                  onEnd={(e) =>
                                    e.onChange(formatIntoPngFileHazard())
                                  }
                                  canvasProps={{
                                    width: 300,
                                    height: 100,
                                    className: "sigCanvas",
                                  }}
                                />
                                <label htmlFor="signature"> (Signature)</label>
                              </div>
                            </div>
                            <div className="errors" id="signature_error"></div>
                          </div>
                        </div>
                        {/* explosion hazard */}
                        <div
                          className={`formPop-cmn ${
                            page > 5 && page < 9 && "active"
                          }`}
                          id="explosionHazard"
                        >
                          <div className="formPop-body">
                            <h6>Safety measures in case of fire hazard </h6>
                            <div
                              className={`formPop-box ${
                                page === 6 && "active"
                              }`}
                            >
                              <p className="simple-formPop-text">
                                Eliminate the explosion hazard{" "}
                              </p>
                              <div className="formPop-flex flex-wrap">
                                <div className="ctm-checkbox">
                                  <label
                                    className="ctm-checkbox-container"
                                    htmlFor="removal_of_explosive_substance"
                                    onChange={(e) => {
                                      handleExplosionHazardCheckBoxChange(e);
                                    }}
                                  >
                                    Removal of all explosive substances and
                                    objects - also dust deposits and containers
                                    with hazardous contents or with their
                                    remains
                                    <input
                                      type="checkbox"
                                      name="removal_of_explosive_substance"
                                      id="removal_of_explosive_substance"
                                      checked={
                                        explosionHazard.removal_of_explosive_substance
                                      }
                                    />
                                    <span className="ctm-checkbox-checkmark"></span>
                                  </label>
                                </div>
                                <div
                                  className="errors"
                                  id="removal_of_explosive_substance_error"
                                ></div>
                                <div className="ctm-checkbox">
                                  <label
                                    className="ctm-checkbox-container"
                                    htmlFor="explosive_hazard_in_pipelines"
                                    onChange={(e) => {
                                      handleExplosionHazardCheckBoxChange(e);
                                    }}
                                  >
                                    Eliminate explosion hazard in pipelines
                                    <input
                                      type="checkbox"
                                      name="explosive_hazard_in_pipelines"
                                      id="explosive_hazard_in_pipelines"
                                      checked={
                                        explosionHazard.explosive_hazard_in_pipelines
                                      }
                                    />
                                    <span className="ctm-checkbox-checkmark"></span>
                                  </label>
                                </div>
                                <div
                                  className="errors"
                                  id="explosive_hazard_in_pipelines_error"
                                ></div>
                                <div className="ctm-checkbox">
                                  <label
                                    className="ctm-checkbox-container"
                                    htmlFor="sealing_of_stationary_containers"
                                    onChange={(e) => {
                                      handleExplosionHazardCheckBoxChange(e);
                                    }}
                                  >
                                    Sealing of stationary containers, apparatus
                                    or pipelines that contain or have contained
                                    flammable liquids, gases or dusts, if
                                    necessary in conjunction with ventilation
                                    measures
                                    <input
                                      type="checkbox"
                                      name="sealing_of_stationary_containers"
                                      id="sealing_of_stationary_containers"
                                      checked={
                                        explosionHazard.sealing_of_stationary_containers
                                      }
                                    />
                                    <span className="ctm-checkbox-checkmark"></span>
                                  </label>
                                </div>
                                <div
                                  className="errors"
                                  id="sealing_of_stationary_containers_error"
                                ></div>
                                <div className="ctm-checkbox">
                                  <label
                                    className="ctm-checkbox-container"
                                    htmlFor="ventilation_measures"
                                    onChange={(e) => {
                                      handleExplosionHazardCheckBoxChange(e);
                                    }}
                                  >
                                    Execution of ventilation measures according
                                    to EX-RL in connection with metrological
                                    monitoring
                                    <input
                                      type="checkbox"
                                      name="ventilation_measures"
                                      id="ventilation_measures"
                                      checked={
                                        explosionHazard.ventilation_measures
                                      }
                                    />
                                    <span className="ctm-checkbox-checkmark"></span>
                                  </label>
                                </div>
                                <div
                                  className="errors"
                                  id="ventilation_measures_error"
                                ></div>
                                <div className="ctm-checkbox">
                                  <label
                                    className="ctm-checkbox-container"
                                    htmlFor="setting_up_gas_detector"
                                    onChange={(e) => {
                                      handleExplosionHazardCheckBoxChange(e);
                                    }}
                                  >
                                    Setting up gas detectors for
                                    <input
                                      type="checkbox"
                                      name="setting_up_gas_detector"
                                      id="setting_up_gas_detector"
                                      checked={
                                        explosionHazard.setting_up_gas_detector
                                      }
                                    />
                                    <span className="ctm-checkbox-checkmark"></span>
                                  </label>
                                  <div
                                    className="errors"
                                    id="setting_up_gas_detector_error"
                                  ></div>
                                  <label
                                    className="form-group"
                                    htmlFor="setting_up_gas_detector_text"
                                    onChange={(e) => {
                                      handleExplosionHazardInputChange(e);
                                    }}
                                  >
                                    <input
                                      type="text"
                                      name="setting_up_gas_detector_text"
                                      id="setting_up_gas_detector_text"
                                      value={
                                        explosionHazard.setting_up_gas_detector_text
                                      }
                                    />
                                    h
                                  </label>
                                  <div
                                    className="errors"
                                    id="setting_up_gas_detector_text_error"
                                  ></div>
                                </div>
                                <div className="ctm-checkbox ctm-checbnoxInput">
                                  <input
                                    type="text"
                                    name="other_text"
                                    id="other_text"
                                    value={explosionHazard.other_text}
                                    onChange={(e) => {
                                      handleExplosionHazardInputChange(e);
                                    }}
                                  />
                                  <label
                                    className="ctm-checkbox-container"
                                    htmlFor="explosion_hazard_other"
                                    onChange={(e) => {
                                      handleExplosionHazardCheckBoxChange(e);
                                    }}
                                  >
                                    <input
                                      type="checkbox"
                                      name="explosion_hazard_other"
                                      id="explosion_hazard_other"
                                      checked={
                                        explosionHazard.explosion_hazard_other
                                      }
                                    />
                                    <span className="ctm-checkbox-checkmark"></span>
                                  </label>
                                </div>
                                <div
                                  className="errors"
                                  id="explosion_hazard_other_text_error"
                                ></div>
                                <div
                                  className="errors"
                                  id="explosion_hazard_other_error"
                                ></div>
                              </div>
                              <div className="formPop-flex">
                                <div className="form-group">
                                  <label htmlFor="name">Name</label>
                                  <div className="text-box-flexwrap">
                                    <input
                                      type="text"
                                      name="name"
                                      id="name"
                                      value={explosionHazard.name}
                                      onChange={(e) => {
                                        handleExplosionHazardInputChange(e);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div
                                  className="errors"
                                  id="explosion_hazard_name_error"
                                ></div>
                              </div>
                              <div className="formPop-flex">
                                <div className="form-group">
                                  <label htmlFor="executed">Executed:</label>
                                  <div className="text-box-flexwrap">
                                    <input
                                      type="text"
                                      name="executed"
                                      id="executed"
                                      value={explosionHazard.executed}
                                      onChange={(e) => {
                                        handleExplosionHazardInputChange(e);
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div
                                className="errors"
                                id="explosion_hazard_executed_error"
                              ></div>
                              <div className="formPop-flex signatureBox">
                                <div className="form-group">
                                  <SignatureCanvas
                                    ref={sigCanvasExplosionHazard}
                                    onEnd={(e) =>
                                      e.onChange(formatIntoPngExplosionHazard())
                                    }
                                    canvasProps={{
                                      width: 200,
                                      height: 150,
                                      className: "sigCanvas",
                                    }}
                                  />
                                  <label htmlFor="signature">Signature</label>
                                </div>
                                <div
                                  className="errors"
                                  id="explosion_hazard_signature_error"
                                ></div>
                              </div>
                            </div>
                            <div
                              className={`formPop-box ${
                                page === 7 && "active"
                              }`}
                            >
                              <p className="simple-formPop-text">Monitoring</p>
                              <div className="formPop-flex formPop-block flex-wrap ">
                                <div className="ctm-checkbox">
                                  <label
                                    className="ctm-checkbox-container"
                                    htmlFor="monitoring"
                                    onChange={(e) => {
                                      handleExplosionHazardCheckBoxChange(e);
                                    }}
                                  >
                                    Monitor security measures for effectiveness
                                    <input
                                      type="checkbox"
                                      name="monitoring"
                                      id="monitoring"
                                      checked={explosionHazard.monitoring}
                                    />
                                    <span className="ctm-checkbox-checkmark"></span>
                                  </label>
                                </div>
                                <div
                                  className="errors"
                                  id="monitoring_error"
                                ></div>
                                <div className="form-group">
                                  <label htmlFor="monitoring_name">Name</label>
                                  <div className="text-box-flexwrap">
                                    <input
                                      type="text"
                                      name="monitoring_name"
                                      id="monitoring_name"
                                      value={explosionHazard.monitoring_name}
                                      onChange={(e) => {
                                        handleExplosionHazardInputChange(e);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div
                                  className="errors"
                                  id="monitoring_name_error"
                                ></div>
                              </div>
                            </div>
                            <div
                              className={`formPop-box ${
                                page === 8 && "active"
                              }`}
                            >
                              <p className="simple-formPop-text">
                                Removal of the security measures
                              </p>
                              <div className="formPop-flex">
                                <div className="ctm-checkbox">
                                  <label
                                    className="ctm-checkbox-container"
                                    htmlFor="after_complete_fire_hazard"
                                    onChange={(e) => {
                                      handleExplosionHazardCheckBoxChange(e);
                                    }}
                                  >
                                    After completion of the fire hazardous work
                                    after:
                                    <input
                                      type="checkbox"
                                      name="after_complete_fire_hazard"
                                      checked={
                                        explosionHazard.after_complete_fire_hazard
                                      }
                                      id="after_complete_fire_hazard"
                                    />
                                    <span className="ctm-checkbox-checkmark"></span>
                                  </label>
                                </div>
                                <div
                                  className="errors"
                                  id="after_complete_fire_hazard_error"
                                ></div>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    name="after_complete_fire_hazard_hours"
                                    id="after_complete_fire_hazard_hours"
                                    value={
                                      explosionHazard.after_complete_fire_hazard_hours
                                    }
                                    onChange={(e) => {
                                      handleExplosionHazardInputChange(e);
                                    }}
                                  />
                                  <label htmlFor="after_complete_fire_hazard_hours">
                                    hour/s
                                  </label>
                                </div>
                                <div
                                  className="errors"
                                  id="after_complete_fire_hazard_hours_error"
                                ></div>
                              </div>
                              <div className="form-group">
                                <label htmlFor="after_complete_fire_hazard_name">
                                  Name
                                </label>
                                <div className="text-box-flexwrap">
                                  <input
                                    type="text"
                                    name="after_complete_fire_hazard_name"
                                    id="after_complete_fire_hazard_name"
                                    value={
                                      explosionHazard.after_complete_fire_hazard_name
                                    }
                                    onChange={(e) => {
                                      handleExplosionHazardInputChange(e);
                                    }}
                                  />
                                </div>
                              </div>
                              <div
                                className="errors"
                                id="after_complete_fire_hazard_name_error"
                              ></div>
                            </div>
                          </div>
                        </div>
                        {/* Alerting */}
                        <div
                          className={`formPop-cmn ${page === 9 && "active"}`}
                          id="alerting"
                        >
                          <div className="formPop-body">
                            <h6>Alarming</h6>
                            <p className="simple-formPop-text">
                              Location of the nearest
                            </p>
                            <div className="formPop-flex">
                              <div className="form-group">
                                <label htmlFor="fire_alarm">Fire alarm:</label>
                                <div className="text-box-flexwrap">
                                  <input
                                    type="text"
                                    name="fire_alarm"
                                    id="fire_alarm"
                                    value={alerting.fire_alarm}
                                    onChange={(e) => {
                                      handleAlertingInputChange(e);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="errors" id="fire_alarm_error"></div>
                            <div className="formPop-flex">
                              <div className="form-group">
                                <label htmlFor="phone">Phone:</label>
                                <div className="text-box-flexwrap">
                                  <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    value={alerting.phone}
                                    onChange={(e) => {
                                      handleAlertingInputChange(e);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="errors" id="phone_error"></div>
                            <div className="formPop-flex">
                              <div className="form-group">
                                <label htmlFor="fire_department_call_no">
                                  Fire department call no.{" "}
                                </label>
                                <div className="text-box-flexwrap">
                                  <input
                                    type="text"
                                    name="fire_department_call_no"
                                    id="fire_department_call_no"
                                    value={alerting.fire_department_call_no}
                                    onChange={(e) => {
                                      handleAlertingInputChange(e);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div
                              className="errors"
                              id="fire_department_call_no_error"
                            ></div>
                          </div>
                        </div>
                        {/* Client */}
                        <div
                          className={`formPop-cmn ${page === 10 && "active"}`}
                          id="client"
                        >
                          <div className="formPop-body">
                            <div className="formPop-flex flexbox-two-Col">
                              <h6>Ordering contractor (client)</h6>
                              <p className="simple-formPop-text">
                                The measures under 3 and 4 shall take into
                                account the hazards created by local conditions
                              </p>
                            </div>
                            <div className="formPop-flex flexbox-two-Col">
                              <div className="form-group">
                                <label htmlFor="date">Date</label>
                                <div className="text-box-flexwrap">
                                  <input
                                    type="text"
                                    name="date"
                                    id="date"
                                    value={client.date}
                                    onChange={(e) => {
                                      handleClientInputChange(e);
                                    }}
                                  />
                                </div>
                                <div
                                  className="errors"
                                  id="client_date_error"
                                ></div>
                              </div>
                              <div className="form-group signature">
                                <label htmlFor="signature_of_plant_manager">
                                  Signature of the plant manager or his
                                  authorized representative in accordance with §
                                  8 Para. 2 ArbSchG
                                </label>
                                <div className="text-box-flexwrap">
                                  <SignatureCanvas
                                    ref={sigCanvasClient}
                                    onEnd={(e) =>
                                      e.onChange(formatIntoPngClient())
                                    }
                                    canvasProps={{
                                      width: 400,
                                      height: 100,
                                      className: "sigCanvas",
                                    }}
                                  />
                                </div>
                              </div>
                              <div
                                className="errors"
                                id="signature_of_plant_manager_error"
                              ></div>
                            </div>
                          </div>
                        </div>
                        {/* Contractor */}
                        <div
                          className={`formPop-cmn ${page === 11 && "active"}`}
                          id="contractor"
                        >
                          <div className="formPop-body">
                            <div className="formPop-flex flexbox-two-Col">
                              <h6>Executing contractor (Contractor)</h6>
                              <p className="simple-formPop-text">
                                The work according to 2 may not be started until
                                the safety measures according to 3a-3c and/or
                                4a, 4b have been carried out
                              </p>
                            </div>
                            <div className="formPop-flex flexbox-two-Col">
                              <div className="form-group">
                                <label htmlFor="date">Date</label>
                                <div className="text-box-flexwrap">
                                  <input
                                    type="text"
                                    name="date"
                                    id="date"
                                    value={contractor.date}
                                    onChange={(e) => {
                                      handleContractorInputChange(e);
                                    }}
                                  />
                                </div>
                              </div>
                              <div
                                className="errors"
                                id="contractor_date_error"
                              ></div>
                              <div className="form-group-sideCol signature">
                                <div className="form-group">
                                  <label htmlFor="signature_of_contractor">
                                    Signature of the contractor or his
                                    representative
                                  </label>
                                  <div className="text-box-flexwrap">
                                    <SignatureCanvas
                                      ref={sigCanvasContractorSig}
                                      onEnd={(e) =>
                                        e.onChange(formatIntoPngContractorSig())
                                      }
                                      canvasProps={{
                                        width: 400,
                                        height: 100,
                                        className: "sigCanvas",
                                      }}
                                    />
                                  </div>
                                </div>
                                <div
                                  className="errors"
                                  id="signature_of_contractor_error"
                                ></div>
                                <div className="form-group">
                                  <label htmlFor="">
                                    Acknowledgement of the executor after 2
                                  </label>
                                </div>
                                <div className="form-group">
                                  <label htmlFor="signature">Signature</label>
                                  <div className="text-box-flexwrap">
                                    <SignatureCanvas
                                      ref={sigCanvasContractor}
                                      onEnd={(e) =>
                                        e.onChange(formatIntoPngContractor())
                                      }
                                      canvasProps={{
                                        width: 400,
                                        height: 100,
                                        className: "sigCanvas",
                                      }}
                                    />
                                  </div>
                                </div>
                                <div
                                  className="errors"
                                  id="file_hazard_signature_error"
                                ></div>
                              </div>
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
                              Back
                            </button>
                            {page == 11 ? (
                              <>
                                {/* <Pdf targetRef={pdfRef} filename="code-example.pdf">
                                                                        {({ toPdf }) => <button className="btn cmn_yellow_bg" onClick={hvb(e) => {handleCreatePdf(e); }} >Create PDF{toPdf}</button>}
                                                                </Pdf> */}
                                {updateCertificate ? (
                                  <>
                                    <button
                                      className="btn cmn_yellow_bg"
                                      onClick={(e) => {
                                        handleUpdatePdf(e);
                                      }}
                                    >
                                      Update PDF
                                    </button>
                                    {/*<button
                                    className="btn cmn_yellow_bg"
                                    onClick={(e) => {
                                      handleUpdateWord(e);
                                    }}
                                  >
                                    Update Word
                                  </button>*/}
                                  </>
                                ) : (
                                  <>
                                    <button
                                      className="btn cmn_yellow_bg"
                                      onClick={(e) => {
                                        handleCreatePdf(e);
                                      }}
                                    >
                                      Create PDF
                                    </button>
                                    <button
                                      className="btn cmn_yellow_bg"
                                      onClick={(e) => {
                                        handleCreateWord(e);
                                      }}
                                    >
                                      Create Word
                                    </button>
                                  </>
                                )}
                              </>
                            ) : (
                              <button
                                className="btn cmn_yellow_bg"
                                onClick={(e) => {
                                  handleNextStep(e);
                                }}
                              >
                                Next{" "}
                                <ArrowCircleRightOutlinedIcon
                                  className="nextbtn "
                                  color="action"
                                />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <ToastContainer />
              </>
            }
          />
        )}

        <div>
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
        <div>
          {/* <button className="btn cmn_yellow_bg" onClick={handleClick}>
          Show Component
        </button>
        {showComponent && <ReleaseCertificate />} */}
          {/* <button className="btn cmn_yellow_bg" onClick={openNewTab}>
            View Certificate
          </button> */}
          <NavLink to="/releaseCertificate" className="btn cmn_yellow_bg">
            View Certificate
          </NavLink>
        </div>
      </div>

      {/* <ReleaseCertificate /> */}
    </>
  );
};

export default WorkReleaseCertificate;
