import { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import RoleContext from '../context/role-context';
import React, {useContext} from 'react';
import AuthContext from "../context/login-context";

function LoggedOutComponent() {
    const navigate = useNavigate();
    const {accountId, setAccountId} = useContext(AuthContext);
    const {role, setRole} = useContext(RoleContext);
  
    useEffect(() => {
        setAccountId(0);
        setRole("");
    }, []);

    function goHome() {

        navigate("/");
    }

    return ( 
        <div>
            <h2>Success</h2>
            <div>Logged out successfully</div>
            <button onClick={goHome}>Back to home page</button>
        </div>
    ) 
}

export default LoggedOutComponent;