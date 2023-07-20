import { useLocation, useNavigate} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import axios from 'axios';

function ReviewComponent() {
    const navigate = useNavigate();

    const [reviews, setReviews] = useState([]);

    const location = useLocation();

    const id = location.state;

    const baseurl = `http://localhost:8080/api/forum-reviews/${id}`;

    function clickPost() {
        navigate("/post")
    }
    
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(baseurl);
            console.log(request.data);
            setReviews(request.data);
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
            <div onClick={() => clickPost()}>Post a review</div>
        </div>
    )
    
}

export default ReviewComponent;