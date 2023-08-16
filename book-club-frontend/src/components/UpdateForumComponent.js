import {useLocation, useNavigate} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import axios from 'axios';

function UpdateForumComponent() {
    const location = useLocation();
    const navigate = useNavigate();
    const id = location.state;
    const message = "Forum updated successfully";
    const [forum, setForum] = useState({bookName: "",
                                        bookImage: "",
                                        description: ""});

    const getUrl = `http://localhost:8080/api/get-forum/${id}`;

    function submit(event) {
        event.preventDefault();

        axios.put(`http://localhost:8080/api/forum-update/${id}`, forum);
        navigate("/success", {state: message}); 
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
                    <button>Update</button>
                </form>
            </div>
        </div>
    ) 
}

export default UpdateForumComponent;