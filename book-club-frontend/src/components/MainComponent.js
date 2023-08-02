import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import ForumComponent from '../components/ForumComponent';
import MyPostComponent from '../components/MyPostComponent';
import ReviewComponent from './ReviewComponent';
import PostComponent from './PostComponent';
import SuccessComponent from './SuccessComponent';
import AuthContext from '../context/login-context';
import SignUpComponent from './SignUpComponent';
import LoginComponent from './LoginComponent';
import React, {useState} from 'react';

function MainComponent() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    return <div>
            <AuthContext.Provider 
                value={{
                    isLoggedIn: isLoggedIn
                }}>
                
                <div className="container-fluid">
                <Router>
                    <div className="container-fluid">
                        <Link class="text-decoration-none" to={{pathname: '/sign-up'}} >
                        Login
                        </Link>
                    </div>
                    <div className="row">
                        <div className="col-3 bg-primary">
                            <Link class="text-decoration-none" to={{pathname: '/'}}>
                                Forum
                            </Link>
                        </div>
                        <div className="col-3 bg-secondary">
                            <Link class="text-decoration-none" to={{pathname: '/my-posts'}} >
                            My Post
                            </Link>
                        </div>
                        <div className="col bg-danger">
                            Empty Space
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
                            </Routes> 
                    </div>
                    </Router>
                </div>
            </AuthContext.Provider>
        </div>
}

export default MainComponent;