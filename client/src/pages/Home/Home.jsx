import React, { Suspense } from 'react'
import Banner from './Banner'
import HotJobs from './HotJobs'

export default function Home() {
  const jobsPromise = fetch(`${import.meta.env.VITE_API_URL}/jobs`).then(res => res.json());

  return (
    <main>
      <h2 className="sr-only">This is home</h2>

      <Banner />

      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center gap-3 py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="text-sm opacity-70">Loading hot jobs</p>
          </div>
        }
      >
        <HotJobs jobsPromise={jobsPromise} />
      </Suspense>
    </main>
  )
}