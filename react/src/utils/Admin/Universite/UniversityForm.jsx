/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../../../axios-client";

export default function UniversityForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [university, setUniversity] = useState({
        id: null,
        sigle: "",
        nom: "",
    });

    useEffect(() => {
        if (id!=='new') {
            setLoading(true);
            axiosClient
                .get(`/universities/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setUniversity(data.data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, []);

    const onSubmit = (ev) => {
        ev.preventDefault();

        if (university.id) {
            axiosClient
                .put(`/universities/${university.id}`, university)
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
                .post(`/universities`, university)
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
            {university.id && <h1>Update User : {university.sigle}</h1>}
            {!university.id && <h1>New User</h1>}

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
                            value={university.sigle}
                            onChange={(ev) =>
                                setUniversity({ ...university, sigle: ev.target.value })
                            }
                            type="text"
                            placeholder="Sigle"
                        />
                        <input
                            value={university.nom}
                            onChange={(ev) =>
                                setUniversity({ ...university, nom: ev.target.value })
                            }
                            type="text"
                            placeholder="Nom"
                        />
                        <button className="btn">Enregistrer</button>
                    </form>
                )}
            </div>
        </>
    );
}
