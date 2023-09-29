import React, { useState, useEffect, useRef } from "react";
import AddCategory from "../DocumentManagentment/AddCategory";
import { ToastContainer, toast } from "react-toastify";
import jsPDF from "jspdf";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import ListIcon from "@mui/icons-material/List";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { styled } from "@mui/material/styles";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import OfficeModal from "../../modal/OfficerModal/OfficerModal";
import DocumentModalOnly from "../DocumentManagentment/DocumentModalOnly";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import JoditEditor from "jodit-react";
import html2canvas from "html2canvas";

const API = process.env.REACT_APP_API_BASE_URL;

var BSO_A_input = "0";
var Show_BSO_A_template_1 = true;
var Show_BSO_A_template_2 = true;
var Show_BSO_A_template_3 = true;
var Show_BSO_A_template_4 = true;
var Show_BSO_A_template_5 = true;
var Show_BSO_A_template_6 = true;
var note = "";
var address = "";
const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
var curr_date = day + "." + month + "." + year;
const OfficerRegulation = () => {
  const [addDocument, setAddDocument] = useState(false);
  var [pdfFile, setPdfFile] = useState(null);
  const [openPartA, setOpenPartA] = useState(false);
  const [openPartB, setOpenPartB] = useState(false);
  const [openPartC, setOpenPartC] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const [updatePartB, setupdatePartB] = useState(false);
  const [updatePartC, setupdatePartC] = useState(false);

  const editor = useRef(null);

  document.addEventListener(
    "click",
    function (event) {
      if (event.target.closest("#open-btn3")) {
        document.getElementById("dropdown_bso_c").style.display = "block";
      } else if (!event.target.closest("#dropdown_bso_c")) {
        document.getElementById("dropdown_bso_c").style.display = "none";
      }
    },
    false
  );

  document.addEventListener(
    "click",
    function (event) {
      if (event.target.closest("#open-btn2")) {
        document.getElementById("dropdown_bso_c2").style.display = "block";
      } else if (!event.target.closest("#dropdown_bso_c2")) {
        document.getElementById("dropdown_bso_c2").style.display = "none";
      }
    },
    false
  );

  document.addEventListener(
    "click",
    function (event) {
      if (event.target.closest("#open-btn")) {
        document.getElementById("dropdown_bso_b").style.display = "block";
      } else if (!event.target.closest("#dropdown_bso_b")) {
        document.getElementById("dropdown_bso_b").style.display = "none";
      }
    },
    false
  );

  const selectedLocationId = useSelector((state) => state.locationIdReducer);
  console.log("location::", selectedLocationId);

  const [editDocumentBox, setEditDocumentBox] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [categoryList, setCategoryList] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");

  // API Token
  const user = JSON.parse(localStorage.getItem("user-info"));
  const token = user?.token;

  // Upload Template
  const [uploadTemplate, setUploadTemplate] = useState("");
  console.log("uploadTemplate", uploadTemplate);

  async function deleteFormB(id) {
    let result = await fetch(`${API}/delete-form-part-b/${id}`, {
      method: "DELETE",
      headers: {
        "x-access-token": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log("result from delete Bso b::", result);
    if (result) {
      if (result.id) toast.success("BSO B deleted successfully");
    }
    getBsoB();
  }

  async function deleteFormC(id) {
    let result = await fetch(`${API}/delete-form-part-c/${id}`, {
      method: "DELETE",
      headers: {
        "x-access-token": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log("result from delete Bso c::", result);
    if (result) {
      if (result.id) toast.success("BSO C deleted successfully");
    }
    getBsoC();
  }

  async function getBsoC() {
    //setupdatePartC(true);
    //setOpenPartC(false);
    let result = await fetch(
      `${API}/get-form-part-c-data/${selectedLocationId}`,
      {
        method: "GET",
        headers: {
          "x-access-token": token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    console.log("result from get bso C::", result);
    setPartCForm(result);
  }

  async function getBsoB() {
    //setupdatePartB(true);
    //setOpenPartB(false);
    let result = await fetch(
      `${API}/get-form-part-b-multi/${selectedLocationId}`,
      {
        method: "GET",
        headers: {
          "x-access-token": token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    console.log("result from get bso b::", result);
    setPartBForm(result);
  }

  async function editBsoC(id) {
    setupdatePartC(true);
    setOpenPartC(false);
    let result = await fetch(`${API}/get-form-part-c/${id}`, {
      method: "GET",
      headers: {
        "x-access-token": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log("result from get bso C::", result);
    setPartCForm(result);
  }

  async function editBsoB(id) {
    setupdatePartB(true);
    setOpenPartB(false);
    let result = await fetch(`${API}/get-form-part-b-single/${id}`, {
      method: "GET",
      headers: {
        "x-access-token": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log("result from get bso b::", result);
    setPartBForm(result);
  }

  async function wordDownloadFormAPI(id) {
    let result = await fetch(`${API}/api/get-form-part-b/${id}`, {
      method: "GET",
      headers: {
        "x-access-token": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log("result from get bso b::", result);
    if (result) {
      var filename = "bso_b";
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

  function pdfDownloadFormAPI(id) {
    if (id === "bso_a_body1") {
      var doc = new jsPDF("p", "pt");
      doc.html(document.querySelector("#bso_a_body1"), {
        callback: function (pdf) {
          var file1 = new File([pdf.output()], "bso_a.pdf", {
            type: "application/pdf",
          });
          console.log("pdf file:: ", file1);
          setPdfFile(file1);
        },
      });
    }
    if (id === "bso_a_body2") {
      var doc = new jsPDF("p", "pt");
      doc.html(document.querySelector("#bso_a_body2"), {
        callback: function (pdf) {
          var file2 = new File([pdf.output()], "bso_a.pdf", {
            type: "application/pdf",
          });
          console.log("pdf file:: ", file2);
          setPdfFile(file2);
        },
      });
    }
    if (id === "bso_a_body3") {
      var doc = new jsPDF("p", "pt");
      doc.html(document.querySelector("#bso_a_body3"), {
        callback: function (pdf) {
          var file3 = new File([pdf.output()], "bso_a.pdf", {
            type: "application/pdf",
          });
          console.log("pdf file:: ", file3);
          setPdfFile(file3);
        },
      });
    }
    if (id === "bso_a_body4") {
      var doc = new jsPDF("p", "pt");
      doc.html(document.querySelector("#bso_a_body4"), {
        callback: function (pdf) {
          var file4 = new File([pdf.output()], "bso_a.pdf", {
            type: "application/pdf",
          });
          console.log("pdf file:: ", file4);
          setPdfFile(file4);
        },
      });
    }
    if (id === "bso_a_body5") {
      var doc = new jsPDF("p", "pt");
      doc.html(document.querySelector("#bso_a_body5"), {
        callback: function (pdf) {
          var file5 = new File([pdf.output()], "bso_a.pdf", {
            type: "application/pdf",
          });
          console.log("pdf file:: ", file5);
          setPdfFile(file5);
        },
      });
    }
    if (id === "bso_a_body6") {
      var doc = new jsPDF("p", "pt");
      doc.html(document.querySelector("#bso_a_body6"), {
        callback: function (pdf) {
          var file6 = new File([pdf.output()], "bso_a.pdf", {
            type: "application/pdf",
          });
          console.log("pdf file:: ", file6);
          setPdfFile(file6);
        },
      });
    }
    if (id === "body") {
      var doc = new jsPDF("p", "pt");
      doc.html(document.querySelector("#body"), {
        callback: function (pdf) {
          var file_bso_b = new File([pdf.output()], "bso_b.pdf", {
            type: "application/pdf",
          });
          console.log("pdf file:: ", file_bso_b);
          setPdfFile(file_bso_b);
        },
      });
    }
  }

  const createBSO_A = (data) => {
    if (data === "0") {
      toast.error("Please select a valid template.");
    } else {
      if (data === "1") {
        pdfDownloadFormAPI("bso_a_body1");
        setAddDocument(true);
        setCategoryList(false);
      }
      if (data === "2") {
        pdfDownloadFormAPI("bso_a_body2");
        setAddDocument(true);
        setCategoryList(false);
      }
      if (data === "3") {
        pdfDownloadFormAPI("bso_a_body3");
        setAddDocument(true);
        setCategoryList(false);
      }
      if (data === "4") {
        pdfDownloadFormAPI("bso_a_body4");
        setAddDocument(true);
        setCategoryList(false);
      }
      if (data === "5") {
        pdfDownloadFormAPI("bso_a_body5");
        setAddDocument(true);
        setCategoryList(false);
      }
      if (data === "6") {
        pdfDownloadFormAPI("bso_a_body6");
        setAddDocument(true);
        setCategoryList(false);
      }
    }
  };

  const createUploadApi = (data) => {
    var formdata = new FormData();
    formdata.append("template", data);
    return fetch(`${API}/create-upload-template`, {
      method: "POST",
      headers: {
        "x-access-token": token,
      },
      body: formdata,
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("createUploadApi::", json);
      })
      .catch((err) => {
        console.log("createFormAPI error::", err);
      });
  };

  const submitUploadTemplate = (e) => {
    e.preventDefault();
    createUploadApi(uploadTemplate);
    setOpenUpload(false);
    setUploadTemplate("");
  };

  /* ====================================================================================  */

  // Create Form Part C
  const [page, setPage] = useState(0);
  const formTitles = [
    "Outline and content",
    "a+b",
    "c+d",
    "e+f",
    "G+(h)",
    "H (i)",
    "5. Export",
  ];
  const [partCForm, setPartCForm] = useState({
    introduction: "",
    fire_protection: "",
    alert_procedure: "",
    safety_measures: "",
    extingush_measure: "",
    fire_department: "",
    aftercare: "",
    site_specific: "",
    appendix: "",
    file_upload: "",
  });

  const handlePartAInput = async (e) => {
    await fetch(`${API}/get-location/${selectedLocationId}`, {
      method: "GET",
      headers: {
        "x-access-token": JSON.parse(localStorage.getItem("user-info")).token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((resp) => {
        console.log("response from get location api::", resp);
        address = resp.city + " ," + resp.street + " ," + resp.house_number;
        note = resp.note;
      });
    console.log("value::", e.target.value);
    BSO_A_input = e.target.value;
    /*if (BSO_A_input === "1") {
      Show_BSO_A_template_1 = true;
      Show_BSO_A_template_2 = false;
      Show_BSO_A_template_3 = false;
      Show_BSO_A_template_4 = false;
      Show_BSO_A_template_5 = false;
      Show_BSO_A_template_6 = false;
    } else if (BSO_A_input === "2") {
      Show_BSO_A_template_1 = false;
      Show_BSO_A_template_2 = true;
      Show_BSO_A_template_3 = false;
      Show_BSO_A_template_4 = false;
      Show_BSO_A_template_5 = false;
      Show_BSO_A_template_6 = false;
    } else if (BSO_A_input === "3") {
      Show_BSO_A_template_1 = false;
      Show_BSO_A_template_2 = false;
      Show_BSO_A_template_3 = true;
      Show_BSO_A_template_4 = false;
      Show_BSO_A_template_5 = false;
      Show_BSO_A_template_6 = false;
    } else if (BSO_A_input === "4") {
      Show_BSO_A_template_1 = false;
      Show_BSO_A_template_2 = false;
      Show_BSO_A_template_3 = false;
      Show_BSO_A_template_4 = true;
      Show_BSO_A_template_5 = false;
      Show_BSO_A_template_6 = false;
    } else if (BSO_A_input === "5") {
      Show_BSO_A_template_1 = false;
      Show_BSO_A_template_2 = false;
      Show_BSO_A_template_3 = false;
      Show_BSO_A_template_4 = false;
      Show_BSO_A_template_5 = true;
      Show_BSO_A_template_6 = false;
    } else if (BSO_A_input === "6") {
      Show_BSO_A_template_1 = false;
      Show_BSO_A_template_2 = false;
      Show_BSO_A_template_3 = false;
      Show_BSO_A_template_4 = false;
      Show_BSO_A_template_5 = false;
      Show_BSO_A_template_6 = true;
    }*/
  };

  const handlePartCInput = (value, name) => {
    setPartCForm({ ...partCForm, [name]: value });
    console.log("partCForm", partCForm);
  };
  const handlePartCFile = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    setPartCForm({ ...partCForm, [name]: file });
  };

  const createPartCApi = (data) => {
    var formdata = new FormData();
    formdata.append("introduction", data.introduction);
    formdata.append("fire_protection", data.fire_protection);
    formdata.append("alert_procedure", data.alert_procedure);
    formdata.append("safety_measures", data.safety_measures);
    formdata.append("extingush_measure", data.extingush_measure);
    formdata.append("fire_department", data.fire_department);
    formdata.append("aftercare", data.aftercare);
    formdata.append("site_specific", data.site_specific);
    formdata.append("appendix", data.appendix);
    formdata.append("file_upload", data.file_upload);
    formdata.append("location_id", selectedLocationId);
    return fetch(`${API}/create-form-part-c`, {
      method: "POST",
      headers: {
        "x-access-token": token,
      },
      body: formdata,
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.status);
        else {
          if (res.status === 201) {
            toast.success("Saved Successfully.");
            setOpenPartC(false);
            setupdatePartC(false);
          }
          return res.json();
        }
      })
      .then((json) => {
        console.log("response", json);
        setPartCForm({
          introduction: "",
          fire_protection: "",
          alert_procedure: "",
          safety_measures: "",
          extingush_measure: "",
          fire_department: "",
          aftercare: "",
          site_specific: "",
          appendix: "",
          file_upload: "",
        });
      })
      .catch((err) => {
        console.log("createLocation", err);
      });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setPage((currPage) => currPage + 1);
  };

  // Create PDF
  const handleCreatePdf = (e) => {
    e.preventDefault();
    console.log("partcform::", partCForm);
    /*if (!partCForm.introduction) {
      document.getElementById("introduction2_err").innerHTML =
        "* Introduction cannot be left empty";
    }
    if (!partCForm.fire_protection) {
      document.getElementById("fire_protection2_err").innerHTML =
        "* Fire Prevention cannot be left empty";
    }
    if (!partCForm.alert_procedure) {
      document.getElementById("alert_procedure_err").innerHTML =
        "* Alert Procedure cannot be left empty";
    }
    if (!partCForm.safety_measures) {
      document.getElementById("safety_measures_err").innerHTML =
        "* Safety Measures cannot be left empty";
    }
    if (!partCForm.extingush_measure) {
      document.getElementById("extingush_measure_err").innerHTML =
        "* Extingush measure cannot be left empty";
    }
    if (!partCForm.fire_department) {
      document.getElementById("fire_department_err").innerHTML =
        "* Fire department cannot be left empty";
    }
    if (!partCForm.aftercare) {
      document.getElementById("aftercare_err").innerHTML =
        "* Aftercare cannot be left empty";
    }
    if (!partCForm.site_specific) {
      document.getElementById("site_specific_err").innerHTML =
        "* Site Specific cannot be left empty";
    }
    if (!partCForm.appendix) {
      document.getElementById("appendix2_err").innerHTML =
        "* Appendix cannot be left empty";
    }
    if (!partCForm.file_upload) {
      document.getElementById("upload_document_err").innerHTML =
        "* File Upload cannot be left empty";
    }
    if (
      !partCForm.aftercare ||
      !partCForm.alert_procedure ||
      !partCForm.appendix ||
      !partCForm.extingush_measure ||
      !partCForm.file_upload ||
      !partCForm.fire_department ||
      !partCForm.fire_protection ||
      !partCForm.introduction ||
      !partCForm.safety_measures ||
      !partCForm.site_specific
    ) {
      toast.error(
        "We have found some empty fields please recheck the forms and fill it"
      );
    }
    //form filled
    if (partCForm.aftercare) {
      document.getElementById("aftercare_err").innerHTML = "";
    }
    if (partCForm.site_specific) {
      document.getElementById("site_specific_err").innerHTML = "";
    }
    if (partCForm.appendix) {
      document.getElementById("appendix2_err").innerHTML = "";
    }
    if (partCForm.file_upload) {
      document.getElementById("upload_document_err").innerHTML = "";
    }
    if (partCForm.fire_department) {
      document.getElementById("fire_department_err").innerHTML = "";
    }
    if (partCForm.extingush_measure) {
      document.getElementById("extingush_measure_err").innerHTML = "";
    }
    if (partCForm.safety_measures) {
      document.getElementById("safety_measures_err").innerHTML = "";
    }
    if (partCForm.alert_procedure) {
      document.getElementById("alert_procedure_err").innerHTML = "";
    }
    if (partCForm.fire_protection) {
      document.getElementById("fire_protection2_err").innerHTML = "";
    }
    if (partCForm.introduction) {
      document.getElementById("introduction2_err").innerHTML = "";
    }
    if (
      partCForm.aftercare &&
      partCForm.alert_procedure &&
      partCForm.appendix &&
      partCForm.extingush_measure &&
      partCForm.file_upload &&
      partCForm.fire_department &&
      partCForm.fire_protection &&
      partCForm.introduction &&
      partCForm.safety_measures &&
      partCForm.site_specific
    ) {
      createPartCApi(partCForm);
      setOpenPartC(false);
    }*/
    createPartCApi(partCForm);
    setOpenPartC(false);
  };
  // Create Word
  const handleCreateWord = (e) => {
    e.preventDefault();
    /*if (!partCForm.introduction) {
      document.getElementById("introduction2_err").innerHTML =
        "* Introduction cannot be left empty";
    }
    if (!partCForm.fire_protection) {
      document.getElementById("fire_protection2_err").innerHTML =
        "* Fire Prevention cannot be left empty";
    }
    if (!partCForm.alert_procedure) {
      document.getElementById("alert_procedure_err").innerHTML =
        "* Alert Procedure cannot be left empty";
    }
    if (!partCForm.safety_measures) {
      document.getElementById("safety_measures_err").innerHTML =
        "* Safety Measures cannot be left empty";
    }
    if (!partCForm.extingush_measure) {
      document.getElementById("extingush_measure_err").innerHTML =
        "* Extingush measure cannot be left empty";
    }
    if (!partCForm.fire_department) {
      document.getElementById("fire_department_err").innerHTML =
        "* Fire department cannot be left empty";
    }
    if (!partCForm.aftercare) {
      document.getElementById("aftercare_err").innerHTML =
        "* Aftercare cannot be left empty";
    }
    if (!partCForm.site_specific) {
      document.getElementById("site_specific_err").innerHTML =
        "* Site Specific cannot be left empty";
    }
    if (!partCForm.appendix) {
      document.getElementById("appendix2_err").innerHTML =
        "* Appendix cannot be left empty";
    }
    if (!partCForm.file_upload) {
      document.getElementById("upload_document_err").innerHTML =
        "* File Upload cannot be left empty";
    }
    if (
      !partCForm.aftercare ||
      !partCForm.alert_procedure ||
      !partCForm.appendix ||
      !partCForm.extingush_measure ||
      !partCForm.file_upload ||
      !partCForm.fire_department ||
      !partCForm.fire_protection ||
      !partCForm.introduction ||
      !partCForm.safety_measures ||
      !partCForm.site_specific
    ) {
      toast.error(
        "We have found some empty fields please recheck the forms and fill it"
      );
    }
    //form filled
    if (partCForm.aftercare) {
      document.getElementById("aftercare_err").innerHTML = "";
    }
    if (partCForm.site_specific) {
      document.getElementById("site_specific_err").innerHTML = "";
    }
    if (partCForm.appendix) {
      document.getElementById("appendix2_err").innerHTML = "";
    }
    if (partCForm.file_upload) {
      document.getElementById("upload_document_err").innerHTML = "";
    }
    if (partCForm.fire_department) {
      document.getElementById("fire_department_err").innerHTML = "";
    }
    if (partCForm.extingush_measure) {
      document.getElementById("extingush_measure_err").innerHTML = "";
    }
    if (partCForm.safety_measures) {
      document.getElementById("safety_measures_err").innerHTML = "";
    }
    if (partCForm.alert_procedure) {
      document.getElementById("alert_procedure_err").innerHTML = "";
    }
    if (partCForm.fire_protection) {
      document.getElementById("fire_protection2_err").innerHTML = "";
    }
    if (partCForm.introduction) {
      document.getElementById("introduction2_err").innerHTML = "";
    }
    if (
      partCForm.aftercare &&
      partCForm.alert_procedure &&
      partCForm.appendix &&
      partCForm.extingush_measure &&
      partCForm.file_upload &&
      partCForm.fire_department &&
      partCForm.fire_protection &&
      partCForm.introduction &&
      partCForm.safety_measures &&
      partCForm.site_specific
    ) {
      createPartCApi(partCForm);
      setOpenPartC(false);
    }*/
    createPartCApi(partCForm);
    setOpenPartC(false);
  };

  /* ====================================================================================  */

  // Create Form Part B
  const [page2, setPage2] = useState(0);
  const formTitles2 = [
    "Outline and content",
    "a+b",
    "c+d",
    "e+f",
    "G+h",
    "I+j",
    "K+l",
    "m",
    "5. Export",
  ];

  const [partBForm, setPartBForm] = useState({
    introduction: "",
    fire_security_regulation: "",
    fire_protection: "",
    fire_smoke_propegation: "",
    rescue_routes: "",
    sihnalization: "",
    behaviour: "",
    report_fire: "",
    observaion_alarm: "",
    bring_to_safety: "",
    attemp_extingush: "",
    special_rule: "",
    appendix: "",
    file_upload: "",
  });

  const handlePartBInput = (value, name) => {
    setPartBForm({ ...partBForm, [name]: value });
    console.log("partBForm", partBForm);
  };
  const handlePartBFile = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    setPartBForm({
      ...partBForm,
      file_upload: file,
      fire_security_regulation: file,
    });
    console.log("partBForm", partBForm);
  };

  const updatePartBApi = async (data) => {
    console.log("working");
    var formdata = new FormData();
    formdata.append("introduction", data.introduction);
    formdata.append("fire_security_regulation", data.fire_security_regulation);
    formdata.append("fire_protection", data.fire_protection);
    formdata.append("fire_smoke_propegation", data.fire_smoke_propegation);
    formdata.append("rescue_routes", data.rescue_routes);
    formdata.append("sihnalization", data.sihnalization);
    formdata.append("behaviour", data.behaviour);
    formdata.append("report_fire", data.report_fire);
    formdata.append("observaion_alarm", data.observaion_alarm);
    formdata.append("bring_to_safety", data.bring_to_safety);
    formdata.append("attemp_extingush", data.attemp_extingush);
    formdata.append("special_rule", data.special_rule);
    formdata.append("appendix", data.appendix);
    formdata.append("file_upload", data.file_upload);
    formdata.append("location_id", selectedLocationId);
    try {
      const res = await fetch(
        `${API}/update-form-part-b/${selectedLocationId}`,
        {
          method: "PUT",
          headers: {
            "x-access-token": token,
          },
          body: formdata,
        }
      );
      const json = await res.json();
      console.log("json", json);
      if (json) {
        toast.success("BSO B updated successully");
        setupdatePartB(false);
      }
      setPartBForm({
        introduction: "",
        fire_security_regulation: "",
        fire_protection: "",
        fire_smoke_propegation: "",
        rescue_routes: "",
        sihnalization: "",
        behaviour: "",
        report_fire: "",
        observaion_alarm: "",
        bring_to_safety: "",
        attemp_extingush: "",
        special_rule: "",
        appendix: "",
        file_upload: "",
      });
    } catch (err) {
      console.log("createLocation", err);
    }
  };

  const createPartBApi = async (data) => {
    var formdata = new FormData();
    formdata.append("introduction", data.introduction);
    formdata.append("fire_security_regulation", data.fire_security_regulation);
    formdata.append("fire_protection", data.fire_protection);
    formdata.append("fire_smoke_propegation", data.fire_smoke_propegation);
    formdata.append("rescue_routes", data.rescue_routes);
    formdata.append("sihnalization", data.sihnalization);
    formdata.append("behaviour", data.behaviour);
    formdata.append("report_fire", data.report_fire);
    formdata.append("observaion_alarm", data.observaion_alarm);
    formdata.append("bring_to_safety", data.bring_to_safety);
    formdata.append("attemp_extingush", data.attemp_extingush);
    formdata.append("special_rule", data.special_rule);
    formdata.append("appendix", data.appendix);
    formdata.append("file_upload", data.file_upload);
    formdata.append("location_id", selectedLocationId);
    try {
      const res = await fetch(`${API}/create-form-part-b`, {
        method: "POST",
        headers: {
          "x-access-token": token,
        },
        body: formdata,
      });
      const json = await res.json();
      console.log("json", json);
      if (json) {
        toast.success("BSO B created successully");
      }
      setPartBForm({
        introduction: "",
        fire_security_regulation: "",
        fire_protection: "",
        fire_smoke_propegation: "",
        rescue_routes: "",
        sihnalization: "",
        behaviour: "",
        report_fire: "",
        observaion_alarm: "",
        bring_to_safety: "",
        attemp_extingush: "",
        special_rule: "",
        appendix: "",
        file_upload: "",
      });
    } catch (err) {
      console.log("createLocation", err);
    }
  };

  const handleNextStep2 = (e) => {
    e.preventDefault();
    setPage2((currPage) => currPage + 1);
  };

  const handleUpdateCreatePdf2 = (e) => {
    e.preventDefault();
    console.log("Part B updated Form", partBForm);
    /*if (
      !partBForm.fire_protection ||
      !partBForm.fire_security_regulation ||
      !partBForm.fire_smoke_propegation ||
      !partBForm.introduction ||
      !partBForm.observaion_alarm ||
      !partBForm.report_fire ||
      !partBForm.rescue_routes ||
      !partBForm.sihnalization ||
      !partBForm.special_rule ||
      !partBForm.fire_smoke_propegation ||
      !partBForm.fire_security_regulation ||
      !partBForm.fire_protection ||
      !partBForm.appendix ||
      !partBForm.attemp_extingush ||
      !partBForm.behaviour ||
      !partBForm.bring_to_safety ||
      !partBForm.file_upload
    ) {
      toast.error(
        "We have found some empty fields please recheck the forms and fill it"
      );
    }
    if (!partBForm.appendix) {
      document.getElementById("appendix_err").innerHTML =
        "* Appendix cannot be left empty";
    }
    if (!partBForm.attemp_extingush) {
      document.getElementById("attemp_extingush_err").innerHTML =
        "* Attemp Extingush cannot be left empty";
    }
    if (!partBForm.behaviour) {
      document.getElementById("behaviour_err").innerHTML =
        "* Behaviour cannot be left empty";
    }
    if (!partBForm.bring_to_safety) {
      document.getElementById("bring_to_safety_err").innerHTML =
        "* Bring To Safety cannot be left empty";
    }
    if (!partBForm.file_upload) {
      document.getElementById("file_upload_err").innerHTML =
        "* File Upload cannot be left empty";
    }
    if (!partBForm.fire_protection) {
      document.getElementById("fire_protection_err").innerHTML =
        "* fire protection cannot be left empty";
    }
    if (!partBForm.fire_security_regulation) {
      document.getElementById("fire_security_regulation_err").innerHTML =
        "* fire safety regulation cannot be left empty";
    }
    if (!partBForm.fire_smoke_propegation) {
      document.getElementById("fire_smoke_propegation_err").innerHTML =
        "* fire smoke propegation cannot be left empty";
    }
    if (!partBForm.introduction) {
      document.getElementById("introduction_err").innerHTML =
        "* introduction cannot be left empty";
    }
    if (!partBForm.observaion_alarm) {
      document.getElementById("observaion_alarm_err").innerHTML =
        "* observaion alarm cannot be left empty";
    }
    if (!partBForm.report_fire) {
      document.getElementById("report_fire_err").innerHTML =
        "* report fire cannot be left empty";
    }
    if (!partBForm.rescue_routes) {
      document.getElementById("rescue_routes_err").innerHTML =
        "* rescue routes cannot be left empty";
    }
    if (!partBForm.sihnalization) {
      document.getElementById("sihnalization_err").innerHTML =
        "* sihnalization cannot be left empty";
    }
    if (!partBForm.special_rule) {
      document.getElementById("special_rule_err").innerHTML =
        "* special rule cannot be left empty";
    }
    //form filled
    if (partBForm.appendix) {
      document.getElementById("appendix_err").innerHTML = "";
    }
    if (partBForm.attemp_extingush) {
      document.getElementById("attemp_extingush_err").innerHTML = "";
    }
    if (partBForm.behaviour) {
      document.getElementById("behaviour_err").innerHTML = "";
    }
    if (partBForm.bring_to_safety) {
      document.getElementById("bring_to_safety_err").innerHTML = "";
    }
    if (partBForm.file_upload) {
      document.getElementById("file_upload_err").innerHTML = "";
    }
    if (partBForm.fire_protection) {
      document.getElementById("fire_protection_err").innerHTML = "";
    }
    if (partBForm.fire_security_regulation) {
      document.getElementById("fire_security_regulation_err").innerHTML = "";
    }
    if (partBForm.fire_smoke_propegation) {
      document.getElementById("fire_smoke_propegation_err").innerHTML = "";
    }
    if (partBForm.introduction) {
      document.getElementById("introduction_err").innerHTML = "";
    }
    if (partBForm.observaion_alarm) {
      document.getElementById("observaion_alarm_err").innerHTML = "";
    }
    if (partBForm.report_fire) {
      document.getElementById("report_fire_err").innerHTML = "";
    }
    if (partBForm.rescue_routes) {
      document.getElementById("rescue_routes_err").innerHTML = "";
    }
    if (partBForm.sihnalization) {
      document.getElementById("sihnalization_err").innerHTML = "";
    }
    if (partBForm.special_rule) {
      document.getElementById("special_rule_err").innerHTML = "";
    }
    if (
      partBForm.appendix &&
      partBForm.attemp_extingush &&
      partBForm.behaviour &&
      partBForm.bring_to_safety &&
      partBForm.file_upload &&
      partBForm.fire_protection &&
      partBForm.fire_security_regulation &&
      partBForm.fire_smoke_propegation &&
      partBForm.introduction &&
      partBForm.observaion_alarm &&
      partBForm.report_fire &&
      partBForm.rescue_routes &&
      partBForm.sihnalization &&
      partBForm.special_rule
    ) {
      createPartBApi(partBForm);
      setOpenPartB(false);
    }*/
    updatePartBApi(partBForm);
    setOpenPartB(false);
    pdfDownloadFormAPI("body");
    setAddDocument(true);
    setCategoryList(false);
  };

  // Create PDF
  const handleCreatePdf2 = (e) => {
    e.preventDefault();
    console.log("Part B Form", partBForm);
    /*if (
      !partBForm.fire_protection ||
      !partBForm.fire_security_regulation ||
      !partBForm.fire_smoke_propegation ||
      !partBForm.introduction ||
      !partBForm.observaion_alarm ||
      !partBForm.report_fire ||
      !partBForm.rescue_routes ||
      !partBForm.sihnalization ||
      !partBForm.special_rule ||
      !partBForm.fire_smoke_propegation ||
      !partBForm.fire_security_regulation ||
      !partBForm.fire_protection ||
      !partBForm.appendix ||
      !partBForm.attemp_extingush ||
      !partBForm.behaviour ||
      !partBForm.bring_to_safety ||
      !partBForm.file_upload
    ) {
      toast.error(
        "We have found some empty fields please recheck the forms and fill it"
      );
    }
    if (!partBForm.appendix) {
      document.getElementById("appendix_err").innerHTML =
        "* Appendix cannot be left empty";
    }
    if (!partBForm.attemp_extingush) {
      document.getElementById("attemp_extingush_err").innerHTML =
        "* Attemp Extingush cannot be left empty";
    }
    if (!partBForm.behaviour) {
      document.getElementById("behaviour_err").innerHTML =
        "* Behaviour cannot be left empty";
    }
    if (!partBForm.bring_to_safety) {
      document.getElementById("bring_to_safety_err").innerHTML =
        "* Bring To Safety cannot be left empty";
    }
    if (!partBForm.file_upload) {
      document.getElementById("file_upload_err").innerHTML =
        "* File Upload cannot be left empty";
    }
    if (!partBForm.fire_protection) {
      document.getElementById("fire_protection_err").innerHTML =
        "* fire protection cannot be left empty";
    }
    if (!partBForm.fire_security_regulation) {
      document.getElementById("fire_security_regulation_err").innerHTML =
        "* fire safety regulation cannot be left empty";
    }
    if (!partBForm.fire_smoke_propegation) {
      document.getElementById("fire_smoke_propegation_err").innerHTML =
        "* fire smoke propegation cannot be left empty";
    }
    if (!partBForm.introduction) {
      document.getElementById("introduction_err").innerHTML =
        "* introduction cannot be left empty";
    }
    if (!partBForm.observaion_alarm) {
      document.getElementById("observaion_alarm_err").innerHTML =
        "* observaion alarm cannot be left empty";
    }
    if (!partBForm.report_fire) {
      document.getElementById("report_fire_err").innerHTML =
        "* report fire cannot be left empty";
    }
    if (!partBForm.rescue_routes) {
      document.getElementById("rescue_routes_err").innerHTML =
        "* rescue routes cannot be left empty";
    }
    if (!partBForm.sihnalization) {
      document.getElementById("sihnalization_err").innerHTML =
        "* sihnalization cannot be left empty";
    }
    if (!partBForm.special_rule) {
      document.getElementById("special_rule_err").innerHTML =
        "* special rule cannot be left empty";
    }
    //form filled
    if (partBForm.appendix) {
      document.getElementById("appendix_err").innerHTML = "";
    }
    if (partBForm.attemp_extingush) {
      document.getElementById("attemp_extingush_err").innerHTML = "";
    }
    if (partBForm.behaviour) {
      document.getElementById("behaviour_err").innerHTML = "";
    }
    if (partBForm.bring_to_safety) {
      document.getElementById("bring_to_safety_err").innerHTML = "";
    }
    if (partBForm.file_upload) {
      document.getElementById("file_upload_err").innerHTML = "";
    }
    if (partBForm.fire_protection) {
      document.getElementById("fire_protection_err").innerHTML = "";
    }
    if (partBForm.fire_security_regulation) {
      document.getElementById("fire_security_regulation_err").innerHTML = "";
    }
    if (partBForm.fire_smoke_propegation) {
      document.getElementById("fire_smoke_propegation_err").innerHTML = "";
    }
    if (partBForm.introduction) {
      document.getElementById("introduction_err").innerHTML = "";
    }
    if (partBForm.observaion_alarm) {
      document.getElementById("observaion_alarm_err").innerHTML = "";
    }
    if (partBForm.report_fire) {
      document.getElementById("report_fire_err").innerHTML = "";
    }
    if (partBForm.rescue_routes) {
      document.getElementById("rescue_routes_err").innerHTML = "";
    }
    if (partBForm.sihnalization) {
      document.getElementById("sihnalization_err").innerHTML = "";
    }
    if (partBForm.special_rule) {
      document.getElementById("special_rule_err").innerHTML = "";
    }
    if (
      partBForm.appendix &&
      partBForm.attemp_extingush &&
      partBForm.behaviour &&
      partBForm.bring_to_safety &&
      partBForm.file_upload &&
      partBForm.fire_protection &&
      partBForm.fire_security_regulation &&
      partBForm.fire_smoke_propegation &&
      partBForm.introduction &&
      partBForm.observaion_alarm &&
      partBForm.report_fire &&
      partBForm.rescue_routes &&
      partBForm.sihnalization &&
      partBForm.special_rule
    ) {
      createPartBApi(partBForm);
      setOpenPartB(false);
    }*/
    createPartBApi(partBForm);
    setOpenPartB(false);
    pdfDownloadFormAPI("body");
    setAddDocument(true);
    setCategoryList(false);
  };

  const handleUpdateCreateWord2 = (e) => {
    e.preventDefault();
    /*if (
      !partBForm.fire_protection ||
      !partBForm.fire_security_regulation ||
      !partBForm.fire_smoke_propegation ||
      !partBForm.introduction ||
      !partBForm.observaion_alarm ||
      !partBForm.report_fire ||
      !partBForm.rescue_routes ||
      !partBForm.sihnalization ||
      !partBForm.special_rule ||
      !partBForm.fire_smoke_propegation ||
      !partBForm.fire_security_regulation ||
      !partBForm.fire_protection ||
      !partBForm.appendix ||
      !partBForm.attemp_extingush ||
      !partBForm.behaviour ||
      !partBForm.bring_to_safety ||
      !partBForm.file_upload
    ) {
      toast.error(
        "We have found some empty fields please recheck the forms and fill it"
      );
    }
    if (!partBForm.appendix) {
      document.getElementById("appendix_err").innerHTML =
        "* Appendix cannot be left empty";
    }
    if (!partBForm.attemp_extingush) {
      document.getElementById("attemp_extingush_err").innerHTML =
        "* Attemp Extingush cannot be left empty";
    }
    if (!partBForm.behaviour) {
      document.getElementById("behaviour_err").innerHTML =
        "* Behaviour cannot be left empty";
    }
    if (!partBForm.bring_to_safety) {
      document.getElementById("bring_to_safety_err").innerHTML =
        "* Bring To Safety cannot be left empty";
    }
    if (!partBForm.file_upload) {
      document.getElementById("file_upload_err").innerHTML =
        "* File Upload cannot be left empty";
    }
    if (!partBForm.fire_protection) {
      document.getElementById("fire_protection_err").innerHTML =
        "* fire protection cannot be left empty";
    }
    if (!partBForm.fire_security_regulation) {
      document.getElementById("fire_security_regulation_err").innerHTML =
        "* fire safety regulation cannot be left empty";
    }
    if (!partBForm.fire_smoke_propegation) {
      document.getElementById("fire_smoke_propegation_err").innerHTML =
        "* fire smoke propegation cannot be left empty";
    }
    if (!partBForm.introduction) {
      document.getElementById("introduction_err").innerHTML =
        "* introduction cannot be left empty";
    }
    if (!partBForm.observaion_alarm) {
      document.getElementById("observaion_alarm_err").innerHTML =
        "* observaion alarm cannot be left empty";
    }
    if (!partBForm.report_fire) {
      document.getElementById("report_fire_err").innerHTML =
        "* report fire cannot be left empty";
    }
    if (!partBForm.rescue_routes) {
      document.getElementById("rescue_routes_err").innerHTML =
        "* rescue routes cannot be left empty";
    }
    if (!partBForm.sihnalization) {
      document.getElementById("sihnalization_err").innerHTML =
        "* sihnalization cannot be left empty";
    }
    if (!partBForm.special_rule) {
      document.getElementById("special_rule_err").innerHTML =
        "* special rule cannot be left empty";
    }
    //form filled
    if (partBForm.appendix) {
      document.getElementById("appendix_err").innerHTML = "";
    }
    if (partBForm.attemp_extingush) {
      document.getElementById("attemp_extingush_err").innerHTML = "";
    }
    if (partBForm.behaviour) {
      document.getElementById("behaviour_err").innerHTML = "";
    }
    if (partBForm.bring_to_safety) {
      document.getElementById("bring_to_safety_err").innerHTML = "";
    }
    if (partBForm.file_upload) {
      document.getElementById("file_upload_err").innerHTML = "";
    }
    if (partBForm.fire_protection) {
      document.getElementById("fire_protection_err").innerHTML = "";
    }
    if (partBForm.fire_security_regulation) {
      document.getElementById("fire_security_regulation_err").innerHTML = "";
    }
    if (partBForm.fire_smoke_propegation) {
      document.getElementById("fire_smoke_propegation_err").innerHTML = "";
    }
    if (partBForm.introduction) {
      document.getElementById("introduction_err").innerHTML = "";
    }
    if (partBForm.observaion_alarm) {
      document.getElementById("observaion_alarm_err").innerHTML = "";
    }
    if (partBForm.report_fire) {
      document.getElementById("report_fire_err").innerHTML = "";
    }
    if (partBForm.rescue_routes) {
      document.getElementById("rescue_routes_err").innerHTML = "";
    }
    if (partBForm.sihnalization) {
      document.getElementById("sihnalization_err").innerHTML = "";
    }
    if (partBForm.special_rule) {
      document.getElementById("special_rule_err").innerHTML = "";
    }
    if (
      partBForm.appendix &&
      partBForm.attemp_extingush &&
      partBForm.behaviour &&
      partBForm.bring_to_safety &&
      partBForm.file_upload &&
      partBForm.fire_protection &&
      partBForm.fire_security_regulation &&
      partBForm.fire_smoke_propegation &&
      partBForm.introduction &&
      partBForm.observaion_alarm &&
      partBForm.report_fire &&
      partBForm.rescue_routes &&
      partBForm.sihnalization &&
      partBForm.special_rule
    ) {
      createPartBApi(partBForm);
      setOpenPartB(false);
    }*/
    createPartBApi(partBForm);
    setOpenPartB(false);
    //wordDownloadFormAPI(json.data._id);
    pdfDownloadFormAPI("body");
    setAddDocument(true);
    setCategoryList(false);
  };

  // Create Word
  const handleCreateWord2 = (e) => {
    e.preventDefault();
    /*if (
      !partBForm.fire_protection ||
      !partBForm.fire_security_regulation ||
      !partBForm.fire_smoke_propegation ||
      !partBForm.introduction ||
      !partBForm.observaion_alarm ||
      !partBForm.report_fire ||
      !partBForm.rescue_routes ||
      !partBForm.sihnalization ||
      !partBForm.special_rule ||
      !partBForm.fire_smoke_propegation ||
      !partBForm.fire_security_regulation ||
      !partBForm.fire_protection ||
      !partBForm.appendix ||
      !partBForm.attemp_extingush ||
      !partBForm.behaviour ||
      !partBForm.bring_to_safety ||
      !partBForm.file_upload
    ) {
      toast.error(
        "We have found some empty fields please recheck the forms and fill it"
      );
    }
    if (!partBForm.appendix) {
      document.getElementById("appendix_err").innerHTML =
        "* Appendix cannot be left empty";
    }
    if (!partBForm.attemp_extingush) {
      document.getElementById("attemp_extingush_err").innerHTML =
        "* Attemp Extingush cannot be left empty";
    }
    if (!partBForm.behaviour) {
      document.getElementById("behaviour_err").innerHTML =
        "* Behaviour cannot be left empty";
    }
    if (!partBForm.bring_to_safety) {
      document.getElementById("bring_to_safety_err").innerHTML =
        "* Bring To Safety cannot be left empty";
    }
    if (!partBForm.file_upload) {
      document.getElementById("file_upload_err").innerHTML =
        "* File Upload cannot be left empty";
    }
    if (!partBForm.fire_protection) {
      document.getElementById("fire_protection_err").innerHTML =
        "* fire protection cannot be left empty";
    }
    if (!partBForm.fire_security_regulation) {
      document.getElementById("fire_security_regulation_err").innerHTML =
        "* fire safety regulation cannot be left empty";
    }
    if (!partBForm.fire_smoke_propegation) {
      document.getElementById("fire_smoke_propegation_err").innerHTML =
        "* fire smoke propegation cannot be left empty";
    }
    if (!partBForm.introduction) {
      document.getElementById("introduction_err").innerHTML =
        "* introduction cannot be left empty";
    }
    if (!partBForm.observaion_alarm) {
      document.getElementById("observaion_alarm_err").innerHTML =
        "* observaion alarm cannot be left empty";
    }
    if (!partBForm.report_fire) {
      document.getElementById("report_fire_err").innerHTML =
        "* report fire cannot be left empty";
    }
    if (!partBForm.rescue_routes) {
      document.getElementById("rescue_routes_err").innerHTML =
        "* rescue routes cannot be left empty";
    }
    if (!partBForm.sihnalization) {
      document.getElementById("sihnalization_err").innerHTML =
        "* sihnalization cannot be left empty";
    }
    if (!partBForm.special_rule) {
      document.getElementById("special_rule_err").innerHTML =
        "* special rule cannot be left empty";
    }
    //form filled
    if (partBForm.appendix) {
      document.getElementById("appendix_err").innerHTML = "";
    }
    if (partBForm.attemp_extingush) {
      document.getElementById("attemp_extingush_err").innerHTML = "";
    }
    if (partBForm.behaviour) {
      document.getElementById("behaviour_err").innerHTML = "";
    }
    if (partBForm.bring_to_safety) {
      document.getElementById("bring_to_safety_err").innerHTML = "";
    }
    if (partBForm.file_upload) {
      document.getElementById("file_upload_err").innerHTML = "";
    }
    if (partBForm.fire_protection) {
      document.getElementById("fire_protection_err").innerHTML = "";
    }
    if (partBForm.fire_security_regulation) {
      document.getElementById("fire_security_regulation_err").innerHTML = "";
    }
    if (partBForm.fire_smoke_propegation) {
      document.getElementById("fire_smoke_propegation_err").innerHTML = "";
    }
    if (partBForm.introduction) {
      document.getElementById("introduction_err").innerHTML = "";
    }
    if (partBForm.observaion_alarm) {
      document.getElementById("observaion_alarm_err").innerHTML = "";
    }
    if (partBForm.report_fire) {
      document.getElementById("report_fire_err").innerHTML = "";
    }
    if (partBForm.rescue_routes) {
      document.getElementById("rescue_routes_err").innerHTML = "";
    }
    if (partBForm.sihnalization) {
      document.getElementById("sihnalization_err").innerHTML = "";
    }
    if (partBForm.special_rule) {
      document.getElementById("special_rule_err").innerHTML = "";
    }
    if (
      partBForm.appendix &&
      partBForm.attemp_extingush &&
      partBForm.behaviour &&
      partBForm.bring_to_safety &&
      partBForm.file_upload &&
      partBForm.fire_protection &&
      partBForm.fire_security_regulation &&
      partBForm.fire_smoke_propegation &&
      partBForm.introduction &&
      partBForm.observaion_alarm &&
      partBForm.report_fire &&
      partBForm.rescue_routes &&
      partBForm.sihnalization &&
      partBForm.special_rule
    ) {
      createPartBApi(partBForm);
      setOpenPartB(false);
    }*/
    createPartBApi(partBForm);
    setOpenPartB(false);
    //wordDownloadFormAPI(json.data._id);
    pdfDownloadFormAPI("body");
    setAddDocument(true);
    setCategoryList(false);
  };

  return (
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
          <div className="col-lg-9">
            <div className="officerRegulation_box">
              <div className="row">
                <div className="col-lg-4">
                  <div className="officerRegulation_cmn-box">
                    <h5 className="officerRegulation_heading">
                      Package Starter
                    </h5>
                    <div className="officerRegulation_innerbox">
                      <div className="officerRegulation_headingBox">
                        <h5 className="officerRegulation_heading">
                          fire regulations
                        </h5>
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
                      <div className="bso-box">
                        <h6>BSO Part A</h6>
                        <div className="btn-group justify-content-center">
                          {selectedLocationId ? (
                            <button
                              class="btn cmn_yellow_bg"
                              onClick={(e) => setOpenPartA(true)}
                            >
                              Create
                            </button>
                          ) : (
                            <>
                              <span>Select a Location first.</span>
                            </>
                          )}
                          {/*<button
                            class="btn cmn_red_bg"
                            onClick={(e) => setOpenUpload(true)}
                          >
                            <CloudUploadOutlinedIcon
                              className="cloudUplaod"
                              color="action"
                            />
                            Upload
                          </button>*/}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="officerRegulation_cmn-box">
                    <h5 className="officerRegulation_heading">
                      Package Profesional
                    </h5>
                    <div className="officerRegulation_innerbox">
                      <div className="officerRegulation_headingBox">
                        <h5 className="officerRegulation_heading">
                          fire regulations
                        </h5>
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
                      <div className="bso-box-wrap">
                        <div className="bso-box">
                          <h6>BSO Part A</h6>
                          <div className="btn-group justify-content-center">
                            {selectedLocationId ? (
                              <button
                                class="btn cmn_yellow_bg"
                                onClick={(e) => setOpenPartA(true)}
                              >
                                Create
                              </button>
                            ) : (
                              <span>Select a location first</span>
                            )}
                            {/*<button
                              class="btn cmn_red_bg"
                              onClick={(e) => setOpenUpload(true)}
                            >
                              <CloudUploadOutlinedIcon
                                className="cloudUplaod"
                                color="action"
                              />
                              Upload
                        </button>*/}
                          </div>
                        </div>
                        <div className="bso-box">
                          <h6>BSO Part C</h6>
                          <div className="btn-group justify-content-center">
                            {selectedLocationId ? (
                              <>
                                <button
                                  class="btn cmn_yellow_bg"
                                  onClick={(e) => setOpenPartC(true)}
                                >
                                  Create
                                </button>
                                <button
                                  onClick={(e) => getBsoC()}
                                  className="open-btn"
                                  id="open-btn3"
                                >
                                  Open
                                </button>
                                <div
                                  style={{
                                    position: "absolute",
                                    top: "90px",
                                    left: "-82px",
                                    border: "1px solid black",
                                    backgroundColor: "white",
                                  }}
                                  id="dropdown_bso_c"
                                >
                                  {partCForm.length > 0 ? (
                                    partCForm?.map((curelem, index) => {
                                      console.log("curelem", curelem);
                                      return (
                                        <ul className="certificateFormCont">
                                          <li className="sequenceNo">
                                            {index + 1}
                                          </li>
                                          <li className="activity">
                                            {curelem?.createdAt}
                                          </li>
                                          <li className="Delete">
                                            <DeleteOutlinedIcon
                                              className="hand"
                                              onClick={(e) => {
                                                deleteFormC(curelem._id);
                                              }}
                                              color="action"
                                            />
                                          </li>
                                          <li className="Edit">
                                            <EditIcon
                                              className="hand"
                                              onClick={(e) => {
                                                editBsoC(curelem._id);
                                              }}
                                              color="action"
                                            />
                                          </li>
                                        </ul>
                                      );
                                    })
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </>
                            ) : (
                              <span>Select a location first.</span>
                            )}
                            {/*<button class="btn cmn_red_bg">
                              <CloudUploadOutlinedIcon
                                className="cloudUplaod"
                                color="action"
                              />
                              Upload
                            </button>*/}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="officerRegulation_box">
              <div className="officerRegulation_cmn-box">
                <h5 className="officerRegulation_heading">
                  Package Expert + Business
                </h5>
                <div className="officerRegulation_innerbox">
                  <div className="officerRegulation_headingBox">
                    <h5 className="officerRegulation_heading">
                      fire regulations
                    </h5>
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
                  <div className="bso-box-wrap">
                    <div className="bso-box">
                      <h6>BSO Part A</h6>
                      <div className="btn-group justify-content-center">
                        {selectedLocationId ? (
                          <button
                            class="btn cmn_yellow_bg"
                            onClick={(e) => setOpenPartA(true)}
                          >
                            Create
                          </button>
                        ) : (
                          <span>Select a location first.</span>
                        )}
                        {/*<button
                          class="btn cmn_red_bg"
                          onClick={(e) => setOpenUpload(true)}
                        >
                          <CloudUploadOutlinedIcon
                            className="cloudUplaod"
                            color="action"
                          />
                          Upload
                        </button>*/}
                      </div>
                    </div>
                    <div className="bso-box">
                      <h6>BSO Part B</h6>
                      <div className="btn-group justify-content-center">
                        {selectedLocationId ? (
                          <>
                            <button
                              class="btn cmn_yellow_bg"
                              onClick={(e) => {
                                setOpenPartB(true);
                                setupdatePartB(false);
                              }}
                            >
                              Create
                            </button>
                            <button
                              className="open-btn"
                              id="open-btn"
                              onClick={(e) => getBsoB()}
                            >
                              Open
                            </button>
                            <div
                              style={{
                                position: "absolute",
                                top: "90px",
                                left: "-82px",
                                border: "1px solid black",
                                backgroundColor: "white",
                              }}
                              id="dropdown_bso_b"
                            >
                              {partBForm.length > 0 ? (
                                partBForm?.map((curelem, index) => {
                                  console.log("curelem", curelem);
                                  return (
                                    <ul className="certificateFormCont">
                                      <li className="sequenceNo">
                                        {index + 1}
                                      </li>
                                      <li className="activity">
                                        {curelem?.createdAt}
                                      </li>
                                      <li className="Delete">
                                        <DeleteOutlinedIcon
                                          className="hand"
                                          onClick={(e) => {
                                            deleteFormB(curelem._id);
                                          }}
                                          color="action"
                                        />
                                      </li>
                                      <li className="Edit">
                                        <EditIcon
                                          className="hand"
                                          onClick={(e) => {
                                            editBsoB(curelem._id);
                                          }}
                                          color="action"
                                        />
                                      </li>
                                    </ul>
                                  );
                                })
                              ) : (
                                <></>
                              )}
                            </div>
                          </>
                        ) : (
                          <span>Select a location first.</span>
                        )}
                        {/*<button class="btn cmn_red_bg">
                          <CloudUploadOutlinedIcon
                            className="cloudUplaod"
                            color="action"
                          />
                          Upload
                      </button>*/}
                      </div>
                    </div>
                    <div className="bso-box">
                      <h6>BSO Part C</h6>
                      <div className="btn-group justify-content-center">
                        {selectedLocationId ? (
                          <>
                            <button
                              class="btn cmn_yellow_bg"
                              onClick={(e) => setOpenPartC(true)}
                            >
                              Create
                            </button>
                            <button
                              onClick={(e) => getBsoC()}
                              className="open-btn"
                              id="open-btn2"
                            >
                              Open
                            </button>
                            <div
                              style={{
                                position: "absolute",
                                top: "90px",
                                left: "-82px",
                                border: "1px solid black",
                                backgroundColor: "white",
                              }}
                              id="dropdown_bso_c2"
                            >
                              {partCForm.length > 0 ? (
                                partCForm?.map((curelem, index) => {
                                  console.log("curelem", curelem);
                                  return (
                                    <ul className="certificateFormCont">
                                      <li className="sequenceNo">
                                        {index + 1}
                                      </li>
                                      <li className="activity">
                                        {curelem?.createdAt}
                                      </li>
                                      <li className="Delete">
                                        <DeleteOutlinedIcon
                                          className="hand"
                                          onClick={(e) => {
                                            deleteFormC(curelem._id);
                                          }}
                                          color="action"
                                        />
                                      </li>
                                      <li className="Edit">
                                        <EditIcon
                                          className="hand"
                                          onClick={(e) => {
                                            editBsoC(curelem._id);
                                          }}
                                          color="action"
                                        />
                                      </li>
                                    </ul>
                                  );
                                })
                              ) : (
                                <></>
                              )}
                            </div>
                          </>
                        ) : (
                          <span>Select a location first.</span>
                        )}
                        {/*<button class="btn cmn_red_bg">
                          <CloudUploadOutlinedIcon
                            className="cloudUplaod"
                            color="action"
                          />
                          Upload
                    </button>*/}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openPartA && (
        <OfficeModal
          content={
            <>
              <div className="officer-dialog">
                <div className="officer-dialog-head">
                  <h3>Fire protection regulations part A</h3>
                  <CloseIcon
                    className="closeModal"
                    color="action"
                    onClick={(e) => {
                      setOpenPartA(false);
                    }}
                  />
                </div>
                <div className="officer-dialog-body">
                  <div className="form-group">
                    {/* <label htmlFor="select_template">Select Template</label> */}
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      name="select_template"
                      id="select_template"
                      onChange={(e) => handlePartAInput(e)}
                    >
                      <option value="0" selected>
                        Vorlage wählen
                      </option>
                      <option value="1">nach DIN14096 (de)</option>
                      <option value="2">nach DIN14096 (de) mit BMA</option>
                      <option value="3">nach DIN14096 (eng)</option>
                      <option value="4">nach DIN 14096 (eng) mit BMA</option>
                      <option value="5">
                        nach DIN 14096 (de) mit Hausalarm
                      </option>
                      <option value="6">
                        nach DIN14096 (eng) mit Hausalarm​
                      </option>
                    </select>
                  </div>
                  <button
                    class="btn cmn_yellow_bg"
                    onClick={(e) => {
                      setOpenPartA(false);
                      createBSO_A(BSO_A_input);
                    }}
                  >
                    Create
                  </button>
                </div>
              </div>
            </>
          }
        />
      )}
      {openUpload && (
        <OfficeModal
          content={
            <>
              <div className="officer-dialog">
                <div className="officer-dialog-head">
                  <h3>Fire protection regulations part A</h3>
                  <CloseIcon
                    className="closeModal"
                    color="action"
                    onClick={(e) => {
                      setOpenUpload(false);
                    }}
                  />
                </div>
                <div className="officer-dialog-body uploadFile">
                  <div className="form-group">
                    {/* <label htmlFor="select_template">Select Template</label> */}
                    <input
                      type="file"
                      id="uploadFile"
                      onChange={(e) => {
                        setUploadTemplate(e.target.files[0]);
                      }}
                    />
                    <button class="btn cmn_yellow_bg">
                      <CloudUploadOutlinedIcon
                        className="cloudUplaod"
                        color="action"
                      />
                      Choose a file
                    </button>
                    {uploadTemplate && uploadTemplate?.name}
                  </div>
                  <button
                    class="btn cmn_yellow_bg"
                    onClick={(e) => {
                      submitUploadTemplate(e);
                    }}
                  >
                    Create
                  </button>
                </div>
              </div>
            </>
          }
        />
      )}
      {updatePartB && (
        <OfficeModal
          content={
            <>
              <div className="workCertificate cmn-modal">
                <CloseIcon
                  className="closeModal"
                  color="action"
                  onClick={(e) => {
                    setupdatePartB(false);
                  }}
                />
                <div className="formPop">
                  <div className="form-head">
                    {formTitles2.map((curElem, index) => {
                      return (
                        <>
                          <button
                            className={`${page2 >= index && "active"}`}
                            onClick={(e) => {
                              if (page2 > index) {
                                setPage2((currPage) => (currPage = index));
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
                    <div className="formPop-forms">
                      {/* Content */}
                      <div
                        className={`formPop-cmn ${page2 === 0 && "active"}`}
                        id="Content"
                      >
                        <h6>
                          The fire protection regulations part B according to
                          DIN 14096
                        </h6>
                        <ul className="content-list">
                          <li>a) Introduction</li>
                          <li>
                            b) Fire safety regulations (representation of part A
                            (notice))
                          </li>
                          <li>c) Fire prevention</li>
                          <li>d) Fire and smoke propagation</li>
                          <li>e) Escape and rescue routes</li>
                          <li>f) Signaling and extinguishing devices</li>
                          <li>g) Behavior in case of fire</li>
                          <li>h) Report fire</li>
                          <li>i) Observe alarm signals and instructions</li>
                          <li>j) bring to safety</li>
                          <li>k) Make attempts to extinguish</li>
                          <li>l) Special rules of conduct</li>
                          <li>m) Appendix</li>
                        </ul>
                      </div>
                      {/* a+b */}
                      <div
                        className={`formPop-cmn formPop-content ${
                          page2 === 1 && "active"
                        }`}
                        id="a+b"
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>a) Introduction</h6>
                              <JoditEditor
                                ref={editor}
                                name="introduction"
                                id="introduction"
                                cols="30"
                                rows="10"
                                value={partBForm.introduction}
                                onChange={(val) => {
                                  handlePartBInput(val, "introduction");
                                }}
                              />
                            </div>
                            <div className="errors" id="introduction_err"></div>
                          </div>
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>
                                b) Fire safety regulations (representation of
                                part A (notice))
                              </h6>
                              <p>Pdf by BSO A</p>
                            </div>
                            <div
                              className="errors"
                              id="fire_security_regulation_err"
                            ></div>
                          </div>
                        </div>
                      </div>
                      {/* c+d */}
                      <div
                        className={`formPop-cmn formPop-content ${
                          page2 === 2 && "active"
                        }`}
                        id="c+d"
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>c) Fire prevention</h6>
                              <JoditEditor
                                ref={editor}
                                name="fire_protection"
                                id="fire_protection"
                                cols="30"
                                value={partBForm.fire_protection}
                                rows="10"
                                onChange={(val) => {
                                  handlePartBInput(val, "fire_protection");
                                }}
                              />
                            </div>
                            <div
                              className="errors"
                              id="fire_protection_err"
                            ></div>
                          </div>
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>d) Fire and smoke propagation</h6>
                              <JoditEditor
                                ref={editor}
                                name="fire_smoke_propegation"
                                id="fire_smoke_propegation"
                                value={partBForm.fire_smoke_propegation}
                                cols="30"
                                rows="10"
                                onChange={(val) => {
                                  handlePartBInput(
                                    val,
                                    "fire_smoke_propegation"
                                  );
                                }}
                              />
                            </div>
                            <div
                              className="errors"
                              id="fire_smoke_propegation_err"
                            ></div>
                          </div>
                        </div>
                      </div>
                      {/* e+f */}
                      <div
                        className={`formPop-cmn formPop-content ${
                          page2 === 3 && "active"
                        }`}
                        id="e+f"
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>e) Escape and rescue routes</h6>
                              <JoditEditor
                                ref={editor}
                                name="rescue_routes"
                                id="rescue_routes"
                                cols="30"
                                value={partBForm.rescue_routes}
                                rows="10"
                                onChange={(val) => {
                                  handlePartBInput(val, "rescue_routes");
                                }}
                              />
                            </div>
                            <div
                              className="errors"
                              id="rescue_routes_err"
                            ></div>
                          </div>
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>f) Signaling and extinguishing devices</h6>
                              <JoditEditor
                                ref={editor}
                                name="sihnalization"
                                id="sihnalization"
                                cols="30"
                                value={partBForm.sihnalization}
                                rows="10"
                                onChange={(val) => {
                                  handlePartBInput(val, "sihnalization");
                                }}
                              />
                            </div>
                            <div
                              className="errors"
                              id="sihnalization_err"
                            ></div>
                          </div>
                        </div>
                      </div>
                      {/* G+(h) */}
                      <div
                        className={`formPop-cmn formPop-content ${
                          page2 === 4 && "active"
                        }`}
                        id="G+(h)"
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>g) Behavior in case of fire</h6>
                              <JoditEditor
                                ref={editor}
                                name="behaviour"
                                id="behaviour"
                                cols="30"
                                value={partBForm.behaviour}
                                rows="10"
                                onChange={(val) => {
                                  handlePartBInput(val, "behaviour");
                                }}
                              />
                            </div>
                            <div className="errors" id="behaviour_err"></div>
                          </div>
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>h) Report fire</h6>
                              <JoditEditor
                                ref={editor}
                                name="report_fire"
                                id="report_fire"
                                cols="30"
                                rows="10"
                                value={partBForm.report_fire}
                                onChange={(val) => {
                                  handlePartBInput(val, "report_fire");
                                }}
                              />
                            </div>
                            <div className="errors" id="report_fire_err"></div>
                          </div>
                        </div>
                      </div>
                      {/* G+(h) */}
                      <div
                        className={`formPop-cmn formPop-content ${
                          page2 === 5 && "active"
                        }`}
                        id="G+(h)"
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>i) Observe alarm signals and instructions</h6>
                              <JoditEditor
                                ref={editor}
                                name="observaion_alarm"
                                id="observaion_alarm"
                                cols="30"
                                value={partBForm.observaion_alarm}
                                rows="10"
                                onChange={(val) => {
                                  handlePartBInput(val, "observaion_alarm");
                                }}
                              />
                            </div>
                            <div
                              className="errors"
                              id="observaion_alarm_err"
                            ></div>
                          </div>
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>j) bring to safety</h6>
                              <JoditEditor
                                ref={editor}
                                name="bring_to_safety"
                                id="bring_to_safety"
                                cols="30"
                                rows="10"
                                value={partBForm.bring_to_safety}
                                onChange={(val) => {
                                  handlePartBInput(val, "bring_to_safety");
                                }}
                              />
                            </div>
                            <div
                              className="errors"
                              id="bring_to_safety_err"
                            ></div>
                          </div>
                        </div>
                      </div>
                      {/* G+(h) */}
                      <div
                        className={`formPop-cmn formPop-content ${
                          page2 === 6 && "active"
                        }`}
                        id="G+(h)"
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>k) Make attempts to extinguish</h6>
                              <JoditEditor
                                ref={editor}
                                name="attemp_extingush"
                                id="attemp_extingush"
                                cols="30"
                                value={partBForm.attemp_extingush}
                                rows="10"
                                onChange={(val) => {
                                  handlePartBInput(val, "attemp_extingush");
                                }}
                              />
                            </div>
                            <div
                              className="errors"
                              id="attemp_extingush_err"
                            ></div>
                          </div>
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>l) Special rules of conduct</h6>
                              <JoditEditor
                                ref={editor}
                                name="special_rule"
                                id="special_rule"
                                cols="30"
                                value={partBForm.special_rule}
                                rows="10"
                                onChange={(val) => {
                                  handlePartBInput(val, "special_rule");
                                }}
                              />
                            </div>
                            <div className="errors" id="special_rule_err"></div>
                          </div>
                        </div>
                      </div>
                      {/* H (i) */}
                      <div
                        className={`formPop-cmn formPop-content ${
                          page2 === 7 && "active"
                        }`}
                        id="H (i)"
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>h) (i) Appendix</h6>
                              <JoditEditor
                                ref={editor}
                                name="appendix"
                                id="appendix"
                                cols="30"
                                value={partBForm.appendix}
                                rows="10"
                                onChange={(val) => {
                                  handlePartBInput(val, "appendix");
                                }}
                              />
                            </div>
                            <div className="errors" id="appendix_err"></div>
                          </div>
                          <div className="col-lg-6">
                            <div className="content-box">
                              <div className="uploadFileArea">
                                <div className="form-group file-area">
                                  {/* <input type="file" name="file_upload" id="upload_document" accept=".pdf,.doc" onChange={(e) => { handlePartBFile(e); console.log("file", e.target.file[0]) }} /> */}
                                  <input
                                    type="file"
                                    name="file_upload"
                                    id="upload_document"
                                    accept=".pdf,.doc"
                                    onChange={(e) => handlePartBFile(e)}
                                  />
                                  <div class="file-dummy">
                                    <div className="indiebloc">
                                      {partBForm?.file_upload ? (
                                        <>{partBForm.file_upload.name}</>
                                      ) : (
                                        <>
                                          <svg
                                            className="icon"
                                            aria-labelledby="Drag Drop Icon"
                                          >
                                            <title id="dragDrop">
                                              Drag Drop Icon
                                            </title>
                                            <use
                                              xlinkHref="/assets/svg-icons/icons.svg#dragDrop"
                                              xlinkTitle="Drag Drop Icon"
                                            ></use>
                                          </svg>
                                          <p>Drag & Drop to Upload File</p>
                                          <button className="btn cmn_red_bg">
                                            Browse File
                                          </button>
                                        </>
                                      )}
                                    </div>
                                    <div className="upload-file-icons">
                                      <img
                                        src="/assets/images/icon01.png"
                                        alt="Icon 01"
                                      />
                                      <img
                                        src="/assets/images/icon02.png"
                                        alt="Icon 02"
                                      />
                                      <img
                                        src="/assets/images/icon03.png"
                                        alt="Icon 03"
                                      />
                                      <img
                                        src="/assets/images/icon04.png"
                                        alt="Icon 04"
                                      />
                                      <img
                                        src="/assets/images/icon05.png"
                                        alt="Icon 05"
                                      />
                                      <img
                                        src="/assets/images/icon06.png"
                                        alt="Icon 06"
                                      />
                                      <img
                                        src="/assets/images/icon07.png"
                                        alt="Icon 07"
                                      />
                                    </div>
                                    <button className="btn cmn_yellow_bg">
                                      <svg
                                        className="icon"
                                        aria-labelledby="Drag Drop Icon"
                                      >
                                        <title id="dragDrop">
                                          Drag Drop Icon
                                        </title>
                                        <use
                                          xlinkHref="/assets/svg-icons/icons.svg#dragDrop"
                                          xlinkTitle="Drag Drop Icon"
                                        ></use>
                                      </svg>
                                      Upload Document
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="errors" id="file_upload_err"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="formPop-footer">
                      <div className="btn-group">
                        <button
                          className="btn cmn_red_bg"
                          onClick={(e) => {
                            setPage2((currPage) => currPage - 1);
                          }}
                          disabled={page2 == 0}
                        >
                          <ArrowCircleLeftOutlinedIcon
                            className="prevbtn "
                            color="action"
                          />{" "}
                          Back
                        </button>
                        {page2 == 8 ? (
                          <>
                            {/* <Pdf targetRef={pdfRef} filename="code-example.pdf">
                                                                {({ toPdf }) => <button className="btn cmn_yellow_bg" onClick={hvb(e) => {handleCreatePdf(e); }} >Create PDF{toPdf}</button>}
                                                        </Pdf> */}
                            <button
                              className="btn cmn_yellow_bg"
                              onClick={(e) => {
                                handleUpdateCreatePdf2(e);
                              }}
                            >
                              Update + Create PDF
                            </button>
                            <button
                              className="btn cmn_yellow_bg"
                              onClick={(e) => {
                                handleUpdateCreateWord2(e);
                              }}
                            >
                              Update + Create Word
                            </button>
                          </>
                        ) : (
                          <button
                            className="btn cmn_yellow_bg"
                            onClick={(e) => {
                              handleNextStep2(e);
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
            </>
          }
        />
      )}
      {openPartB && (
        <OfficeModal
          content={
            <>
              <div className="workCertificate cmn-modal">
                <CloseIcon
                  className="closeModal"
                  color="action"
                  onClick={(e) => {
                    setOpenPartB(false);
                  }}
                />
                <div className="formPop">
                  <div className="form-head">
                    {formTitles2.map((curElem, index) => {
                      return (
                        <>
                          <button
                            className={`${page2 >= index && "active"}`}
                            onClick={(e) => {
                              if (page2 > index) {
                                setPage2((currPage) => (currPage = index));
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
                    <div className="formPop-forms">
                      {/* Content */}
                      <div
                        className={`formPop-cmn ${page2 === 0 && "active"}`}
                        id="Content"
                      >
                        <h6>
                          The fire protection regulations part B according to
                          DIN 14096
                        </h6>
                        <ul className="content-list">
                          <li>a) Introduction</li>
                          <li>
                            b) Fire safety regulations (representation of part A
                            (notice))
                          </li>
                          <li>c) Fire prevention</li>
                          <li>d) Fire and smoke propagation</li>
                          <li>e) Escape and rescue routes</li>
                          <li>f) Signaling and extinguishing devices</li>
                          <li>g) Behavior in case of fire</li>
                          <li>h) Report fire</li>
                          <li>i) Observe alarm signals and instructions</li>
                          <li>j) bring to safety</li>
                          <li>k) Make attempts to extinguish</li>
                          <li>l) Special rules of conduct</li>
                          <li>m) Appendix</li>
                        </ul>
                      </div>
                      {/* a+b */}
                      <div
                        className={`formPop-cmn formPop-content ${
                          page2 === 1 && "active"
                        }`}
                        id="a+b"
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>a) Introduction</h6>
                              <JoditEditor
                                ref={editor}
                                name="introduction"
                                id="introduction"
                                cols="30"
                                rows="10"
                                onChange={(val) => {
                                  handlePartBInput(val, "introduction");
                                }}
                              />
                            </div>
                            <div className="errors" id="introduction_err"></div>
                          </div>
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>
                                b) Fire safety regulations (representation of
                                part A (notice))
                              </h6>
                              <p>Pdf by BSO A</p>
                            </div>
                            <div
                              className="errors"
                              id="fire_security_regulation_err"
                            ></div>
                          </div>
                        </div>
                      </div>
                      {/* c+d */}
                      <div
                        className={`formPop-cmn formPop-content ${
                          page2 === 2 && "active"
                        }`}
                        id="c+d"
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>c) Fire prevention</h6>
                              <JoditEditor
                                ref={editor}
                                name="fire_protection"
                                id="fire_protection"
                                cols="30"
                                rows="10"
                                onChange={(val) => {
                                  handlePartBInput(val, "fire_protection");
                                }}
                              />
                            </div>
                            <div
                              className="errors"
                              id="fire_protection_err"
                            ></div>
                          </div>
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>d) Fire and smoke propagation</h6>
                              <JoditEditor
                                ref={editor}
                                name="fire_smoke_propegation"
                                id="fire_smoke_propegation"
                                cols="30"
                                rows="10"
                                onChange={(val) => {
                                  handlePartBInput(
                                    val,
                                    "fire_smoke_propegation"
                                  );
                                }}
                              />
                            </div>
                            <div
                              className="errors"
                              id="fire_smoke_propegation_err"
                            ></div>
                          </div>
                        </div>
                      </div>
                      {/* e+f */}
                      <div
                        className={`formPop-cmn formPop-content ${
                          page2 === 3 && "active"
                        }`}
                        id="e+f"
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>e) Escape and rescue routes</h6>
                              <JoditEditor
                                ref={editor}
                                name="rescue_routes"
                                id="rescue_routes"
                                cols="30"
                                rows="10"
                                onChange={(val) => {
                                  handlePartBInput(val, "rescue_routes");
                                }}
                              />
                            </div>
                            <div
                              className="errors"
                              id="rescue_routes_err"
                            ></div>
                          </div>
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>f) Signaling and extinguishing devices</h6>
                              <JoditEditor
                                ref={editor}
                                name="sihnalization"
                                id="sihnalization"
                                cols="30"
                                rows="10"
                                onChange={(val) => {
                                  handlePartBInput(val, "sihnalization");
                                }}
                              />
                            </div>
                            <div
                              className="errors"
                              id="sihnalization_err"
                            ></div>
                          </div>
                        </div>
                      </div>
                      {/* G+(h) */}
                      <div
                        className={`formPop-cmn formPop-content ${
                          page2 === 4 && "active"
                        }`}
                        id="G+(h)"
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>g) Behavior in case of fire</h6>
                              <JoditEditor
                                ref={editor}
                                name="behaviour"
                                id="behaviour"
                                cols="30"
                                rows="10"
                                onChange={(val) => {
                                  handlePartBInput(val, "behaviour");
                                }}
                              />
                            </div>
                            <div className="errors" id="behaviour_err"></div>
                          </div>
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>h) Report fire</h6>
                              <JoditEditor
                                ref={editor}
                                name="report_fire"
                                id="report_fire"
                                cols="30"
                                rows="10"
                                onChange={(val) => {
                                  handlePartBInput(val, "report_fire");
                                }}
                              />
                            </div>
                            <div className="errors" id="report_fire_err"></div>
                          </div>
                        </div>
                      </div>
                      {/* G+(h) */}
                      <div
                        className={`formPop-cmn formPop-content ${
                          page2 === 5 && "active"
                        }`}
                        id="G+(h)"
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>i) Observe alarm signals and instructions</h6>
                              <JoditEditor
                                ref={editor}
                                name="observaion_alarm"
                                id="observaion_alarm"
                                cols="30"
                                rows="10"
                                onChange={(val) => {
                                  handlePartBInput(val, "observaion_alarm");
                                }}
                              />
                            </div>
                            <div
                              className="errors"
                              id="observaion_alarm_err"
                            ></div>
                          </div>
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>j) bring to safety</h6>
                              <JoditEditor
                                ref={editor}
                                name="bring_to_safety"
                                id="bring_to_safety"
                                cols="30"
                                rows="10"
                                onChange={(val) => {
                                  handlePartBInput(val, "bring_to_safety");
                                }}
                              />
                            </div>
                            <div
                              className="errors"
                              id="bring_to_safety_err"
                            ></div>
                          </div>
                        </div>
                      </div>
                      {/* G+(h) */}
                      <div
                        className={`formPop-cmn formPop-content ${
                          page2 === 6 && "active"
                        }`}
                        id="G+(h)"
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>k) Make attempts to extinguish</h6>
                              <JoditEditor
                                ref={editor}
                                name="attemp_extingush"
                                id="attemp_extingush"
                                cols="30"
                                rows="10"
                                onChange={(val) => {
                                  handlePartBInput(val, "attemp_extingush");
                                }}
                              />
                            </div>
                            <div
                              className="errors"
                              id="attemp_extingush_err"
                            ></div>
                          </div>
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>l) Special rules of conduct</h6>
                              <JoditEditor
                                ref={editor}
                                name="special_rule"
                                id="special_rule"
                                cols="30"
                                rows="10"
                                onChange={(val) => {
                                  handlePartBInput(val, "special_rule");
                                }}
                              />
                            </div>
                            <div className="errors" id="special_rule_err"></div>
                          </div>
                        </div>
                      </div>
                      {/* H (i) */}
                      <div
                        className={`formPop-cmn formPop-content ${
                          page2 === 7 && "active"
                        }`}
                        id="H (i)"
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>h) (i) Appendix</h6>
                              <JoditEditor
                                ref={editor}
                                name="appendix"
                                id="appendix"
                                cols="30"
                                rows="10"
                                onChange={(val) => {
                                  handlePartBInput(val, "appendix");
                                }}
                              />
                            </div>
                            <div className="errors" id="appendix_err"></div>
                          </div>
                          <div className="col-lg-6">
                            <div className="content-box">
                              <div className="uploadFileArea">
                                <div className="form-group file-area">
                                  {/* <input type="file" name="file_upload" id="upload_document" accept=".pdf,.doc" onChange={(e) => { handlePartBFile(e); console.log("file", e.target.file[0]) }} /> */}
                                  <input
                                    type="file"
                                    name="file_upload"
                                    id="upload_document"
                                    accept=".pdf,.doc"
                                    onChange={(e) => handlePartBFile(e)}
                                  />
                                  <div class="file-dummy">
                                    <div className="indiebloc">
                                      {partBForm?.file_upload ? (
                                        <>{partBForm.file_upload.name}</>
                                      ) : (
                                        <>
                                          <svg
                                            className="icon"
                                            aria-labelledby="Drag Drop Icon"
                                          >
                                            <title id="dragDrop">
                                              Drag Drop Icon
                                            </title>
                                            <use
                                              xlinkHref="/assets/svg-icons/icons.svg#dragDrop"
                                              xlinkTitle="Drag Drop Icon"
                                            ></use>
                                          </svg>
                                          <p>Drag & Drop to Upload File</p>
                                          <button className="btn cmn_red_bg">
                                            Browse File
                                          </button>
                                        </>
                                      )}
                                    </div>
                                    <div className="upload-file-icons">
                                      <img
                                        src="/assets/images/icon01.png"
                                        alt="Icon 01"
                                      />
                                      <img
                                        src="/assets/images/icon02.png"
                                        alt="Icon 02"
                                      />
                                      <img
                                        src="/assets/images/icon03.png"
                                        alt="Icon 03"
                                      />
                                      <img
                                        src="/assets/images/icon04.png"
                                        alt="Icon 04"
                                      />
                                      <img
                                        src="/assets/images/icon05.png"
                                        alt="Icon 05"
                                      />
                                      <img
                                        src="/assets/images/icon06.png"
                                        alt="Icon 06"
                                      />
                                      <img
                                        src="/assets/images/icon07.png"
                                        alt="Icon 07"
                                      />
                                    </div>
                                    <button className="btn cmn_yellow_bg">
                                      <svg
                                        className="icon"
                                        aria-labelledby="Drag Drop Icon"
                                      >
                                        <title id="dragDrop">
                                          Drag Drop Icon
                                        </title>
                                        <use
                                          xlinkHref="/assets/svg-icons/icons.svg#dragDrop"
                                          xlinkTitle="Drag Drop Icon"
                                        ></use>
                                      </svg>
                                      Upload Document
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="errors" id="file_upload_err"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="formPop-footer">
                      <div className="btn-group">
                        <button
                          className="btn cmn_red_bg"
                          onClick={(e) => {
                            setPage2((currPage) => currPage - 1);
                          }}
                          disabled={page2 == 0}
                        >
                          <ArrowCircleLeftOutlinedIcon
                            className="prevbtn "
                            color="action"
                          />{" "}
                          Back
                        </button>
                        {page2 == 8 ? (
                          <>
                            {/* <Pdf targetRef={pdfRef} filename="code-example.pdf">
                                                                {({ toPdf }) => <button className="btn cmn_yellow_bg" onClick={hvb(e) => {handleCreatePdf(e); }} >Create PDF{toPdf}</button>}
                                                        </Pdf> */}
                            <button
                              className="btn cmn_yellow_bg"
                              onClick={(e) => {
                                handleCreatePdf2(e);
                              }}
                            >
                              Create PDF
                            </button>
                            <button
                              className="btn cmn_yellow_bg"
                              onClick={(e) => {
                                handleCreateWord2(e);
                              }}
                            >
                              Create Word
                            </button>
                          </>
                        ) : (
                          <button
                            className="btn cmn_yellow_bg"
                            onClick={(e) => {
                              handleNextStep2(e);
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
            </>
          }
        />
      )}
      {openPartC && (
        <OfficeModal
          content={
            <>
              <div className="workCertificate cmn-modal">
                <CloseIcon
                  className="closeModal"
                  color="action"
                  onClick={(e) => {
                    setOpenPartC(false);
                  }}
                />
                <div className="formPop">
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
                    <div className="formPop-forms">
                      {/* Content */}
                      <div
                        className={`formPop-cmn ${page === 0 && "active"}`}
                        id="Content"
                      >
                        <h6>
                          The fire protection regulations part C according to
                          DIN 14096
                        </h6>
                        <ul className="content-list">
                          <li>a) Introduction</li>
                          <li>b) Fire prevention</li>
                          <li>c) Notification and alerting procedure</li>
                          <li>
                            d) Safety measures for persons, animals, the
                            environment and property
                          </li>
                          <li>e) Extinguishing measures</li>
                          <li>
                            f) Preparation for the use of the fire department
                          </li>
                          <li>g) Aftercare</li>
                          <li>(h) Standortbezogene Brandschutzpunkte</li>
                          <li>(i) h) Appendix</li>
                        </ul>
                      </div>
                      {/* a+b */}
                      <div
                        className={`formPop-cmn formPop-content ${
                          page === 1 && "active"
                        }`}
                        id="a+b"
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>a) Introduction</h6>
                              <JoditEditor
                                ref={editor}
                                name="introduction"
                                id="introduction"
                                cols="30"
                                rows="10"
                                onChange={(val) => {
                                  handlePartCInput(val, "introduction");
                                }}
                              />
                            </div>
                            <div
                              className="errors"
                              id="introduction2_err"
                            ></div>
                          </div>
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>b) Fire prevention</h6>
                              <JoditEditor
                                ref={editor}
                                name="fire_protection"
                                id="fire_protection"
                                cols="30"
                                rows="10"
                                onChange={(val) => {
                                  handlePartCInput(val, "fire_protection");
                                }}
                              />
                            </div>
                            <div
                              className="errors"
                              id="fire_protection2_err"
                            ></div>
                          </div>
                        </div>
                      </div>
                      {/* c+d */}
                      <div
                        className={`formPop-cmn formPop-content ${
                          page === 2 && "active"
                        }`}
                        id="c+d"
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>c) Notification and alerting procedure</h6>
                              <JoditEditor
                                ref={editor}
                                name="alert_procedure"
                                id="alert_procedure"
                                cols="30"
                                rows="10"
                                onChange={(val) => {
                                  handlePartCInput(val, "alert_procedure");
                                }}
                              />
                            </div>
                            <div
                              className="errors"
                              id="alert_procedure_err"
                            ></div>
                          </div>
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>
                                d) Safety measures for persons, animals, the
                                environment and property
                              </h6>
                              <JoditEditor
                                ref={editor}
                                name="safety_measures"
                                id="safety_measures"
                                cols="30"
                                rows="10"
                                onChange={(val) => {
                                  handlePartCInput(val, "safety_measures");
                                }}
                              />
                            </div>
                            <div
                              className="errors"
                              id="safety_measures_err"
                            ></div>
                          </div>
                        </div>
                      </div>
                      {/* e+f */}
                      <div
                        className={`formPop-cmn formPop-content ${
                          page === 3 && "active"
                        }`}
                        id="e+f"
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>e) Extinguishing measures</h6>
                              <JoditEditor
                                ref={editor}
                                name="extingush_measure"
                                id="extingush_measure"
                                cols="30"
                                rows="10"
                                onChange={(val) => {
                                  handlePartCInput(val, "extingush_measure");
                                }}
                              />
                            </div>
                            <div
                              className="errors"
                              id="extingush_measure_err"
                            ></div>
                          </div>
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>
                                f) Preparation for the use of the fire
                                department
                              </h6>
                              <JoditEditor
                                ref={editor}
                                name="fire_department"
                                id="fire_department"
                                cols="30"
                                rows="10"
                                onChange={(val) => {
                                  handlePartCInput(val, "fire_department");
                                }}
                              />
                            </div>
                            <div
                              className="errors"
                              id="fire_department_err"
                            ></div>
                          </div>
                        </div>
                      </div>
                      {/* G+(h) */}
                      <div
                        className={`formPop-cmn formPop-content ${
                          page === 4 && "active"
                        }`}
                        id="G+(h)"
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>g) Aftercare</h6>
                              <JoditEditor
                                ref={editor}
                                name="aftercare"
                                id="aftercare"
                                cols="30"
                                rows="10"
                                onChange={(val) => {
                                  handlePartCInput(val, "aftercare");
                                }}
                              />
                            </div>
                            <div className="errors" id="aftercare_err"></div>
                          </div>
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>h) Site-specific fire protection points</h6>
                              <JoditEditor
                                ref={editor}
                                name="site_specific"
                                id="site_specific"
                                cols="30"
                                rows="10"
                                onChange={(val) => {
                                  handlePartCInput(val, "site_specific");
                                }}
                              />
                            </div>
                            <div
                              className="errors"
                              id="site_specific_err"
                            ></div>
                          </div>
                        </div>
                      </div>
                      {/* H (i) */}
                      <div
                        className={`formPop-cmn formPop-content ${
                          page === 5 && "active"
                        }`}
                        id="H (i)"
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>h) (i) Appendix</h6>
                              <JoditEditor
                                ref={editor}
                                name="appendix"
                                id="appendix"
                                cols="30"
                                rows="10"
                                onChange={(val) => {
                                  handlePartCInput(val, "appendix");
                                }}
                              />
                            </div>
                            <div className="errors" id="appendix2_err"></div>
                          </div>
                          <div className="col-lg-6">
                            <div className="content-box">
                              <div className="uploadFileArea">
                                <div className="form-group file-area">
                                  <input
                                    type="file"
                                    name="file_upload"
                                    id="upload_document"
                                    accept=".pdf,.doc"
                                    onChange={(e) => handlePartCFile(e)}
                                  />
                                  <div class="file-dummy">
                                    <div className="indiebloc">
                                      {partCForm?.file_upload ? (
                                        <>{partCForm.file_upload.name}</>
                                      ) : (
                                        <>
                                          <svg
                                            className="icon"
                                            aria-labelledby="Drag Drop Icon"
                                          >
                                            <title id="dragDrop">
                                              Drag Drop Icon
                                            </title>
                                            <use
                                              xlinkHref="/assets/svg-icons/icons.svg#dragDrop"
                                              xlinkTitle="Drag Drop Icon"
                                            ></use>
                                          </svg>
                                          <p>Drag & Drop to Upload File</p>
                                          <button className="btn cmn_red_bg">
                                            Browse File
                                          </button>
                                        </>
                                      )}
                                    </div>
                                    <div className="upload-file-icons">
                                      <img
                                        src="/assets/images/icon01.png"
                                        alt="Icon 01"
                                      />
                                      <img
                                        src="/assets/images/icon02.png"
                                        alt="Icon 02"
                                      />
                                      <img
                                        src="/assets/images/icon03.png"
                                        alt="Icon 03"
                                      />
                                      <img
                                        src="/assets/images/icon04.png"
                                        alt="Icon 04"
                                      />
                                      <img
                                        src="/assets/images/icon05.png"
                                        alt="Icon 05"
                                      />
                                      <img
                                        src="/assets/images/icon06.png"
                                        alt="Icon 06"
                                      />
                                      <img
                                        src="/assets/images/icon07.png"
                                        alt="Icon 07"
                                      />
                                    </div>
                                    <button className="btn cmn_yellow_bg">
                                      <svg
                                        className="icon"
                                        aria-labelledby="Drag Drop Icon"
                                      >
                                        <title id="dragDrop">
                                          Drag Drop Icon
                                        </title>
                                        <use
                                          xlinkHref="/assets/svg-icons/icons.svg#dragDrop"
                                          xlinkTitle="Drag Drop Icon"
                                        ></use>
                                      </svg>
                                      Upload Document
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="errors"
                              id="upload_document_err"
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
                        {page == 6 ? (
                          <>
                            {/* <Pdf targetRef={pdfRef} filename="code-example.pdf">
                                                                    {({ toPdf }) => <button className="btn cmn_yellow_bg" onClick={hvb(e) => {handleCreatePdf(e); }} >Create PDF{toPdf}</button>}
                                                            </Pdf> */}
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
            </>
          }
        />
      )}
      {updatePartC && (
        <OfficeModal
          content={
            <>
              <div className="workCertificate cmn-modal">
                <CloseIcon
                  className="closeModal"
                  color="action"
                  onClick={(e) => {
                    setupdatePartC(false);
                  }}
                />
                <div className="formPop">
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
                    <div className="formPop-forms">
                      {/* Content */}
                      <div
                        className={`formPop-cmn ${page === 0 && "active"}`}
                        id="Content"
                      >
                        <h6>
                          The fire protection regulations part C according to
                          DIN 14096
                        </h6>
                        <ul className="content-list">
                          <li>a) Introduction</li>
                          <li>b) Fire prevention</li>
                          <li>c) Notification and alerting procedure</li>
                          <li>
                            d) Safety measures for persons, animals, the
                            environment and property
                          </li>
                          <li>e) Extinguishing measures</li>
                          <li>
                            f) Preparation for the use of the fire department
                          </li>
                          <li>g) Aftercare</li>
                          <li>(h) Standortbezogene Brandschutzpunkte</li>
                          <li>(i) h) Appendix</li>
                        </ul>
                      </div>
                      {/* a+b */}
                      <div
                        className={`formPop-cmn formPop-content ${
                          page === 1 && "active"
                        }`}
                        id="a+b"
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>a) Introduction</h6>
                              <JoditEditor
                                ref={editor}
                                name="introduction"
                                id="introduction"
                                cols="30"
                                rows="10"
                                value={partCForm.introduction}
                                onChange={(val) => {
                                  handlePartCInput(val, "introduction");
                                }}
                              />
                            </div>
                            <div
                              className="errors"
                              id="introduction2_err"
                            ></div>
                          </div>
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>b) Fire prevention</h6>
                              <JoditEditor
                                ref={editor}
                                name="fire_protection"
                                id="fire_protection"
                                cols="30"
                                rows="10"
                                value={partCForm.fire_protection}
                                onChange={(val) => {
                                  handlePartCInput(val, "fire_protection");
                                }}
                              />
                            </div>
                            <div
                              className="errors"
                              id="fire_protection2_err"
                            ></div>
                          </div>
                        </div>
                      </div>
                      {/* c+d */}
                      <div
                        className={`formPop-cmn formPop-content ${
                          page === 2 && "active"
                        }`}
                        id="c+d"
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>c) Notification and alerting procedure</h6>
                              <JoditEditor
                                ref={editor}
                                name="alert_procedure"
                                id="alert_procedure"
                                cols="30"
                                rows="10"
                                value={partCForm.alert_procedure}
                                onChange={(val) => {
                                  handlePartCInput(val, "alert_procedure");
                                }}
                              />
                            </div>
                            <div
                              className="errors"
                              id="alert_procedure_err"
                            ></div>
                          </div>
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>
                                d) Safety measures for persons, animals, the
                                environment and property
                              </h6>
                              <JoditEditor
                                ref={editor}
                                name="safety_measures"
                                id="safety_measures"
                                cols="30"
                                rows="10"
                                value={partCForm.safety_measures}
                                onChange={(val) => {
                                  handlePartCInput(val, "safety_measures");
                                }}
                              />
                            </div>
                            <div
                              className="errors"
                              id="safety_measures_err"
                            ></div>
                          </div>
                        </div>
                      </div>
                      {/* e+f */}
                      <div
                        className={`formPop-cmn formPop-content ${
                          page === 3 && "active"
                        }`}
                        id="e+f"
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>e) Extinguishing measures</h6>
                              <JoditEditor
                                ref={editor}
                                name="extingush_measure"
                                id="extingush_measure"
                                cols="30"
                                rows="10"
                                value={partCForm.extingush_measure}
                                onChange={(val) => {
                                  handlePartCInput(val, "extingush_measure");
                                }}
                              />
                            </div>
                            <div
                              className="errors"
                              id="extingush_measure_err"
                            ></div>
                          </div>
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>
                                f) Preparation for the use of the fire
                                department
                              </h6>
                              <JoditEditor
                                ref={editor}
                                name="fire_department"
                                id="fire_department"
                                cols="30"
                                rows="10"
                                value={partCForm.fire_department}
                                onChange={(val) => {
                                  handlePartCInput(val, "fire_department");
                                }}
                              />
                            </div>
                            <div
                              className="errors"
                              id="fire_department_err"
                            ></div>
                          </div>
                        </div>
                      </div>
                      {/* G+(h) */}
                      <div
                        className={`formPop-cmn formPop-content ${
                          page === 4 && "active"
                        }`}
                        id="G+(h)"
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>g) Aftercare</h6>
                              <JoditEditor
                                ref={editor}
                                name="aftercare"
                                id="aftercare"
                                cols="30"
                                rows="10"
                                value={partCForm.aftercare}
                                onChange={(val) => {
                                  handlePartCInput(val, "aftercare");
                                }}
                              />
                            </div>
                            <div className="errors" id="aftercare_err"></div>
                          </div>
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>h) Site-specific fire protection points</h6>
                              <JoditEditor
                                ref={editor}
                                name="site_specific"
                                id="site_specific"
                                cols="30"
                                rows="10"
                                value={partCForm.site_specific}
                                onChange={(val) => {
                                  handlePartCInput(val, "site_specific");
                                }}
                              />
                            </div>
                            <div
                              className="errors"
                              id="site_specific_err"
                            ></div>
                          </div>
                        </div>
                      </div>
                      {/* H (i) */}
                      <div
                        className={`formPop-cmn formPop-content ${
                          page === 5 && "active"
                        }`}
                        id="H (i)"
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="content-box">
                              <h6>h) (i) Appendix</h6>
                              <JoditEditor
                                ref={editor}
                                name="appendix"
                                id="appendix"
                                cols="30"
                                rows="10"
                                value={partCForm.appendix}
                                onChange={(val) => {
                                  handlePartCInput(val, "appendix");
                                }}
                              />
                            </div>
                            <div className="errors" id="appendix2_err"></div>
                          </div>
                          <div className="col-lg-6">
                            <div className="content-box">
                              <div className="uploadFileArea">
                                <div className="form-group file-area">
                                  <input
                                    type="file"
                                    name="file_upload"
                                    id="upload_document"
                                    accept=".pdf,.doc"
                                    onChange={(e) => handlePartCFile(e)}
                                  />
                                  <div class="file-dummy">
                                    <div className="indiebloc">
                                      {partCForm?.file_upload ? (
                                        <>{partCForm.file_upload.name}</>
                                      ) : (
                                        <>
                                          <svg
                                            className="icon"
                                            aria-labelledby="Drag Drop Icon"
                                          >
                                            <title id="dragDrop">
                                              Drag Drop Icon
                                            </title>
                                            <use
                                              xlinkHref="/assets/svg-icons/icons.svg#dragDrop"
                                              xlinkTitle="Drag Drop Icon"
                                            ></use>
                                          </svg>
                                          <p>Drag & Drop to Upload File</p>
                                          <button className="btn cmn_red_bg">
                                            Browse File
                                          </button>
                                        </>
                                      )}
                                    </div>
                                    <div className="upload-file-icons">
                                      <img
                                        src="/assets/images/icon01.png"
                                        alt="Icon 01"
                                      />
                                      <img
                                        src="/assets/images/icon02.png"
                                        alt="Icon 02"
                                      />
                                      <img
                                        src="/assets/images/icon03.png"
                                        alt="Icon 03"
                                      />
                                      <img
                                        src="/assets/images/icon04.png"
                                        alt="Icon 04"
                                      />
                                      <img
                                        src="/assets/images/icon05.png"
                                        alt="Icon 05"
                                      />
                                      <img
                                        src="/assets/images/icon06.png"
                                        alt="Icon 06"
                                      />
                                      <img
                                        src="/assets/images/icon07.png"
                                        alt="Icon 07"
                                      />
                                    </div>
                                    <button className="btn cmn_yellow_bg">
                                      <svg
                                        className="icon"
                                        aria-labelledby="Drag Drop Icon"
                                      >
                                        <title id="dragDrop">
                                          Drag Drop Icon
                                        </title>
                                        <use
                                          xlinkHref="/assets/svg-icons/icons.svg#dragDrop"
                                          xlinkTitle="Drag Drop Icon"
                                        ></use>
                                      </svg>
                                      Upload Document
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="errors"
                              id="upload_document_err"
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
                        {page == 6 ? (
                          <>
                            {/* <Pdf targetRef={pdfRef} filename="code-example.pdf">
                                                                    {({ toPdf }) => <button className="btn cmn_yellow_bg" onClick={hvb(e) => {handleCreatePdf(e); }} >Create PDF{toPdf}</button>}
                                                            </Pdf> */}
                            <button
                              className="btn cmn_yellow_bg"
                              onClick={(e) => {
                                handleCreatePdf(e);
                              }}
                            >
                              Update + Create PDF
                            </button>
                            <button
                              className="btn cmn_yellow_bg"
                              onClick={(e) => {
                                handleCreateWord(e);
                              }}
                            >
                              Update + Create Word
                            </button>
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
            </>
          }
        />
      )}
      <ToastContainer />
      <h2>BSO Part B</h2>
      <div id="body" class="body">
        <table
          width="100%"
          className="table1"
          border="0"
          cellspacing="0"
          cellpadding="0"
        >
          <tr>
            <td class="column-top" width="80%" className="">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <th class="column th2">
                    <img
                      src="/assets/images/template-logo.png"
                      width="131"
                      height="64"
                      border="0"
                      alt=""
                    />
                  </th>
                  <th class="column th1" width="">
                    Stand: 24.11.2022
                  </th>
                </tr>
                <tr>
                  <td colspan="2">
                    <h2 class="h21 main-head">Vorwort</h2>
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
            <td class="td2 column-top" width="20%" bgcolor="#ff8200">
              <div class="verti">
                <h1 className="h12">Brandschutzordnung</h1>
                <h3 className="h31">Teil B nach DIN 14096</h3>
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
            <td class="td3 column-top" width="100%" colspan="2">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <th class="th3 column" width="">
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
                      Aus Gründen der besseren Lesbarkeit wird auf die
                      gleichzeitige Verwendung männlicher und weiblicher
                      Sprachformen verzichtet. Sämtliche Personenbezeichnungen
                      gelten gleichwohl für alle Geschlechter.
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
            <td class="td4 column-top" width="100%" colspan="2">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <th class="th5 column" width="">
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
                    <h2 class="h22 main-head">Inhalt</h2>
                    <ul>
                      <li>
                        VORWORT_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
                        _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ __ _ _ _ _1
                      </li>
                      <li>
                        A) INTRODUCTION_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
                        _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _4
                      </li>
                      <li>
                        B) FIRE SAFETY REGULATIONS (REPRESENTATION OF PART A
                        (NOTICE))_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 4
                      </li>
                      <li>
                        C) FIRE PREVENTION_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
                        _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 4
                      </li>
                      <li>
                        D) FIRE AND SMOKE PROPAGATION_ _ _ _ _ _ _ _ _ _ _ _ _ _
                        _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _4
                      </li>
                      <li>
                        E) ESCAPE AND RESCUE ROUTES_ _ _ _ _ _ _ _ _ _ _ _ _ _ _
                        _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _4
                      </li>
                      <li>
                        F) SIGNALING AND EXTINGUISHING DEVICES _ _ _ _ _ _ _ _ _
                        _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _4
                      </li>
                      <li>
                        G) BEHAVIOR IN CASE OF FIRE_ _ _ _ _ _ _ _ _ _ _ _ _ _ _
                        _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _5
                      </li>
                      <li>
                        H) REPORT FIRE_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
                        _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 5
                      </li>
                      <li>
                        I) OBSERVE ALARM SIGNALS AND INSTRUCTIONS_ _ _ _ _ _ _ _
                        _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _5
                      </li>
                      <li>
                        J) BRING TO SAFETY_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
                        _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 5
                      </li>
                      <li>
                        K) MAKE ATTEMPTS TO EXTINGUISH_ _ _ _ _ _ _ _ _ _ _ _ _
                        _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 5
                      </li>
                      <li>
                        L) SPECIAL RULES OF CONDUCT_ _ _ _ _ _ _ _ _ _ _ _ _ _ _
                        _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _5
                      </li>
                      <li>
                        M) APPENDIX_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
                        _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _6
                      </li>
                      <li>
                        N) SCHLUSSBEMERKUNG_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
                        _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _6
                      </li>
                    </ul>
                  </td>
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
            <td class="column-top" width="100%" colspan="2" className="td5">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <th class="column" width="" className="th6">
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
                    <h2 class="main-head" id="template_introduction">
                      a) Introduction
                    </h2>
                    <div id="introduction_text">
                      <p>
                        Diese Brandschutzordnung wird auf der Grundlage
                        gesetzlicher Forderungen erlassen.
                      </p>
                      <ul>
                        <li>
                          - Diese Brandschutzordnung ist eine verbindliche
                          Anweisung für alle … und die Mitarbeiter im Gebäude.
                        </li>

                        <li>
                          - Verstöße gegen diese Brandschutzordnung können
                          rechtliche Konsequenzen nach sich ziehen.
                        </li>

                        <li>
                          - Ein Brand gefährdet nicht nur Ihre eigene
                          Sicherheit, sondern auch die der Mitarbeiter und … .
                          Helfen sie daher bitte mit, … zu einem sicheren Ort zu
                          machen.
                        </li>

                        <li>
                          - Diese Brandschutzordnung wurde entsprechend der DIN
                          14096 in der aktuellen Fassung unter Berücksichtigung
                          der besonderen betrieblichen Belange des Brandschutzes
                          erstellt.
                        </li>
                      </ul>
                    </div>
                    <hr />
                    <h2 class="main-head">
                      b) Firesafety regulations (representationofpart A
                      (notice))
                    </h2>
                    <p className="p1">
                      <img
                        src="/assets/images/firesafety.jpg"
                        alt=""
                        title=""
                      />
                    </p>
                    <hr />
                  </td>
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
            <td class="column-top" width="100%" colspan="2" className="td5">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <th class="column" width="" className="th6">
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
                    <h2 class="main-head">c) Fire prevention</h2>
                    <p>
                      1. Rauchen ist in allen Gebäuden, Lagerhallen, Anlagen
                      sowie bis zu 10 m vor den Zugängen der Lagerhallen - auch
                      während der Pausen – verboten. Das Rauchen ist nur an den
                      dafür ausdrücklich gekennzeichneten Stellen erlaubt.
                      Brennende Zigarettenreste dürfen nicht in Papierkörbe oder
                      Müllbehälter geworfen werden. Feuergefährdet sind
                      Bereiche, an denen leicht entzündbare Stoffe gelagert
                      werden oder explosionsgefährdete Gas-, Dampf-, Nebel- oder
                      Staub-/Luftgemische auftreten oder sonstige
                      explosionsgefährdete Stoffe vorhanden sein können (z. B.
                      Siloanlage, PSM-Lager, Lager für entzündbare
                      Flüssigkeiten, Siloanlage etc.).
                    </p>
                    <p>
                      2. Schweiß-, Brennschneid- und Lötarbeiten dürfen nur nach
                      Ausstellung eines Schweißerlaubnisscheines durch die
                      Betriebsleitung durchgeführt werden. Erhitzte Flächen und
                      Funkenflug bilden eine ständige Zündgefahr. Da Zündfunken
                      leicht in Ritzen, Spalten usw. fliegen, können hier
                      Schwelbrände verursacht werden, oft kommt es erst nach
                      Stunden zu einem offenen Brand. Wenn möglich sollten diese
                      Arbeiten im Freien erfolgen. Dies gilt auch für
                      Fremdfirmen.
                    </p>
                    <p>
                      3. Entzündbare Flüssigkeiten/Spraydosen dürfen nur in den
                      dafür vorgesehenen und besonders gekennzeichneten Räumen
                      gelagert werden. Offenes Licht (auch brennende Zigaretten)
                      ist beim Umgang mit diesen Stoffen streng verboten. <br />
                      Die Vorgaben des Ex-Schutzdokumentes für die
                      Getreideerfassungsanlage sind einzuhalten.{" "}
                    </p>
                    <p>
                      4. Abfälle, insbesondere brennbare Abfälle (z. B.
                      Verpackungsmaterialien), sind vor Betriebsende aus den
                      Räumen, insbesondere aus den Fluren zu entfernen. Abfälle
                      sind zu den dafür vorgesehenen Lagerplätzen zu verbringen.
                      Gebrauchte, insbesondere mit Öl, Farben oder ähnlichen
                      Stoffen getränkte Putzwolle oder Putzlappen o. ä. zur
                      Entzündung neigende Gegenstände dürfen nur in dicht
                      verschlossenen Blechbehältern abgelegt werden. Entzündbare
                      Flüssigkeiten dürfen nicht in Abgüsse oder Abwasserkanäle
                      geschüttet werden.
                    </p>
                    <p>
                      5. Elektrische Haushalts- und Kochgeräte dürfen nur unter
                      Aufsicht auf geeigneten Unterlagen betrieben werden. Als
                      Unterlage geeignet sind Promatect- oder Thermax SNO 450
                      Feuerschutzplatten von mindestens 2 cm dicke, die
                      allseitig jeweils mindestens 2 cm über das Gerät
                      hinausreichen. Die Verwendung elektrischer
                      Zusatzheizgeräte (Heizlüfter u. ä.) oder Tauchsieder ist
                      nicht statthaft.
                    </p>
                    <p>
                      6. Ladestationen für E-Stapler müssen in gut durchlüfteten
                      Bereich aufgestellt werden. Infolge der Brandgefahr müssen
                      mind. 2 m Abstand zu brennbaren Waren/Bauteilen
                      eingehalten werden. Die Ladestation darf nicht als
                      Ablage/Ersatzregal missbraucht werden
                    </p>
                    <hr />
                    <h2 class="main-head">d) Fire and smoke propagation</h2>
                    <p>
                      Rauchabschlusstüren (Drahtglastüren) in Fluren und
                      Treppenräumen sollen eine Ausbreitung des Rauches im
                      Gebäude verhindern. Sie sind deshalb stets geschlossen zu
                      halten. Ausnahme: Automatische Türen, die sich im
                      Brandfall selbsttätig schließen. In keinem Fall dürfen
                      derartige Türen jedoch aufgekeilt oder in ähnlicher Weise
                      offengehalten werden.
                    </p>
                    <p>
                      Arbeitshilfe Brandschutzordnung Teil B (Muster) 3 (Stand:
                      13. August 2018)
                    </p>

                    <p>
                      Auch Brandschutztüren/-tore im Verlauf von Brandwänden und
                      zu Räumen mit besonderer Brandgefahr (z. B.
                      Pflanzenschutz-Lagerräumen, Leitwarte, BMZ, Labor) müssen
                      stets geschlossen gehalten werden. Das Aufkeilen oder
                      sonstiges Offenhalten auch solcher Türen ist verboten.
                    </p>
                    <hr />
                    <h2 class="main-head">e) Escape and rescue routes</h2>
                    <p>
                      1. Zu- und Ausgänge, Durchfahrten, Durchgänge, Teppenräume
                      Flure und Verkehrswege, die bei einem Brand als Anfahrts-,
                      Rettungs-, und Angriffswege für die Feuerwehr dienen
                      können, sind Flucht- und Rettungswege und deshalb
                      unbedingt in ihrer vollen Breite von Gegenständen aller
                      Art freizuhalten.
                    </p>
                    <p>
                      2. Flure sind keine Lagerräume. Deshalb dürfen dort
                      keinerlei brennbare Stoffe/Gefahrstoffe und Abfälle (z. B.
                      Verpackungsmaterialien) gelagert werden.
                    </p>
                    <p>
                      3. Flächen für die Feuerwehr, also Auffahrt- und
                      Bewegungsflächen sind dauernd freizuhalten, insbesondere
                      von Kraftfahrzeugen und Fahrrädern.
                    </p>
                    <p>
                      4. Türen und Notausgänge im Zuge von Rettungswegen aus
                      Räumen dürfen, solange die Räume benutzt werden, nicht in
                      Fluchtrichtung versperrt sein.
                    </p>
                    <p>
                      5. Sicherheitsschilder, die auf Fluchtwege hinweisen,
                      dürfen nie, auch nicht vorübergehend, verdeckt werden.
                    </p>
                    <hr />
                    <h2 class="main-head">
                      f) Signaling and extinguishing devices
                    </h2>
                    <p>
                      1. Druckknopf-Feuermelder sind direkt an das Meldenetz der
                      Feuerwehr angeschlossen.
                    </p>
                    <p>
                      2. Telefone sind zur weiteren und genauen Brandmeldung am
                      besten geeignet. An jedem amtsberechtigen Telefon ist die
                      Notrufnummer der Feuerwehr (⇒ Amt + 112) deutlich sichtbar
                      anzubringen.
                    </p>
                    <p>
                      3. Im PSM-Lager sind automatische Feuermelder installiert.
                      Die Melder reagieren auf Rauch oder auf Hitze. Um
                      Fehlalarme zu vermeiden, darf auch in diesen Bereichen
                      keinesfalls geraucht werden. Dieselstapler dürfen in
                      diesen Bereichen ebenfalls nicht eingesetzt werden.
                      Arbeiten, die Fehlalarme verursachen können (z. B.
                      Flexarbeiten und sonstige Heißarbeiten), dürfen nur
                      ausgeführt werden, nachdem die entsprechende Melderlinie
                      ausgeschaltet wurde.
                    </p>
                    <p>
                      Feuerlöscher sind in allen Bereichen des Betriebes
                      ________________ gut zugänglich stationiert. Es handelt
                      sich dabei überwiegend um Pulverlöscher. Es wird
                      empfohlen, sich regelmäßig mit der Bedienungsanleitung der
                      Feuerlöscher vertraut zu machen. Die Standorte der
                      Feuerlöscher müssen immer frei zugänglich sein. Benutzte
                      bzw. auch nur teilweise benutzte Feuerlöscher sind
                      unverzüglich zu erneuern (Wartungsdienst siehe Aufkleber).
                      Hydranten werden durch die Feuerwehr oder eingewiesenes
                      Personal bedient.
                    </p>
                    <p>
                      Die Entnahmestellen für Löschwasser (Platz um Hydranten)
                      müssen stets frei zugänglich sein.
                    </p>
                    <p>
                      Einspeisestellen für Löschwasser bzw. die Inertisierung
                      der Siloanlage müssen für die Feuerwehr immer ungehindert
                      zugänglich sein. Das Abstellen von Waren, Geräten oder das
                      Parken von Fahrzeu in diesen Bereich ist verboten.
                    </p>
                    <hr />
                  </td>
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
            <td class="column-top" width="100%" colspan="2" className="td5">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <th class="column" width="" className="th6">
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
                    <h2 class="main-head">g) Behavior in case of fire</h2>
                    <p></p>
                    <hr />
                    <h2 class="main-head">h) Report fire</h2>
                    <p>
                      Feuermelder betätigen. Scheibe einschlagen und Druckknopf
                      fest drücken. oder
                    </p>
                    <p>
                      Telefon benutzen:  (Amt) + 112 Feuerwehr dabei angeben:
                    </p>
                    <ul>
                      <li>- Name des Meldenden</li>
                      <li>- Wo brennt es?</li>
                      <li>- Was brennt?</li>
                      <li>- Sind Menschen in Gefahr? </li>
                      <li>- Wenn ja, wie viele ca.?</li>
                      <li>
                        -Warten, bis das Gespräch vom Angerufenen beendet wird
                        (Rückfragen!)
                      </li>
                    </ul>

                    <hr />
                    <h2 class="main-head">
                      i) Observe alarm signals and instructions
                    </h2>
                    <p>
                      Die Verantwortlichen müssen der Einsatzleitung der
                      Feuerwehr zur Verfügung stehen, damit die erforderlichen
                      Maßnahmen besprochen und veranlasst werden können. Die
                      Beschäftigten müssen diesen Anweisungen Folge leisten.
                    </p>
                    <hr />
                    <h2 class="main-head">j) bring to safety</h2>
                    <p>
                      Ruhe bewahren, Panik vermeiden. Bei Ertönen des Hausalarms
                      Gebäude verlassen und den festgelegten Sammelplatz
                      aufsuchen, um festzustellen, ob sich noch Personen im
                      Gebäude aufhalten.
                      <br />
                      Sammelplatz für diesen Betrieb: ⇒ Fläche
                      _____________________.
                      <br />
                      Bei Räumungsmaßnahmen stets prüfen, ob keine Personen
                      zurückgeblieben sind (z. B. in WCs und Nebenräumen).
                      Gefährdete, behinderte oder verletzte Personen mitnehmen.
                      <br />
                      Zur Vermeidung von Feuer- und Rauchausbreitung Türen
                      schließen.
                      <br />
                      Ist der Fluchtweg versperrt, ist es lebensnotwendig, sich
                      von der nächstmöglichen von Seiten der Retter einsehbaren
                      Gebäudeöffnung (Fenster, Türen, Balkone) durch Rufen und
                      Winken bemerkbar zu machen. Nicht aus dem Fenster springen
                      – diese Sprünge enden oft tödlich.
                    </p>
                    <hr />
                    <h2 class="main-head">k) Make attempts to extinguish</h2>
                    <p>
                      Nur ohne Eigengefährdung bis zum Eintreffen der Feuerwehr
                      Löschversuche mit dem Feuerlöscherunternehmen. Folgende
                      Grundsätze beachten:
                      <br />
                      ⇒ Löscher erst in unmittelbarer Nähe zum Brandort in
                      Betrieb nehmen!
                      <br />
                      ⇒ Nicht wahllos löschen, sondern sich auf Glutstellen oder
                      brennende
                      <br />
                      ⇒ Oberflächen konzentrieren!
                      <br />
                      ⇒ Feuer immer in Windrichtung angehen!
                      <br />
                      ⇒ Den Brandherd von unten nach oben bekämpfen!
                      <br />
                      ⇒ Flüssigkeitsbrände mit einer Pulverwolke des
                      Feuerlöschers abdecken!
                      <br />⇒ Größere Brände mit mehreren Löschern gleichzeitig
                      bekämpfen!
                    </p>
                    <hr />
                  </td>
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
            <td class="column-top" width="100%" colspan="2" className="td5">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <th class="column" width="" className="th6">
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
                    <h2 class="main-head">l) Special rules of conduct</h2>
                    <p>
                      1. Jede ungewollte Entzündung von Stoffen – sei sie auch
                      geringfügig – muss der Betriebsleitung, ggf. der
                      Geschäftsleitung gemeldet werden.
                    </p>
                    <p>
                      2. Information an die Geschäftsleitung gemäß internen
                      Alarmplan (siehe Aushang).
                    </p>

                    <p>
                      3. Bei Aufräumarbeiten müssen Mitarbeiter geschützt werden
                      (mindestens Handschuhe und Staubmasken P2).
                      Aufräumarbeiten dürfen nur unter professioneller Anleitung
                      (Fachfirma für Brandschadensanierung) ausgeführt werden.
                    </p>
                    <p>
                      4. Nach Freigabe durch die Feuerwehr bzw. Polizei ist auch
                      zu klären, inwieweit durch Rauch, Ruß, Chemikalien bzw.
                      Geruchsbelästigung eine Beeinträchtigung am Arbeitsplatz
                      vorliegt. Zur Beurteilung sind unverzüglich fachkundige
                      Personen und der Betriebsärztliche Dienst einzuschalten.
                    </p>
                    <p>
                      6. Die Bergung von Sachwerten und Arbeitsmitteln darf erst
                      nach Freigabe des Gefahrenbereichs durch Polizei bzw.
                      Feuerwehr erfolgen.
                    </p>
                    <hr />
                    <h2 class="main-head">m) Appendix</h2>
                    <p>
                      An appendix is a section of a report or paper that
                      contains supporting information that is not included in
                      the main text. Appendices are typically placed at the end
                      of a report, after the reference list. They contain
                      information that is relevant but too long or detailed to
                      include in the main body of the work. Appendices can
                      include:
                    </p>
                    <hr />
                    <h2 class="main-head">n) Schlussbemerkung</h2>
                    <p>
                      Diese unternehmensinterne Brandschutzordnung entbindet
                      nicht von der Verpflichtung, sonstige gesetzliche
                      Vorschriften und Arbeitsschutzvorschriften sowie allgemein
                      anerkannte Regeln der Technik zu beachten und einzuhalten.
                      Der Betriebsleiter hat dafür Sorge zu tragen, dass alle
                      Mitarbeiter des jeweiligen Standortes alle zwei Jahre über
                      diese Brandschutzordnung informiert werden. Diese
                      Information ist durch Unterschrift zu bestätigen. Die
                      entsprechenden Listen sind aufzubewahren.
                      <br />
                      Diese Brandschutzordnung muss so ausgelegt sein, dass
                      jeder Beschäftigte jederzeit die Möglichkeit hat, Einblick
                      zu nehmen.
                      <br />
                    </p>
                    <p>
                      Jeder Mitarbeiter muss sich mit den Vorschriften vertraut
                      machen, die im Alarmfalle (Brandschutzordnung Teil A) zu
                      beachten sind.
                    </p>
                    <p>Mitgeltende Unterlagen:</p>
                    <ul>
                      <li>– Interner Alarmplan (Aushang)</li>
                      <li>
                        – Brandverhütungsvorschriften für industrielle Anlagen
                        (Aushang)
                      </li>
                      <li>– Brandschutzordnung Teil A (Aushang)</li>
                      <li>– Feuerwehreinsatzplan</li>
                    </ul>
                    <hr />
                    <p>
                      Ort,
                      ........................................................
                    </p>
                    <p>
                      den
                      ........................................................
                    </p>
                    <hr />
                    <p>
                      Unternehmensleitung
                      ........................................................
                    </p>
                    <hr />
                    <p>
                      Betriebsleitung
                      ........................................................
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>

      {Show_BSO_A_template_1 ? (
        <>
          <h3>Brandschutzordnung_DIN_14096_TeilA_Deutsch</h3>
          <div id="bso_a_body1" class="body">
            <table width="100%" cellspacing="0" cellpadding="0">
              <tr className="center">
                <td>
                  <h1 className="center">Brände verhüten</h1>
                  <img
                    className="img1"
                    src="../../assets/images/img_03.png"
                    alt=""
                    title=""
                  />
                  <h3
                    className="center"
                    style={{ textDecoration: "underline" }}
                  >
                    Keine offene Flamme; Feuer, offene Zündquellenund Rauchen
                    verboten
                  </h3>
                </td>
              </tr>
              <tr>
                <td
                  class="column-top"
                  width="100%"
                  colspan="2"
                  style={{
                    padding: 0,
                    margin: 0,
                    fontWeight: "normal",
                    verticalAlign: "top",
                    padding: "30px",
                  }}
                >
                  <table
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                  >
                    <tr>
                      <td>
                        <h1 className="center bicof">Verhalten im Brandfall</h1>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <table width="100%">
                          <tr>
                            <td width="40%">
                              <h1 style={{ textAlign: "left" }}>
                                Ruhe Bewahren
                                <br />
                                Brand melden{" "}
                              </h1>
                            </td>
                            <td width="60%">
                              <div style={{ width: "100%", float: "left" }}>
                                <img
                                  style={{
                                    width: "100px",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                  src="../../assets/images/img_10.png"
                                  alt=""
                                  title=""
                                />
                                <h3 style={{ textAlign: "left" }}>
                                  {" "}
                                  Notruf: {note}{" "}
                                </h3>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <table
                    style={{
                      borderTop: "1px solid #333",
                      marginTop: "20px",
                      paddingTop: "20px",
                    }}
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                  >
                    <tr>
                      <td>
                        <table width="100%">
                          <tr>
                            <td width="40%">
                              <h1 style={{ textAlign: "left" }}>
                                In Sicherheit <br />
                                bringen{" "}
                              </h1>
                            </td>
                            <td width="60%">
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                {" "}
                                <h3
                                  style={{
                                    textAlign: "left",
                                    marginLeft: "110px",
                                  }}
                                >
                                  Gefährdete Personen warnen{" "}
                                </h3>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                {" "}
                                <h3
                                  style={{
                                    textAlign: "left",
                                    marginLeft: "110px",
                                  }}
                                >
                                  Hilflose mitnehmen{" "}
                                </h3>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                {" "}
                                <h3
                                  style={{
                                    textAlign: "left",
                                    marginLeft: "110px",
                                  }}
                                >
                                  Türen schließen{" "}
                                </h3>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                {" "}
                                <h3
                                  style={{
                                    textAlign: "left",
                                    marginLeft: "110px",
                                  }}
                                >
                                  Gekennzeichneten{" "}
                                </h3>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                <img
                                  style={{
                                    width: "100px",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                  src="../../assets/images/img_13.png"
                                  alt=""
                                  title=""
                                />
                                <h3 style={{ textAlign: "left" }}>
                                  {" "}
                                  Fluchtwegen folgen{" "}
                                </h3>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                {" "}
                                <h3
                                  style={{
                                    textAlign: "left",
                                    marginLeft: "110px",
                                  }}
                                >
                                  Aufzug nicht benutzen{" "}
                                </h3>
                              </div>

                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                <img
                                  style={{
                                    width: "100px",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                  src="../../assets/images/img_17.png"
                                  alt=""
                                  title=""
                                />
                                <h3 style={{ textAlign: "left" }}>
                                  {" "}
                                  Sammelstelle aufsuchen{" "}
                                </h3>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                  marginTop: "-50px",
                                }}
                              >
                                {" "}
                                <h3
                                  style={{
                                    textAlign: "left",
                                    marginLeft: "110px",
                                  }}
                                >
                                  Auf Anweisungen achten{" "}
                                </h3>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <table
                    style={{
                      borderTop: "1px solid #333",
                      marginTop: "20px",
                      paddingTop: "20px",
                    }}
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                  >
                    <tr>
                      <td>
                        <table width="100%" style={{ marginTop: "20px" }}>
                          <tr>
                            <td width="40%">
                              <h1 style={{ textAlign: "left" }}>
                                Loschversuch
                                <br />
                                unternehmen{" "}
                              </h1>
                            </td>
                            <td width="60%">
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                <img
                                  style={{
                                    width: "100px",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                  src="../../assets/images/img_20.png"
                                  alt=""
                                  title=""
                                />{" "}
                                <h3 style={{ textAlign: "left" }}>
                                  Feuerlöscher benutzen{" "}
                                </h3>
                              </div>
                              <div style={{ width: "100%", float: "left" }}>
                                <img
                                  style={{
                                    width: "100px",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                  src="../../assets/images/img_23.png"
                                  alt=""
                                  title=""
                                />
                                <h3 style={{ textAlign: "left" }}>
                                  {" "}
                                  Löschschlauch benutzen{" "}
                                </h3>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <div className="table-footer">
              <span>Brandschutzordnung nach DIN14096 / {curr_date}</span>
              <span>{address || "House No-06, Hezagon Garden, Germany"}</span>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      {Show_BSO_A_template_2 ? (
        <>
          <h3>Brandschutzordnung_DIN_14096_TeilA_Deutsch_mit_BMA</h3>
          <div id="bso_a_body2" class="body">
            <table width="100%" cellspacing="0" cellpadding="0">
              <tr className="center">
                <td>
                  <h1 className="center">Brände verhüten</h1>
                  <img
                    className="img1"
                    src="../../assets/images/img_03.png"
                    alt=""
                    title=""
                  />
                  <h3
                    className="center"
                    style={{ textDecoration: "underline" }}
                  >
                    Keine offene Flamme; Feuer, offene Zündquellenund Rauchen
                    verboten
                  </h3>
                </td>
              </tr>
              <tr>
                <td
                  class="column-top"
                  width="100%"
                  colspan="2"
                  style={{
                    padding: 0,
                    margin: 0,
                    fontWeight: "normal",
                    verticalAlign: "top",
                    padding: "30px",
                  }}
                >
                  <table
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                  >
                    <tr>
                      <td>
                        <h1 className="center bicof">Verhalten im Brandfall</h1>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <table width="100%">
                          <tr>
                            <td width="40%">
                              <h1 style={{ textAlign: "left" }}>
                                Ruhe Bewahren
                                <br />
                                Brand melden{" "}
                              </h1>
                            </td>
                            <td width="60%">
                              <div style={{ width: "100%", float: "left" }}>
                                <img
                                  style={{
                                    width: "100px",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                  src="../../assets/images/img_10.png"
                                  alt=""
                                  title=""
                                />
                                <h3 style={{ textAlign: "left" }}>
                                  {" "}
                                  Notruf: {note}{" "}
                                </h3>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                <img
                                  style={{
                                    width: "100px",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                  src="../../assets/images/img_08.png"
                                  alt=""
                                  title=""
                                />{" "}
                                <h3 style={{ textAlign: "left" }}>
                                  Handfeuermelder betatigen{" "}
                                </h3>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <table
                    style={{
                      borderTop: "1px solid #333",
                      marginTop: "20px",
                      paddingTop: "20px",
                    }}
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                  >
                    <tr>
                      <td>
                        <table width="100%">
                          <tr>
                            <td width="40%">
                              <h1 style={{ textAlign: "left" }}>
                                In Sicherheit <br />
                                bringen{" "}
                              </h1>
                            </td>
                            <td width="60%">
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                {" "}
                                <h3
                                  style={{
                                    textAlign: "left",
                                    marginLeft: "110px",
                                  }}
                                >
                                  Gefährdete Personen warnen{" "}
                                </h3>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                {" "}
                                <h3
                                  style={{
                                    textAlign: "left",
                                    marginLeft: "110px",
                                  }}
                                >
                                  Hilflose mitnehmen{" "}
                                </h3>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                {" "}
                                <h3
                                  style={{
                                    textAlign: "left",
                                    marginLeft: "110px",
                                  }}
                                >
                                  Türen schließen{" "}
                                </h3>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                {" "}
                                <h3
                                  style={{
                                    textAlign: "left",
                                    marginLeft: "110px",
                                  }}
                                >
                                  Gekennzeichneten{" "}
                                </h3>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                <img
                                  style={{
                                    width: "100px",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                  src="../../assets/images/img_13.png"
                                  alt=""
                                  title=""
                                />
                                <h3 style={{ textAlign: "left" }}>
                                  {" "}
                                  Fluchtwegen folgen{" "}
                                </h3>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                {" "}
                                <h3
                                  style={{
                                    textAlign: "left",
                                    marginLeft: "110px",
                                  }}
                                >
                                  Aufzug nicht benutzen{" "}
                                </h3>
                              </div>

                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                <img
                                  style={{
                                    width: "100px",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                  src="../../assets/images/img_17.png"
                                  alt=""
                                  title=""
                                />
                                <h3 style={{ textAlign: "left" }}>
                                  {" "}
                                  Sammelstelle aufsuchen{" "}
                                </h3>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                  marginTop: "-50px",
                                }}
                              >
                                {" "}
                                <h3
                                  style={{
                                    textAlign: "left",
                                    marginLeft: "110px",
                                  }}
                                >
                                  Auf Anweisungen achten{" "}
                                </h3>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <table
                    style={{
                      borderTop: "1px solid #333",
                      marginTop: "20px",
                      paddingTop: "20px",
                    }}
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                  >
                    <tr>
                      <td>
                        <table width="100%" style={{ marginTop: "20px" }}>
                          <tr>
                            <td width="40%">
                              <h1 style={{ textAlign: "left" }}>
                                Loschversuch
                                <br />
                                unternehmen{" "}
                              </h1>
                            </td>
                            <td width="60%">
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                <img
                                  style={{
                                    width: "100px",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                  src="../../assets/images/img_20.png"
                                  alt=""
                                  title=""
                                />{" "}
                                <h3 style={{ textAlign: "left" }}>
                                  Feuerlöscher benutzen{" "}
                                </h3>
                              </div>
                              <div style={{ width: "100%", float: "left" }}>
                                <img
                                  style={{
                                    width: "100px",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                  src="../../assets/images/img_23.png"
                                  alt=""
                                  title=""
                                />
                                <h3 style={{ textAlign: "left" }}>
                                  {" "}
                                  Löschschlauch benutzen{" "}
                                </h3>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <div className="table-footer">
              <span>Brandschutzordnung nach DIN14096 / {curr_date}</span>
              <span>{address || "House No-06, Hezagon Garden, Germany"}</span>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      {Show_BSO_A_template_5 ? (
        <>
          <h3>Brandschutzordnung_DIN_14096_TeilA_Deutsch_mit_Hausalarm</h3>
          <div id="bso_a_body5" class="body">
            <table width="100%" cellspacing="0" cellpadding="0">
              <tr className="center">
                <td>
                  <h1 className="center">Brände verhüten</h1>
                  <img
                    className="img1"
                    src="../../assets/images/img_03.png"
                    alt=""
                    title=""
                  />
                  <h3
                    className="center"
                    style={{ textDecoration: "underline" }}
                  >
                    Keine offene Flamme; Feuer, offene Zündquellenund Rauchen
                    verboten
                  </h3>
                </td>
              </tr>
              <tr>
                <td
                  class="column-top"
                  width="100%"
                  colspan="2"
                  style={{
                    padding: 0,
                    margin: 0,
                    fontWeight: "normal",
                    verticalAlign: "top",
                    padding: "30px",
                  }}
                >
                  <table
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                  >
                    <tr>
                      <td>
                        <h1 className="center bicof">Verhalten im Brandfall</h1>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <table width="100%">
                          <tr>
                            <td width="40%">
                              <h1 style={{ textAlign: "left" }}>
                                Ruhe Bewahren
                                <br />
                                Brand melden{" "}
                              </h1>
                            </td>
                            <td width="60%">
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                <img
                                  style={{
                                    width: "100px",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                  src="../../assets/images/img_08.png"
                                  alt=""
                                  title=""
                                />{" "}
                                <h3 style={{ textAlign: "left" }}>
                                  Handfeuermelder betatigen{" "}
                                </h3>
                              </div>
                              <div style={{ width: "100%", float: "left" }}>
                                <img
                                  style={{
                                    width: "100px",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                  src="../../assets/images/img_10.png"
                                  alt=""
                                  title=""
                                />
                                <h3 style={{ textAlign: "left" }}>
                                  {" "}
                                  Notruf: {note}{" "}
                                </h3>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <table
                    style={{
                      borderTop: "1px solid #333",
                      marginTop: "20px",
                      paddingTop: "20px",
                    }}
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                  >
                    <tr>
                      <td>
                        <table width="100%">
                          <tr>
                            <td width="40%">
                              <h1 style={{ textAlign: "left" }}>
                                In Sicherheit <br />
                                bringen{" "}
                              </h1>
                            </td>
                            <td width="60%">
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                {" "}
                                <h3
                                  style={{
                                    textAlign: "left",
                                    marginLeft: "110px",
                                  }}
                                >
                                  Gefährdete Personen warnen{" "}
                                </h3>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                {" "}
                                <h3
                                  style={{
                                    textAlign: "left",
                                    marginLeft: "110px",
                                  }}
                                >
                                  Hilflose mitnehmen{" "}
                                </h3>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                {" "}
                                <h3
                                  style={{
                                    textAlign: "left",
                                    marginLeft: "110px",
                                  }}
                                >
                                  Türen schließen{" "}
                                </h3>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                {" "}
                                <h3
                                  style={{
                                    textAlign: "left",
                                    marginLeft: "110px",
                                  }}
                                >
                                  Gekennzeichneten{" "}
                                </h3>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                <img
                                  style={{
                                    width: "100px",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                  src="../../assets/images/img_13.png"
                                  alt=""
                                  title=""
                                />
                                <h3 style={{ textAlign: "left" }}>
                                  {" "}
                                  Fluchtwegen folgen{" "}
                                </h3>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                {" "}
                                <h3
                                  style={{
                                    textAlign: "left",
                                    marginLeft: "110px",
                                  }}
                                >
                                  Aufzug nicht benutzen{" "}
                                </h3>
                              </div>

                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                <img
                                  style={{
                                    width: "100px",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                  src="../../assets/images/img_17.png"
                                  alt=""
                                  title=""
                                />
                                <h3 style={{ textAlign: "left" }}>
                                  {" "}
                                  Sammelstelle aufsuchen{" "}
                                </h3>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                  marginTop: "-50px",
                                }}
                              >
                                {" "}
                                <h3
                                  style={{
                                    textAlign: "left",
                                    marginLeft: "110px",
                                  }}
                                >
                                  Auf Anweisungen achten{" "}
                                </h3>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <table
                    style={{
                      borderTop: "1px solid #333",
                      marginTop: "20px",
                      paddingTop: "20px",
                    }}
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                  >
                    <tr>
                      <td>
                        <table width="100%" style={{ marginTop: "20px" }}>
                          <tr>
                            <td width="40%">
                              <h1 style={{ textAlign: "left" }}>
                                Loschversuch
                                <br />
                                unternehmen{" "}
                              </h1>
                            </td>
                            <td width="60%">
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                <img
                                  style={{
                                    width: "100px",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                  src="../../assets/images/img_20.png"
                                  alt=""
                                  title=""
                                />{" "}
                                <h3 style={{ textAlign: "left" }}>
                                  Feuerlöscher benutzen{" "}
                                </h3>
                              </div>
                              <div style={{ width: "100%", float: "left" }}>
                                <img
                                  style={{
                                    width: "100px",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                  src="../../assets/images/img_23.png"
                                  alt=""
                                  title=""
                                />
                                <h3 style={{ textAlign: "left" }}>
                                  {" "}
                                  Löschschlauch benutzen{" "}
                                </h3>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <div className="table-footer">
              <span>Brandschutzordnung nach DIN14096 / {curr_date}</span>
              <span>{address || "House No-06, Hezagon Garden, Germany"}</span>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      {Show_BSO_A_template_4 ? (
        <>
          <h3>Brandschutzordnung_DIN_14096_TeilA_Englisch_mit_BMA</h3>
          <div id="bso_a_body4" class="body">
            <table width="100%" cellspacing="0" cellpadding="0">
              <tr className="center">
                <td>
                  <h1 className="center">Preventing Fires</h1>
                  <img
                    className="img1"
                    src="../../assets/images/img_03.png"
                    alt=""
                    title=""
                  />
                  <h3
                    className="center"
                    style={{ textDecoration: "underline" }}
                  >
                    No open flames; fire, open ignition sources and smoking
                    prohibited
                  </h3>
                </td>
              </tr>
              <tr>
                <td
                  class="column-top"
                  width="100%"
                  colspan="2"
                  style={{
                    padding: 0,
                    margin: 0,
                    fontWeight: "normal",
                    verticalAlign: "top",
                    padding: "30px",
                  }}
                >
                  <table
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                  >
                    <tr>
                      <td>
                        <h1 className="center bicof">
                          Behaviour in case of fire
                        </h1>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <table width="100%">
                          <tr>
                            <td width="40%">
                              <h1 style={{ textAlign: "left" }}>
                                Keep calm
                                <br />
                                Report the fire{" "}
                              </h1>
                            </td>
                            <td width="60%">
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                <img
                                  style={{
                                    width: "100px",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                  src="../../assets/images/img_07.png"
                                  alt=""
                                  title=""
                                />{" "}
                                <h3 style={{ textAlign: "left" }}>
                                  Actuate the fire alarm{" "}
                                </h3>
                              </div>
                              <div style={{ width: "100%", float: "left" }}>
                                <img
                                  style={{
                                    width: "100px",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                  src="../../assets/images/img_10.png"
                                  alt=""
                                  title=""
                                />
                                <h3 style={{ textAlign: "left" }}>
                                  {" "}
                                  Emergency number: {note}{" "}
                                </h3>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <table
                    style={{
                      borderTop: "1px solid #333",
                      marginTop: "20px",
                      paddingTop: "20px",
                    }}
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                  >
                    <tr>
                      <td>
                        <table width="100%">
                          <tr>
                            <td width="40%">
                              <h1 style={{ textAlign: "left" }}>
                                Evacuate <br />
                                to safety{" "}
                              </h1>
                            </td>
                            <td width="60%">
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                {" "}
                                <h3
                                  style={{
                                    textAlign: "left",
                                    marginLeft: "110px",
                                  }}
                                >
                                  Warn endangered individuals/ Activate the
                                  building alarm{" "}
                                </h3>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                {" "}
                                <h3
                                  style={{
                                    textAlign: "left",
                                    marginLeft: "110px",
                                  }}
                                >
                                  Assist others in need of help{" "}
                                </h3>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                {" "}
                                <h3
                                  style={{
                                    textAlign: "left",
                                    marginLeft: "110px",
                                  }}
                                >
                                  Close doors{" "}
                                </h3>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                <img
                                  style={{
                                    width: "100px",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                  src="../../assets/images/img_13.png"
                                  alt=""
                                  title=""
                                />
                                <h3 style={{ textAlign: "left" }}>
                                  {" "}
                                  Follow the marked escape routes{" "}
                                </h3>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                {" "}
                                <h3
                                  style={{
                                    textAlign: "left",
                                    marginLeft: "110px",
                                  }}
                                >
                                  Do not use the Elevator{" "}
                                </h3>
                              </div>

                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                <img
                                  style={{
                                    width: "100px",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                  src="../../assets/images/img_17.png"
                                  alt=""
                                  title=""
                                />
                                <h3 style={{ textAlign: "left" }}>
                                  {" "}
                                  Go to the assembly point{" "}
                                </h3>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                {" "}
                                <h3
                                  style={{
                                    textAlign: "left",
                                    marginLeft: "110px",
                                  }}
                                >
                                  Follow instructions{" "}
                                </h3>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <table
                    style={{
                      borderTop: "1px solid #333",
                      marginTop: "20px",
                      paddingTop: "20px",
                    }}
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                  >
                    <tr>
                      <td>
                        <table width="100%" style={{ marginTop: "20px" }}>
                          <tr>
                            <td width="40%">
                              <h1 style={{ textAlign: "left" }}>
                                Attempting to extinguish the fire{" "}
                              </h1>
                            </td>
                            <td width="60%">
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                <img
                                  style={{
                                    width: "100px",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                  src="../../assets/images/img_20.png"
                                  alt=""
                                  title=""
                                />{" "}
                                <h3 style={{ textAlign: "left" }}>
                                  Use fire extinguisher{" "}
                                </h3>
                              </div>
                              <div style={{ width: "100%", float: "left" }}>
                                <img
                                  style={{
                                    width: "100px",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                  src="../../assets/images/img_23.png"
                                  alt=""
                                  title=""
                                />
                                <h3 style={{ textAlign: "left" }}>
                                  {" "}
                                  Use fire hose{" "}
                                </h3>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <div className="table-footer">
              <span>Brandschutzordnung nach DIN14096 / {curr_date}</span>
              <span>{address || "House No-06, Hezagon Garden, Germany"}</span>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      {Show_BSO_A_template_3 ? (
        <>
          <h3>Brandschutzordnung_DIN_14096_TeilA_Englisch</h3>
          <div id="bso_a_body3" class="body">
            <table width="100%" cellspacing="0" cellpadding="0">
              <tr className="center">
                <td>
                  <h1 className="center">Preventing Fires</h1>
                  <img
                    className="img1"
                    src="../../assets/images/img_03.png"
                    alt=""
                    title=""
                  />
                  <h3
                    className="center"
                    style={{ textDecoration: "underline" }}
                  >
                    No open flames; fire, open ignition sources and smoking
                    prohibited
                  </h3>
                </td>
              </tr>
              <tr>
                <td
                  class="column-top"
                  width="100%"
                  colspan="2"
                  style={{
                    padding: 0,
                    margin: 0,
                    fontWeight: "normal",
                    verticalAlign: "top",
                    padding: "30px",
                  }}
                >
                  <table
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                  >
                    <tr>
                      <td>
                        <h1 className="center bicof">
                          Behaviour in case of fire
                        </h1>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <table width="100%">
                          <tr>
                            <td width="40%">
                              <h1 style={{ textAlign: "left" }}>
                                <span>Keep calm</span>
                                <br />
                                <span>Report the fire</span>{" "}
                              </h1>
                            </td>
                            <td width="60%">
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginTop: "100px",
                                }}
                              >
                                <img
                                  style={{
                                    width: "100px",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                  src="../../assets/images/img_10.png"
                                  alt=""
                                  title=""
                                />
                                <h3 style={{ textAlign: "left" }}>
                                  {" "}
                                  Emergency number: {note}{" "}
                                </h3>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <table
                    style={{
                      borderTop: "1px solid #333",
                      marginTop: "20px",
                      paddingTop: "20px",
                    }}
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                  >
                    <tr>
                      <td>
                        <table width="100%">
                          <tr>
                            <td width="40%">
                              <h1 style={{ textAlign: "left" }}>
                                Evacuate <br />
                                to safety{" "}
                              </h1>
                            </td>
                            <td width="60%">
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                {" "}
                                <h3
                                  style={{
                                    textAlign: "left",
                                    marginLeft: "110px",
                                  }}
                                >
                                  Warn endangered individuals/ Activate the
                                  building alarm{" "}
                                </h3>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                {" "}
                                <h3
                                  style={{
                                    textAlign: "left",
                                    marginLeft: "110px",
                                  }}
                                >
                                  Assist others in need of help{" "}
                                </h3>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                {" "}
                                <h3
                                  style={{
                                    textAlign: "left",
                                    marginLeft: "110px",
                                  }}
                                >
                                  Close doors{" "}
                                </h3>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                <img
                                  style={{
                                    width: "100px",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                  src="../../assets/images/img_13.png"
                                  alt=""
                                  title=""
                                />
                                <h3 style={{ textAlign: "left" }}>
                                  {" "}
                                  Follow the marked escape routes{" "}
                                </h3>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                {" "}
                                <h3
                                  style={{
                                    textAlign: "left",
                                    marginLeft: "110px",
                                  }}
                                >
                                  Do not use the Elevator{" "}
                                </h3>
                              </div>

                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                <img
                                  style={{
                                    width: "100px",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                  src="../../assets/images/img_17.png"
                                  alt=""
                                  title=""
                                />
                                <h3 style={{ textAlign: "left" }}>
                                  {" "}
                                  Go to the assembly point{" "}
                                </h3>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                {" "}
                                <h3
                                  style={{
                                    textAlign: "left",
                                    marginLeft: "110px",
                                  }}
                                >
                                  Follow instructions{" "}
                                </h3>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <table
                    style={{
                      borderTop: "1px solid #333",
                      marginTop: "20px",
                      paddingTop: "20px",
                    }}
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                  >
                    <tr>
                      <td>
                        <table width="100%" style={{ marginTop: "20px" }}>
                          <tr>
                            <td width="40%">
                              <h1 style={{ textAlign: "left" }}>
                                Attempting to extinguish the fire{" "}
                              </h1>
                            </td>
                            <td width="60%">
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                <img
                                  style={{
                                    width: "100px",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                  src="../../assets/images/img_20.png"
                                  alt=""
                                  title=""
                                />{" "}
                                <h3 style={{ textAlign: "left" }}>
                                  Use fire extinguisher{" "}
                                </h3>
                              </div>
                              <div style={{ width: "100%", float: "left" }}>
                                <img
                                  style={{
                                    width: "100px",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                  src="../../assets/images/img_23.png"
                                  alt=""
                                  title=""
                                />
                                <h3 style={{ textAlign: "left" }}>
                                  {" "}
                                  Use fire hose{" "}
                                </h3>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <div className="table-footer">
              <span>Brandschutzordnung nach DIN14096 / {curr_date}</span>
              <span>{address || "House No-06, Hezagon Garden, Germany"}</span>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      {Show_BSO_A_template_6 ? (
        <>
          <h3>Brandschutzordnung_DIN_14096_TeilA_Englisch_mit_Hausalarm</h3>
          <div id="bso_a_body6" class="body">
            <table width="100%" cellspacing="0" cellpadding="0">
              <tr className="center">
                <td>
                  <h1 className="center">Preventing Fires</h1>
                  <img
                    className="img1"
                    src="../../assets/images/img_03.png"
                    alt=""
                    title=""
                  />
                  <h3
                    className="center"
                    style={{ textDecoration: "underline" }}
                  >
                    No open flames; fire, open ignition sources and smoking
                    prohibited
                  </h3>
                </td>
              </tr>
              <tr>
                <td
                  class="column-top"
                  width="100%"
                  colspan="2"
                  style={{
                    padding: 0,
                    margin: 0,
                    fontWeight: "normal",
                    verticalAlign: "top",
                    padding: "30px",
                  }}
                >
                  <table
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                  >
                    <tr>
                      <td>
                        <h1 className="center bicof">
                          Behaviour in case of fire
                        </h1>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <table width="100%">
                          <tr>
                            <td width="40%">
                              <h1 style={{ textAlign: "left" }}>
                                Keep calm
                                <br />
                                Report the fire{" "}
                              </h1>
                            </td>
                            <td width="60%">
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                <img
                                  style={{
                                    width: "100px",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                  src="../../assets/images/img_07.png"
                                  alt=""
                                  title=""
                                />{" "}
                                <h3 style={{ textAlign: "left" }}>
                                  Actuate the fire alarm{" "}
                                </h3>
                              </div>
                              <div style={{ width: "100%", float: "left" }}>
                                <img
                                  style={{
                                    width: "100px",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                  src="../../assets/images/img_10.png"
                                  alt=""
                                  title=""
                                />
                                <h3 style={{ textAlign: "left" }}>
                                  {" "}
                                  Emergency number: {note}{" "}
                                </h3>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <table
                    style={{
                      borderTop: "1px solid #333",
                      marginTop: "20px",
                      paddingTop: "20px",
                    }}
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                  >
                    <tr>
                      <td>
                        <table width="100%">
                          <tr>
                            <td width="40%">
                              <h1 style={{ textAlign: "left" }}>
                                Evacuate <br />
                                to safety{" "}
                              </h1>
                            </td>
                            <td width="60%">
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                {" "}
                                <h3
                                  style={{
                                    textAlign: "left",
                                    marginLeft: "110px",
                                  }}
                                >
                                  Warn endangered individuals/ Activate the
                                  building alarm{" "}
                                </h3>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                {" "}
                                <h3
                                  style={{
                                    textAlign: "left",
                                    marginLeft: "110px",
                                  }}
                                >
                                  Assist others in need of help{" "}
                                </h3>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                {" "}
                                <h3
                                  style={{
                                    textAlign: "left",
                                    marginLeft: "110px",
                                  }}
                                >
                                  Close doors{" "}
                                </h3>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                <img
                                  style={{
                                    width: "100px",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                  src="../../assets/images/img_13.png"
                                  alt=""
                                  title=""
                                />
                                <h3 style={{ textAlign: "left" }}>
                                  {" "}
                                  Follow the marked escape routes{" "}
                                </h3>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                {" "}
                                <h3
                                  style={{
                                    textAlign: "left",
                                    marginLeft: "110px",
                                  }}
                                >
                                  Do not use the Elevator{" "}
                                </h3>
                              </div>

                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                <img
                                  style={{
                                    width: "100px",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                  src="../../assets/images/img_17.png"
                                  alt=""
                                  title=""
                                />
                                <h3 style={{ textAlign: "left" }}>
                                  {" "}
                                  Go to the assembly point{" "}
                                </h3>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                {" "}
                                <h3
                                  style={{
                                    textAlign: "left",
                                    marginLeft: "110px",
                                  }}
                                >
                                  Follow instructions{" "}
                                </h3>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <table
                    style={{
                      borderTop: "1px solid #333",
                      marginTop: "20px",
                      paddingTop: "20px",
                    }}
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                  >
                    <tr>
                      <td>
                        <table width="100%" style={{ marginTop: "20px" }}>
                          <tr>
                            <td width="40%">
                              <h1 style={{ textAlign: "left" }}>
                                Attempting to extinguish the fire{" "}
                              </h1>
                            </td>
                            <td width="60%">
                              <div
                                style={{
                                  width: "100%",
                                  float: "left",
                                  marginBottom: "10px",
                                }}
                              >
                                <img
                                  style={{
                                    width: "100px",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                  src="../../assets/images/img_20.png"
                                  alt=""
                                  title=""
                                />{" "}
                                <h3 style={{ textAlign: "left" }}>
                                  Use fire extinguisher{" "}
                                </h3>
                              </div>
                              <div style={{ width: "100%", float: "left" }}>
                                <img
                                  style={{
                                    width: "100px",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                  src="../../assets/images/img_23.png"
                                  alt=""
                                  title=""
                                />
                                <h3 style={{ textAlign: "left" }}>
                                  {" "}
                                  Use fire hose{" "}
                                </h3>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <div className="table-footer">
              <span>Brandschutzordnung nach DIN14096 / {curr_date}</span>
              <span>{address || "House No-06, Hezagon Garden, Germany"}</span>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
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
    </div>
  );
};

export default OfficerRegulation;
