import {useLocation, useNavigate} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import axios from 'axios';

function PostComponent() {
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state;
    const message = "Review posted successfully";

    const [review, setReview] = useState({datePosted: "2023-07-26", comment: "", 
                                          starRating: 5.0,
                                          account: {
                                            id: 1
                                          },
                                          forum: {
                                            id: id
                                          }});
    
    const postURL = "http://localhost:8080/api/review-add";

    function changeHandler (event) {    
        setReview({...review, comment: event.target.value});
    }

    function submit(event) {
        event.preventDefault();

        let dates= new Date()
        let month = dates.getUTCMonth() + 1
        let day = dates.getUTCDate()
        let year = dates.getUTCFullYear()
        let currentDate = year + "-" + month + "-" + day

        setReview({...review, datePosted: currentDate});

        axios.post(postURL, review);
        navigate("/success", {state: message}); 
    }

    useEffect(() => {
        console.log(review.comment)
    }, [review]);

    return ( 
        <div>
            <div className="container">
                <h2>Post Review</h2>
                <div>Id is {review.forum.id}</div>
                <form onSubmit={(event) => submit(event)}>
                    <div className="form-group">
                        <label>Comment</label>
                        <input placeholder="Comment here" name="comment" className="form=control"
                            value={review.comment} onChange={changeHandler}/>
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    ) 
}

export default PostComponent;