import React, { useState } from "react";
import ColorLensIcon from '@mui/icons-material/ColorLens';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ListIcon from '@mui/icons-material/List';
import CloseIcon from '@mui/icons-material/Close';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import "./FireProtection.css";
import OfficeModal from "../../modal/OfficerModal/OfficerModal";

const FireProtection = () => {

    const [openTemplate, setOpenTemplate] = useState(false);
    const [page, setPage] = useState(0);
    const formTitles = ["Basic data", "People with tasks", "Plant engineering", "Structural", "Organizational", "Events"];
    const formTitles2 = ["Basic data on the site", "Personen mit besonderen Aufgaben im Brandschutz", "Plant fire protection", "Structural fire protection", "Organizational fire protection", "Events"];

    const [basicData, setBasicData] = useState({
        fire_protection_concept: 0,
        from_date: "",
        description: ""
    })

    const [personenMit, setPersonenMit] = useState({
        managing_director: 0,
        managing_director_text: "",
        deputy_managing_director: 0,
        deputy_managing_director_text: "",
        object_manager: "",
        object_manager_text: "",
        responsible_fire_protection: 0,
        responsible_fire_protection_text: "",
        fire_protection_officer: 0,
        last_training: "",
        hours_spent: "",
        safety_helper_soll: "",
        safety_helper_lst: ""
    })

    const [plantFireProtection, setPlantFireProtection] = useState({
        bma: 0,
        kat1: 0,
        kat2: 0,
        kat3: 0,
        kat4: 0,
        house_alarm_system: 0,
        detector_groups: "",
        detector: "",
        push_button_detector: "",
        last_training: "",
        last_inspection: "",
        extinguishing_system: 0,
        sprinkler: 0,
        wet: 0,
        dry: 0,
        tandem: 0,
        pilot_operated: 0,
        gas_extinguishing_system: 0,
        other_extinguishing_system: 0,
        types_of: "",
        gas: "",
        gas_last_inspection: "",
        rwa: 0,
        natural: 0,
        machine: 0,
        wall_hydrants: 0,
        typS: 0,
        typf: 0,
        riser_dry: 0,
        safety_lighting: 0,
        alarm_system: 0,
        type_last_inspection: 0
    })

    const [structuralFireProtection, setStructuralFireProtection] = useState({
        smoke_protection_gates: 0,
        smoke_protection_gates_inspection: "",
        noise_protection_doors: 0,
        noise_protection_doors_inspection: "",
        fire_doors: 0,
        fire_doors_inspection: "",
        fire_dampers: 0,
        fire_dampers_inspection: "",
        thermal: 0,
        machine: 0,
        hold_open_systems: 0,
        hold_open_systems_inspection: ""
    })

    const [organizationalFireProtection, setOrganizationalFireProtection] = useState({
        fire_protection_regulations_partA: 0,
        fire_protection_regulations_partA_inspection: "",
        fire_protection_regulations_partB: 0,
        fire_protection_regulations_partB_inspection: "",
        fire_protection_regulations_partC: 0,
        fire_protection_regulations_partC_inspection: "",
        escape_rescue_plans: 0,
        escape_rescue_plans_inspection: "",
        fire_protection_plans: 0,
        fire_protection_plans_inspection: "",
        fire_safety_inspection: "",
        authority_inspection: ""
    })

    const [events, setEvents] = useState({
        total_fire_alarms: "",
        thereof_via_BMA: "",
        thereof_via_emergency_call: "",
        of_these_were: "",
        fires: "",
        false_alarms: "",
        fire_Hazardous_Work: "",
        evacuation_exercises: ""
    })

    const [fireProtecction, setFireProtecction] = useState({
        businessYear: "",
        basicData: basicData,
        personen_mit: personenMit,
        plant_fire_protection: plantFireProtection,
        structural_fire_protection: structuralFireProtection,
        organizational_fire_protection: organizationalFireProtection,
        events: events
    });

    // create form
    const createForm = (e) => {
        e.preventDefault()
        setOpenTemplate(true);
    }

    const handleNextStep = (e) => {
        e.preventDefault();
        setPage((currPage) => currPage + 1);
    }

    // Create PDF
    const handleCreatePdf = (e) => {
        e.preventDefault();
        // createEvacuationAPI(evacuation);
        setPage(0);
        setOpenTemplate(false);
    }
    // Create Word
    const handleCreateWord = (e) => {
        e.preventDefault();
        // createEvacuationAPI(evacuation);
        setPage(0);
        setOpenTemplate(false);
    }

    return (
        <>
            <div className="main-body">
                <div className='heading_box officerRegulation_head'>
                    {/* <h2 className="dasshboard_heading">Ticketing System</h2> */}
                    <ul className='breadcrumb'>
                        <li>Dashboard</li>
                        <li className='active'>Fire Protection Report</li>
                    </ul>
                </div>
                <div className="officerRegulation_body fire-protection-box ">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="officerRegulation_box">
                                <div className="officerRegulation_cmn-box">
                                    <h5 className="officerRegulation_heading">Fire Protection Annual Report</h5>
                                    <div className="officerRegulation_innerbox">
                                        <div className="officerRegulation_headingBox">
                                            <h5 className="officerRegulation_heading">Fire Protection Annual Report</h5>
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
                                                    <ul className={`dropdown-menu`} aria-labelledby="dropdownMenuButton1">
                                                        <li>
                                                            <button className="dropdown-item">
                                                                <ColorLensIcon className="color-lens" color="action" />
                                                                Farbe andern
                                                                <ChevronRightIcon className="angle-right" color="action" />
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button className="dropdown-item">
                                                                <CancelPresentationIcon className="cancel-board" color="action" />
                                                                Auf Bord schließen
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="certificate-box-wrap">
                                            <div className="certificate-box">
                                                <div className="created-report">
                                                    <div class="form-group">
                                                        <select class="form-select" aria-label="Default select example" name="select_template" id="select_template">
                                                            <option>Creat NEW (Choose year)</option>
                                                            <option value="1">One</option>
                                                            <option value="2">Two</option>
                                                            <option value="3">Three</option>
                                                        </select>
                                                    </div>
                                                    <div className="btn-group">
                                                        <button className="btn cmn_red_bg" onClick={(e) => { createForm(e) }}>
                                                            Create
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="created-report">
                                                    <div class="form-group">
                                                        <select class="form-select" aria-label="Default select example" name="select_template" id="select_template">
                                                            <option>Open created reports by year.</option>
                                                            <option value="1">One</option>
                                                            <option value="2">Two</option>
                                                            <option value="3">Three</option>
                                                        </select>
                                                    </div>
                                                    <div className="btn-group">
                                                        <button className="btn cmn_red_bg" onClick={(e) => { createForm(e) }}>
                                                            Create
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    openTemplate &&
                    <OfficeModal content={
                        <>
                            <div className="workCertificate cmn-modal">
                                <CloseIcon className="closeModal" color="action" onClick={(e) => { setOpenTemplate(false) }} />
                                <div className="formPop">
                                    <div className="form-head">
                                        {
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
                                        }
                                    </div>
                                    <div className="formPop-body-wrap">
                                        <div className="formPop-head">
                                            <div className="form-group">
                                                {
                                                    formTitles2.map((curElem, index) => {
                                                        return (
                                                            <>
                                                                {
                                                                    page == index && <label htmlFor="evacuation_nr" key={index}>{curElem}</label>
                                                                }
                                                            </>

                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="businessYear">Business year : </label>
                                                <input type="text" name="businessYear" id="businessYear" />
                                            </div>
                                        </div>
                                        <div className="formPop-forms fireProtection_formbox">
                                            {/* Basic data on the site */}
                                            <div className={`formPop-cmn ${page === 0 && 'active'}`} id="general">
                                                <div className="formPop-body">
                                                    <div className="form-list-item formPop-flex">
                                                        <strong>Object:</strong>
                                                        <p>Company name, street no, postal code, city</p>
                                                    </div>
                                                    <div className="form-list-item formPop-flex">
                                                        <strong>Useful area :</strong>
                                                        <p>Existing data of fire extinguisher use</p>
                                                    </div>
                                                    <div className="form-list-item formPop-flex">
                                                        <strong>Employees :</strong>
                                                        <p>Number of employees</p>
                                                    </div>
                                                    <div className="form-list-item formPop-flex">
                                                        <strong>Fire classes :</strong>
                                                        <p>Enter existing fire classes Pictograms</p>
                                                    </div>
                                                    <div className="form-list-item formPop-flex">
                                                        <strong>Object:</strong>
                                                        <p>Company name, street no, postal code, city</p>
                                                    </div>
                                                    <div className="form-list-item formPop-flex">
                                                        <div className="text-box-flexwrap ctm-checkbox-left">
                                                            <div className="ctm-checkbox">
                                                                <label className="ctm-checkbox-container" htmlFor="fire_protection_concept">
                                                                    Fire protection concept
                                                                    <input type="checkbox" name="fire_protection_concept" id="fire_protection_concept" />
                                                                    <span className="ctm-checkbox-checkmark"></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="form-group formPop-flex">
                                                            <label htmlFor="from_date">From Date:</label>
                                                            <input type="date" name="from_date" id="from_date" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group formPop-block">
                                                        <label htmlFor="description">Were there any object-related changes in the fiscal year :</label>
                                                        <textarea name="description" id="description" cols="30" rows="10" className="form-control"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Personen mit besonderen Aufgaben im Brandschutz */}
                                            <div className={`formPop-cmn ${page === 1 && 'active'}`} id="general">
                                                <div className="formPop-body">
                                                    <div className="form-list-item formPop-flex">
                                                        <div className="text-box-flexwrap flex-box-same ">
                                                            <div className="ctm-checkbox">
                                                                <label className="ctm-checkbox-container" htmlFor="managing_director">
                                                                    Managing Director:
                                                                    <input type="checkbox" name="managing_director" id="managing_director" />
                                                                    <span className="ctm-checkbox-checkmark"></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="form-group formPop-flex">
                                                            <input type="text" name="managing_director_text" id="managing_director_text" />
                                                        </div>
                                                    </div>
                                                    <div className="form-list-item formPop-flex">
                                                        <div className="text-box-flexwrap flex-box-same ">
                                                            <div className="ctm-checkbox">
                                                                <label className="ctm-checkbox-container" htmlFor="deputy_managing_director">
                                                                    Deputy managing director:
                                                                    <input type="checkbox" name="deputy_managing_director" id="deputy_managing_director" />
                                                                    <span className="ctm-checkbox-checkmark"></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="form-group formPop-flex">
                                                            <input type="text" name="deputy_managing_director_text" id="deputy_managing_director_text" />
                                                        </div>
                                                    </div>
                                                    <div className="form-list-item formPop-flex">
                                                        <div className="text-box-flexwrap flex-box-same ">
                                                            <div className="ctm-checkbox">
                                                                <label className="ctm-checkbox-container" htmlFor="object_manager">
                                                                    Object manager:
                                                                    <input type="checkbox" name="object_manager" id="object_manager" />
                                                                    <span className="ctm-checkbox-checkmark"></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="form-group formPop-flex">
                                                            <input type="text" name="object_manager_text" id="object_manager_text" />
                                                        </div>
                                                    </div>
                                                    <div className="form-list-item formPop-flex">
                                                        <div className="text-box-flexwrap flex-box-same ">
                                                            <div className="ctm-checkbox">
                                                                <label className="ctm-checkbox-container" htmlFor="responsible_fire_protection">
                                                                    Responsible fire protection:
                                                                    <input type="checkbox" name="responsible_fire_protection" id="responsible_fire_protection" />
                                                                    <span className="ctm-checkbox-checkmark"></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="form-group formPop-flex">
                                                            <input type="text" name="responsible_fire_protection_text" id="responsible_fire_protection_text" />
                                                        </div>
                                                    </div>
                                                    <div className="form-list-item formPop-flex">
                                                        <div className="text-box-flexwrap flex-box-same ">
                                                            <div className="ctm-checkbox">
                                                                <label className="ctm-checkbox-container" htmlFor="fire_protection_officer">
                                                                    Fire Protection Officer:
                                                                    <input type="checkbox" name="fire_protection_officer" id="fire_protection_officer" />
                                                                    <span className="ctm-checkbox-checkmark"></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="form-group formPop-flex">
                                                            <label for="last_training">Last training:</label>
                                                            <input type="text" name="last_training" id="last_training" placeholder="MM/YYYY" />
                                                        </div>
                                                    </div>
                                                    <div className="form-list-item">
                                                        <div className="form-group formPop-flex">
                                                            <label for="hours_spent">Hours spent by fire protection officer :</label>
                                                            <input type="text" name="hours_spent" id="hours_spent" />
                                                        </div>
                                                    </div>
                                                    <div className="form-list-item formPop-flex">
                                                        <div className="form-group formPop-flex">
                                                            <label for="safety_helper_soll">Fire Safety Helpers:   Soll</label>
                                                            <input type="text" name="safety_helper_soll" id="safety_helper_soll" />
                                                        </div>
                                                        <div className="form-group formPop-flex">
                                                            <label for="safety_helper_lst">/ Ist</label>
                                                            <input type="text" name="safety_helper_lst" id="safety_helper_lst" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Plant fire protection */}
                                            <div className={`formPop-cmn ${page === 2 && 'active'}`} id="plant_fire_protection">
                                                <div className="formPop-body">
                                                    {/* Body Inner 1 */}
                                                    <div className="formPop-body-inner-wrap">
                                                        <div className="form-list-item formPop-flex">
                                                            <div className="text-box-flexwrap ">
                                                                <div className="ctm-checkbox">
                                                                    <label className="ctm-checkbox-container" htmlFor="bma">
                                                                        BMA
                                                                        <input type="checkbox" name="bma" id="bma" />
                                                                        <span className="ctm-checkbox-checkmark"></span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="text-box-flexwrap ">
                                                                <div className="ctm-checkbox">
                                                                    <label className="ctm-checkbox-container" htmlFor="kat1">
                                                                        Kat1
                                                                        <input type="checkbox" name="kat1" id="kat1" />
                                                                        <span className="ctm-checkbox-checkmark"></span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="text-box-flexwrap ">
                                                                <div className="ctm-checkbox">
                                                                    <label className="ctm-checkbox-container" htmlFor="kat2">
                                                                        Kat2
                                                                        <input type="checkbox" name="kat2" id="kat2" />
                                                                        <span className="ctm-checkbox-checkmark"></span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="text-box-flexwrap ">
                                                                <div className="ctm-checkbox">
                                                                    <label className="ctm-checkbox-container" htmlFor="kat3">
                                                                        Kat3
                                                                        <input type="checkbox" name="kat3" id="kat3" />
                                                                        <span className="ctm-checkbox-checkmark"></span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="text-box-flexwrap ">
                                                                <div className="ctm-checkbox">
                                                                    <label className="ctm-checkbox-container" htmlFor="kat4">
                                                                        Kat4
                                                                        <input type="checkbox" name="kat4" id="kat4" />
                                                                        <span className="ctm-checkbox-checkmark"></span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-list-item formPop-flex">
                                                            <div className="text-box-flexwrap ">
                                                                <div className="ctm-checkbox">
                                                                    <label className="ctm-checkbox-container" htmlFor="house_alarm_system">
                                                                        House alarm system
                                                                        <input type="checkbox" name="house_alarm_system" id="house_alarm_system" />
                                                                        <span className="ctm-checkbox-checkmark"></span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-list-item formPop-flex">
                                                            <div className="form-group formPop-flex small-inputBox">
                                                                <label for="detector_groups">Detector groups:</label>
                                                                <input type="text" name="detector_groups" id="detector_groups" />
                                                            </div>
                                                            <div className="form-group formPop-flex small-inputBox">
                                                                <label for="detector">Detector:</label>
                                                                <input type="text" name="detector" id="detector" />
                                                            </div>
                                                            <div className="form-group formPop-flex small-inputBox">
                                                                <label for="push_button_detector">Push button detector:</label>
                                                                <input type="text" name="push_button_detector" id="push_button_detector" />
                                                            </div>
                                                        </div>
                                                        <div className="form-list-item formPop-flex">
                                                            <div className="form-group formPop-flex small-inputBox">
                                                                <label for="last_inspection">Last Inspektion:</label>
                                                                <input type="text" name="last_inspection" id="last_inspection" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* Body Inner 2 */}
                                                    <div className="formPop-body-inner-wrap">
                                                        {/* Form List 1 */}
                                                        <div className="form-list-item formPop-flex">
                                                            <div className="text-box-flexwrap ">
                                                                <div className="ctm-checkbox">
                                                                    <label className="ctm-checkbox-container" htmlFor="extinguishing_system">
                                                                        Extinguishing system
                                                                        <input type="checkbox" name="extinguishing_system" id="extinguishing_system" />
                                                                        <span className="ctm-checkbox-checkmark"></span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Form List 2 */}
                                                        <div className="form-list-item formPop-flex">
                                                            <div className="text-box-flexwrap ">
                                                                <div className="ctm-checkbox">
                                                                    <label className="ctm-checkbox-container" htmlFor="sprinkler">
                                                                        Sprinkler
                                                                        <input type="checkbox" name="sprinkler" id="sprinkler" />
                                                                        <span className="ctm-checkbox-checkmark"></span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="text-box-flexwrap ">
                                                                <div className="ctm-checkbox">
                                                                    <label className="ctm-checkbox-container" htmlFor="wet">
                                                                        Wet
                                                                        <input type="checkbox" name="wet" id="wet" />
                                                                        <span className="ctm-checkbox-checkmark"></span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="text-box-flexwrap ">
                                                                <div className="ctm-checkbox">
                                                                    <label className="ctm-checkbox-container" htmlFor="dry">
                                                                        Dry
                                                                        <input type="checkbox" name="dry" id="dry" />
                                                                        <span className="ctm-checkbox-checkmark"></span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="text-box-flexwrap ">
                                                                <div className="ctm-checkbox">
                                                                    <label className="ctm-checkbox-container" htmlFor="tandem">
                                                                        Tandem
                                                                        <input type="checkbox" name="tandem" id="tandem" />
                                                                        <span className="ctm-checkbox-checkmark"></span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="text-box-flexwrap ">
                                                                <div className="ctm-checkbox">
                                                                    <label className="ctm-checkbox-container" htmlFor="pilot_operated">
                                                                        Pilot operated
                                                                        <input type="checkbox" name="pilot_operated" id="pilot_operated" />
                                                                        <span className="ctm-checkbox-checkmark"></span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Form List 3 */}
                                                        <div className="form-list-item formPop-flex">
                                                            <div className="text-box-flexwrap ">
                                                                <div className="ctm-checkbox">
                                                                    <label className="ctm-checkbox-container" htmlFor="gas_extinguishing_system">
                                                                        Gas extinguishing system
                                                                        <input type="checkbox" name="gas_extinguishing_system" id="gas_extinguishing_system" />
                                                                        <span className="ctm-checkbox-checkmark"></span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="form-group formPop-flex small-inputBox">
                                                                <label for="gas">What gas:</label>
                                                                <input type="text" name="gas" id="gas" />
                                                            </div>
                                                        </div>
                                                        {/* Form List 4 */}
                                                        <div className="form-list-item formPop-flex">
                                                            <div className="text-box-flexwrap ">
                                                                <div className="ctm-checkbox">
                                                                    <label className="ctm-checkbox-container" htmlFor="other_extinguishing_system">
                                                                        Other extinguishing systems
                                                                        <input type="checkbox" name="other_extinguishing_system" id="other_extinguishing_system" />
                                                                        <span className="ctm-checkbox-checkmark"></span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="form-group formPop-flex small-inputBox">
                                                                <label for="types_of">Type of extinguishing system :</label>
                                                                <input type="text" name="types_of" id="types_of" />
                                                            </div>
                                                            <div className="form-group formPop-flex small-inputBox">
                                                                <label for="gas_last_inspection">Last Inspektion:</label>
                                                                <input type="text" name="gas_last_inspection" id="gas_last_inspection" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* Body Inner 3 */}
                                                    <div className="formPop-body-inner-wrap">
                                                        {/* Form List 1 */}
                                                        <div className="form-list-item formPop-flex">
                                                            <div className="text-box-flexwrap ">
                                                                <div className="ctm-checkbox">
                                                                    <label className="ctm-checkbox-container" htmlFor="rwa">
                                                                        RWA
                                                                        <input type="checkbox" name="rwa" id="rwa" />
                                                                        <span className="ctm-checkbox-checkmark"></span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="text-box-flexwrap ">
                                                                <div className="ctm-checkbox">
                                                                    <label className="ctm-checkbox-container" htmlFor="natural">
                                                                        natural
                                                                        <input type="checkbox" name="natural" id="natural" />
                                                                        <span className="ctm-checkbox-checkmark"></span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="text-box-flexwrap ">
                                                                <div className="ctm-checkbox">
                                                                    <label className="ctm-checkbox-container" htmlFor="machine">
                                                                        machine
                                                                        <input type="checkbox" name="machine" id="machine" />
                                                                        <span className="ctm-checkbox-checkmark"></span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Form List 2 */}
                                                        <div className="form-list-item formPop-flex">
                                                            <div className="text-box-flexwrap ">
                                                                <div className="ctm-checkbox">
                                                                    <label className="ctm-checkbox-container" htmlFor="wall_hydrants">
                                                                        Wall hydrants
                                                                        <input type="checkbox" name="wall_hydrants" id="wall_hydrants" />
                                                                        <span className="ctm-checkbox-checkmark"></span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="text-box-flexwrap ">
                                                                <div className="ctm-checkbox">
                                                                    <label className="ctm-checkbox-container" htmlFor="typS">
                                                                        Typ S
                                                                        <input type="checkbox" name="typS" id="typS" />
                                                                        <span className="ctm-checkbox-checkmark"></span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="text-box-flexwrap ">
                                                                <div className="ctm-checkbox">
                                                                    <label className="ctm-checkbox-container" htmlFor="typf">
                                                                        Typ F
                                                                        <input type="checkbox" name="typf" id="typf" />
                                                                        <span className="ctm-checkbox-checkmark"></span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="form-group formPop-flex small-inputBox">
                                                                <label for="type_last_inspection">Last Inspektion:</label>
                                                                <input type="text" name="type_last_inspection" id="type_last_inspection" />
                                                            </div>
                                                        </div>
                                                        {/* Form List 3 */}
                                                        <div className="form-list-item formPop-flex">
                                                            <div className="text-box-flexwrap ">
                                                                <div className="ctm-checkbox">
                                                                    <label className="ctm-checkbox-container" htmlFor="riser_dry">
                                                                        Riser dry
                                                                        <input type="checkbox" name="riser_dry" id="riser_dry" />
                                                                        <span className="ctm-checkbox-checkmark"></span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Form List 4 */}
                                                        <div className="form-list-item formPop-flex">
                                                            <div className="text-box-flexwrap ">
                                                                <div className="ctm-checkbox">
                                                                    <label className="ctm-checkbox-container" htmlFor="safety_lighting">
                                                                        Safety lighting
                                                                        <input type="checkbox" name="safety_lighting" id="safety_lighting" />
                                                                        <span className="ctm-checkbox-checkmark"></span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Form List 5 */}
                                                        <div className="form-list-item formPop-flex">
                                                            <div className="text-box-flexwrap ">
                                                                <div className="ctm-checkbox">
                                                                    <label className="ctm-checkbox-container" htmlFor="alarm_system">
                                                                        Alarm system
                                                                        <input type="checkbox" name="alarm_system" id="alarm_system" />
                                                                        <span className="ctm-checkbox-checkmark"></span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Structural fire protection */}
                                            <div className={`formPop-cmn ${page === 3 && 'active'}`} id="structural_fire_protection">
                                                <div className="formPop-body">
                                                    {/* Form List 1 */}
                                                    <div className="form-list-item formPop-flex">
                                                        <div className="text-box-flexwrap set-half-box">
                                                            <div className="ctm-checkbox">
                                                                <label className="ctm-checkbox-container" htmlFor="smoke_protection_gates">
                                                                    Smoke protection gates
                                                                    <input type="checkbox" name="smoke_protection_gates" id="smoke_protection_gates" />
                                                                    <span className="ctm-checkbox-checkmark"></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="form-group formPop-flex small-inputBox">
                                                            <label for="smoke_protection_gates_inspection">Last Inspektion:</label>
                                                            <input type="text" name="smoke_protection_gates_inspection" id="smoke_protection_gates_inspection" />
                                                        </div>
                                                    </div>
                                                    {/* Form List 2 */}
                                                    <div className="form-list-item formPop-flex">
                                                        <div className="text-box-flexwrap set-half-box">
                                                            <div className="ctm-checkbox">
                                                                <label className="ctm-checkbox-container" htmlFor="noise_protection_doors">
                                                                    Noise protection doors
                                                                    <input type="checkbox" name="noise_protection_doors" id="noise_protection_doors" />
                                                                    <span className="ctm-checkbox-checkmark"></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="form-group formPop-flex small-inputBox">
                                                            <label for="noise_protection_doors_inspection">Last Inspektion:</label>
                                                            <input type="text" name="noise_protection_doors_inspection" id="noise_protection_doors_inspection" />
                                                        </div>
                                                    </div>
                                                    {/* Form List 3 */}
                                                    <div className="form-list-item formPop-flex">
                                                        <div className="text-box-flexwrap set-half-box">
                                                            <div className="ctm-checkbox">
                                                                <label className="ctm-checkbox-container" htmlFor="fire_doors">
                                                                    Fire doors
                                                                    <input type="checkbox" name="fire_doors" id="fire_doors" />
                                                                    <span className="ctm-checkbox-checkmark"></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="form-group formPop-flex small-inputBox">
                                                            <label for="fire_doors_inspection">Last Inspektion:</label>
                                                            <input type="text" name="fire_doors_inspection" id="fire_doors_inspection" />
                                                        </div>
                                                    </div>
                                                    {/* Form List 4 */}
                                                    <div className="form-list-item formPop-flex">
                                                        <div className="text-box-flexwrap ">
                                                            <div className="ctm-checkbox">
                                                                <label className="ctm-checkbox-container" htmlFor="fire_dampers">
                                                                    Fire dampers
                                                                    <input type="checkbox" name="fire_dampers" id="fire_dampers" />
                                                                    <span className="ctm-checkbox-checkmark"></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="text-box-flexwrap ">
                                                            <div className="ctm-checkbox">
                                                                <label className="ctm-checkbox-container" htmlFor="thermal">
                                                                    Thermal
                                                                    <input type="checkbox" name="thermal" id="thermal" />
                                                                    <span className="ctm-checkbox-checkmark"></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="text-box-flexwrap ">
                                                            <div className="ctm-checkbox">
                                                                <label className="ctm-checkbox-container" htmlFor="machine">
                                                                    Machine
                                                                    <input type="checkbox" name="machine" id="machine" />
                                                                    <span className="ctm-checkbox-checkmark"></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="form-group formPop-flex small-inputBox">
                                                            <label for="fire_dampers_inspection">Last Inspektion:</label>
                                                            <input type="text" name="fire_dampers_inspection" id="fire_dampers_inspection" />
                                                        </div>
                                                    </div>
                                                    {/* Form List 5 */}
                                                    <div className="form-list-item formPop-flex">
                                                        <div className="text-box-flexwrap set-half-box">
                                                            <div className="ctm-checkbox">
                                                                <label className="ctm-checkbox-container" htmlFor="hold_open_systems">
                                                                    cert. Hold-open systems
                                                                    <input type="checkbox" name="hold_open_systems" id="hold_open_systems" />
                                                                    <span className="ctm-checkbox-checkmark"></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="form-group formPop-flex small-inputBox">
                                                            <label for="hold_open_systems_inspection">Last Inspektion:</label>
                                                            <input type="text" name="hold_open_systems_inspection" id="hold_open_systems_inspection" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Organizational fire protection */}
                                            <div className={`formPop-cmn ${page === 4 && 'active'}`} id="organizational_fire_protection">
                                                <div className="formPop-body">
                                                    {/* Form List 1 */}
                                                    <div className="form-list-item formPop-flex">
                                                        <div className="text-box-flexwrap set-half-box">
                                                            <div className="ctm-checkbox">
                                                                <label className="ctm-checkbox-container" htmlFor="fire_protection_regulations_partA">
                                                                    Fire protection regulations part A
                                                                    <input type="checkbox" name="fire_protection_regulations_partA" id="fire_protection_regulations_partA" />
                                                                    <span className="ctm-checkbox-checkmark"></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="form-group formPop-flex small-inputBox">
                                                            <label for="fire_protection_regulations_partA_inspection">Last Inspektion:</label>
                                                            <input type="text" name="fire_protection_regulations_partA_inspection" id="fire_protection_regulations_partA_inspection" />
                                                        </div>
                                                    </div>
                                                    {/* Form List 2 */}
                                                    <div className="form-list-item formPop-flex">
                                                        <div className="text-box-flexwrap set-half-box">
                                                            <div className="ctm-checkbox">
                                                                <label className="ctm-checkbox-container" htmlFor="fire_protection_regulations_partB">
                                                                    Fire protection regulations part B
                                                                    <input type="checkbox" name="fire_protection_regulations_partB" id="fire_protection_regulations_partB" />
                                                                    <span className="ctm-checkbox-checkmark"></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="form-group formPop-flex small-inputBox">
                                                            <label for="fire_protection_regulations_partB_inspection">Last Inspektion:</label>
                                                            <input type="text" name="fire_protection_regulations_partB_inspection" id="fire_protection_regulations_partB_inspection" />
                                                        </div>
                                                    </div>
                                                    {/* Form List 3 */}
                                                    <div className="form-list-item formPop-flex">
                                                        <div className="text-box-flexwrap set-half-box">
                                                            <div className="ctm-checkbox">
                                                                <label className="ctm-checkbox-container" htmlFor="fire_protection_regulations_partC">
                                                                    Fire protection regulations part C
                                                                    <input type="checkbox" name="fire_protection_regulations_partC" id="fire_protection_regulations_partC" />
                                                                    <span className="ctm-checkbox-checkmark"></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="form-group formPop-flex small-inputBox">
                                                            <label for="fire_protection_regulations_partC_inspection">Last Inspektion:</label>
                                                            <input type="text" name="fire_protection_regulations_partC_inspection" id="fire_protection_regulations_partC_inspection" />
                                                        </div>
                                                    </div>
                                                    {/* Form List 4 */}
                                                    <div className="form-list-item formPop-flex">
                                                        <div className="text-box-flexwrap set-half-box">
                                                            <div className="ctm-checkbox">
                                                                <label className="ctm-checkbox-container" htmlFor="escape_rescue_plans">
                                                                    Escape & Rescue Plans
                                                                    <input type="checkbox" name="escape_rescue_plans" id="escape_rescue_plans" />
                                                                    <span className="ctm-checkbox-checkmark"></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="form-group formPop-flex small-inputBox">
                                                            <label for="escape_rescue_plans_inspection">Last Inspektion:</label>
                                                            <input type="text" name="escape_rescue_plans_inspection" id="escape_rescue_plans_inspection" />
                                                        </div>
                                                    </div>
                                                    {/* Form List 5 */}
                                                    <div className="form-list-item formPop-flex">
                                                        <div className="text-box-flexwrap ">
                                                            <div className="ctm-checkbox">
                                                                <label className="ctm-checkbox-container" htmlFor="fire_protection_plans">
                                                                    Fire protection plans
                                                                    <input type="checkbox" name="fire_protection_plans" id="fire_protection_plans" />
                                                                    <span className="ctm-checkbox-checkmark"></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="form-group formPop-flex">
                                                            <input type="text" name="fire_protection_plans_inspection" id="fire_protection_plans_inspection" />
                                                        </div>
                                                        <div className="form-group formPop-flex small-inputBox">
                                                            <label for="fire_protection_plans_inspection">Last Inspektion:</label>
                                                            <input type="text" name="fire_protection_plans_inspection" id="fire_protection_plans_inspection" />
                                                        </div>
                                                    </div>
                                                    {/* cmn Block */}
                                                    <div className="form-list-item formPop-flex">
                                                        <div className="form-list-box">
                                                            <h6>Fire safety inspections :</h6>
                                                            <div className="form-group formPop-block">
                                                                <label for="fire_safety_inspection">Most frequent defects:</label>
                                                                <input type="text" name="fire_safety_inspection" id="fire_safety_inspection" />
                                                            </div>
                                                        </div>
                                                        <div className="form-list-box">
                                                            <h6>External fire safety inspections:</h6>
                                                            <div className="form-group formPop-block">
                                                                <label for="authority_inspection">What authority:</label>
                                                                <input type="text" name="authority_inspection" id="authority_inspection" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Events */}
                                            <div className={`formPop-cmn ${page === 5 && 'active'}`} id="events">
                                                <div className="formPop-body">
                                                    {/* Form List 1 */}
                                                    <div className="form-list-item formPop-flex">
                                                        <div className="text-box-flexwrap set-half-box">
                                                            <label for="total_fire_alarms">Total fire alarms :</label>
                                                        </div>
                                                        <div className="form-group formPop-flex">
                                                            <input type="text" name="total_fire_alarms" id="total_fire_alarms" />
                                                        </div>
                                                    </div>
                                                    {/* Form List 2 */}
                                                    <div className="form-list-item formPop-flex">
                                                        <div className="text-box-flexwrap set-half-box">
                                                            <label for="thereof_via_BMA">thereof via BMA:</label>
                                                        </div>
                                                        <div className="form-group formPop-flex">
                                                            <input type="text" name="thereof_via_BMA" id="thereof_via_BMA" />
                                                        </div>
                                                    </div>
                                                    {/* Form List 3 */}
                                                    <div className="form-list-item formPop-flex">
                                                        <div className="text-box-flexwrap set-half-box">
                                                            <label for="thereof_via_emergency_call">thereof via emergency call :</label>
                                                        </div>
                                                        <div className="form-group formPop-flex">
                                                            <input type="text" name="thereof_via_emergency_call" id="thereof_via_emergency_call" />
                                                        </div>
                                                    </div>
                                                    {/* Form List 4 */}
                                                    <div className="form-list-item formPop-flex">
                                                        <div className="text-box-flexwrap set-half-box">
                                                            <label for="of_these_were">Of these were</label>
                                                        </div>
                                                        <div className="form-group formPop-flex">
                                                            <input type="text" name="of_these_were" id="of_these_were" />
                                                        </div>
                                                    </div>
                                                    {/* Form List 5 */}
                                                    <div className="form-list-item formPop-flex">
                                                        <div className="text-box-flexwrap set-half-box">
                                                            <label for="fires">Fires</label>
                                                        </div>
                                                        <div className="form-group formPop-flex">
                                                            <input type="text" name="fires" id="fires" />
                                                        </div>
                                                    </div>
                                                    {/* Form List 6 */}
                                                    <div className="form-list-item formPop-flex">
                                                        <div className="text-box-flexwrap set-half-box">
                                                            <label for="false_alarms">False alarms:</label>
                                                        </div>
                                                        <div className="form-group formPop-flex">
                                                            <input type="text" name="false_alarms" id="false_alarms" />
                                                        </div>
                                                    </div>
                                                    {/* Form List 7 */}
                                                    <div className="form-list-item formPop-flex">
                                                        <div className="text-box-flexwrap set-half-box">
                                                            <label for="fire_Hazardous_Work">Fire Hazardous Work:</label>
                                                        </div>
                                                        <div className="form-group formPop-flex">
                                                            <input type="text" name="fire_Hazardous_Work" id="fire_Hazardous_Work" />
                                                        </div>
                                                    </div>
                                                    {/* cmn Block */}
                                                    <div className="form-list-item formPop-flex">
                                                        <div className="form-list-box">
                                                            <h6>Evacuation exercises:</h6>
                                                            <div className="form-group formPop-block">
                                                                <label for="evacuation_exercises">Most frequent defects:</label>
                                                                <input type="text" name="evacuation_exercises" id="evacuation_exercises" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="formPop-footer">
                                            <div className="btn-group">
                                                <button className="btn cmn_red_bg" onClick={(e) => { setPage((currPage) => currPage - 1) }} disabled={page == 0}>
                                                    <ArrowCircleLeftOutlinedIcon className="prevbtn " color="action" /> Back
                                                </button>
                                                {
                                                    page == 5 ?
                                                        (
                                                            <>
                                                                {/* <Pdf targetRef={pdfRef} filename="code-example.pdf">
                                                                        {({ toPdf }) => <button className="btn cmn_yellow_bg" onClick={hvb(e) => {handleCreatePdf(e); }} >Create PDF{toPdf}</button>}
                                                                </Pdf> */}
                                                                <button className="btn cmn_yellow_bg" onClick={(e) => { handleCreatePdf(e) }} >
                                                                    Create PDF
                                                                </button>
                                                                <button className="btn cmn_yellow_bg" onClick={(e) => { handleCreateWord(e) }} >
                                                                    Create Word
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <button className="btn cmn_yellow_bg" onClick={(e) => { handleNextStep(e) }}>
                                                                Next <ArrowCircleRightOutlinedIcon className="nextbtn " color="action" />
                                                            </button>
                                                        )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    } />
                }
            </div>
        </>
    )
}

export default FireProtection;