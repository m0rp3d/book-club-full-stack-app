import {useLocation, useNavigate} from "react-router-dom";
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import RoleContext from '../context/role-context';
import AuthContext from "../context/login-context";
import commentValidation from "./comment-validation";


function PostComponent() {
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state;
    const message = "Review posted successfully";
    const {accountId, setAccountId} = useContext(AuthContext);
    const {role, setRole} = useContext(RoleContext);
    const [errors, setErrors] = useState({});

    const [review, setReview] = useState({datePosted: "2023-07-26", comment: "", 
                                          starRating: 5.0,
                                          account: {
                                            id: accountId
                                          },
                                          forum: {
                                            id: id
                                          }});
    
    const postURL = "http://localhost:8080/api/review-add";

    function changeHandler (event) {    
        setReview({...review, comment: event.target.value});
    }

    function errorChecker() {
        if(!review.comment) {
            return false;
        } 
        return true;
    }

    async function postReview(doesErrors) {
          
        if(doesErrors === true) {
            axios.post(postURL, review);
            navigate("/success", {state: message}); 
        }
    }   

    function submit(event) {
        event.preventDefault();

        let dates= new Date()
        let month = dates.getUTCMonth() + 1
        let day = dates.getUTCDate()
        let year = dates.getUTCFullYear()
        let currentDate = year + "-" + month + "-" + day

        setReview({...review, datePosted: currentDate});
        
        async function submitReview() {
            
            const doesErrors = await errorChecker();

            postReview(doesErrors);
        }
        submitReview();
        setErrors(commentValidation(review));
        
    }

    useEffect(() => {
        console.log(review.comment)
    }, [review]);

    return ( 
        <div>
            <div className="container">
                <h2 className="mt-2">Post Comment</h2>
                <form onSubmit={(event) => submit(event)}>
                    <div className="form-group mt-4">
                        <label>Comment</label>
                        <input placeholder="Comment here" name="comment" className="form=control ms-2"
                            value={review.comment} onChange={changeHandler}/>
                    </div>
                    {errors.comment && <p className="error text-danger">{errors.comment}</p>}
                    <button className="mt-2 mb-4">Submit</button>
                </form>
            </div>
        </div>
    ) 
}

export default PostComponent;