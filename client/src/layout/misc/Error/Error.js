import React from 'react'
import { NavLink } from 'react-router-dom'

function Error() {
    return (
        <>
            <div className=" d-flex flex-row align-items-center body" style={{minHeight:"100vh"}}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 text-center">
              <span className="display-1 d-block text-danger animate__animated animate__heartBeat">😢</span>
              <div className="mb-4 display-4">Something went wrong</div>
              <NavLink exact to='/' className="btn btn-outline-danger">Back to Home</NavLink>
            </div>
          </div>
        </div>
      </div>
        </>
    )
}

export default Error