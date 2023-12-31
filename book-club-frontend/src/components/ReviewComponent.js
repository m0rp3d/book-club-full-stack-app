import { useLocation, useNavigate} from "react-router-dom";
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import RoleContext from '../context/role-context';
import AuthContext from "../context/login-context";
import ReactPaginate from 'react-paginate';

function ReviewComponent() {

    const navigate = useNavigate();

    const [reviews, setReviews] = useState([]);

    const location = useLocation();

    const id = location.state;

    const {accountId, setAccountId} = useContext(AuthContext);
    const {role, setRole} = useContext(RoleContext);

    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;
    const displayReviews = reviews
                            .slice(pagesVisited, pagesVisited + usersPerPage)
                            .map((review, index) => {
                                return (
                                <tr key = {index} className="tableRow">
                                    <td>
                                        <div>{review.account.accountName}</div>
                                        <img src={review.account.profileImage} height={100} width={100} alt="" className="mt-1"/>
                                        <div>{formatDate(review.datePosted)}</div>
                                    </td>
                                    
                                    <td>{review.comment}</td>   
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

    const baseurl = `http://localhost:8080/api/forum-reviews/${id}`;

    function clickPost(id) {
        navigate("/post", {state: id})
    }

    function IfCanPost() {
        if(accountId === 0) {
            return <div onClick={goToLogin} className="hoverOver">
                   Login to post review   
                   </div>
        } else if (accountId > 0) {
            return <div className="hoverOver" onClick={() => clickPost(id)}>Post a review</div>
        }
    }

    function goToLogin() {

        navigate("/login");
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
                                <th>User</th>
                                
                                <th>Comment</th>
                            </tr>
                        </thead>

                        <tbody>
                            {displayReviews}
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
                    <IfCanPost/>        
            </div>
        )    
}

export default ReviewComponent;