import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import ForumComponent from '../components/ForumComponent';
import MyPostComponent from '../components/MyPostComponent';
import ReviewComponent from './ReviewComponent';
import PostComponent from './PostComponent';
import SuccessComponent from './SuccessComponent';
import SignUpComponent from './SignUpComponent';
import LoginComponent from './LoginComponent';
import LoggedOutComponent from './LoggedOutComponent';
import RoleContext from '../context/role-context';
import React, {useContext} from 'react';
import AuthContext from "../context/login-context";
import UpdateReviewComponent from './UpdateReviewComponent';
import ForumPostComponent from './ForumPostComponent';
import UpdateForumComponent from './UpdateForumComponent';
import '../App.css';
import ReviewSuccessComponent from './ReviewSuccessComponent';


function MainComponent() {
    const {accountId, setAccountId} = useContext(AuthContext);
    const {role, setRole} = useContext(RoleContext);
    

    function LoginOrLogout() {

        if(accountId === 0) {
            return <div className="float-left w-25">
                            <Link className="text-decoration-none" id="hoverOne" to={{pathname: '/sign-up'}} >
                            Sign Up
                            </Link>
                    </div>
        } else if (accountId > 0) {
            return <Link className="text-decoration-none" id="hoverOne" to={{pathname: '/logged-out'}} >
                    Logout
                </Link>
        }
    }

    
    return <div>
                <div className="container-fluid">
                <Router>
                    <div className="container-fluid">
                        <div className="float-left w-25">
                                <LoginOrLogout />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2 bg-primary">
                            <Link className="text-decoration-none link-light" to={{pathname: '/'}}>
                                Forum
                            </Link>
                        </div>
                        <div className="col-2 bg-primary">
                            <Link className="text-decoration-none link-light" to={{pathname: '/my-posts'}} >
                            My Post
                            </Link>
                        </div>
                        <div className="col bg-secondary">
                            <div className="text-secondary">
                            Empty Space
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        
                            <Routes>
                                <Route path="/" element={<ForumComponent/>}></Route>
                                <Route path="/my-posts" element={<MyPostComponent/>}></Route>
                                <Route path="/reviews" element={<ReviewComponent/>}></Route>
                                <Route path="/post" element={<PostComponent/>}></Route>
                                <Route path="/success" element={<SuccessComponent/>}></Route>
                                <Route path="/sign-up" element={<SignUpComponent/>}></Route>
                                <Route path="/login" element={<LoginComponent/>}></Route> 
                                <Route path="/logged-out" element={<LoggedOutComponent/>}></Route>
                                <Route path="/update-review" element={<UpdateReviewComponent/>}></Route>  
                                <Route path="forum-post" element={<ForumPostComponent/>}></Route>  
                                <Route path="/update-forum" element={<UpdateForumComponent/>}></Route> 
                                <Route path="/review-success" element={<ReviewSuccessComponent/>}></Route>
                            </Routes> 
                    </div>
                    </Router>
                </div>
            
            </div>
}

export default MainComponent;