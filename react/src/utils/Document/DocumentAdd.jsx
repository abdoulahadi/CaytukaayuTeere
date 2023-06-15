/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axiosClient from "./../../../axios-client";
import { useNavigate, useOutletContext } from "react-router-dom";
import { listNiveau } from "../../constant";

const AddDocument = () => {
    const [user, setUser] = useOutletContext();
    const [university, setUniversity] = useState("");
    const [ufr, setUfr] = useState("");
    const [department, setDepartment] = useState("");
    const [formation, setFormation] = useState("");
    const [level, setLevel] = useState("");
    const [nature, setNature] = useState("");
    const [module, setModule] = useState("");
    const [year, setYear] = useState("");
    const [errors, setErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [listUniversity, setListUniversity] = useState([]);
    const [listUfr, setListUfr] = useState([]);
    const [listDepartement, setListDepartement] = useState([]);
    const [listFormation, setListFormation] = useState([]);


    useEffect(() => {
        axiosClient
            .get("/university")
            .then((response) => {
                setListUniversity(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const getAllUfrsByUniveristyId = (id_university) => {
        axiosClient
            .get(`/ufr/${id_university}`)
            .then((response) => {
                setListUfr(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getAllDepartementsByUfrId = (id_ufr) => {
        axiosClient
            .get(`/departement/${id_ufr}`)
            .then((response) => {
                setListDepartement(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getAllFormationByDepartementId = (id_departement) => {
        axiosClient
            .get(`/formation/${id_departement}`)
            .then((response) => {
                setListFormation(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const listNature = [
        "TD",
        "TP",
        "CM",
        "Devoir",
        "Examen",
        "Correction TD",
        "Correction TP",
        "Correction Devoir",
        "Correction Examen",
        "Rapport Stage",
        "Mémoire de fin de cycle",
    ];

    const handleUniversityChange = (event) => {
        setUniversity(event.target.value);
        if (event.target.value !== "") {
            getAllUfrsByUniveristyId(event.target.value);
        }
    };

    const handleUfrChange = (event) => {
        setUfr(event.target.value);
        if (event.target.value !== "") {
            getAllDepartementsByUfrId(event.target.value);
        }
    };

    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
        if (event.target.value !== "") {
            getAllFormationByDepartementId(event.target.value);
        }
    };

    const handleLicenseChange = (event) => {
        setFormation(event.target.value);
    };

    const handleLevelChange = (event) => {
        setLevel(event.target.value);
    };
    const handleNatureChange = (event) => {
        setNature(event.target.value);
    };

    const handleModuleChange = (event) => {
        setModule(event.target.value);
    };

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    const handleSubmit = (event) => {
        console.log(user);
        setIsLoading(true);
        event.preventDefault();
        // Envoyer les données du formulaire au backend ou effectuer une action supplémentaire
        const form = new FormData(event.target);
        form.append("user_id", user.id);
        axiosClient
            .post("/document", form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(({ response }) => {
                // Réinitialiser les champs du formulaire
                // setUniversity("");
                // setUfr("");
                // setDepartment("");
                // setFormation("");
                // setLevel("");
                // setModule("");
                // setYear("");
                // form.reset();
                setIsLoading(false);
                navigate("/document");
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                    setErrors(response.data.errors);
                }
                setIsLoading(false);
            });
    };

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h2>Ajouter un document</h2>
                    {errors && (
                        <div className="alert">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="form-group">
                            <label htmlFor="university">Université</label>
                            <select
                                id="university"
                                name="university"
                                className="form-control"
                                value={university}
                                onChange={handleUniversityChange}
                            >
                                <option value="">
                                    Sélectionner une université
                                </option>
                                {listUniversity.map((item) => (
                                    <option value={item.id} key={item.id}>
                                        {item.sigle}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ufr">UFR</label>
                            <select
                                id="ufr"
                                name="ufr"
                                className="form-control"
                                value={ufr}
                                onChange={handleUfrChange}
                                disabled={!university}
                            >
                                <option value="">Sélectionner un UFR</option>
                                {listUfr.map((item) => (
                                    <option value={item.id} key={item.id}>
                                        {item.sigle}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="departement">Département</label>
                            <select
                                id="departement"
                                name="departement"
                                className="form-control"
                                value={department}
                                onChange={handleDepartmentChange}
                                disabled={!ufr}
                            >
                                <option value="">
                                    Sélectionner un département
                                </option>
                                {/* Ajouter les options de département en fonction de l'UFR sélectionné */}
                                {listDepartement.map((item) => (
                                    <option value={item.id} key={item.id}>
                                        {item.sigle}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="formation">Formation</label>
                            <select
                                id="formation"
                                name="formation"
                                className="form-control"
                                value={formation}
                                onChange={handleLicenseChange}
                                disabled={!department}
                            >
                                <option value="">
                                    Sélectionner une formation
                                </option>
                                {/* Ajouter les options de formation en fonction du département sélectionné */}
                                {listFormation.map((item) => (
                                    <option value={item.id} key={item.id}>
                                        {item.sigle}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group mt-4 mb-4">
                            <div className="input-group">
                                <input
                                    type="file"
                                    className="form-control m-0"
                                    id="document"
                                    name="document"
                                />
                                <label
                                    className="input-group-text m-0"
                                    htmlFor="document"
                                >
                                    Upload
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="niveau">Niveau</label>
                            <select
                                type="text"
                                className="form-control"
                                id="niveau"
                                name="niveau"
                                value={level}
                                onChange={handleLevelChange}
                            >
                                <option value="">Sélectionner un Niveau</option>
                                {listNiveau.map((item) => (
                                    <option value={item} key={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="nature">Nature</label>
                            <select
                                type="text"
                                className="form-control"
                                id="nature"
                                name="nature"
                                value={nature}
                                onChange={handleNatureChange}
                            >
                                <option value="">Sélectionner un Nature</option>
                                {listNature.map((item) => (
                                    <option value={item} key={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="module">Module</label>
                            <input
                                type="text"
                                className="form-control"
                                id="module"
                                name="module"
                                value={module}
                                onChange={handleModuleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="annee">Année</label>
                            <input
                                type="text"
                                className="form-control"
                                id="annee"
                                name="annee"
                                value={year}
                                onChange={handleYearChange}
                            />
                        </div>
                        <div className="row">
                            <button type="submit" className="btn btn-primary">
                                {isLoading ? (
                                    <span
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                ) : null}
                                <span>Ajouter</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddDocument;
