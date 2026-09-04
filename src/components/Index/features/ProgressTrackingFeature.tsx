import React from 'react';
import DashboardCard from '../../Dashboard/DashboardCard';

export const ProgressTrackingFeature = (): JSX.Element => {
  const counts = {
    completed: 6,
    inProgress: 3,
    skipped: 2,
    notStarted: 1,
  };
  const total =
    counts.completed + counts.inProgress + counts.skipped + counts.notStarted;
  const percentComplete = total === 0 ? 0 : Math.round((counts.completed / total) * 100);
  const segment = (value: number) => (total === 0 ? 0 : (value / total) * 100);

  return (
    <div className="-m-4">
      <div className="w-full p-4">
        <DashboardCard>
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-300">
                  Modules Progress
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {total} total
                </p>
              </div>
              <div className="rounded-lg bg-gray-100 px-4 py-3 text-center dark:bg-gray-700">
                <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  {percentComplete}%
                </div>
                <div className="text-xs font-medium uppercase text-gray-500 dark:text-gray-300">
                  Complete
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500 dark:bg-green-700" />
                  Completed
                </span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {counts.completed}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400 dark:bg-yellow-700" />
                  In progress
                </span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {counts.inProgress}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-500 dark:bg-blue-700" />
                  Skipped
                </span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {counts.skipped}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <span className="h-2.5 w-2.5 rounded-full bg-gray-300 dark:bg-gray-600" />
                  Not started
                </span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {counts.notStarted}
                </span>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  style={{ width: `${segment(counts.completed)}%` }}
                  className="h-2 bg-green-500 dark:bg-green-700"
                />
                <div
                  style={{ width: `${segment(counts.inProgress)}%` }}
                  className="h-2 bg-yellow-400 dark:bg-yellow-700"
                />
                <div
                  style={{ width: `${segment(counts.skipped)}%` }}
                  className="h-2 bg-blue-500 dark:bg-blue-700"
                />
                <div
                  style={{ width: `${segment(counts.notStarted)}%` }}
                  className="h-2 bg-gray-300 dark:bg-gray-600"
                />
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};
