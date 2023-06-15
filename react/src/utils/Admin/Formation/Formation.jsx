/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../../../axios-client";
import Pagination from "../../Pagination";


export default function Formation(){
    const [formations, setFormations]=useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [meta, setMeta] = useState({})
    const [links, setLinks] = useState({})

    useEffect(()=>{
        getFormations()
    },[currentPage])
    const handlePageChange = (page) => {
        setCurrentPage(page)
    }
    const getFormations = ()=>{
        axiosClient.get(`/formations?page=${currentPage}`)
        .then(({data})=>{
            console.log(data)
            setFormations(data.data)
            setMeta(data.meta)
            setLinks(data.links)
        })
        .catch((err)=>{
            console.error(err)
        })
    }

    return(
        <div>
            <div style={{display:'flex', justifyContent:'space-between',alignItems:'baseline'}}>
                <h1>Formations</h1>
                <Link to='/admin/formations/new' className="btn-add">Add new</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Sigle</th>
                            <th>Nom</th>
                            <th>Departement</th>
                            <th>Actions</th>  
                        </tr>
                    </thead>
                    <tbody>
                        {formations.map(u=>(
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.sigle}</td>
                                <td>{u.nom}</td>
                                <td>{u.departement_sigle}</td>
                                <td>
                                    <Link to={'/admin/formations/'+u.id} className="btn-edit">Edit</Link>
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