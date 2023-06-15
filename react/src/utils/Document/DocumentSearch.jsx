/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";

function DocumentSearch({ universite, dept, ufr, formation, name }) {
    const [listUniversity, setListUniversity] = useState([]);
    const [listUfr, setListUfr] = useState([]);
    const [listDepartement, setListDepartement] = useState([]);
    const [listFormation, setListFormation] = useState([]);

    useEffect(() => {
        getAllUniversity();
        getAllUfr();
        getAllDepartement();
        getAllFormation()
    }, []);

    const getAllUniversity = () => {
        axiosClient
            .get("/university")
            .then((response) => {
                setListUniversity(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getAllUfr = () => {
        axiosClient
            .get("/ufr")
            .then((response) => {
                setListUfr(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getAllDepartement = () => {
        axiosClient
            .get("/departement")
            .then((response) => {
                setListDepartement(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getAllFormation = () => {
        axiosClient
            .get("/formation")
            .then((response) => {
                setListFormation(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="document-search bg-dark shadow rounded-0 text-white py-3">
            <div className="container">
                <h3 className="mb-3">Recherche de documents</h3>
                <div className="row">
                    <div className="col-lg-3 col-md-6 mb-2">
                        <select
                            className="form-select"
                            onChange={(e) => universite(e.target.value)}
                        >
                            <option value="">Université</option>
                            {/* Add options for universities */}
                            {listUniversity.map((item) => (
                                <option value={item.sigle} key={item.id}>
                                    {item.sigle}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-2">
                        <select
                            className="form-select"
                            onChange={(e) => ufr(e.target.value)}
                        >
                            <option value="">UFR</option>
                            {/* Add options for UFRs */}
                            {listUfr.map((item) => (
                                <option value={item.sigle} key={item.id}>
                                    {item.sigle}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-2">
                        <select
                            className="form-select"
                            onChange={(e) => dept(e.target.value)}
                        >
                            <option value="">Département</option>
                            {/* Add options for departments */}
                            {listDepartement.map((item) => (
                                <option value={item.sigle} key={item.id}>
                                    {item.sigle}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-2">
                        <select
                            className="form-select"
                            onChange={(e) => formation(e.target.value)}
                        >
                            <option value="">Formation</option>
                            {/* Add options for licenses */}
                            {listFormation.map((item) => (
                                <option value={item.sigle} key={item.id}>
                                    {item.sigle}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="row custom-input-row">
                    <div className="col-lg-9 col-md-6 mb-2">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Nom du document"
                            onChange={(e) => name(e.target.value)}
                        />
                    </div>
                    <div className="col-lg-3 col-md-6 mb-2">
                        <button
                            className="btn btn-success w-100"
                        >
                            Remettre à Zéro
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DocumentSearch;
