import React, {useState, useEffect, useContext} from 'react';
import AuthContext from "../context/login-context";
import validation from "./validation";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import RoleContext from '../context/role-context';

function LoginComponent() {
    const {accountId, setAccountId} = useContext(AuthContext);
    const {role, setRole} = useContext(RoleContext);

    const [account, setAccount] = useState({accountName: "", password: "", email: "",
                                            profileImage: "", role: "member", dateJoined: ""});
    
    const [errors, setErrors] = useState({});

    const [loginCredentials, setLoginCredentials] = useState("");

    const message = "Logged in successfully";
    
    const navigate = useNavigate();

    const checkLoginExist = `http://localhost:8080/api/check-login/${account.accountName}/${account.password}`;
    const getIdAccount = `http://localhost:8080/api/get-id/${account.accountName}/${account.password}`;
    const getRoleAccount = `http://localhost:8080/api/get-role/${account.accountName}/${account.password}`;

    useEffect(() => {
        console.log("accountId is now set to " + accountId)
    }, [accountId]);

    useEffect(() => {
        console.log("role is now set to " + role)
    }, [role]);

    function changeHandler (event) {    
        setAccount({...account, [event.target.name]: event.target.value});
    }

    async function checkLoginFunction() {
        let loginExist;

        if(account.accountName !== "" && account.password !== "") {
            loginExist = await axios.get(checkLoginExist, account).then(response => response.data);
            console.log(loginExist);
        }
        
        return loginExist;
    }

    async function getAccountIDUsingAccountNameAndPassword() {

        let tempId;
        tempId = await axios.get(getIdAccount, account).then(response => response.data);

        return tempId;

    }

    async function getRoleUsingAccountNameAndPassword() {
        let tempRole;
        tempRole = await axios.get(getRoleAccount, account).then(response => response.data);

        return tempRole;

    }


    function submit(event) {
        event.preventDefault();

        //console.log("before value assigned, accountId is " + accountId);

        setLoginCredentials("");
        
        async function helperFunc() {
        
            const doesLoginExist = await checkLoginFunction();


            if(doesLoginExist === true) {

                let confirmId = await getAccountIDUsingAccountNameAndPassword();
                console.log("confirm id is " + confirmId);
                
                let confirmRole = await getRoleUsingAccountNameAndPassword();

                await setAccountId(confirmId);
                await setRole(confirmRole);
                navigate("/success", {state: message});
            } else {
                setLoginCredentials("Wrong login credentials");
            }

        }
        helperFunc();
        setErrors(validation(account));

    }

    return (
        <div>
            <h2>Login form</h2>
            <form onSubmit={(event) => submit(event)}>
                <div className="form-group">
                    <label>Account Name</label>
                    <input placeholder="Enter account name" name="accountName" className="form=control"
                    value={account.accountName} onChange={changeHandler}/>
                </div>
                {errors.accountName && <p className="error">{errors.accountName}</p>}
                <div className="form-group">
                    <label>Password</label>
                    <input placeholder="Enter password" name="password" className="form=control"
                    value={account.password} onChange={changeHandler}/>
                </div>
                {errors.password && <p className="error">{errors.password}</p>}
                <button>Submit</button>
                <p>{loginCredentials}</p>
            </form>    
        </div>
    )    
}

export default LoginComponent;