import React, { Suspense } from 'react'
import useAuth from '../../hooks/useAuth';
import JobList from './JobList';
import useJobApi from '../../api/useJobApi';

export default function MyPostedJobs() {
  const {user} = useAuth();
  const { jobsCreatedByPromise } = useJobApi();
  return (
    <div>
      <h2 className='text-3xl font-bold m-4'>My posted Jobs: </h2>
      
      <Suspense>
      <JobList jobsCreatedByPromise={jobsCreatedByPromise(user.email)}></JobList>
      </Suspense>
      
    </div>
  )
}
