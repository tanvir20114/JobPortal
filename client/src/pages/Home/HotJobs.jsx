import React, { use } from 'react'
import JobCard from '../Shared/JobCard';

export default function HotJobs({ jobsPromise }) {
  const jobs = use(jobsPromise);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">
          Hot Jobs of the <span className="text-primary">Day</span>
        </h2>
        <div className="w-16 h-1 bg-primary rounded-full mx-auto mt-3"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length === 0 && (
          <p className="col-span-full text-center py-10 opacity-60">
            No jobs available right now
          </p>
        )}
        {jobs.map(job => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </section>
  )
}