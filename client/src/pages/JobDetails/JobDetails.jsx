import React from 'react'
import { Link, useLoaderData } from 'react-router';

export default function JobDetails() {
  const { _id, title, company } = useLoaderData();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="card bg-base-100 border border-base-200 shadow-sm">
        <div className="card-body gap-4">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">{title}</h2>

          <p className="text-lg opacity-80">
            Company: <span className="font-semibold text-primary">{company}</span>
          </p>

          <div className="card-actions justify-end pt-4 border-t border-base-200">
            <Link to={`/jobApply/${_id}`} className="btn btn-primary">
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}