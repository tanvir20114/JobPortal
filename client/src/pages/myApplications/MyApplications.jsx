import React, { Suspense } from 'react'
import ApplicationStats from './ApplicationStats'
import ApplicationList from './ApplicationList'
import useAuth from '../../hooks/useAuth'
import useApplicationApi from '../../api/useApplicationApi';

export default function MyApplications() {

const {user} = useAuth();
const {myApplicationsPromise} = useApplicationApi();

  return (
    <div>
    <Suspense fallback={'loading your applications'}>
            <ApplicationList
            myApplicationsPromise={myApplicationsPromise(user.email)}
            ></ApplicationList>
    </Suspense>
    </div>
  )
}
