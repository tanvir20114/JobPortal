import React from 'react'

const getStatusClass = (status) => {
  if (status === 'accepted') return 'badge-success';
  if (status === 'rejected') return 'badge-error';
  return 'badge-ghost';
};

export default function JobApplicationRow({ application, index }) {
  const { company, title, company_logo, linkedIn, github, status } = application;

  return (
    <tr className="hover">
      <th className="font-normal opacity-70">{index + 1}</th>

      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12 bg-base-200">
              {company_logo ? (
                <img src={company_logo} alt={company} className="object-contain" />
              ) : (
                <div className="bg-base-300 h-12 w-12 flex items-center justify-center text-xs opacity-70">
                  N/A
                </div>
              )}
            </div>
          </div>

          <div className="min-w-0">
            <div className="font-bold">{company}</div>
            <div className="text-sm opacity-60">{title}</div>
          </div>
        </div>
      </td>

      <td>
        <div className="flex flex-col gap-1 text-sm">
          {linkedIn && (
            <a href={linkedIn} target="_blank" rel="noreferrer" className="link link-primary link-hover">
              LinkedIn
            </a>
          )}
          {github && (
            <a href={github} target="_blank" rel="noreferrer" className="link link-primary link-hover">
              GitHub
            </a>
          )}
        </div>
      </td>

      <td>
        <span className={`badge capitalize ${getStatusClass(status)}`}>
          {status || 'pending'}
        </span>
      </td>
    </tr>
  )
}