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
            <div className="mt-2">{message}</div>
            <button className="mt-2 hoverOver" onClick={goToMyPosts}>Back to my posts</button>
        </div>
    ) 
}

export default ReviewSuccessComponent;