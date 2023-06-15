/* eslint-disable react-hooks/exhaustive-deps */
import {Outlet, useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import axiosClient from "../../axios-client";
import Header from './../utils/Header';

export default function DefaultLayout(){
    
    const [user, setUser,onLogout] = useOutletContext();
    
    useEffect(()=>{
        axiosClient.get('/user')
        .then(({data})=>{
            setUser(data)
        })
    },[])
    return(
        <div>
        <Header user={user} onLogout={onLogout}/>
        <Outlet context={[user,setUser]}/>
        </div>
    );
}
