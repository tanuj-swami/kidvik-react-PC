import React from 'react'
import { Link } from "react-router-dom";

function Not_Found() {
  return (
    <>
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you’re looking for doesn’t exist.</p>
      <Link to="/">Go back home</Link>
    </div>
    
    </>
  )
}

export default Not_Found