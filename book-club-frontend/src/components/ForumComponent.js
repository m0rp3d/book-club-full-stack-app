import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { useNavigate} from "react-router-dom";
import RoleContext from '../context/role-context';
import AuthContext from "../context/login-context";
import ReactPaginate from 'react-paginate';

function ForumComponent() {

    const navigate = useNavigate();

    const {accountId, setAccountId} = useContext(AuthContext);
    const {role, setRole} = useContext(RoleContext);
    const message = "Forum deleted successfully."

    const [forums, setForums] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;

    const displayForums = forums
                            .slice(pagesVisited, pagesVisited + usersPerPage)
                            .map((forum, index) => {
                                return (
                                    <tr key = {index}>
                                        <td onClick={() => clickReview(forum)}>{forum.bookName}</td>
                                        <td onClick={() => clickReview(forum)}>{forum.bookImage}</td>
                                        <td onClick={() => clickReview(forum)}>{forum.description}</td>
                                        <td>
                                            {role === "admin" && ( 
                                                                    <div>
                                                                        <button onClick={() => clickUpdate(forum)}>Edit</button>
                                                                        <button onClick={() => deleteForumById(forum.id)}>Delete</button>
                                                                    </div>    
                                                                )}
                                        </td>
                                    </tr>
                                );
                            }); 
    
    const pageCount = Math.ceil(forums.length / usersPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected);
    };

    const REST_API_URL = "http://localhost:8080/api/forum";


    useEffect(() => {
        axios.get(REST_API_URL).then((response) => {
          setForums(response.data);
        });
      }, []);

    function clickPost() {
        navigate("/forum-post")
    }

    function IfCanPost() {
        if(role === "admin") {
            return <div onClick={() => clickPost()}>Post a forum</div>
        } 
    }


    function clickReview(forum) {
        console.log(forum.id);
        
        navigate("/reviews", {state: forum.id})
    }

    async function deleteForumById(forumId) {
        await axios.delete(`http://localhost:8080/api/forum/${forumId}`);
        navigate('/success', {state: message})
    }

    function clickUpdate(forum) {
        navigate("/update-forum", {state: forum.id})
    }


    return (
        <div>
            <h2>Forum</h2>
            <table>
                <thead>
                    <tr>
                        <th>Book Name</th>
                        <th>Book Image</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {displayForums}
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

export default ForumComponent;