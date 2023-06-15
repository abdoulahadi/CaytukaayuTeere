/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../../../axios-client";

export default function DepartementForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [ufrs,setUfrs] = useState([]);
    const [departement, setDepartement] = useState({
        id: null,
        sigle: "",
        nom: "",
        ufr_id:""
    });

    useEffect(() => {
        axiosClient.get('/ufrs')
        .then(({data})=>{
            setUfrs(data.data)
        })
        .catch(err => {
            console.log(err)
        })
        if (id!=='new') {
            setLoading(true);
            axiosClient
                .get(`/departements/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setDepartement(data.data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, []);
    const handleUniversityChange = (event) => {
        setDepartement({...departement,ufr_id:event.target.value});
    };
    const onSubmit = (ev) => {
        ev.preventDefault();
        console.log(departement)
        if (departement.id) {
            axiosClient
                .put(`/departements/${departement.id}`, departement)
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
                .post(`/departements`, departement)
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
            {departement.id && <h1>Update User : {departement.sigle}</h1>}
            {!departement.id && <h1>New User</h1>}

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
                            value={departement.sigle}
                            onChange={(ev) =>
                                setDepartement({ ...departement, sigle: ev.target.value })
                            }
                            type="text"
                            placeholder="Sigle"
                        />
                        <input
                            value={departement.nom}
                            onChange={(ev) =>
                                setDepartement({ ...departement, nom: ev.target.value })
                            }
                            type="text"
                            placeholder="Nom"
                        />
                        <select
                                id="university"
                                name="university"
                                className="form-control"
                                value={departement.ufr_id}
                                onChange={handleUniversityChange}
                            >
                                <option value="">
                                    Sélectionner une université
                                </option>
                                {ufrs.map((item) => (
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
