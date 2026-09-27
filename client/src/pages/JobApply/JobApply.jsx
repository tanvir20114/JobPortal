import React from 'react'
import { Link, useParams } from 'react-router'
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { notifyError } from '../../utils/notify.js'


export default function JobApply() {
  const { id: jobId } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleApplyFormSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const linkedIn = form.LinkedIn.value;
    const github = form.github.value;
    const resume = form.resume.value;
    const application = {
      jobId,
      applicant: user.email,
      linkedIn,
      github,
      resume
    }

    axiosSecure.post('/applications', application).then(res => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been Submitted",
          showConfirmButton: false,
          timer: 1500
        });
      }
    }).catch(error => {
      notifyError(error)
    });
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-3xl font-bold">Apply for this job</h3>
        <Link to={`/jobs/${jobId}`} className="link link-primary link-hover text-sm font-medium">
          Details
        </Link>
      </div>

      <form onSubmit={handleApplyFormSubmit}>
        <fieldset className="fieldset bg-base-100 border-base-200 rounded-box w-full border p-6 shadow-sm">
          <label className="label">LinkedIn Link</label>
          <input
            type="url"
            className="input w-full"
            name="LinkedIn"
            placeholder="LinkedIn Profile Link"
          />

          <label className="label mt-2">Github Link</label>
          <input
            type="url"
            className="input w-full"
            name="github"
            placeholder="Github Link"
          />

          <label className="label mt-2">Resume Link</label>
          <input
            type="url"
            className="input w-full"
            name="resume"
            placeholder="Resume Link"
          />

          <input type="submit" className="btn btn-primary mt-6 w-full" value="Apply" />
        </fieldset>
      </form>
    </div>
  )
}