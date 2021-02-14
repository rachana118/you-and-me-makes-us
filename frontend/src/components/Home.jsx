import React, { useEffect, useState } from 'react'
import { SIGN_IN, SIGN_OUT } from '../reducers/auth';
import axios from 'axios'
import dotenv from 'dotenv';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
dotenv.config();

function Home() {
    const [selectedFile, setSelectedFile] = useState(null)
    const [captionType, setCaptionType] = useState("")
    const [posts, setPosts] = useState([])
    const dispatch = useDispatch();
    const isLogged = useSelector(state => state.isLogged)
    // const isLogged = true
    const SignOut = () => {
        console.log('Sign Out')
        // API CALL
        dispatch(SIGN_OUT())
    }

    function handleChange(e) {
        setCaptionType(e.target.value);
    }

    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const uploadPost = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", "ozz9poh9");
        formData.append("api_key", "462837742939318");
        formData.append("timestamp", (Date.now() / 1000) | 0);
        axios.post("https://api.cloudinary.com/v1_1/dbd3owfdv/image/upload", formData, {
                headers: { "X-Requested-With": "XMLHttpRequest" },
            }).then(async response => {
            const data = response.data;
            console.log(data.url);

            const postForm = {
                id: isLogged.payload.userID,
                hashtag: isLogged.payload.hashtag,
                caption: captionType,
                image: data.url
            }
            await axios.post("http://localhost:3001/create", postForm).then(async response => {
                const data = response.data;
                console.log(data.message);
                setSelectedFile(null)
                setCaptionType('')
                await getPost()
            })
        })
    }

    useEffect(() => {
        getPost("test")
    }, []);

    useEffect(() => {
        console.log(posts)
    }, [posts]);

    const getPost = async (x) => {
        console.log(x)
        var data;
        axios.get("http://localhost:3001/post").then(response => {
            data = response.data;
            setPosts(data)
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
                                            <div className="userName">{isLogged.payload.hashtag}</div>
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
                                            <input type="text" value={captionType} onChange={handleChange}/>
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
                                        {
                                            posts?.slice(0).reverse().map((post) => {
                                                return(
                                                    <div className="post">
                                                        <div className="profile">
                                                            <div>
                                                                <img src="https://cdn.iconscout.com/icon/free/png-256/boy-avatar-4-1129037.png" height="60" width="auto" alt="" className="src"/>
                                                            </div>
                                                            <div>
                                                                <div className="post-user">{post.hashtag}</div>
                                                                <div className="post-time">{post.time}</div>
                                                            </div>
                                                        </div>
                                                        <div className="caption">
                                                            {post.caption}
                                                        </div>
                                                        <div className="image">
                                                            <img class="img-res" src={post.photo} />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
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