import {useNavigate} from "react-router-dom";
import React, {useState} from 'react';
import axios from 'axios';

function ForumPostComponent() {
    const navigate = useNavigate();
    const message = "Forum posted successfully";
    const [forum, setForum] = useState({});

    const postURL = "http://localhost:8080/api/forum-add";
    
    function submit(event) {
        event.preventDefault();

        axios.post(postURL, forum);
        navigate("/success", {state: message}); 
    }

    function changeHandler (event) {    
        setForum({...forum, [event.target.name]: event.target.value});
    }

    return ( 
        <div>
            <div className="container">
                <h2>Post A Forum</h2>
                
                <form onSubmit={(event) => submit(event)}>
                    <div className="form-group">
                        <label>Book Name</label>
                        <input placeholder="Book name here" name="bookName" className="form=control"
                            value={forum.bookName} onChange={changeHandler}/>
                    </div>
                    <div className="form-group">
                        <label>Book Image</label>
                        <input placeholder="Book image here" name="bookImage" className="form=control"
                            value={forum.bookImage} onChange={changeHandler}/>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input placeholder="Description here" name="description" className="form=control"
                            value={forum.description} onChange={changeHandler}/>
                    </div>
                    <button>Submit</button>
                </form>
            </div>
            
        </div>
    ) 
}

export default ForumPostComponent;