import * as React from 'react';
import { useEffect, useState } from 'react';
import { DarkModeContext } from './DarkModeContext';
import { useThemeSetting } from './UserDataContext/properties/simpleProperties';
import { useIsUserDataLoaded } from './UserDataContext/UserDataContext';

export function DarkModeProvider({ children }) {
  const theme = useThemeSetting();
  const isLoaded = useIsUserDataLoaded();
  const [isClient, setIsClient] = useState(false);

  const [darkMode, setDarkMode] = React.useReducer((prev, next) => {
    if (prev !== next && isClient) {
      // Only modify DOM on client
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      document.documentElement.classList.add('transitioning-color-scheme');
      setTimeout(
        () =>
          document.documentElement.classList.remove(
            'transitioning-color-scheme'
          ),
        0
      );
    }
    return next;
  }, false);

  useEffect(() => {
    setIsClient(true);
    // Force dark mode globally. Light mode is disabled.
    setDarkMode(true);
  }, [theme, isLoaded]);

  return (
    <DarkModeContext.Provider value={darkMode}>
      {children}
    </DarkModeContext.Provider>
  );
}
