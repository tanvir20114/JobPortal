import React from 'react'
import { Link } from 'react-router'
import Swal from 'sweetalert2'
import useJobApi from '../../api/useJobApi'
import { notifyError } from '../../utils/notify.js'


export default function JobList({ jobsCreatedByPromise }) {
  const jobs = React.use(jobsCreatedByPromise)
  const [jobList, setJobList] = React.useState(jobs)
  const { deleteJob } = useJobApi();

  const handleDelete = (id) => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "এই জবটি মুছে ফেলা হবে!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "হ্যাঁ, ডিলিট করুন"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteJob(id).then(data => {
          if (data.deletedCount > 0) {
            setJobList(prev => prev.filter(job => job._id !== id));
            Swal.fire('মুছে ফেলা হয়েছে!', '', 'success');
          }
        }).catch(err => notifyError(err));
      }
    });
  }


 
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">
          Jobs Created By You: <span className="text-primary">{jobList.length}</span>
        </h2>
      </div>

      <div className="overflow-x-auto rounded-box border border-base-200 bg-base-100 shadow-sm">
        <table className="table table-zebra">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>#</th>
              <th>Job Title</th>
              <th>Deadline</th>
              <th>Count</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {jobList.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-10 opacity-60">
                  You haven't posted any jobs yet
                </td>
              </tr>
            )}
            {jobList.map((job, index) => (
              
              <tr key={job._id} className="hover">
                <th>{index + 1}</th>
                <td className="font-medium">{job.title}</td>
                <td>{job.deadline}</td>
                <td>
                  <span className="badge badge-ghost">{job.application_count}</span>
                </td>
                <td>
                  <Link
                    to={`/applications/${job._id}`}
                    className="link link-primary link-hover text-sm font-medium"
                  >
                    View Application
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="btn btn-error btn-outline btn-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}