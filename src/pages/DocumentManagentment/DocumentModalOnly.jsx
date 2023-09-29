import react, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useDispatch, useSelector } from "react-redux";
import { getDocuemntAllData } from "../../Redux/Action/Action";
import DocumentModal from "../../modal/DocumentModal/DocumentModal";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
const API = process.env.REACT_APP_API_BASE_URL;

const DocumentModalOnly = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [contMenuActve, setContMenuActve] = useState(false);
  const [getSelectedId, setGetSelectedId] = useState("");
  const [points, setPoints] = useState({ top: 0, left: 0 });
  const [getDocument, SetGetDocument] = useState({});
  const [searchTerm] = useState(["file_name, category"]);
  const selectedLocationId = useSelector((state) => state.locationIdReducer);
  const categoryData = useSelector((state) => state.categoryReducer.category);
  const dispatch = useDispatch();
  const getCurrentDate = (separator = "/") => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date}`;
  };
  const [editSingleDocument, setEditSingleDocument] = useState({
    file_name: "",
    category: "",
    location: selectedLocationId,
    date: getCurrentDate(),
    upload_document: "",
    calendar_reminder_interval: "",
    calendar_reminder_choose_date: "",
    note_item: "",
    note_create_task: "",
  });
  function search(items) {
    return items
      .filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(props.locSearch.toLowerCase())
        )
      )
      .filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(props.cateSearch.toLowerCase())
        )
      );
  }
  const getToken = JSON.parse(localStorage.getItem("user-info"));
  const token = getToken?.token;

  useEffect(() => {
    getDocumentAPI();
    singleDocumentAPI();
    categoryListAPI();
  }, [selectedLocationId]);

  useEffect(() => {
    const handleClick = () => setContMenuActve(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  // getDocumnet API
  const getDocumentAPI = async (data) => {
    try {
      const res = await fetch(
        `${API}/get-document-data/${selectedLocationId}`,
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
      SetGetDocument(json);
      dispatch(getDocuemntAllData(json));
    } catch (err) {
      console.log("getDocumentAPI", err);
    }
  };
  // get Single Documnet
  const singleDocumentAPI = async (id, data) => {
    const res = await fetch(`${API}/get-document/${id}`, {
      method: "GET",
      headers: {
        "x-access-token": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    getDocumentAPI();
    setEditSingleDocument(json);
  };
  // Update Single Category
  const singleUpdateDocumentAPI = async (id, data) => {
    var formdata = new FormData();
    formdata.append("file_name", data.file_name);
    formdata.append("category", data.category);
    formdata.append("location", data.location);
    formdata.append("date", data.date);
    formdata.append("upload_document", data.upload_document);
    {
      data?.calendar_reminder_interval
        ? formdata.append(
            "calendar_reminder_interval",
            data.calendar_reminder_interval
          )
        : formdata.append("calendar_reminder_interval", "");
    }
    {
      data?.calendar_reminder_choose_date
        ? formdata.append(
            "calendar_reminder_choose_date",
            data.calendar_reminder_choose_date
          )
        : formdata.append("calendar_reminder_choose_date", "");
    }
    {
      data?.note_item
        ? formdata.append("note_item", data.note_item)
        : formdata.append("note_item", "");
    }
    {
      data?.note_create_task
        ? formdata.append("note_create_task", data.note_create_task)
        : formdata.append("note_create_task", "");
    }
    const res = await fetch(`${API}/update-document/${id}`, {
      method: "PUT",
      headers: {
        "x-access-token": token,
      },
      body: formdata,
    });
    const json = await res.json();
    getDocumentAPI();
    singleDocumentAPI();
    getSidebar();
  };
  // Delete Document
  async function deleteDocument(id) {
    let result = await fetch(`${API}/delete-document/${id}`, {
      method: "DELETE",
      headers: {
        "x-access-token": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    getDocumentAPI();
  }

  // Upload document Data
  const [checkNote, setCheckNote] = useState(false);
  const [calenderReminder, setCalenderReminder] = useState(false);
  const [location, setLocation] = useState({});
  const [category, setCategory] = useState({});
  const [value, setValue] = useState(null);
  const [value2, setValue2] = useState(getCurrentDate());
  console.log("pdf props::", props.pdfFile);
  const [uploadDoc, setUploadDoc] = useState({
    file_name: "",
    category: "",
    location: selectedLocationId,
    date: getCurrentDate(),
    upload_document: props.pdfFile,
    calendar_reminder_interval: "",
    calendar_reminder_choose_date: "",
    note_item: "",
    note_create_task: "",
  });
  const handleUploadChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUploadDoc({ ...uploadDoc, [name]: value });
    categoryListAPI();
  };
  const handleCalanderChooseDate = (e) => {
    setUploadDoc({ ...uploadDoc, calendar_reminder_choose_date: e._d });
  };
  const handleNoteChange = (e) => {
    if (e.target.checked) {
      setCheckNote(true);
    } else {
      setCheckNote(false);
    }
  };
  const handleCalenderChange = (e) => {
    if (e.target.checked) {
      setCalenderReminder(true);
    } else {
      setCalenderReminder(false);
    }
  };
  const handleTaskChange = (e) => {
    setUploadDoc({ ...uploadDoc, note_create_task: e.target.checked });
  };
  const handleUploadSubmit = (e) => {
    e.preventDefault();
    console.log("doc upload:: ", uploadDoc.upload_document);
    if (!uploadDoc.file_name) {
      document.getElementById("file_name_err").innerHTML =
        "* File name cannot be left empty";
    }
    if (!uploadDoc.location) {
      toast.error("Please select a Location");
    }

    if (!uploadDoc.date) {
      document.getElementById("date_err").innerHTML =
        "* Date cannot be left empty";
    }
    if (!uploadDoc.category) {
      document.getElementById("category_err").innerHTML =
        "* Category cannot be left empty";
    }
    if (
      uploadDoc.file_name &&
      uploadDoc.location &&
      uploadDoc.date &&
      uploadDoc.category
    ) {
      createDocument({
        file_name: uploadDoc.file_name,
        category: uploadDoc.category,
        location: selectedLocationId,
        date: getCurrentDate(),
        upload_document: props.pdfFile,
        calendar_reminder_interval: "",
        calendar_reminder_choose_date: "",
        note_item: "",
        note_create_task: "",
      });
      props.setAddDoc(false);
    }
    if (
      uploadDoc.calendar_reminder_interval &&
      uploadDoc.calendar_reminder_choose_date
    ) {
      let prevDate = `${uploadDoc.calendar_reminder_choose_date}`;
      let splitDate = prevDate.split(" ");
      let newdateArr = splitDate.slice(1, 4);
      if (!(newdateArr[1] == "31" || newdateArr[1] == "30")) {
        let nextDayName = Number(newdateArr[1]) + 1;
        newdateArr.splice(1, 1, String(nextDayName));
      }
      let nextday = newdateArr.join("-");
      createCalender({
        startDate: uploadDoc?.calendar_reminder_choose_date,
        endDate: nextday,
        title: uploadDoc?.file_name,
        notes: uploadDoc?.file_name,
        location: selectedLocationId,
      });
    }
    if (uploadDoc.note_item && uploadDoc.note_create_task == true) {
      const getTaskVal = {
        title: uploadDoc.note_item,
        location: selectedLocationId,
        file_upload: uploadDoc.upload_document,
      };
      console.log("file_upload", getTaskVal.file_upload);
      createSlidebar(getTaskVal);
    }
    setUploadDoc({
      file_name: "",
      category: "",
      location: selectedLocationId,
      date: getCurrentDate(),
      upload_document: "",
      calendar_reminder_interval: "",
      calendar_reminder_choose_date: "",
      note_item: "",
      note_create_task: "",
    });
  };

  // Edit Category Points
  const handleEditUploadChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEditSingleDocument({ ...editSingleDocument, [name]: value });
  };
  const handleEditNoteChange = (e) => {
    if (e.target.checked) {
      setCheckNote(true);
    } else {
      setCheckNote(false);
    }
  };
  const handleEditCalenderChange = (e) => {
    if (e.target.checked) {
      setCalenderReminder(true);
    } else {
      setCalenderReminder(false);
    }
  };
  const handleEditTaskChange = (e) => {
    setEditSingleDocument({
      ...editSingleDocument,
      note_create_task: e.target.checked,
    });
  };
  const handleEditUploadSubmit = (e, id) => {
    e.preventDefault();
    props.setEditCat(false);
    //singleUpdateDocumentAPI(id, editSingleDocument);
    getSidebar();
  };

  // APIS

  // get Category
  const categoryListAPI = async (data) => {
    const res = await fetch(`${API}/get-category`, {
      method: "POST",
      headers: {
        "x-access-token": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    setCategory(json);
  };

  //create calander
  const createCalender = async (data) => {
    try {
      const res = await fetch(`${API}/create-calender`, {
        method: "POST",
        headers: {
          "x-access-token": token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
    } catch (err) {
      console.log(err);
    }
  };

  // Create Document API
  const createDocument = async (data) => {
    var formdata = new FormData();
    formdata.append("file_name", data.file_name);
    formdata.append("category", data.category);
    formdata.append("location", data.location);
    formdata.append("date", data.date);
    formdata.append("upload_document", data.upload_document);
    {
      data?.calendar_reminder_interval
        ? formdata.append(
            "calendar_reminder_interval",
            data.calendar_reminder_interval
          )
        : formdata.append("calendar_reminder_interval", "");
    }
    {
      data?.calendar_reminder_choose_date
        ? formdata.append(
            "calendar_reminder_choose_date",
            data.calendar_reminder_choose_date
          )
        : formdata.append("calendar_reminder_choose_date", "");
    }
    {
      data?.note_item
        ? formdata.append("note_item", data.note_item)
        : formdata.append("note_item", "");
    }
    {
      data?.note_create_task
        ? formdata.append("note_create_task", data.note_create_task)
        : formdata.append("note_create_task", "");
    }
    try {
      const res = await fetch(`${API}/create-document`, {
        method: "POST",
        headers: {
          "x-access-token": token,
        },
        body: formdata,
      });
      const json = await res.json();
      console.log("create-document", json);
      if (json._id) {
        toast.success("Document created Successfully");
      }
      getDocumentAPI();
      getSidebar();
    } catch (err) {
      console.log("create-document", err);
    }
  };

  // create task
  const createSlidebar = async (data) => {
    var formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("location", data.location);
    formdata.append("file_upload", data.file_upload);
    try {
      const res = await fetch(`${API}/create-sidebar`, {
        method: "POST",
        headers: {
          "x-access-token": token,
        },
        body: formdata,
      });
      const json = await res.json();
      // console.log("json", json);
      getSidebar();
    } catch (err) {
      console.log(err);
    }
  };
  //   get Slidebar
  const getSidebar = async (data) => {
    try {
      const res = await fetch(`${API}/get-sidebar/${selectedLocationId}`, {
        method: "POST",
        headers: {
          "x-access-token": token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      let reverseTaskList = json?.reverse();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="doc-management-wrap">
        {!props.addDoc ? (
          ""
        ) : (
          <DocumentModal
            content={
              <div
                style={{
                  maxWidth: "500px",
                }}
                className="cmn_modal"
              >
                <CloseIcon
                  className="closeModal"
                  color="action"
                  onClick={(e) => {
                    props.setAddDoc(false);
                  }}
                />
                <div className="doc-management-wrap-cate">
                  <div className="doc-management-wrap-head">
                    <h2 className="dasshboard_heading">Upload New Document</h2>
                  </div>
                  <div className="upload-document-form">
                    <form
                      style={{
                        width: "800px",
                      }}
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="file_name">File Name</label>
                            <input
                              type="text"
                              name="file_name"
                              id="file_name"
                              className="form-control"
                              placeholder="File name here"
                              onChange={(e) => {
                                handleUploadChange(e);
                              }}
                              value={uploadDoc.file_name}
                            />
                          </div>
                          <div className="errors" id="file_name_err"></div>
                          <div className="form-group">
                            <label htmlFor="category">Select Category</label>
                            <select
                              name="category"
                              id="category"
                              className="form-control"
                              onChange={(e) => {
                                handleUploadChange(e);
                              }}
                              value={uploadDoc.category}
                            >
                              <option value="">Please Select Category</option>
                              {categoryData.length > 0 &&
                                categoryData?.map((curelem, index) => {
                                  return (
                                    <option key={index} value={curelem?._id}>
                                      {curelem?.title}
                                    </option>
                                  );
                                })}
                            </select>
                          </div>
                          <div className="errors" id="category_err"></div>
                          <div className="form-group">
                            <label htmlFor="date">Date</label>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                              <DatePicker
                                classNae
                                name="date"
                                id="date"
                                className="form-control"
                                value={value2}
                                onChange={(newValue) => {
                                  console.log("newValue", newValue);
                                  setValue2(newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                              />
                            </LocalizationProvider>
                            {/* <input type="text" className="form-control" name="date" id="date" onChange={(e) => { handleUploadChange(e) }} value={getCurrentDate()} readOnly /> */}
                          </div>
                          <div className="errors" id="date_err"></div>
                          <div className="form-group">
                            <label
                              className="custom_switch"
                              onClick={(e) => {
                                handleCalenderChange(e);
                              }}
                            >
                              <input
                                type="checkbox"
                                name="calenderReminder"
                                id="calenderReminder"
                              />
                              <span className="slider round"></span>
                            </label>
                            <label htmlFor="calenderReminder">
                              {" "}
                              Calender Reminder
                            </label>
                          </div>
                          {calenderReminder && (
                            <div className="row calenderSwitch">
                              <div className="col">
                                <div className="form-group">
                                  <label htmlFor="calendar_reminder_interval">
                                    Interval
                                  </label>
                                  <select
                                    name="calendar_reminder_interval"
                                    id="calendar_reminder_interval"
                                    className="form-control"
                                    onChange={(e) => {
                                      handleUploadChange(e);
                                    }}
                                    value={uploadDoc.calendar_reminder_interval}
                                  >
                                    <option value="">
                                      Please Select Interval
                                    </option>
                                    <option value="Monatlich">Monatlich</option>
                                    <option value="Quartalsweise">
                                      Quartalsweise
                                    </option>
                                    <option value="Halbjährig">
                                      Halbjährig
                                    </option>
                                    <option value="Einjährig">Einjährig</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col">
                                <div className="form-group">
                                  <label htmlFor="calendar_reminder_choose_date">
                                    Choose Date
                                  </label>
                                  <LocalizationProvider
                                    dateAdapter={AdapterMoment}
                                  >
                                    <DatePicker
                                      classNae
                                      name="calendar_reminder_choose_date"
                                      id="calendar_reminder_choose_date"
                                      className="form-control"
                                      value={
                                        uploadDoc.calendar_reminder_choose_date
                                      }
                                      onChange={(e) => {
                                        handleCalanderChooseDate(e);
                                      }}
                                      renderInput={(params) => (
                                        <TextField {...params} />
                                      )}
                                    />
                                  </LocalizationProvider>
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="form-group">
                            <label
                              className="custom_switch"
                              onClick={(e) => {
                                handleNoteChange(e);
                              }}
                            >
                              <input
                                type="checkbox"
                                name="createNote"
                                id="createNote"
                              />
                              <span className="slider round"></span>
                            </label>
                            <label htmlFor="createNote"> Create Note</label>
                          </div>
                          {checkNote && (
                            <div className="createNoteSwitch">
                              <div className="form-group">
                                <label htmlFor="note_item">Write Note</label>
                                <textarea
                                  name="note_item"
                                  id="note_item"
                                  className="form-control"
                                  cols="10"
                                  rows="3"
                                  onChange={(e) => {
                                    handleUploadChange(e);
                                  }}
                                  value={uploadDoc.note_item}
                                ></textarea>
                              </div>
                              <div className="ctm-checkbox">
                                <label
                                  className="ctm-checkbox-container"
                                  htmlFor="note_create_task"
                                  onChange={(e) => {
                                    handleTaskChange(e);
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    name="note_create_task"
                                    id="note_create_task"
                                  />
                                  <span className="ctm-checkbox-checkmark"></span>
                                  Create Task
                                </label>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="btn-group">
                        <button
                          className="btn cmn_yellow_bg"
                          onClick={(e) => handleUploadSubmit(e)}
                        >
                          <svg className="icon" aria-labelledby="Add Item">
                            <title id="addItem">Add Item</title>
                            <use
                              xlinkHref="/assets/svg-icons/icons.svg#addItem"
                              xlinkTitle="Add Item"
                            ></use>
                          </svg>
                          Speichern
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            }
          />
        )}
      </div>
    </>
  );
};

export default DocumentModalOnly;
