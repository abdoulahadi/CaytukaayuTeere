/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../../../axios-client";

export default function UfrForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [universities,setUniversities] = useState([]);
    const [ufr, setUfr] = useState({
        id: null,
        sigle: "",
        nom: "",
        universite_id:""
    });

    useEffect(() => {
        axiosClient.get('/universities')
        .then(({data})=>{
            setUniversities(data.data)
        })
        .catch(err => {
            console.log(err)
        })
        if (id!=='new') {
            setLoading(true);
            axiosClient
                .get(`/ufrs/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setUfr(data.data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, []);
    const handleUniversityChange = (event) => {
        setUfr({...ufr,universite_id:event.target.value});
    };
    const onSubmit = (ev) => {
        ev.preventDefault();
        console.log(ufr)
        if (ufr.id) {
            axiosClient
                .put(`/ufrs/${ufr.id}`, ufr)
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
                .post(`/ufrs`, ufr)
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
            {ufr.id && <h1>Update User : {ufr.sigle}</h1>}
            {!ufr.id && <h1>New User</h1>}

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
                            value={ufr.sigle}
                            onChange={(ev) =>
                                setUfr({ ...ufr, sigle: ev.target.value })
                            }
                            type="text"
                            placeholder="Sigle"
                        />
                        <input
                            value={ufr.nom}
                            onChange={(ev) =>
                                setUfr({ ...ufr, nom: ev.target.value })
                            }
                            type="text"
                            placeholder="Nom"
                        />
                        <select
                                id="university"
                                name="university"
                                className="form-control"
                                value={ufr.universite_id}
                                onChange={handleUniversityChange}
                            >
                                <option value="">
                                    Sélectionner une université
                                </option>
                                {universities.map((item) => (
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
