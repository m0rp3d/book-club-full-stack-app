import {useLocation, useNavigate} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import commentValidation from "./comment-validation";

function UpdateReviewComponent() {
    const location = useLocation();
    const navigate = useNavigate();
    const id = location.state;
    const [errors, setErrors] = useState({});
    
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
    const message = "review updated successfully";

    function errorChecker() {
        if(!review.comment) {
            return false;
        } 
        return true;
    }

    async function postUpdate(doesErrors) {
          
        if(doesErrors === true) {
            axios.put(`http://localhost:8080/api/review-update/${id}`, review);
            navigate("/review-success", {state: message});  
        }
    } 

    function submit(event) {
        event.preventDefault();

        async function updateReview() {
            const doesErrors = await errorChecker();
            postUpdate(doesErrors);
        }
        updateReview();
        setErrors(commentValidation(review));

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
                <h2 className="mt-2">Update Review</h2>
                
                <form onSubmit={(event) => submit(event)}>
                    <div className="form-group mt-5">
                        <label>Comment</label>
                        <input placeholder="Comment here" name="comment" className="form=control ms-2"
                            value={review.comment} onChange={changeHandler}/>
                    </div>
                    {errors.comment && <p className="error">{errors.comment}</p>}
                    <button className="mt-3 mb-4 hoverOver">Update</button>
                </form>
            </div>
        </div>
    ) 
}

export default UpdateReviewComponent;