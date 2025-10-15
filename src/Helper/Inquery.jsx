import React from 'react'

function Inquery() {
  return (
    <>
      <form>
      <div className="mb-3">
        <label className="form-label">Full Name</label>
        <input type="text" className="form-control" placeholder="Enter your name" />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" className="form-control" placeholder="Enter your email" />
      </div>

      <div className="mb-3">
        <label className="form-label">Business Name</label>
        <input type="text" className="form-control" placeholder="Enter your business name" />
      </div>

      <div className="mb-3">
        <label className="form-label">Message</label>
        <textarea className="form-control" rows="3" placeholder="Tell us about your business..." />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Submit Inquiry
      </button>
    </form>
    
    </>
  )
}

export default Inquery
