import React, { useEffect, useState } from "react";
import "./style.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Link } from "react-router-dom";
import { useJsonToCsv } from "react-json-csv";
//const API = process.env.REACT_APP_API_BASE_URL;
const API = process.env.REACT_APP_API_BASE_URL;

const StyledTableCell = styled(TableCell)(({ theme }) => ({

}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({

}));

function User() {
    const { saveAsCsv } = useJsonToCsv();
    const [userinfo, setUserInfo] = useState([]);
    const getToken = JSON.parse(localStorage.getItem("user-info"));
    const [q, setQ] = useState("");
    const [firma, setfirma] = useState("");
    const [packages, setPackages] = useState("");
    const [searchTerm] = useState(["last_name", "company_name"]);
    const [plans, setPlans] = useState(["All", "Starter", "Professional", "Expert", "Business "]);
    const token = getToken?.token;

    const fields = {
        email: "email",
        first_name: "first_name",
        last_name: "last_name",
        company_name: "company_name",
        status: "status",
    };
    const filename = "user-csv-file";

    useEffect(() => {
        getUserInfo();
    }, []);
    //   get User Info
    const getUserInfo = (data) => {
        return fetch(`${API}/get-user-listing`, {
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
                let reverseTaskList = json;
                setUserInfo(reverseTaskList);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    function search(items) {
        return items
            .filter((item) =>
                Object.values(item).some((val) =>
                    String(val).toLowerCase().includes(q.toLowerCase())
                )
            )
            .filter((item) =>
                Object.values(item).some((val) =>
                    String(val).toLowerCase().includes(firma.toLowerCase())
                )
            )
            .filter((item) =>
                Object.values(item).some((val) =>
                    String(val).toLowerCase().includes(packages.toLowerCase())
                )
            );
    }
    return (
        <>
            <div className="main-body">
                <h2 className="dasshboard_heading">Users</h2>
                <div className="card">
                    <div className="cmn_table">
                        <div className="tableHeading">
                            <h3>User Table</h3>
                            <div className="filter-box">
                                <FilterAltIcon className="filterIcon" color="action" />
                                <div className="filters">
                                    <div className="filter">
                                        <label htmlFor="search-lastname">Search By Nachname</label>
                                        <input
                                            type="text"
                                            placeholder="Search by Nachname"
                                            name="search-lastname"
                                            id="search-lastname"
                                            value={q}
                                            onChange={(e) => setQ(e.target.value)}
                                        />
                                    </div>
                                    <div className="filter">
                                        <label htmlFor="search-Firma">Search By Firma</label>
                                        <input
                                            type="text"
                                            placeholder="Search by Firma"
                                            name="search-Firma"
                                            id="search-Firma"
                                            value={firma}
                                            onChange={(e) => setfirma(e.target.value)}
                                        />
                                    </div>
                                    <div className="filter">
                                        <label htmlFor="search-Firma">Search By Packages</label>
                                        <select
                                            defaultValue=""
                                            onChange={({ target }) => setPackages(target.value)}
                                        >
                                            <option value="">Select an options</option>
                                            {plans.map((item, index) => {
                                                return (
                                                    <option key={index} value={item}>
                                                        {item}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <div>
                                        <button
                                            className="btn cmn_yellow_bg"
                                            disabled={search(userinfo).length === 0}
                                            onClick={() => {
                                                saveAsCsv({ data: search(userinfo), fields, filename });
                                            }}
                                        >
                                            Export to csv
                                        </button>
                                    </div>
                                    {/* <div className='filter'>
                                        <label htmlFor="search-Firma">filter By Paket</label>
                                        <input
                                            type="text"
                                            placeholder="Search by Firma"x
                                            name="search-Firma"
                                            id='search-Firma'
                                            value={q}
                                            onChange={(e) => setQ(e.target.value)}
                                        />
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>KdNr.</StyledTableCell>
                                        <StyledTableCell>Benutzername</StyledTableCell>
                                        <StyledTableCell>Nachname</StyledTableCell>
                                        <StyledTableCell>Firma</StyledTableCell>
                                        <StyledTableCell>Paket</StyledTableCell>
                                        <StyledTableCell>Status</StyledTableCell>
                                        <StyledTableCell align="right"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {search(userinfo).map((row, index) => (
                                        <StyledTableRow key={index + 1}>
                                            <StyledTableCell>{index + 1}</StyledTableCell>
                                            <StyledTableCell>{row.email}</StyledTableCell>
                                            <StyledTableCell>{row.last_name}</StyledTableCell>
                                            <StyledTableCell>{row.company_name}</StyledTableCell>
                                            <StyledTableCell>Started</StyledTableCell>
                                            <StyledTableCell>
                                                {row.status === true ? "Active" : "Deactive"}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                {" "}
                                                <Link
                                                    className="btn cmn_red_bg"
                                                    to={`/user/${row._id}`}
                                                >
                                                    Bearbeiten{" "}
                                                </Link>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </>
    );
}

export default User;
