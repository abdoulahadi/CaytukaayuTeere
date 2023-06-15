/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../../../axios-client";
import Pagination from "../../Pagination";


export default function Departement(){
    const [departements, setDepartements]=useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [meta, setMeta] = useState({})
    const [links, setLinks] = useState({})

    useEffect(()=>{
        getDepartements()
    },[currentPage])

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }
    const getDepartements = ()=>{
        axiosClient.get(`/departements?page=${currentPage}`)
        .then(({data})=>{
            console.log(data)
            setDepartements(data.data)
            setMeta(data.meta)
            setLinks(data.links)
        })
        .then((err)=>{
            console.error(err)
        })
    }

    return(
        <div>
            <div style={{display:'flex', justifyContent:'space-between',alignItems:'baseline'}}>
                <h1>Departements</h1>
                <Link to='/admin/departements/new' className="btn-add">Add new</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Sigle</th>
                            <th>Nom</th>
                            <th>Ufr</th>
                            <th>Actions</th>  
                        </tr>
                    </thead>
                    <tbody>
                        {departements.map(u=>(
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.sigle}</td>
                                <td>{u.nom}</td>
                                <td>{u.ufr_sigle}</td>
                                <td>
                                    <Link to={'/admin/departements/'+u.id} className="btn-edit">Edit</Link>
                                    &nbsp;
                                    <button className="btn-delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {meta && <Pagination
        meta={meta}
        links={links}
        onPageChange={handlePageChange}
      />}
        </div>
    );
}