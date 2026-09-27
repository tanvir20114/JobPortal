import React from 'react'
import useAxiosSecure from '../hooks/useAxiosSecure'

export default function useApplicationApi() {
    const axiosSecure = useAxiosSecure();
    const myApplicationsPromise = async (email) => {
        return await axiosSecure.get(`/applications?email=${email}`).then(res => res.data)
    }
  return { 
    myApplicationsPromise
  };
}
