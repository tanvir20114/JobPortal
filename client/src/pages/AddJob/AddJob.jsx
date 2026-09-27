import React from 'react'
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { notifyError } from '../../utils/notify.js'

const fieldsetClass = "fieldset bg-base-100 border-base-200 rounded-box w-full border p-5 shadow-sm";

export default function AddJob() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }

  const handleAddAJob = e => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const { min, max, currency, ...newJob } = data;
    newJob.salaryRange = { min, max, currency }
    const requirementsString = newJob.requirements;
    const requirementsDirty = requirementsString.split(',');
    const requirementsClean = requirementsDirty.map(req => req.trim());
    newJob.requirements = requirementsClean;

    newJob.responsibilities = newJob.responsibilities.split(',').map(res => res.trim());

    newJob.status = "active";

    axiosSecure.post('/jobs', newJob).then(res => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "This new Job has been saved and published.",
          showConfirmButton: false,
          timer: 1500
        })
      }
    }).catch(error => { notifyError(error) });
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold">
          Please add a <span className="text-primary">job</span>
        </h2>
        <div className="w-16 h-1 bg-primary rounded-full mx-auto mt-3"></div>
      </div>

      <form onSubmit={handleAddAJob} className="flex flex-col gap-5">
        <fieldset className={fieldsetClass}>
          <legend className="fieldset-legend">Basic Info</legend>

          <label className="label">Job Title</label>
          <input type="text" className="input w-full" name="title" placeholder="Job Title" />

          <label className="label mt-2">Company</label>
          <input type="text" name="company" className="input w-full" placeholder="Company Name" />

          <label className="label mt-2">Location</label>
          <input type="text" name="location" className="input w-full" placeholder="Company Location" />

          <label className="label mt-2">Company logo</label>
          <input type="text" name="company_logo" className="input w-full" placeholder="Company Logo URL" />
        </fieldset>

        <fieldset className={fieldsetClass}>
          <legend className="fieldset-legend">Job Type</legend>
          <div className="filter">
            <input className="btn filter-reset" type="radio" name="JobType" aria-label="All" />
            <input className="btn" type="radio" name="JobType" value="On-Site" aria-label="On-Site" />
            <input className="btn" type="radio" name="JobType" value="Remote" aria-label="Remote" />
            <input className="btn" type="radio" name="JobType" value="Hybrid" aria-label="Hybrid" />
          </div>
        </fieldset>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <fieldset className={fieldsetClass}>
            <legend className="fieldset-legend">Job Category</legend>
            <select defaultValue="Job Category" name="category" className="select w-full">
              <option disabled={true}>Job Category</option>
              <option>Engineering</option>
              <option>Marketing</option>
              <option>Finance</option>
            </select>
          </fieldset>

          <fieldset className={fieldsetClass}>
            <legend className="fieldset-legend">Application Deadline</legend>
            <input type="date" name="deadline" className="input w-full" />
          </fieldset>
        </div>

        <fieldset className={fieldsetClass}>
          <legend className="fieldset-legend">Salary Range</legend>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="label">Minimum Salary</label>
              <input type="text" name="min" className="input w-full" placeholder="Minimum Salary" />
            </div>

            <div>
              <label className="label">Maximum Salary</label>
              <input type="text" name="max" className="input w-full" placeholder="Maximum Salary" />
            </div>

            <div>
              <label className="label">Currency</label>
              <select defaultValue="Select a Currency" name="currency" className="select w-full">
                <option disabled={true}>Select a Currency</option>
                <option>BDT</option>
                <option>USD</option>
                <option>EU</option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset className={fieldsetClass}>
          <legend className="fieldset-legend">Job Description</legend>
          <textarea className="textarea w-full h-28" name="description" placeholder="Job Description"></textarea>
        </fieldset>

        <fieldset className={fieldsetClass}>
          <legend className="fieldset-legend">Job Requirements</legend>
          <textarea className="textarea w-full h-24" name="requirements" placeholder="Requirements (separate by comma)"></textarea>
        </fieldset>

        <fieldset className={fieldsetClass}>
          <legend className="fieldset-legend">Job Responsibilities</legend>
          <textarea className="textarea w-full h-24" name="responsibilities" placeholder="Responsibilities (separate by comma)"></textarea>
        </fieldset>

        <fieldset className={fieldsetClass}>
          <legend className="fieldset-legend">HR Related Info</legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">HR Name</label>
              <input type="text" className="input w-full" name="hr_name" placeholder="HR Name" />
            </div>

            <div>
              <label className="label">HR Email</label>
              <input
                type="email"
                name="hr_email"
                defaultValue={user?.email || ''}
                className="input w-full"
                placeholder="HR Email"
              />
            </div>
          </div>
        </fieldset>

        <input type="submit" value="Add Job" className="btn btn-primary w-full" />
      </form>
    </div>
  )
}