import React, { use } from 'react'
import JobApplicationRow from './JobApplicationRow'

export default function ApplicationList({ myApplicationsPromise }) {
  const applications = use(myApplicationsPromise);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h3 className="text-3xl font-bold">
          Jobs Applied so far: <span className="text-primary">{applications.length}</span>
        </h3>
      </div>

      <div className="overflow-x-auto rounded-box border border-base-200 bg-base-100 shadow-sm">
        <table className="table">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-10 opacity-60">
                  You haven't applied to any jobs yet
                </td>
              </tr>
            )}
            {applications.map((application, index) => (
              <JobApplicationRow
                key={application._id}
                index={index}
                application={application}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}