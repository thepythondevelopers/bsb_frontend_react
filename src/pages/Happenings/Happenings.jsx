import React, { useEffect, useRef, useState } from "react";
import "./style.css";

import ListIcon from "@mui/icons-material/List";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useSelector } from "react-redux";
import colors from "../../demo-data/ChangeColor";
import CloseIcon from "@mui/icons-material/Close";
import OfficerModal from "../../modal/OfficerModal/OfficerModal";

const Happenings = ({ isDocumentModule }) => {
  const [colorDocumentUploadClass, setColorDocumentUploadClass] = useState(
    colors[0].id
  );

  const [openTemplate, setOpenTemplate] = useState(false);
  const [colorDocumentUploadName, setColorDocumentUploadName] = useState("Red");
  const [colorDocumentUploadClassTaskbar] = useState(colors);
  // State for textarea
  const [isChecked, setIsChecked] = useState(false);
  const [textAreaVisible, setTextAreaVisible] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");

  const listDocumentUploadTitles = colorDocumentUploadClassTaskbar.map(
    (item, index) => (
      <li
        key={index}
        onClick={() => {
          setColorDocumentUploadClass(item.id);
          setDocumentUploadModuleBox(false);
          setColorDocumentUploadName(item.color);
        }}
        className={`${item.color} ${
          colorDocumentUploadClass === item.id
            ? "tab-title tab-title--active"
            : "tab-title"
        }`}
      >
        {item.color}
      </li>
    )
  );

  const [addDocument, setAddDocument] = useState(false);
  const [categoryList, setCategoryList] = useState(false);
  const [activeSearch, setActiveSearch] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [colorDocumentUploadBox, setColorDocumentUploadBox] = useState(false);
  const categoryData = useSelector((state) => state.categoryReducer.category);
  const [documentUploadModuleBox, setDocumentUploadModuleBox] = useState(false);
  const dropDownCont = useRef(null);

  //function for hendeling textarea

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setTextAreaVisible(!textAreaVisible);
  };

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
  };

  const handleClickOutside = (event) => {
    if (dropDownCont.current && !dropDownCont.current.contains(event.target)) {
      setDocumentUploadModuleBox(false);
      setColorDocumentUploadBox(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <>
      <div
        className={`documentUploadList  ${
          categoryList ? "docUploadReset" : ""
        } ${addDocument ? "docUploadReset" : ""}`}
      >
        <div className="contain">
          <div className="main">
            <div className={`dragable-header ${colorDocumentUploadName}`}>
              <h5 className="happening-heading">Event</h5>
              <div className="moduleHeaderOption">
                <button
                  className="btn cmn_yellow_bg"
                  onClick={(e) => {
                    setOpenTemplate(true);
                  }}
                >
                  <svg className="icon" aria-labelledby="Add Item">
                    <title id="addItem">Add Item</title>
                    <use
                      xlinkHref="/assets/svg-icons/icons.svg#addItem"
                      xlinkTitle="Add Item"
                    ></use>
                  </svg>
                </button>
                <div
                  className={`search-btn cmn_document-icons ${
                    activeSearch && "active-search "
                  }`}
                >
                  <input
                    type="text"
                    name="search-Firma"
                    id="search-Firma"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                  <svg
                    className="icon"
                    aria-labelledby="Search Icon"
                    onClick={(e) => {
                      setActiveSearch(!activeSearch);
                    }}
                  >
                    <title id="search">Search Icon</title>
                    <use
                      xlinkHref="/assets/svg-icons/icons.svg#search"
                      xlinkTitle="Search Icon"
                    ></use>
                  </svg>
                </div>
                <div className="filter-btn cmn_document-icons">
                  <FilterAltIcon className="filterIcon" color="action" />
                  <div className="filters-by-category">
                    <p
                      onClick={(e) => {
                        setSearchCategory("");
                      }}
                      className={searchCategory === "" ? "active" : ""}
                    >
                      All
                    </p>
                    {categoryData.map((curElem, index) => {
                      return (
                        <p
                          key={index}
                          onClick={(e) => {
                            setSearchCategory(curElem._id);
                          }}
                          className={
                            searchCategory == curElem._id ? "active" : ""
                          }
                        >
                          {curElem.title}
                        </p>
                      );
                    })}
                  </div>
                </div>
                <div className="moduleDropown" ref={dropDownCont}>
                  <ListIcon
                    className="dropIcon"
                    color="action"
                    onClick={() =>
                      setDocumentUploadModuleBox(!documentUploadModuleBox)
                    }
                  />
                  <div
                    className={`openDrop ${
                      documentUploadModuleBox ? "show" : ""
                    }`}
                  >
                    <ul className="openDropList">
                      <li
                        onClick={(e) => {
                          setColorDocumentUploadBox(!colorDocumentUploadBox);
                        }}
                        ref={dropDownCont}
                      >
                        <ColorLensIcon className="color-lens" color="action" />
                        <span className="drop-text">Farbe andern</span>
                        <ChevronRightIcon
                          className="angle-right"
                          color="action"
                        />

                        <div
                          className={`colorList ${
                            colorDocumentUploadBox ? "show" : ""
                          }`}
                        >
                          {" "}
                          {listDocumentUploadTitles}
                        </div>
                      </li>
                      <li
                        onClick={(e) => {
                          setCategoryList(true);
                          setAddDocument(false);
                        }}
                      >
                        <button>
                          <FormatListBulletedIcon
                            className="listIcon"
                            color="action"
                          />{" "}
                          Category
                        </button>
                      </li>
                      <li
                        onClick={(e) => {
                          isDocumentModule(false);
                        }}
                      >
                        <CancelPresentationIcon
                          className="cancel-board"
                          color="action"
                        />
                        <span className="drop-text">Auf Bord schließen</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {openTemplate ? (
              <OfficerModal
                content={
                  <>
                    <div className="workCertificate cmn-modal">
                      <CloseIcon
                        className="closeModal"
                        color="action"
                        onClick={(e) => {
                          setOpenTemplate(false);
                        }}
                      />
                      <div className="formPop">
                        <div className="formPop-body-wrap">
                          <div className="formPop-head text-box-flexwrap">
                            <div className="form-group formPop-flex">
                              <label>Fire alaram:</label>

                              <div className="ctm-checkbox genral-checkbox">
                                <label
                                  className="ctm-checkbox-container"
                                  htmlFor="bma"
                                >
                                  BMA
                                  <input
                                    type="checkbox"
                                    // checked="bma"
                                    name="bma"
                                    id="bma"
                                  />
                                  <div className="ctm-checkbox-checkmark"></div>
                                  <br />
                                </label>
                              </div>
                              <div className="ctm-checkbox genral-checkbox">
                                <label
                                  className="ctm-checkbox-container"
                                  htmlFor="emergency-call"
                                >
                                  Emergency-call
                                  <input
                                    type="checkbox"
                                    // checked="emergency-call"
                                    name="emergency-call"
                                    id="emergency-call"
                                  />
                                  <div className="ctm-checkbox-checkmark"></div>
                                  <br />
                                </label>
                              </div>

                              <div className="ctm-checkbox genral-checkbox">
                                <label>No: ZZZ,YYY</label>

                                <br />
                              </div>

                              <br />
                            </div>
                          </div>
                          <div className="formPop1-flex">
                            <div className="ctm-checkbox genral-checkbox">
                              <label className="f-bold">Date:</label>
                              <input
                                className="inpt"
                                type="text"
                                name="date"
                                id="date"
                                placeholder="dd.mm.yyyy"
                                value=""
                                readOnly
                              />
                              <br />
                            </div>
                            <div className="ctm-checkbox genral-checkbox mrgn">
                              <label className="f-bold">Time:</label>
                              <input
                                className="inpt"
                                type="text"
                                name="time"
                                id="time"
                                placeholder="hh:mm"
                                value=""
                                readOnly
                              />
                              <br />
                            </div>
                          </div>
                          <div className="formPop1-flex">
                            <div className="ctm-checkbox genral-checkbox">
                              <label
                                className="ctm-checkbox-container f-bold"
                                htmlFor="fire"
                              >
                                Fire
                                <input
                                  type="checkbox"
                                  // checked="fire"
                                  name="fire"
                                  id="fire"
                                />
                                <div className="ctm-checkbox-checkmark"></div>
                                <br />
                              </label>
                            </div>
                            <div className="ctm-checkbox genral-checkbox mrgn">
                              <label
                                className="ctm-checkbox-container f-bold"
                                htmlFor="false_alarm"
                              >
                                False alarm
                                <input
                                  type="checkbox"
                                  // checked="false_alarm"
                                  name="false_alarm"
                                  id="false_alarm"
                                />
                                <div className="ctm-checkbox-checkmark"></div>
                                <br />
                              </label>
                            </div>
                          </div>
                          <div className="description">
                            <label>Brief Description</label>
                            <br />
                            <textarea
                              id="description"
                              name="description"
                              rows="4"
                              cols="50"
                              placeholder="Please enter your message here..."
                            ></textarea>
                          </div>
                          <div className="ctm-checkbox genral-checkbox">
                            <label
                              className="ctm-checkbox-container f-bold"
                              htmlFor="task-create"
                            >
                              Task create
                              <input
                                type="checkbox"
                                // checked="task-create"
                                name="task-create"
                                id="task-create"
                              />
                              <br />
                              <div
                                className={`ctm-checkbox-checkmark${
                                  !isChecked ? " checked" : ""
                                }`}
                                onClick={handleCheckboxChange}
                              ></div>
                            </label>
                            {textAreaVisible && (
                              <textarea
                                className="taskText"
                                value={textareaValue}
                                onChange={handleTextareaChange}
                                placeholder="Write something..."
                              ></textarea>
                            )}
                          </div>

                          <div
                            className="happen-btn"
                            style={{ float: "right" }}
                          >
                            <button
                              className="btn cmn_red_bg"
                              style={{ marginRight: "20px" }}
                            >
                              zurück
                            </button>
                            <button className="btn cmn_yellow_bg">
                              weiter
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                }
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Happenings;
