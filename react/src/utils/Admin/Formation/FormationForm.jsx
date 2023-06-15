/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../../../axios-client";

export default function FormationForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [departements,setDepartements] = useState([]);
    const [formation, setFormation] = useState({
        id: null,
        sigle: "",
        nom: "",
        departement_id:""
    });

    useEffect(() => {
        axiosClient.get('/departements/')
        .then(({data})=>{
            setDepartements(data.data)
        })
        .catch(err => {
            console.log(err)
        })
        if (id!=='new') {
            setLoading(true);
            axiosClient
                .get(`/formations/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setFormation(data.data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, []);
    const handleUniversityChange = (event) => {
        setFormation({...formation,departement_id:event.target.value});
    };
    const onSubmit = (ev) => {
        ev.preventDefault();
        console.log(formation)
        if (formation.id) {
            axiosClient
                .put(`/formations/${formation.id}`, formation)
                .then(() => {
                    navigate("/admin");
                })
                .catch((err) => {
                    const response = err.response;

                    console.log(err);
                    if (response && response.status === 422) {
                        console.log(response.data.errors);
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post(`/formations`, formation)
                .then(() => {
                    navigate("/admin");
                })
                .catch((err) => {
                    const response = err.response;

                    console.log(err);
                    if (response && response.status === 422) {
                        console.log(response.data.errors);
                        setErrors(response.data.errors);
                    }
                });
        }
    };
    return (
        <>
            {formation.id && <h1>Update User : {formation.sigle}</h1>}
            {!formation.id && <h1>New User</h1>}

            <div className="card animated fadeInDown">
                {loading && <div className="text-center">Loading...</div>}
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {!loading && (
                    <form onSubmit={onSubmit} className="row">
                        <input
                            value={formation.sigle}
                            onChange={(ev) =>
                                setFormation({ ...formation, sigle: ev.target.value })
                            }
                            type="text"
                            placeholder="Sigle"
                        />
                        <input
                            value={formation.nom}
                            onChange={(ev) =>
                                setFormation({ ...formation, nom: ev.target.value })
                            }
                            type="text"
                            placeholder="Nom"
                        />
                        <select
                                id="university"
                                name="university"
                                className="form-control"
                                value={formation.departement_id}
                                onChange={handleUniversityChange}
                            >
                                <option value="">
                                    Sélectionner une université
                                </option>
                                {departements.map((item) => (
                                    <option value={item.id} key={item.id}>
                                        {item.sigle}
                                    </option>
                                ))}
                            </select>
&nbsp;
                        <button className="btn">Enregistrer</button>
                    </form>
                )}
            </div>
        </>
    );
}
