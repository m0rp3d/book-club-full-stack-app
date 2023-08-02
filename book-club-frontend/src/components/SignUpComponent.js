import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function SignUpComponent() {
    const navigate = useNavigate();
    const message = "Account created successfully";

    const [account, setAccount] = useState({accountName: "", password: "", email: "",
                                            profileImage: "", role: "member", dateJoined: ""});

    //const [doesExist, setDoesExist] = useState();
    
    const [errors, setErrors] = useState({});
    
    const postURL = "http://localhost:8080/api/account-add";
    const checkAccountExistsURL = `http://localhost:8080/api/check-account/${account.accountName}/${account.email}`;
                                            
    function changeHandler (event) {    
        setAccount({...account, [event.target.name]: event.target.value});
    }

    useEffect(() => {
        console.log("account: " + account.accountName + "\n" +
                    "password: " + account.password + "\n" +
                    "email: " + account.email + "\n" +
                    "dateJoined: " + account.dateJoined)
    }, [account]);



    function clickPost() {
        navigate("/login")
    }

    function submit(event) {
        event.preventDefault();

        let dates= new Date()
        let month = dates.getUTCMonth() + 1
        let day = dates.getUTCDate()
        let year = dates.getUTCFullYear()
        let currentDate = year + "-" + month + "-" + day



        setAccount({...account, dateJoined: currentDate});
        console.log("date joined: " + account.dateJoined);
        
        // response.data used to get value from promise
        // only call axios.get if http url can be filled
        
        if(account.accountName !== "" && account.email !== "") {
            
            axios.get(checkAccountExistsURL, account).then(response => {
            
                console.log("does account exist: " + response.data);
                
            });
        }
        

        /*
        if(doesExist === false) {
            console.log("works");
        }
        */

        /*
        if(response.data === false) {
            console.log("account doesn't exist");

            axios.post(postURL, account).then(navigate("/success", {state: message}));

            //axios.post(postURL, account);
            
        } else {
            
            console.log("account does exist")
        }

        */



        
        /*
        async function doesAccountExist() {
            let doesExist = await axios.get(checkAccountExistsURL, account);
            finalExist = doesExist;
        }
        */
        //console.log("does account exists: " + doesExist);

        

        axios.post(postURL, account);
        navigate("/success", {state: message}); 
             
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
                <div className="form-group">
                    <label>Password</label>
                    <input placeholder="Enter password" name="password" className="form=control"
                    value={account.password} onChange={changeHandler}/>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input placeholder="Enter email" name="email" className="form=control"
                    value={account.email} onChange={changeHandler}/>
                </div>
                <button>Submit</button>
            </form>
            <div onClick={() => clickPost()}>Already have an account? Log in</div>
        </div>
    )    
}

export default SignUpComponent;