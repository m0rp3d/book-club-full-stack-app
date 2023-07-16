import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import ForumComponent from '../components/ForumComponent';
import MyPostComponent from '../components/MyPostComponent';
import ReviewComponent from './ReviewComponent';

function MainComponent() {


    return <div>
                <div className="container">
                <Router>
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
                            </Routes> 
                    </div>
                    </Router>
                </div>
           </div>
}

export default MainComponent;