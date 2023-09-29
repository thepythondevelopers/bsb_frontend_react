import React, { useState, useEffect, useRef, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import LocationModal from "../../modal/LocationModal/LocationModal";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { getLocation } from "../../Redux/Action/Action";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Link } from "react-router-dom";
const API = process.env.REACT_APP_API_BASE_URL;

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function Locations() {
  // ============================================= Google Map integration ========================================================
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  // =====================================================================================================

  const locations = useSelector((state) => state.locationReducer.locations);
  const dispatch = useDispatch();
  const [addLocationModal, setAddLocationModal] = useState(false);
  const [viewLocationModal, setViewLocationModal] = useState(false);
  const [editLocationModal, setEditLocationModal] = useState(false);
  const [locationEmpty, setLocationEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitId, setSubmitId] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchTerm] = useState(["company_name"]);
  const [locationData, setLocationData] = useState([]);
  const [createLocationData, setCreateLocationData] = useState({
    company_name: "",
    house_number: "",
    street: "",
    postal_code: "",
    city: "",
    location_image: "",
    company_logo: "",
    location: "",
    no_of_members: "",
    percentage: "",
    note: "",
    show_as: "",
  });
  const [updateLocationData, setUpdateLocationData] = useState({
    company_name: "",
    house_number: "",
    street: "",
    postal_code: "",
    city: "",
    location_image: "",
    company_logo: "",
    location: "",
    no_of_members: "",
    percentage: "",
    note: "",
    show_as: "",
  });
  const [addLocation, setAddLocation] = useState("");
  const locationHandleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCreateLocationData((previousState) => {
      return { ...previousState, [name]: value };
    });
  };
  const locationFileHandle = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    console.log(e.target.name);
    if ((e.target.name = "company_logo")) {
      console.log("image url::", URL.createObjectURL(e.target.files[0]));
      setCreateLocationData((previousState) => {
        return {
          ...previousState,
          company_logo: URL.createObjectURL(e.target.files[0]),
        };
      });
    } else {
      setCreateLocationData((previousState) => {
        return { ...previousState, [name]: file };
      });
    }
  };
  // update handle
  const updateLocationHandle = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUpdateLocationData({ ...updateLocationData, [name]: value });
  };
  const updateFileLocationHandle = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    setUpdateLocationData({ ...updateLocationData, [name]: file });
  };
  const updateLocation = (e, id) => {
    e.preventDefault();
    console.log({ id: id, "update location data": updateLocationData });
    if (!updateLocationData.company_name)
      document.getElementById("company_name_err2").innerHTML =
        "* Company name required";
    else if (updateLocationData.company_name)
      document.getElementById("company_name_err2").innerHTML = "";
    /*if(!updateLocationData.house_number)
        document.getElementById('house_number_err2').innerHTML="* House number required";
        else if(updateLocationData.house_number)
        document.getElementById('house_number_err2').innerHTML="";
        if(!updateLocationData.note)
        document.getElementById('note_err2').innerHTML="* Emergency number required";
        else if(updateLocationData.note)
        document.getElementById('note_err2').innerHTML="";*/
    if (!updateLocationData.street)
      document.getElementById("street_err2").innerHTML = "* Street required";
    else if (updateLocationData.street)
      document.getElementById("street_err2").innerHTML = "";
    if (!updateLocationData.postal_code)
      document.getElementById("postal_code_err2").innerHTML =
        "* Postal code required";
    else if (updateLocationData.postal_code)
      document.getElementById("postal_code_err2").innerHTML = "";
    if (!updateLocationData.city)
      document.getElementById("city_err2").innerHTML = "* City required";
    else if (updateLocationData.city)
      document.getElementById("city_err2").innerHTML = "";
    /*if(!updateLocationData.location)
        document.getElementById('location_err2').innerHTML="* Location required";
        else if(updateLocationData.location)
        document.getElementById('location_err2').innerHTML="";
        if(!updateLocationData.no_of_members)
        document.getElementById('no_of_members_err2').innerHTML="* Number of members required";
        else if(updateLocationData.no_of_members)
        document.getElementById('no_of_members_err2').innerHTML="";
        if(!updateLocationData.percentage)
        document.getElementById('percentage_err2').innerHTML="* Percentage required";
        else if(updateLocationData.percentage)
        document.getElementById('percentage_err2').innerHTML="";*/
    if (!updateLocationData.show_as)
      document.getElementById("show_as_err2").innerHTML = "* Show as required";
    else if (updateLocationData.show_as)
      document.getElementById("show_as_err2").innerHTML = "";
    /*if(updateLocationData.note && updateLocationData.city && updateLocationData.company_name && updateLocationData.house_number && updateLocationData.location && updateLocationData.house_number && updateLocationData.no_of_members && updateLocationData.postal_code && updateLocationData
            .show_as && updateLocationData.street && updateLocationData.percentage){
                updateLocationAPI(id, updateLocationData);
            }*/
    if (
      updateLocationData.city &&
      updateLocationData.company_name &&
      updateLocationData.postal_code &&
      updateLocationData.show_as &&
      updateLocationData.street
    ) {
      updateLocationAPI(id, updateLocationData);
    }
    //getLocationData();
    //setEditLocationModal(false);
  };
  const addLocationSubmit = (e) => {
    e.preventDefault();
    setAddLocation(createLocationData);
    console.log("createLocationData::", createLocationData);
    if (!createLocationData.company_name)
      document.getElementById("company_name_err").innerHTML =
        "* Company name required";
    else if (createLocationData.company_name)
      document.getElementById("company_name_err").innerHTML = "";
    /*if(!createLocationData.house_number)
        document.getElementById('house_number_err').innerHTML="* House number required";
        else if(createLocationData.house_number)
        document.getElementById('house_number_err').innerHTML="";
        if(!createLocationData.note)
        document.getElementById('note_err').innerHTML="* Emergency number required";
        else if(createLocationData.note)
        document.getElementById('note_err').innerHTML="";*/
    if (!createLocationData.street)
      document.getElementById("street_err").innerHTML = "* Street required";
    else if (createLocationData.street)
      document.getElementById("street_err").innerHTML = "";
    if (!createLocationData.postal_code)
      document.getElementById("postal_code_err").innerHTML =
        "* Postal code required";
    else if (createLocationData.postal_code)
      document.getElementById("postal_code_err").innerHTML = "";
    if (!createLocationData.city)
      document.getElementById("city_err").innerHTML = "* City required";
    else if (createLocationData.city)
      document.getElementById("city_err").innerHTML = "";
    /*if(!createLocationData.location)
        document.getElementById('location_err').innerHTML="* Location required";
        else if(createLocationData.location)
        document.getElementById('location_err').innerHTML="";
        if(!createLocationData.no_of_members)
        document.getElementById('no_of_members_err').innerHTML="* Number of members required";
        else if(createLocationData.no_of_members)
        document.getElementById('no_of_members_err').innerHTML="";
        if(!createLocationData.percentage)
        document.getElementById('percentage_err').innerHTML="* Percentage required";
        else if(createLocationData.percentage)
        document.getElementById('percentage_err').innerHTML="";*/
    if (!createLocationData.show_as)
      document.getElementById("show_as_err").innerHTML = "* Show as required";
    else if (createLocationData.show_as)
      document.getElementById("show_as_err").innerHTML = "";
    /*if(createLocationData.note && createLocationData.city && createLocationData.company_name && createLocationData.house_number && createLocationData.location && createLocationData.house_number && createLocationData.no_of_members && createLocationData.postal_code && createLocationData
            .show_as && createLocationData.street && createLocationData.percentage){
                createLocation(createLocationData);
            }*/
    if (
      createLocationData.city &&
      createLocationData.company_name &&
      createLocationData.postal_code &&
      createLocationData.show_as &&
      createLocationData.street
    ) {
      createLocation(createLocationData);
    }
    getLocationData();
  };

  const locationSelect = (id, e) => {
    if (id) {
      if (e.target.checked === true) {
        setSubmitId(id);
      } else {
        setSubmitId("");
      }
    }
  };
  const deleteLocation = (e) => {
    if (submitId) {
      deleteSingleList(submitId);
      setSubmitId("");
    } else {
      toast.error("Please select a location first");
    }
  };
  // ============================================= Api Data ========================================================
  const getToken = JSON.parse(localStorage.getItem("user-info"));
  const token = getToken?.token;

  // Create Location
  const createLocation = (data) => {
    var formdata = new FormData();
    formdata.append("company_name", data.company_name);
    formdata.append("house_number", data.house_number);
    formdata.append("street", data.street);
    formdata.append("postal_code", data.postal_code);
    formdata.append("city", data.city);
    formdata.append("location_image", data.location_image);
    formdata.append("company_logo", data.company_logo);
    formdata.append("location", data.location);
    formdata.append("no_of_members", data.no_of_members);
    formdata.append("percentage", data.percentage);
    formdata.append("note", data.note);
    formdata.append("show_as", data.show_as);
    return fetch(`${API}/create-location`, {
      method: "POST",
      headers: {
        "x-access-token": token,
      },
      body: formdata,
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("json", json);
        if (json.message === "Unable to save in db") {
          toast.error("Create Location failed!");
        } else {
          toast.success("Create location successfull");
          setAddLocationModal(false);
          setCreateLocationData({
            company_name: "",
            house_number: "",
            street: "",
            postal_code: "",
            city: "",
            location_image: "",
            company_logo: "",
            location: "",
            no_of_members: "",
            percentage: "",
            note: "",
            show_as: "",
          });
        }
        getLocationData();
      })
      .catch((err) => {
        console.log("createLocation", err);
      });
  };

  // Update Api
  const updateLocationAPI = (apiId, data) => {
    var formdata = new FormData();
    formdata.append("company_name", data.company_name);
    formdata.append("house_number", data.house_number);
    formdata.append("street", data.street);
    formdata.append("postal_code", data.postal_code);
    formdata.append("city", data.city);
    formdata.append("location_image", data.location_image);
    formdata.append("company_logo", data.company_logo);
    formdata.append("location", data.location);
    formdata.append("no_of_members", data.no_of_members);
    formdata.append("percentage", data.percentage);
    formdata.append("note", data.note);
    formdata.append("show_as", data.show_as);
    return fetch(`${API}/update-location/${apiId}`, {
      method: "PUT",
      headers: {
        "x-access-token": token,
      },
      body: formdata,
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("json", json);
        if (json) {
          toast.success("Location Updated Successfully");
          setEditLocationModal(false);
        } else toast.error("Failed to update the location");
        getLocationData();
      })
      .catch((err) => {
        console.log("createLocation", err);
      });
  };

  // Get Location data
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
      .then((res) => res.json())
      .then((json) => {
        let reverseTaskList = json;
        setLocationData(reverseTaskList);
        if (json.length > 0) {
          setLocationEmpty(false);
        } else {
          setLocationEmpty(true);
        }
        dispatch(getLocation(reverseTaskList));
      })
      .catch((err) => {
        console.log("getLocationData", err);
      });
    // dispatch(getLocation(data));
    // setLocationData(data);
  };

  // Get Single Location Data
  const getSingleLocationData = (id, data) => {
    setIsLoading(true);
    return fetch(`${API}/get-location/${id}`, {
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
        setUpdateLocationData(json);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("getLocationData", err);
        setIsLoading(false);
      });
  };

  // Delete single location
  async function deleteSingleList(id) {
    let result = await fetch(`${API}/delete-location/${id}`, {
      method: "DELETE",
      headers: {
        "x-access-token": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result) toast.success("Location deleted Successfully");
    getLocationData();
  }

  useEffect(() => {
    getLocationData();
  }, []);

  function search(items) {
    return items?.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchLocation.toLowerCase())
      )
    );
  }

  return (
    <div className="main-body">
      {/* heading */}
      <div className="heading_box">
        <h2 className="dasshboard_heading">Standorte</h2>
        {/* <ul className='breadcrumb'>
                    <li>Dashboard</li>
                    <li className='active'>Locations</li>
                </ul> */}
      </div>
      {/* Location filterbar */}
      <div className="location-filter">
        <div className="searchFilter">
          <input
            type="text"
            placeholder="Standortsuche"
            name="search-Firma"
            id="search-Firma"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
          {/* <svg className="icon" aria-labelledby="Search Icon">
                        <title id="search">Search Icon</title>
                        <use
                            xlinkHref="/assets/svg-icons/icons.svg#search"
                            xlinkTitle="Search Icon"
                        ></use>
                    </svg> */}
        </div>
        <div className="btn-group">
          <button
            className="btn cmn_yellow_bg"
            onClick={(e) => {
              setAddLocationModal(true);
            }}
          >
            {" "}
            <svg className="icon" aria-labelledby="Add Item">
              <title id="addItem">Add Item</title>
              <use
                xlinkHref="/assets/svg-icons/icons.svg#addItem"
                xlinkTitle="Add Item"
              ></use>
            </svg>{" "}
            Standort anlegen
          </button>
          <button
            className="btn cmn_red_bg"
            onClick={(e) => {
              deleteLocation(e);
            }}
          >
            {" "}
            <svg className="icon" aria-labelledby="Remove Item">
              <title id="removeItem">Remove Item</title>
              <use
                xlinkHref="/assets/svg-icons/icons.svg#removeItem"
                xlinkTitle="Remove Item"
              ></use>
            </svg>{" "}
            Standort löschen
          </button>
        </div>
      </div>

      {/* location Table */}
      <div className="locationTableWrap">
        <ul className="locationTable">
          <li className="locationTableHeading">
            <div></div>
            <div></div>
            <div></div>
            <div>Firma</div>

            <div>Straße Nr</div>
            <div>Ort</div>
            <div></div>
          </li>
          {search(locationData).map((curelem, index) => {
            const {
              company_name,
              house_number,
              street,
              show_as,
              postal_code,
              city,
              location_image,
              company_logo,
              location,
            } = curelem;
            return (
              <li className="locationTableItem" key={index}>
                <div className="location-checkbox">
                  <div className="ctm-checkbox">
                    <label
                      className="ctm-checkbox-container"
                      onClick={(e) => locationSelect(curelem?._id, e)}
                    >
                      Merken
                      <input type="checkbox" />
                      <span className="ctm-checkbox-checkmark"></span>
                    </label>
                  </div>
                </div>
                <div className="location-sr">{index + 1}</div>
                <div className="locationName">
                  {show_as}
                  {/* <img src={process.env.REACT_APP_IMAGE_BASE_URL+`/${location_image}`} alt="Location Image" />
                                            <div className='locationNameCont'>
                                            <h6>{company_name && company_name}</h6>
                                            <p>{house_number && house_number} {street && street}</p>
                                        </div> */}
                </div>
                <div>{company_name && company_name}</div>
                {/*<div className='locationName'>
                                        {company_logo ? (
                                            <img src={process.env.REACT_APP_IMAGE_BASE_URL+`/${company_logo}`} alt="Company Logo" />
                                        ) : ("Company logo not defined")}

                                            <div className='locationNameCont'>
                                            <h6>{company_name && company_name}</h6>
                                            <p>{house_number && house_number} {street && street}</p>
                                        </div>
                                    </div>*/}
                <div>
                  {house_number && house_number} {street && street}
                </div>
                <div>{city && city}</div>
                <div className="btn-group">
                  <button
                    className="btn cmn_yellow_bg"
                    onClick={(e) => {
                      getSingleLocationData(curelem._id);
                      setSubmitId(curelem._id);
                      setEditLocationModal(true);
                    }}
                  >
                    {" "}
                    <svg className="icon" aria-labelledby="Edit Item">
                      <title id="editItem">Edit Item</title>
                      <use
                        xlinkHref="/assets/svg-icons/icons.svg#editItem"
                        xlinkTitle="Edit Item"
                      ></use>
                    </svg>{" "}
                    ändern
                  </button>
                  <Link to="/standorte" className="btn cmn_red_bg">
                    {" "}
                    <svg className="icon" aria-labelledby="View Item">
                      <title id="viewIem">View Item</title>
                      <use
                        xlinkHref="/assets/svg-icons/icons.svg#viewItem"
                        xlinkTitle="View Item"
                      ></use>
                    </svg>{" "}
                    öffnen
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="cmnPagination">
          <Stack spacing={2}>
            <Pagination count={10} variant="outlined" shape="rounded" />
          </Stack>
        </div>
      </div>
      {/* Add Location Modals */}
      {addLocationModal && (
        <LocationModal
          content={
            <>
              <div className="location-dialog">
                <div className="location-dialog-head">
                  <h3>Standort bearbeiten</h3>
                  <CloseIcon
                    className="closeModal"
                    color="action"
                    onClick={(e) => {
                      setAddLocationModal(false);
                    }}
                  />
                </div>
                <div className="location-dialog-body">
                  <form onSubmit={addLocationSubmit}>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label htmlFor="show_as">Anzeigen als*</label>
                          <input
                            type="text"
                            name="show_as"
                            id="show_as"
                            className="form-control"
                            required
                            placeholder="Anzeigen als"
                            onChange={locationHandleInput}
                            value={createLocationData.show_as}
                          />
                        </div>
                        <div className="errors" id="show_as_err"></div>
                        <div className="form-group">
                          <label htmlFor="company_name">Firma*</label>
                          <input
                            type="text"
                            name="company_name"
                            id="company_name"
                            className="form-control"
                            placeholder="Firma"
                            onChange={locationHandleInput}
                            value={createLocationData.company_name}
                          />
                        </div>
                        <div className="errors" id="company_name_err"></div>
                        <div className="form-group">
                          <label htmlFor="street">StraBe Nr.*</label>
                          <input
                            type="text"
                            name="street"
                            id="street"
                            className="form-control"
                            placeholder="StraBe Nr."
                            onChange={locationHandleInput}
                            value={createLocationData.street}
                          />
                        </div>
                        <div className="errors" id="street_err"></div>
                        <div className="form-group">
                          <label htmlFor="postal_code">Postleitzahl*</label>
                          <input
                            type="text"
                            name="postal_code"
                            id="postal_code"
                            className="form-control"
                            placeholder="Postleitzahl*"
                            onChange={locationHandleInput}
                            value={createLocationData.postal_code}
                          />
                        </div>
                        <div className="errors" id="postal_code_err"></div>
                        <div className="form-group">
                          <label htmlFor="city">Ort*</label>
                          <input
                            type="text"
                            name="city"
                            id="city"
                            className="form-control"
                            placeholder="Ort"
                            onChange={locationHandleInput}
                            value={createLocationData.city}
                          />
                        </div>
                        <div className="errors" id="city_err"></div>
                        <div className="form-group">
                          <label htmlFor="location_image">Standortbild</label>
                          <input
                            type="file"
                            name="location_image"
                            id="location_image"
                            className="form-control"
                            placeholder="Company Name"
                            onChange={locationFileHandle}
                            accept="image/*"
                          />
                        </div>
                        <div style={{ width: "100%", height: "300px" }}>
                          <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={8}
                            onLoad={onLoad}
                            onUnmount={onUnmount}
                          >
                            {/* Child components, such as markers, info windows, etc. */}
                            <></>
                          </GoogleMap>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        {/*<div className='form-group'>
                                                    <label htmlFor="location">Location</label>
                                                    <input type="text" name='location' id='location' className='form-control' placeholder='Location' onChange={locationHandleInput} value={createLocationData.location} />
                                                </div>
                                                <div className="errors" id="location_err"></div>*/}
                        <div className="form-group">
                          <label htmlFor="no_of_members">
                            Anzahl der Mitarbeiter:
                          </label>
                          <input
                            type="number"
                            name="no_of_members"
                            id="no_of_members"
                            className="form-control"
                            placeholder="Anzahl der Mitarbeiter"
                            onChange={locationHandleInput}
                            value={createLocationData.no_of_members}
                          />
                        </div>
                        <div className="errors" id="no_of_members_err"></div>
                        <div className="form-group">
                          <label htmlFor="percentage">
                            Wieviel % BSH nach GB:
                          </label>
                          <input
                            type="text"
                            name="percentage"
                            id="percentage"
                            className="form-control"
                            placeholder="Wieviel % BSH nach GB"
                            onChange={locationHandleInput}
                            value={createLocationData.percentage}
                          />
                        </div>
                        <div className="errors" id="percentage_err"></div>
                        {/*<div className='form-group'>
                                                    <label htmlFor="house_number">House Number</label>
                                                    <input type="text" name='house_number' id='house_number' className='form-control' placeholder='#House no' onChange={locationHandleInput} value={createLocationData.house_number} />
                                                </div>
                                                <div className="errors" id="house_number_err"></div>*/}
                        <div className="form-group">
                          <label htmlFor="note">Notrufnummer:</label>
                          <input
                            type="text"
                            name="note"
                            id="note"
                            className="form-control"
                            placeholder="Notrufnummer"
                            onChange={locationHandleInput}
                            value={createLocationData.note}
                          />
                        </div>
                        <div className="errors" id="note_err"></div>
                        <div className="form-group">
                          <label htmlFor="company_logo">Firmenlogo</label>
                          <input
                            type="file"
                            name="company_logo"
                            id="company_logo"
                            className="form-control"
                            placeholder="Firmenlogo"
                            onChange={(e) => {
                              locationFileHandle(e);
                            }}
                          />
                        </div>
                        <div>
                          {createLocationData.company_logo ? (
                            <img
                              src={createLocationData.company_logo}
                              height="250"
                              width="250"
                              alt="imgpreview"
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="modal-btn-group">
                      <button type="submit" className="btn cmn_yellow_bg">
                        Add
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          }
        />
      )}
      {/* Edit Location Modals */}
      {editLocationModal && (
        <LocationModal
          content={
            <>
              <div className="location-dialog">
                <div className="location-dialog-head">
                  <h3>Edit Location</h3>
                  <CloseIcon
                    className="closeModal"
                    color="action"
                    onClick={(e) => {
                      setEditLocationModal(false);
                    }}
                  />
                </div>
                <div className="location-dialog-body">
                  {isLoading === true && <div className="modal-loading"></div>}
                  {updateLocationData && (
                    <form className={isLoading === true && "mdoal-opacity"}>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label htmlFor="show_as">Anzeigen als*</label>
                            <input
                              type="text"
                              name="show_as"
                              id="show_as"
                              className="form-control"
                              required
                              placeholder="Anzeigen als"
                              onChange={(e) => {
                                updateLocationHandle(e);
                              }}
                              value={updateLocationData.show_as}
                            />
                          </div>
                          <div className="errors" id="show_as_err2"></div>
                          <div className="form-group">
                            <label htmlFor="company_name">Firma</label>
                            <input
                              type="text"
                              name="company_name"
                              id="company_name"
                              className="form-control"
                              placeholder="Firma"
                              onChange={(e) => {
                                updateLocationHandle(e);
                              }}
                              value={updateLocationData.company_name}
                            />
                          </div>
                          <div className="errors" id="company_name_err2"></div>
                          {/*<div className='form-group'>
                                                            <label htmlFor="house_number">House Number</label>
                                                            <input type="text" name='house_number' id='house_number' className='form-control' placeholder='#House no' onChange={(e) => { updateLocationHandle(e) }} value={updateLocationData.house_number} />
                                                        </div>
                                                        <div className="errors" id="house_number_err2"></div>*/}
                          <div className="form-group">
                            <label htmlFor="street">Straße Nr*</label>
                            <input
                              type="text"
                              name="street"
                              id="street"
                              className="form-control"
                              placeholder="Straße Nr"
                              onChange={(e) => {
                                updateLocationHandle(e);
                              }}
                              value={updateLocationData.street}
                            />
                          </div>
                          <div className="errors" id="street_err2"></div>
                          <div className="form-group">
                            <label htmlFor="postal_code">Postleitzahl*</label>
                            <input
                              type="text"
                              name="postal_code"
                              id="postal_code"
                              className="form-control"
                              placeholder="Postleitzahl"
                              onChange={(e) => {
                                updateLocationHandle(e);
                              }}
                              value={updateLocationData.postal_code}
                            />
                          </div>
                          <div className="errors" id="postal_code_err2"></div>
                          <div className="form-group">
                            <label htmlFor="city">Ort*</label>
                            <input
                              type="text"
                              name="city"
                              id="city"
                              className="form-control"
                              placeholder="Ort"
                              onChange={(e) => {
                                updateLocationHandle(e);
                              }}
                              value={updateLocationData.city}
                            />
                          </div>
                          <div className="errors" id="city_err2"></div>
                          <div className="form-group">
                            <label htmlFor="location_image">Standortbild</label>
                            <input
                              type="file"
                              name="location_image"
                              id="location_image"
                              className="form-control"
                              placeholder="Company Name"
                              onChange={(e) => {
                                updateFileLocationHandle(e);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          {/*<div className='form-group'>
                                                            <label htmlFor="location">Location</label>
                                                            <input type="text" name='location' id='location' className='form-control' placeholder='Location' onChange={(e) => { updateLocationHandle(e) }} value={updateLocationData.location} />
                                                        </div>
                                                        <div className="errors" id="location_err2"></div>*/}
                          <div className="form-group">
                            <label htmlFor="no_of_members">
                              Anzahl der Mitarbeiter:
                            </label>
                            <input
                              type="number"
                              name="no_of_members"
                              id="no_of_members"
                              className="form-control"
                              placeholder="Anzahl der Mitarbeiter"
                              onChange={(e) => {
                                updateLocationHandle(e);
                              }}
                              value={updateLocationData.no_of_members}
                            />
                          </div>
                          <div className="errors" id="no_of_members_err2"></div>
                          <div className="form-group">
                            <label htmlFor="percentage">
                              Wieviel % BSH nach GB:
                            </label>
                            <input
                              type="text"
                              name="percentage"
                              id="percentage"
                              className="form-control"
                              placeholder="Wieviel % BSH nach GB"
                              onChange={(e) => {
                                updateLocationHandle(e);
                              }}
                              value={updateLocationData.percentage}
                            />
                          </div>
                          <div className="errors" id="percentage_err2"></div>
                          <div className="form-group">
                            <label htmlFor="note">Notrufnummer:</label>
                            <input
                              type="text"
                              name="note"
                              id="note"
                              className="form-control"
                              placeholder="Notrufnummer"
                              onChange={(e) => {
                                updateLocationHandle(e);
                              }}
                              value={updateLocationData.note}
                            />
                          </div>
                          <div className="errors" id="note_err2"></div>
                          <div className="form-group">
                            <label htmlFor="company_logo">Firmenlogo</label>
                            <input
                              type="file"
                              name="company_logo"
                              id="company_logo"
                              className="form-control"
                              placeholder="Firmenlogo"
                              onChange={(e) => {
                                updateFileLocationHandle(e);
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="modal-btn-group">
                        <button
                          type="submit"
                          onClick={(e) => {
                            updateLocation(e, updateLocationData._id);
                          }}
                          className="btn cmn_yellow_bg"
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </>
          }
        />
      )}
      {/* View Location Modals */}
      {viewLocationModal && (
        <LocationModal
          content={
            <>
              <div className="location-dialog">
                <div className="location-dialog-head">
                  <h3>View Location</h3>
                  <CloseIcon
                    className="closeModal"
                    color="action"
                    onClick={(e) => {
                      setViewLocationModal(false);
                    }}
                  />
                </div>
                <div className="location-dialog-body view-location-modal">
                  {updateLocationData && (
                    <>
                      <ul className={isLoading === true && "mdoal-opacity"}>
                        {updateLocationData.show_as && (
                          <li>
                            <h6>Anzeigen als</h6>
                            <span>{updateLocationData.show_as}</span>
                          </li>
                        )}
                        {updateLocationData.company_name && (
                          <li>
                            <h6>Company Name</h6>
                            <span>{updateLocationData.company_name}</span>
                          </li>
                        )}
                        {updateLocationData.house_number && (
                          <li>
                            <h6>House Number</h6>
                            <span>{updateLocationData.house_number}</span>
                          </li>
                        )}
                        {updateLocationData.street && (
                          <li>
                            <h6>Street</h6>
                            <span>{updateLocationData.street}</span>
                          </li>
                        )}
                        {updateLocationData.postal_code && (
                          <li>
                            <h6>Postal Code</h6>
                            <span>{updateLocationData.postal_code}</span>
                          </li>
                        )}
                        {updateLocationData.city && (
                          <li>
                            <h6>City</h6>
                            <span>{updateLocationData.city}</span>
                          </li>
                        )}
                        {updateLocationData.location_image && (
                          <li>
                            <h6>Location Image</h6>
                            <img
                              src={
                                process.env.REACT_APP_IMAGE_BASE_URL +
                                `/${updateLocationData.location_image}`
                              }
                              alt="Location Image"
                              width="100px"
                              height="100px"
                            />
                          </li>
                        )}
                        {updateLocationData.company_logo && (
                          <li>
                            <h6>Company Logo</h6>
                            <img
                              src={
                                process.env.REACT_APP_IMAGE_BASE_URL +
                                `/${updateLocationData.company_logo}`
                              }
                              alt="Company Logo"
                              width="100px"
                              height="100px"
                            />
                          </li>
                        )}
                        {updateLocationData.location && (
                          <li>
                            <h6>Location</h6>
                            <span>{updateLocationData.location}</span>
                          </li>
                        )}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </>
          }
        />
      )}
    </div>
  );
}

export default Locations;
