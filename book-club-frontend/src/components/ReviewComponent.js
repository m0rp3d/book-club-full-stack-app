import { useLocation, useNavigate} from "react-router-dom";
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import AuthContext from "../context/login-context";

function ReviewComponent() {

    const ctx = useContext(AuthContext);

    const navigate = useNavigate();

    const [reviews, setReviews] = useState([]);

    const location = useLocation();

    const id = location.state;

    const baseurl = `http://localhost:8080/api/forum-reviews/${id}`;

    function clickPost(id) {
        navigate("/post", {state: id})
    }
    
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(baseurl);
            console.log(request.data);
            setReviews(request.data);
            //console.log("Value for logged in is " + ctx.isLoggedIn);
            return request;
        }
        fetchData();
    }, [baseurl]);
    
    return (
            <div>
                <h2>Reviews</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Date Posted</th>
                                <th>Rating</th>
                                <th>Comment</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                            reviews.map((review, index) => (
                                <tr key = {index}>
                                    <td>{review.datePosted}</td>
                                    <td>{review.starRating}</td>
                                    <td>{review.comment}</td>   
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                    <div onClick={() => clickPost(id)}>Post a review</div>
            </div>
        )    
}

export default ReviewComponent;