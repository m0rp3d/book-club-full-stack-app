import RoleContext from '../context/role-context';
import React, {useState, useContext, useEffect} from 'react';
import AuthContext from "../context/login-context";
import axios from 'axios';
import { useNavigate} from "react-router-dom";
import ReactPaginate from 'react-paginate';

function MyPostComponent() {
    const navigate = useNavigate();

    const {accountId, setAccountId} = useContext(AuthContext);
    const {role, setRole} = useContext(RoleContext);
    const [reviews, setReviews] = useState([]);
    const message = "Review deleted successfully.";
    const baseurl = `http://localhost:8080/api/account-reviews/${accountId}`;
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;
    
    const displayMyPosts = reviews
                            .slice(pagesVisited, pagesVisited + usersPerPage)
                            .map((review, index) => {
                                return (
                                    <tr key = {index}>
                                    <td>{review.forum.bookName}</td>
                                    <td>{formatDate(review.datePosted)}</td>
                                    <td>{review.comment}</td>
                                    <td>
                                        <button onClick={() => clickUpdate(review)}>Edit</button>
                                        <button onClick={() => deleteReviewById(review.id)}>Delete</button>
                                    </td>   
                                </tr>
                                );
                                
                            });

    

    const pageCount = Math.ceil(reviews.length / usersPerPage);

    function formatDate(passedReview) {
        let day = new Date(passedReview).getDate();
        let month = new Date(passedReview).getMonth() + 1;
        let year = new Date(passedReview).getFullYear();
        const formattedDate = month + "-" + day + "-" + year;

        return (
            <div>
                {formattedDate}
            </div>
            
        )
    }

    const changePage = ({selected}) => {
        setPageNumber(selected);
    };

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
        navigate('/review-success', {state: message})
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
                                <th>Comment</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                        {displayMyPosts}
                        <div className="mt-5">
                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={"paginationBttns"}
                            previousLinkClassName={"previousBttn"}
                            nextLinkClassName={"nextBttn"}
                            disabledClassName={"paginationDisabled"}
                            activeClassName={"paginationActive"}
                        />
                        </div>
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