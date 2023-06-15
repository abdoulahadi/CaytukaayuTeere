import { useEffect, useState } from "react";
import DocumentsChart from "../../Document/DocumentsChart";
import axiosClient from "../../../../axios-client";

export default function Dashboard() {
    const [universiteCount, setUniversiteCount] = useState(null);
    const [ufrCount, setUfrCount] = useState(null);
    const [deptCount, setDeptCount] = useState(null);
    const [formationCount, setFormationCount] = useState(null);

    useEffect(() => {
        getCountUniversity();
        getCountUfr();
        getCountDepartement();
        getCountFormation()
    }, []);

    const getCountUniversity = () => {
        axiosClient
            .get("/university/count")
            .then((response) => {
                setUniversiteCount(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getCountUfr = () => {
        axiosClient
            .get("/ufr/count")
            .then((response) => {
                setUfrCount(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getCountDepartement = () => {
        axiosClient
            .get("/departement/count")
            .then((response) => {
                setDeptCount(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getCountFormation = () => {
        axiosClient
            .get("/formation/count")
            .then((response) => {
                setFormationCount(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <>
            <div className="mb-4">
                <h1>Dashboard</h1>
            </div>
            <div className="row d-flex justify-content-around mb-4 animated fadeInDown">
                <div className="col-lg-2 col-md-6 shadow bg-success pt-1 mb-1">
                    <div className="row bg-light">
                        <span className="h4 d-flex justify-content-center">
                            Université
                        </span>
                        <span className="h1 d-flex justify-content-center">
                            {universiteCount}
                        </span>
                    </div>
                </div>

                <div className="col-lg-2 col-md-6 shadow bg-warning pt-1 mb-1">
                    <div className="row bg-light">
                        <span className="h4 d-flex justify-content-center">
                            Département
                        </span>
                        <span className="h1 d-flex justify-content-center">
                            {deptCount}
                        </span>
                    </div>
                </div>
                <div className="col-lg-2 col-md-6 shadow bg-info pt-1 mb-1">
                    <div className="row bg-light">
                        <span className="h4 d-flex justify-content-center">
                            Ufr
                        </span>
                        <span className="h1 d-flex justify-content-center">
                            {ufrCount}
                        </span>
                    </div>
                </div>
                <div className="col-lg-2 col-md-6 shadow bg-danger pt-1 mb-1">
                    <div className="row bg-light">
                        <span className="h4 d-flex justify-content-center">
                            Formation
                        </span>
                        <span className="h1 d-flex justify-content-center">
                            {formationCount}
                        </span>
                    </div>
                </div>
            </div>
            <div className="row d-flex justify-content-around mb-4  animated fadeInDown">
                <div className="col-md-5">
                    <span className="h4 d-flex justify-content-center">
                        Figure Concernant ..............
                    </span>
                    <DocumentsChart />
                </div>
                <div className="col-md-5">
                    <span className="h4 d-flex justify-content-center">
                        Figure Concernant ..............
                    </span>
                    <DocumentsChart />
                </div>
            </div>
        </>
    );
}
