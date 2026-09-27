import React from 'react'
import useAxiosSecure from '../hooks/useAxiosSecure'

export default function useJobApi() {
    const axiosSecure = useAxiosSecure();

    const jobsCreatedByPromise = async (email) => {
        return await axiosSecure.get(`/jobs/applications?email=${email}`).then(res => res.data)
    }

    const deleteJob = async (id) => {
        return await axiosSecure.delete(`/jobs/${id}`).then(res => res.data)
    }

  return {
    jobsCreatedByPromise,
    deleteJob
  };
}