import {useNavigate} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';

function PostComponent() {
    const navigate = useNavigate();
    const [review, setReview] = useState({datePosted: "2023-07-26", comment: "", 
                                          starRating: 5.0,
                                          account: {
                                            id: 1
                                          },
                                          forum: {
                                            id: 1
                                          }});
    
    const postURL = "http://localhost:8080/api/review-add";

    function changeHandler (event) {    
        setReview({...review, comment: event.target.value});
    }

    function submit(event) {
        event.preventDefault();

        //let dates= new Date()
        //let month = dates.getUTCMonth() + 1
        //let day = dates.getUTCDate()
        //let year = dates.getUTCFullYear()
        //let currentDate = year + "-" + month + "-" + day

        //let tempDate = new Date();
        //tempDate = moment().format("MM/DD/YYYY");

        //review.datePosted = currentDate;
        //review.datePosted = tempDate;
        //console.log(review.datePosted);  
        axios.post(postURL, review);
        navigate("/success");
          
    }

    /*
        axios.post(postURL, review).then(res => {
            console.log(res.data)
        })
    */

    useEffect(() => {
        console.log(review.comment)
    }, [review]);

    return ( 
        <div>
            <div className="container">
                <h2>Post Review</h2>
                <form onSubmit={(event) => submit(event)}>
                    <div className="form-group">
                        <label>Comment</label>
                        <input placeholder="Commet here" name="comment" className="form=control"
                            value={review.comment} onChange={changeHandler}/>
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    ) 
}

export default PostComponent;