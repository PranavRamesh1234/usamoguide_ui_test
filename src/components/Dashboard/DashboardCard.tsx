import * as React from 'react';

export default function DashboardCard(props) {
  return (
    <div
      className="rounded-xl p-0"
      style={{
        background: 'var(--card-bg)',
      }}
      {...props}
    />
  );
}
