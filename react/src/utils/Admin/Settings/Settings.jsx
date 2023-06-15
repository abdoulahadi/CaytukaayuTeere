/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {  useOutletContext } from "react-router-dom";
import axiosClient from "../../../../axios-client";
import ProfileInfo from "../../User/ProfileInfo";
import DocumentList from "../../Document/DocumentList";

export default function Settings() {
    const [listDocument, setListDocument] = useState([]);
    const [user] = useOutletContext();

    useEffect(()=>{
        if(user.id){
            axiosClient.get(`/document/${user.id}`)
            .then(response => {
                setListDocument(response.data)
            })
            .catch(error => {
              console.log(error)
            })
        }
    },[user])

    return (
        <div>
            <div className="row m-0 p-0">
                <div className="col-12 m-0 p-0">
                    <ProfileInfo />
                </div>
            </div>

            {/* <div className="container">
            <div className="card">
                <div className="card-header">
                    <div className="row">

                <span id="titre_blog_document">MES DOCUMENTS</span>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row">
                        <DocumentList listDocument={listDocument} action='delete'/>
                    </div>
                </div>
            </div>
            </div> */}
        </div>
    );
}
