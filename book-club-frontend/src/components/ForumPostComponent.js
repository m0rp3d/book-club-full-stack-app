import {useNavigate} from "react-router-dom";
import React, {useState} from 'react';
import axios from 'axios';
import forumValidation from "./forum-validation";

function ForumPostComponent() {
    const navigate = useNavigate();
    const message = "Forum posted successfully";
    const [forum, setForum] = useState({});
    const [errors, setErrors] = useState({});

    const postURL = "http://localhost:8080/api/forum-add";

    
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

    async function postForum(doesErrors) {

        if(doesErrors === true) {
            axios.post(postURL, forum);
            navigate("/success", {state: message}); 
        }
    }

    
    function submit(event) {
        event.preventDefault();

        async function submitForum() {
            const doesErrors = await errorChecker();

            postForum(doesErrors);
        }
        submitForum();
        setErrors(forumValidation(forum));
        
        
    }

    function changeHandler (event) {    
        setForum({...forum, [event.target.name]: event.target.value});
    }

    return ( 
        <div>
            <div className="container">
                <h2 className="mt-2">Post A Forum</h2>
                
                <form onSubmit={(event) => submit(event)}>
                    <div className="form-group mt-2">
                        <label>Book Name</label>
                        <input placeholder="Book name here" name="bookName" className="form=control ms-2"
                            value={forum.bookName} onChange={changeHandler}/>
                    </div>
                    {errors.bookName && <p className="error text-danger">{errors.bookName}</p>}
                    <div className="form-group mt-2">
                        <label>Book Image</label>
                        <input placeholder="Book image here" name="bookImage" className="form=control ms-2"
                            value={forum.bookImage} onChange={changeHandler}/>
                    </div>
                    {errors.bookImage && <p className="error text-danger">{errors.bookImage}</p>}
                    <div className="form-group mt-2">
                        <label>Description</label>
                        <input placeholder="Description here" name="description" className="form=control ms-2"
                            value={forum.description} onChange={changeHandler}/>
                    </div>
                    {errors.description && <p className="error text-danger">{errors.description}</p>}
                    <button className="mt-2 mb-4">Submit</button>
                </form>
            </div>
            
        </div>
    ) 
}

export default ForumPostComponent;