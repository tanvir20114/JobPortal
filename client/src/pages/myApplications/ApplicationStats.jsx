import React from 'react'

const stats = [
  {
    title: 'Total Likes',
    value: '25.6K',
    desc: '21% more than last month',
    color: 'text-primary',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-8 w-8 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        ></path>
      </svg>
    ),
  },
  {
    title: 'Page Views',
    value: '2.6M',
    desc: '21% more than last month',
    color: 'text-secondary',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-8 w-8 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        ></path>
      </svg>
    ),
  },
];

export default function ApplicationStats() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="stats stats-vertical sm:stats-horizontal w-full border border-base-200 bg-base-100 shadow-sm">
        {stats.map((item) => (
          <div key={item.title} className="stat">
            <div className={`stat-figure ${item.color}`}>{item.icon}</div>
            <div className="stat-title">{item.title}</div>
            <div className={`stat-value ${item.color}`}>{item.value}</div>
            <div className="stat-desc">{item.desc}</div>
          </div>
        ))}

        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar avatar-online">
              <div className="w-16 rounded-full">
                <img
                  src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                  alt="Profile"
                />
              </div>
            </div>
          </div>
          <div className="stat-value">86%</div>
          <div className="stat-title">Tasks done</div>
          <div className="stat-desc text-secondary">31 tasks remaining</div>
        </div>
      </div>
    </div>
  )
}