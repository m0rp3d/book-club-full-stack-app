import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import validation from "./validation";

function SignUpComponent() {
    const navigate = useNavigate();
    const message = "Account created successfully";

    const [account, setAccount] = useState({accountName: "", password: "", email: "",
                                            profileImage: "", role: "member", dateJoined: ""});

    
    const [errors, setErrors] = useState({});
    const [hasErrors, setHasErrors] = useState();

    
    const postURL = "http://localhost:8080/api/account-add";
    const checkAccountExistsURL = `http://localhost:8080/api/check-account/${account.accountName}/${account.email}`;
                                            
    function changeHandler (event) {    
        setAccount({...account, [event.target.name]: event.target.value});
    }

    /*
    useEffect(() => {
        console.log("account: " + account.accountName + "\n" +
                    "password: " + account.password + "\n" +
                    "email: " + account.email + "\n" +
                    "dateJoined: " + account.dateJoined)
    }, [account]);
    */

    
    useEffect(() => {
        console.log("error length is " + Object.keys(errors).length );
        async function settingTheErrors() {
            if(Object.keys(errors).length === 0) {
                await setHasErrors(false);
            } else {
                await setHasErrors(true);
            }
        }
        settingTheErrors();
        
    }, [errors]);

    useEffect(() => {
        console.log("error length is " + Object.keys(errors).length );
        
        settingErrors();
        
        
    }, [errors]);

    async function settingErrors() {
        if(Object.keys(errors).length === 0) {
            await setHasErrors(false);
        } else {
            await setHasErrors(true);
        }
    }
    
    

    async function setDate() {
        let dates= new Date()
        let month = dates.getUTCMonth() + 1
        let day = dates.getUTCDate()
        let year = dates.getUTCFullYear()
        let currentDate = year + "-" + month + "-" + day

        await setAccount({...account, dateJoined: currentDate});
        console.log("date joined: " + account.dateJoined);
    }

    async function checkAccountExist() {
        let doesExistAccount;
        if(account.accountName !== "" && account.email !== "") {
            
            doesExistAccount = await axios.get(checkAccountExistsURL, account).then(response => response.data);
        }
        return doesExistAccount;
        
    }

    

    function postAccount(doesExist) {
        console.log("doesExist after set: " + doesExist + " and doesErrors after set: " + hasErrors);

        if(doesExist === false && hasErrors === false) {
            //axios.post(postURL, account);
            navigate("/success", {state: message}); 
        }
    }
   

    async function setErrorsFunc() {
        await setErrors(validation(account));
        //console.log("error length is " + Object.keys(errors).length );
    }

    function clickPost() {
        navigate("/login")
    }

    function submit(event) {
        event.preventDefault();
        console.log("doesErrors before set: " + hasErrors);
        //setErrors(validation(account));
        setErrorsFunc();

        async function submitFunction() {
            

            //const doesErrors = await checkForErrors();

            await setDate();

            const doesExist = await checkAccountExist();
            //setErrorsFunc();

            //console.log("doesExist after set: " + doesExist + " and doesErrors after set: " + hasErrors);
            
            await postAccount(doesExist);
            
            
            
        }

        submitFunction();  
               
    }

    return (
        <div>
            <h2>Sign Up form</h2>
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
                <div className="form-group">
                    <label>Email</label>
                    <input placeholder="Enter email" name="email" className="form=control"
                    value={account.email} onChange={changeHandler}/>
                </div>
                {errors.email && <p className="error">{errors.email}</p>}
                <button >Submit</button>
            </form>
            <div onClick={() => clickPost()}>Already have an account? Log in</div>
        </div>
    )    
}

export default SignUpComponent;