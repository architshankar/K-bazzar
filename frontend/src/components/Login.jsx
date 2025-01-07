import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Form from "./form";
import Card from "./card";
import API_URL from "../constants";

function Login() {
    const navigate = useNavigate(); //hook funtion 
    

    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [error, setError] = useState(false); // State to track errors


    const handleApi = () => {


        const url = API_URL + '/login';
        const data = { username, password }

        axios.post(url, data)
            .then((res) => {

                if (res.data) {
                    // alert(res.data.message);
                    if (res.data.token) {
                        
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('userId', res.data.userId);
                        navigate('/');
                        setError(false);
                    }
                }
            })
            .catch((err) => {

                
                setError(true);
                setTimeout(() => {
                    setError(false);
                  }, 2000);
                    
            })
    }
    const background = "./images/login-back12.jpg";

    return (
        <div className="login-contain">
            <div className="login-background" >
                <Header />

                <div className="form-cont">
                    <Form
                        username={username}
                        password={password}
                        setusername={setusername}
                        setpassword={setpassword}
                        handleApi={handleApi}
                    />
                </div>
                {/* Render Card when error occurs */}
                {error && (
                    <div style={{ marginTop: '20px' , marginLeft : '10px' }}>
                        <Card />
                    </div>
                )}

            </div>
        </div>

    )
}

export default Login;

