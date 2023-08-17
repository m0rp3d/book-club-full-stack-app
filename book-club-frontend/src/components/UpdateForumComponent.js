import {useLocation, useNavigate} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import forumValidation from "./forum-validation";

function UpdateForumComponent() {
    const location = useLocation();
    const navigate = useNavigate();
    const id = location.state;
    const message = "Forum updated successfully";
    const [errors, setErrors] = useState({});
    const [forum, setForum] = useState({bookName: "",
                                        bookImage: "",
                                        description: ""});

    const getUrl = `http://localhost:8080/api/get-forum/${id}`;

    function errorChecker() {
        if(!forum.bookName) {
            return false;
        } else if (!/^[a-zA-Z0-9-_ ]+$/.test(forum.bookName)) {
            return false;
        } else if(!forum.bookImage) {
            return false;
        } else if(!forum.description) {
            errors.description = "Description is required";
        } 
        return true;
    }

    async function postForumUpdate(doesErrors) {

        if(doesErrors === true) {
            axios.put(`http://localhost:8080/api/forum-update/${id}`, forum);
            navigate("/success", {state: message}); 
        }
    }

    function submit(event) {
        event.preventDefault();

        //axios.put(`http://localhost:8080/api/forum-update/${id}`, forum);
        //navigate("/success", {state: message}); 

        async function submitForm() {
            const doesErrors = await errorChecker();

            postForumUpdate(doesErrors);
        }
        submitForm();
        setErrors(forumValidation(forum));

    }

    useEffect(() => {
        async function setData() {
            const request = await axios.get(getUrl);
            console.log(request.data);
            setForum(request.data);
            return request;
        }
        setData();
    }, [getUrl]);

    function changeHandler (event) {    
        setForum({...forum, [event.target.name]: event.target.value});
    }

    return ( 
        <div>
            <div className="container">
                <h2>Update Forum</h2>
                
                <form onSubmit={(event) => submit(event)}>
                <div className="form-group">
                        <label>Book Name</label>
                        <input placeholder="Book name here" name="bookName" className="form=control"
                            value={forum.bookName} onChange={changeHandler}/>
                    </div>
                    {errors.bookName && <p className="error">{errors.bookName}</p>}
                    <div className="form-group">
                        <label>Book Image</label>
                        <input placeholder="Book image here" name="bookImage" className="form=control"
                            value={forum.bookImage} onChange={changeHandler}/>
                    </div>
                    {errors.bookImage && <p className="error">{errors.bookImage}</p>}
                    <div className="form-group">
                        <label>Description</label>
                        <input placeholder="Description here" name="description" className="form=control"
                            value={forum.description} onChange={changeHandler}/>
                    </div>
                    {errors.description && <p className="error">{errors.description}</p>}
                    <button>Update</button>
                </form>
            </div>
        </div>
    ) 
}

export default UpdateForumComponent;