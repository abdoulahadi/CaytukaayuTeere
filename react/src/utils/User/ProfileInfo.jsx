/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { API_URL_IMAGE, listNiveau } from "../../constant";
import axiosClient from "../../../axios-client";

const ProfileInfo = () => {
    const [user, setUser] = useOutletContext();
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [level, setLevel] = useState("");

    useEffect(() => {
        setUsername(user.username);
        setFirstName(user.firstname);
        setLastName(user.lastname);
        setEmail(user.email);
        setLevel(user.niveau);
        console.log("ok");
    }, [user]);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleLevelChange = (event) => {
        setLevel(event.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault(); // Prevent

        const form = new FormData(e.target)
          axiosClient.post(`/users_edit/${user.id}`,form,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((response)=>{
            setUser(response.data)
        })
        .catch((err)=>{
            console.error(err)
        })
    };

    return (
        <div className="container">
            <div className="card">
                    <div className="card-body">
                <form onSubmit={onSubmit}>
                <input type="hidden" name="_method" value="PUT"/>

                        <div className="row">
                            <div className="col-md-4">
                                <img
                                    className="profile-image"
                                    src={API_URL_IMAGE + user.image}
                                    alt="Profile"
                                />
                                <div className="input-group mb-0">
                                    <input
                                        type="file"
                                        name="image"
                                        className="form-control m-0"
                                        id="inputGroupFile02"
                                    />
                                    <label
                                        className="input-group-text m-0"
                                        htmlFor="inputGroupFile02"
                                    >
                                        Upload
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <p>
                                    <strong>Username:</strong>{" "}
                                    <input
                                        type="text"
                                        name="username"
                                        value={username || ""}
                                        onChange={handleUsernameChange}
                                    />
                                </p>
                                <p>
                                    <strong>First Name:</strong>{" "}
                                    <input
                                        type="text"
                                        value={firstName || ""}
                                        name="firstname"
                                        onChange={handleFirstNameChange}
                                    />
                                </p>
                                <p>
                                    <strong>Last Name:</strong>{" "}
                                    <input
                                        type="text"
                                        value={lastName || ""}
                                        name="lastname"
                                        onChange={handleLastNameChange}
                                    />
                                </p>
                                <p>
                                    <strong>Email:</strong>{" "}
                                    <input
                                        type="email"
                                        value={email || ""}
                                        name="email"
                                        onChange={handleEmailChange}
                                    />
                                </p>
                                <p>
                                    <strong>Niveau:</strong>{" "}
                                    <select
                                        className="form-select"
                                        value={level || ""}
                                        name="niveau"
                                        onChange={handleLevelChange}
                                    >
                                        <option value="">
                                            Sélectionner un Niveau
                                        </option>
                                        {listNiveau.map((item) => (
                                            <option value={item} key={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                </p>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <input type="submit" className="btn btn-block" value='Enregistrer'/>
                        </div>
                </form>
                    </div>
            </div>
        </div>
    );
};

export default ProfileInfo;
