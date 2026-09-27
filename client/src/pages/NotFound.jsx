import React from 'react'
import { Link } from 'react-router'

export default function NotFound() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div>
          <h1 className="text-6xl font-bold">404</h1>
          <p className="py-6">দুঃখিত, এই পেজটি খুঁজে পাওয়া যায়নি।</p>
          <Link to="/" className="btn btn-primary">Home এ ফিরে যান</Link>
        </div>
      </div>
    </div>
  )
}