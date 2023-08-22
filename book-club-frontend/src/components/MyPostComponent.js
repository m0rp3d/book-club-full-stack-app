import RoleContext from '../context/role-context';
import React, {useState, useContext, useEffect} from 'react';
import AuthContext from "../context/login-context";
import axios from 'axios';
import { useNavigate} from "react-router-dom";

function MyPostComponent() {
    const navigate = useNavigate();

    const {accountId, setAccountId} = useContext(AuthContext);
    const {role, setRole} = useContext(RoleContext);
    const [reviews, setReviews] = useState([]);
    const message = "Review deleted successfully."

    const baseurl = `http://localhost:8080/api/account-reviews/${accountId}`;

    

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

    async function deleteReviewById(deleteId) {
        await axios.delete(`http://localhost:8080/api/review/${deleteId}`);
        navigate('/success', {state: message})
    }

    function clickUpdate(review) {
        navigate("/update-review", {state: review.id})
    }


    function IfAccountExist() {
        
        if(accountId > 0) {
            return <div >
                   <h2>My Reviews</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Book Name</th>
                                <th>Date Posted</th>
                                <th>Rating</th>
                                <th>Comment</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                            reviews.map((review, index) => (
                                <tr key = {index}>
                                    <td>{review.forum.bookName}</td>
                                    <td>{review.datePosted}</td>
                                    <td>{review.starRating}</td>
                                    <td>{review.comment}</td>
                                    <td>
                                        <button onClick={() => clickUpdate(review)}>Edit</button>
                                        <button onClick={() => deleteReviewById(review.id)}>Delete</button>
                                    </td>   
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>  
                   </div>
                   
        } else if (accountId === 0){
            return <div>
                Log in to view your reviews
            </div>
        }
    }

    return (
        <div>
            <h2>MyPost</h2>
            <IfAccountExist/>
        </div>  

    )
}

export default MyPostComponent;