/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../../../axios-client";
import Pagination from "../../Pagination";


export default function User(){
    const [users, setUsers]=useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [meta, setMeta] = useState({})
    const [links, setLinks] = useState({})

    useEffect(()=>{
        getUsers()
    },[currentPage])
const handlePageChange = (page) => {
        setCurrentPage(page)
    }
    const getUsers = ()=>{
        axiosClient.get(`/users?page=${currentPage}`)
        .then(({data})=>{
            console.log(data)
            setUsers(data.data)
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
                <h1>Users</h1>
                <Link to='/admin/users/new' className="btn-add">Add new</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Actions</th>  
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u=>(
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.username}</td>
                                <td>{u.email}</td>
                                <td>
                                    <Link to={'/admin/users/'+u.id} className="btn-edit">Edit</Link>
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