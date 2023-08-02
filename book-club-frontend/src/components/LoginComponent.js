import React, {useState, useEffect, useContext} from 'react';
import AuthContext from "../context/login-context";
import validation from "./validation";

function LoginComponent() {

    const [account, setAccount] = useState({accountName: "", password: "", email: "",
                                            profileImage: "", role: "member", dateJoined: ""});
    
    const [errors, setErrors] = useState({});

    function changeHandler (event) {    
        setAccount({...account, [event.target.name]: event.target.value});
    }

    function submit(event) {
        event.preventDefault();
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
            </form>    
        </div>
    )    
}

export default LoginComponent;