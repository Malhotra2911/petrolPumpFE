import React from 'react'

const Home = () => {
  return (
    <div className='Home'>
        <h1>Welcome To Digital Solution Of Petrol Pump...!</h1>
        {!sessionStorage.getItem('token') ? <h3>Please Login To Continue...</h3> : ""}
    </div>
  )
}

export default Home
