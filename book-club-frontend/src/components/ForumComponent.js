import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate} from "react-router-dom";

function ForumComponent() {

    const navigate = useNavigate();

    const [forums, setForums] = useState([]);

    const REST_API_URL = "http://localhost:8080/api/forum";


    useEffect(() => {
        axios.get(REST_API_URL).then((response) => {
          setForums(response.data);
        });
      }, []);


    
    function clickReview(forum) {
        console.log(forum.id);
        
        navigate("/reviews", {state: forum.id})
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
                    </tr>
                </thead>

                <tbody>
                    {
                        forums.map((forum, index) => (
                            <tr key = {index}>
                                <td onClick={() => clickReview(forum)}>{forum.bookName}</td>
                                <td onClick={() => clickReview(forum)}>{forum.bookImage}</td>
                                <td onClick={() => clickReview(forum)}>{forum.description}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            
        </div>
    
    )

    

}

export default ForumComponent;