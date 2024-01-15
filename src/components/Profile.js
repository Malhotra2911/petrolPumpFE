import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { backendApiUrl } from '../config/config';

const Profile = () => {
    const [user, setUser] = useState([]);
    const [isError, setIsError] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`${backendApiUrl}user/updateUser`, user, {
            headers : {
                'auth-token' : sessionStorage.getItem('token')
            }
        });
        alert("Updated Successfully...");
        window.location.reload();
    }

    const onChange = async (e) => {
        setUser({...user, [e.target.name] : e.target.value})
    }

    useEffect(() => {
        axios.post(`${backendApiUrl}user/getLoggedInUser`, {
            headers : {
                'authToken' : sessionStorage.getItem('token')
            }
        })
        .then((res)=> {
            setUser(res.data.user);
        })
        .catch((error)=> {
            setIsError(error.message);
        })
    }, [])
    
  return (
    sessionStorage.getItem('token') ? 
    <div className='MeterReading'>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                <form className='text-start' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" name="username" value={user?.username} onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="mobileNo" className="form-label">Mobile No.</label>
                        <input type="text" className="form-control" id="mobileNo" name="mobileNo" value={user?.mobileNo} onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={user?.email} onChange={onChange}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" value={user?.password} onChange={onChange}/>
                    </div>
                    <button type="submit" className="btn btn-outline-dark">Update Your Profile</button>
                </form>
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
    </div> : ""
  )
}

export default Profile
