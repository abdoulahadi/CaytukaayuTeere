/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import DocumentList from "../utils/Document/DocumentList";
import DocumentSearch from "../utils/Document/DocumentSearch";
import axiosClient from "../../axios-client";
import DocumentPlaceholder from "./../utils/Document/DocumentPlaceholder";
import Pagination from "../utils/Pagination";

export default function Document() {
    const [listDocument, setListDocument] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [meta, setMeta] = useState({});
    const [links, setLinks] = useState({});
    const [data, setData] = useState({
        nom_document: null,
        nom_universite: null,
        nom_ufr: null,
        nom_departement: null,
        nom_licence: null,
    });

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleUniversityChange = (universite) => {
        const val = universite==='' ? null : universite
        setData(Object.assign({}, data, { nom_universite: val }));
    };
    const handleUfrChange = (ufr) => {
        const val = ufr==='' ? null : ufr
        setData(Object.assign({}, data, { nom_ufr: val }));
    };
    const handleDeptChange = (dept) => {
        const val = dept==='' ? null : dept
        setData(Object.assign({}, data, { nom_departement: val }));
    };
    const handleformationChange = (formation) => {
        const val = formation==='' ? null : formation
        setData(Object.assign({}, data, { nom_licence: val }));
    };
    const handleNameChange = (name) => {
        const val = name==='' ? null : name
        setData(Object.assign({}, data, { nom_document: val }));
    };

    useEffect(() => {
        setIsLoading(true);
        const form = new FormData();

        console.log(data);
        axiosClient
            .get(`/document/search?page=${currentPage}`, {
                params: {
                    nom_document: data.nom_document,
                    nom_universite: data.nom_universite,
                    nom_ufr: data.nom_ufr,
                    nom_departement: data.nom_departement,
                    nom_licence: data.nom_licence,
                },
            })
            .then(({ data }) => {
                setIsLoading(false);
                setListDocument(data.data);
                setMeta({
                    current_page: data.current_page,
                    last_page: data.last_page,
                });
                setLinks({
                    first: data.first_page_url,
                    last: data.last_page_url,
                    prev: data.prev_page_url,
                    next: data.next_page_url,
                });
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error);
            });
    }, [currentPage, data]);

    return (
        <div>
            <div className="row m-0 p-0">
                <div className="col-12 m-0 p-0">
                    <DocumentSearch
                        universite={handleUniversityChange}
                        dept={handleDeptChange}
                        ufr={handleUfrChange}
                        formation={handleformationChange}
                        name={handleNameChange}
                    />
                </div>
            </div>
            <div className="container align-center">
                <div className="row mt-4">
                    {meta && (
                        <Pagination
                            meta={meta}
                            links={links}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
                {!isLoading && (
                    <DocumentList
                        listDocument={listDocument}
                        action="download"
                    />
                )}
                {isLoading && (
                    <div className="row justify-content-center">
                        <DocumentPlaceholder />
                        <DocumentPlaceholder />
                        <DocumentPlaceholder />
                        <DocumentPlaceholder />
                    </div>
                )}

                {!isLoading && listDocument.length === 0 ? (
                    <span className="h1 p-4 align-item-center">
                        Il n&#39;y a pas de document à afficher
                    </span>
                ) : null}
            </div>
        </div>
    );
}
