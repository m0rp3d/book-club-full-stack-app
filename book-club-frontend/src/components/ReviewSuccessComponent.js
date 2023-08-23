import {useNavigate, useLocation} from "react-router-dom";

function ReviewSuccessComponent() {
    const navigate = useNavigate();
    const location = useLocation();
    const message = location.state;

    function goToMyPosts() {

        navigate("/my-posts");
    }

    return ( 
        <div>
            <h2>Success</h2>
            <div>{message}</div>
            <button onClick={goToMyPosts}>Back to my posts</button>
        </div>
    ) 
}

export default ReviewSuccessComponent;