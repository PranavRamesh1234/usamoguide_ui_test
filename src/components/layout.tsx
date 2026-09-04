import * as React from 'react';
import { BlindModeProvider } from '../context/BlindModeContext';
import { useAnalyticsEffect } from '../hooks/useAnalyticsEffect';
import { useUpdateStreakEffect } from '../hooks/useUpdateStreakEffect';

const Layout = ({
  children,
  setLastViewedModule,
}: {
  children?: React.ReactNode;
  /**
   * If specified, in addition to updating number of pageviews,
   * we will also update lastViewedModule
   */
  setLastViewedModule?: string;
}): JSX.Element => {
  useAnalyticsEffect();
  useUpdateStreakEffect({ setLastViewedModule });

  return (
    <BlindModeProvider>
      <div className="relative min-h-screen font-sans">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-center bg-repeat opacity-5"
          style={{ backgroundImage: 'url(/images/math-doodles.png)' }}
        />
        <div className="relative z-10">{children}</div>
      </div>
    </BlindModeProvider>
  );
};

export default Layout;
