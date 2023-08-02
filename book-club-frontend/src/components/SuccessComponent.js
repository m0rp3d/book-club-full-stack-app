import {useNavigate, useLocation} from "react-router-dom";

function SuccessComponent() {
    const navigate = useNavigate();
    const location = useLocation();
    const message = location.state;

    function goHome() {

        navigate("/");
    }

    return ( 
        <div>
            <h2>Success</h2>
            <div>{message}</div>
            <button onClick={goHome}>Back to home page</button>
        </div>
    ) 
}

export default SuccessComponent;