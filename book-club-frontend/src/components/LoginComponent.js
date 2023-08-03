import React, {useState, useEffect, useContext} from 'react';
import AuthContext from "../context/login-context";
import validation from "./validation";
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function LoginComponent() {

    const [account, setAccount] = useState({accountName: "", password: "", email: "",
                                            profileImage: "", role: "member", dateJoined: ""});
    
    const [errors, setErrors] = useState({});

    const [loginCredentials, setLoginCredentials] = useState("");

    const message = "Logged in successfully";
    
    const navigate = useNavigate();

    const checkLoginExist = `http://localhost:8080/api/check-login/${account.accountName}/${account.password}`;

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


    function submit(event) {
        event.preventDefault();
        setLoginCredentials("");
        async function helperFunc() {
        
        const doesLoginExist = await checkLoginFunction();

        console.log(doesLoginExist);

        if(doesLoginExist === true) {
            // where we will add code for logging in account
            navigate("/success", {state: message});
        } else {
            setLoginCredentials("Wrong login credentials");
        }

        }
        helperFunc();
        //navigate("/success", {state: message}); 
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