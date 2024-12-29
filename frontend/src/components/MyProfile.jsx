
import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";


function MyProfile() {

    const [user, setuser] = useState({})

    useEffect(() => {
        let url = 'http://localhost:4000/my-profile/' + localStorage.getItem('userId');
        ;
        axios.get(url)
            .then((res) => {
                
                if (res.data.user) {
                    setuser(res.data.user);
                }
            })
            .catch((err) => {
                alert('couldent fetch profile')
            })

    }, [])

    return (
        <div>
            <Header />

            <div className="m-3 p-3">
                <h3 className="text-center mt-2 "> User Profile </h3>
                
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <td> Username</td>
                            <td> Email</td>
                            <td> Mobile</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{user.Username}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                        </tr>
                    </tbody>

                </table>

            </div>
        </div>

    )
}

export default MyProfile; 