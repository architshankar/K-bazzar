import { useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import axios from "axios";
import FormSignup from "./formSignup";


function Signup() {


    const [username, setusername] = useState('');
    //set username ke help se we change the use state

    const [password, setpassword] = useState('');
    //set username ke help se we change the use state

    const [email, setemail] = useState('');

    const [mobile, setmobile] = useState('');


   
    const handleApi = () => {
        
        const url = 'http://localhost:4000/signup';
        const data = { username, password, email, mobile }
        axios.post(url, data)
            .then((res) => {
                
                if (res.data) {
                    alert(res.data);
                }
            })
            .catch((err) => {
                
                alert('Server error')
            })
    }

    const background = "./images/login-back12.jpg";
    return (
        <div>
            <div className="signup-background" style={{ backgroundImage: `url(${background})` }}>
                <Header />
                <div className="formSignup">
                    <div style={{ width: '350px', margin: '0 auto' }}>
                        <FormSignup />
                    </div>
                </div>

            </div>


            


        </div>
    )
}

export default Signup; 