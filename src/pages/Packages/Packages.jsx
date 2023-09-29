import React, { useState } from 'react';
import './style.css';
import packagesData from "../../demo-data/packagesData";
import { useNavigate } from "react-router-dom";

function Packages() {
    const navigate = useNavigate();
    const [packData, setPackData] = useState(packagesData);
    console.log("packData", packData);

    return (
        <>
            <div className='body-wrap'>
                <div className='ctm-container'>
                    <div className='pack-cmn_heading'>
                        <img src="/assets/images/large-logo.png" alt="Large Logo" />
                        <h2>Our Packages</h2>
                    </div>
                    <div className='packageWrap'>
                        {
                            packData.map((curElem) => (
                                <div className='packageBox' key={curElem.id}>
                                    <div className='packageBoxWrap'>
                                        <h3>{curElem.heading}</h3>
                                        <div className='packagePriceBox'>
                                            <h2 className='price'><span>{curElem.price}</span></h2>
                                            <p className='packagesNote'>{curElem.note}</p>
                                        </div>
                                        <h6 className='packageIncludes'>This Package Includes:</h6>
                                        <ul>
                                            {Object.entries(curElem.points).map(([key, value]) => {
                                                return <li key={key}>{value}</li>;
                                            })}
                                        </ul>
                                        <button className='ctm-btn' onClick={(e) => navigate("/register")}>Book Now</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Packages