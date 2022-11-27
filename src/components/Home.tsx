import React from 'react'
import '../App.css'
import {Link} from 'react-router-dom';

const Home = () => {

  return (
    //home page that has an option to manage users , which goes to second webpage
    <div  className="container">
      <div className="left-col">
    <h1 className="subhead"> WELCOME TO</h1>
    <p className="subhead_2">USER MANAGEMENT APP</p>
    </div>
    <button className="cnt-btn"><Link className="cnt-btn" to="/users">Manage Users</Link></button>
  </div>
 
  )
}

export default Home



