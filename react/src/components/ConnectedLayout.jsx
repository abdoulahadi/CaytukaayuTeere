/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../../axios-client";

export default function ConnectedLayout(){
    const {user, token,setUser,setToken} = useStateContext();
    
    useEffect(()=>{
        axiosClient.get('/user')
        .then(({data})=>{
            setUser(data)
        })
    },[])

    if(!token){
        return <Navigate to="/login"/>
    }

    const onLogout = (ev)=>{
        ev.preventDefault();

        axiosClient.post('/logout')
        .then(()=>{
            setUser({});
            setToken(null);
        })
    }
    return(
        <>
        <Outlet context={[user,setUser,onLogout]}/>
        </>
    );
}
