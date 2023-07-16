import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';

function ForumComponent() {

    const [forums, setForums] = useState([]);

    const REST_API_URL = "http://localhost:8080/api/forum";


    useEffect(() => {
        axios.get(REST_API_URL).then((response) => {
          setForums(response.data);
        });
      }, []);

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
                                <td><Link class="text-decoration-none" to={{pathname: '/reviews'}} >{forum.bookName}</Link></td>
                                <td><Link class="text-decoration-none" to={{pathname: '/reviews'}} >{forum.bookImage}</Link></td>
                                <td><Link class="text-decoration-none" to={{pathname: '/reviews'}} >{forum.description}</Link></td>

                            </tr>
                        ))
                    }
                </tbody>
            </table>
            
        </div>
    
    )

}

export default ForumComponent;