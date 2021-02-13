import React, { useState } from 'react'
import { SIGN_IN, SIGN_OUT } from '../reducers/auth';
import axios from 'axios'
import dotenv from 'dotenv';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
dotenv.config();

function Home() {
    const [selectedFile, setSelectedFile] = useState(null)
    const [caption, setCaption] = useState("")
    const dispatch = useDispatch();
    // const isLogged = useSelector(state => state.isLogged)
    const isLogged = true
    const SignOut = () => {
        console.log('Sign Out')
        // API CALL
    }

    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const uploadPost = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", process.env.UPLOAD_PRESET_KEY);
        formData.append("api_key", process.env.API_KEY);
        formData.append("timestamp", (Date.now() / 1000) | 0);
        axios.post("https://api.cloudinary.com/v1_1/dbd3owfdv/image/upload", formData, {
                headers: { "X-Requested-With": "XMLHttpRequest" },
            }).then(response => {
            const data = response.data;
            console.log(data.url);
        })
    }

    return (
        <div className="home">
            {
                isLogged ? 
                <>  
                    <div class="container">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="account">
                                    <div className="loggedUser">
                                        <div>
                                            <img src="https://cdn.iconscout.com/icon/free/png-256/boy-avatar-4-1129037.png" height="250" width="auto" alt="" className="src"/>
                                        </div>
                                        <div>
                                            <div className="userName">Devarsh Panchal</div>
                                        </div>
                                    </div>
                                    <div>
                                        <button onClick={() => SignOut()}>Logout</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="posts">
                                    <div className="uploadPost">
                                        <form name="postData"  onSubmit={(e) => uploadPost(e)}>
                                            <input type="text" />
                                            <div className="row" style={{marginTop: '1rem'}}>
                                                <div className="col-md-8">
                                                    <input type="file" name="image" onChange={(e) => onFileChange(e)}/>
                                                </div>
                                                <div className="col-md-4">
                                                    <input type="submit" value="SUBMIT"/>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="allPosts">
                                        <div className="post">
                                            <div className="profile">
                                                <div>
                                                    <img src="https://cdn.iconscout.com/icon/free/png-256/boy-avatar-4-1129037.png" height="60" width="auto" alt="" className="src"/>
                                                </div>
                                                <div>
                                                    <div className="post-user">Devarsh Panchal</div>
                                                    <div className="post-time">24th Feb, 2020 - 04:56PM</div>
                                                </div>
                                            </div>
                                            <div className="image">
                                                <img class="img-res" src="https://images.unsplash.com/photo-1501901609772-df0848060b33?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvdXBsZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" />
                                            </div>
                                        </div>
                                        <div className="post">
                                            <div className="profile">
                                                <div>
                                                    <img src="https://cdn.iconscout.com/icon/free/png-256/boy-avatar-4-1129037.png" height="60" width="auto" alt="" className="src"/>
                                                </div>
                                                <div>
                                                    <div className="post-user">Devarsh Panchal</div>
                                                    <div className="post-time">24th Feb, 2020 - 04:56PM</div>
                                                </div>
                                            </div>
                                            <div className="image">
                                                <img class="img-res" src="https://images.unsplash.com/photo-1501901609772-df0848060b33?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvdXBsZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                : <Redirect to='/login' />
            }
        </div>
    )
}

export default Home;