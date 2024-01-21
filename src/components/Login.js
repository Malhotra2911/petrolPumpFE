import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { backendApiUrl } from '../config/config';

const Login = (props) => {
    let navigate = useNavigate();
    const data = {
        username : "",
        password : ""
    }

    const [credentials, setCredentials] = useState([data]);

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name] : e.target.value});
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(`${backendApiUrl}user/loginUser`, credentials, {
        });
        console.log(response.data);
        if(response.data.user.token) {
            sessionStorage.setItem('token', response.data.user.token);
            props.showAlert("Logged in Successfully", "success")
            navigate('/')
        }else {
            alert(response.data.msg)
        }
    }
  return (
    !sessionStorage.getItem('token') ? <div className='Home'>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4" style={{backgroundColor : "whitesmoke"}}>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label"><h3>Username</h3></label>
                            <input type="text" className="form-control" id="username" name="username" value={credentials.username} onChange={onChange}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label"><h3>Password</h3></label>
                            <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange}/>
                        </div>
                        <button type="submit" className="btn btn-outline-dark my-4">Submit</button>
                    </form>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
    </div> : ""
  )
}

export default Login
