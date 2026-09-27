import React from 'react'
import { useLoaderData, useParams, useNavigate } from 'react-router'
import Swal from 'sweetalert2'
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useMessageApi from '../../api/useMessageApi'
import { notifyError } from '../../utils/notify.js'


export default function ViewApplications() {
  const { job_id } = useParams();
  const applications = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const { startConversation } = useMessageApi();
  const navigate = useNavigate();


  const handleMessage = async (application) => {
    try {
        const conversation = await startConversation({
            jobId: job_id,
            applicationId: application._id,
            otherEmail: application.applicant,
        });
        navigate('/messages', { state: { conversation } });
    } catch (error) {
        notifyError(error.response?.data?.message || error.message);
    }
};

  const handleStatusChange = (e, app_id) => {
    axiosSecure.patch(`/applications/${app_id}`, { status: e.target.value }).then(res => {
      if (res.data.modifiedCount) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Application Status Updated",
          showConfirmButton: false,
          timer: 1500
        });
      }
    }).catch(error => notifyError(error))
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">
          <span className="text-primary">{applications.length}</span> Applications
        </h2>
        <p className="text-sm opacity-70 mt-1 break-all">
          Job ID: <span className="font-mono">{job_id}</span>
        </p>
      </div>

      <div className="overflow-x-auto rounded-box border border-base-200 bg-base-100 shadow-sm">
        <table className="table table-zebra">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>Application ID</th>
              <th>Name</th>
              <th>Job</th>
              <th>Message</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-10 opacity-60">
                  No applications yet
                </td>
              </tr>
            )}
            {applications.map(application => (
              <tr key={application._id} className="hover">
                <th className="font-mono text-xs font-normal opacity-70">{application._id}</th>
                <td className="font-medium">{application.applicant}</td>
                <td>{application.jobTitle}</td>

                <td>
                  <button
                    onClick={() => handleMessage(application)}
                    className="btn btn-xs btn-outline btn-primary"
                  >
                    Message
                  </button>
                </td>

                <td>
                  <select
                    onChange={e => handleStatusChange(e, application._id)}
                    defaultValue={application.status}
                    className="select select-bordered select-sm"
                  >
                    <option disabled={true}>Pending</option>
                    <option>Review</option>
                    <option>Call For Interview</option>
                    <option>Hired</option>
                    <option>Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}