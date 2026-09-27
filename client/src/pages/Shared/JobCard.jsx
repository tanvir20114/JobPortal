import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router';

export default function JobCard({ job }) {
  const { title, location, requirements = [], _id, salaryRange = {}, description, company, company_logo } = job;

  return (
    <div className="card bg-base-100 w-full h-full border border-base-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      {/* Company info */}
      <div className="flex items-center gap-3 p-5 pb-0">
        <figure className="shrink-0 w-14 h-14 rounded-lg bg-base-200 p-2">
          <img
            src={company_logo}
            alt={`${company} logo`}
            className="w-full h-full object-contain"
          />
        </figure>
        <div className="min-w-0">
          <h3 className="text-xl font-bold truncate">{company}</h3>
          <p className="flex items-center gap-1 text-sm opacity-70">
            <FaMapMarkerAlt className="shrink-0 text-primary" />
            <span className="truncate">{location}</span>
          </p>
        </div>
      </div>

      {/* Job info */}
      <div className="card-body gap-3">
        <h2 className="card-title">
          {title}
          <div className="badge badge-secondary">NEW</div>
        </h2>

        <p className="text-sm font-medium text-primary">
          Salary: {salaryRange.min} - {salaryRange.max} {salaryRange.currency}
        </p>

        <p className="text-sm opacity-80 line-clamp-3">{description}</p>

        <div className="flex flex-wrap gap-2">
          {requirements.map((skill, index) => (
            <div key={index} className="badge badge-outline">{skill}</div>
          ))}
        </div>

        <div className="card-actions justify-end mt-auto pt-2">
          <Link to={`/jobs/${_id}`} className="btn btn-primary btn-sm">
            Show Details
          </Link>
        </div>
      </div>
    </div>
  )
}