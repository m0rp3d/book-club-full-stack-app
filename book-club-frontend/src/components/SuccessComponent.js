import {useNavigate} from "react-router-dom";

function SuccessComponent() {
    const navigate = useNavigate();

    function goHome() {

        navigate("/");
    }

    return ( 
        <div>
            <h2>Success</h2>
            <button onClick={goHome}>Back to home page</button>
        </div>
    ) 
}

export default SuccessComponent;