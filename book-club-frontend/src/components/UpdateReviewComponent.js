import {useLocation, useNavigate} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import axios from 'axios';

function UpdateReviewComponent() {
    const location = useLocation();
    const navigate = useNavigate();
    const id = location.state;
    
    const [review, setReview] = useState({datePosted: "", comment: "", 
                                            starRating: 0.0,
                                            account: {
                                            id: 0
                                            },
                                            forum: {
                                            id: 0
                                            }});

    //const baseurl = `http://localhost:8080/api/review-update/${review.id}`;
    const getUrl = `http://localhost:8080/api/get-review/${id}`;
    const message = "review updated successfully"

    function submit(event) {
        event.preventDefault();

        axios.put(`http://localhost:8080/api/review-update/${id}`, review);
        navigate("/success", {state: message}); 

    }

    useEffect(() => {
        async function setData() {
            const request = await axios.get(getUrl);
            console.log(request.data);
            setReview(request.data);
            return request;
        }
        setData();
    }, [getUrl]);

    function changeHandler (event) {    
        setReview({...review, comment: event.target.value});
    }

    return ( 
        <div>
            <div className="container">
                <h2>Post Review</h2>
                
                <form onSubmit={(event) => submit(event)}>
                    <div className="form-group">
                        <label>Comment</label>
                        <input placeholder="Comment here" name="comment" className="form=control"
                            value={review.comment} onChange={changeHandler}/>
                    </div>
                    <button>Update</button>
                </form>
            </div>
        </div>
    ) 
}

export default UpdateReviewComponent;