import { createSimpleUserDataMutation, createUserDataGetter } from './hooks';

export const useShowTagsSetting = createUserDataGetter(userData => {
  return userData.showTags;
});
export const useSetShowTagsSetting = createSimpleUserDataMutation(
  (userData, showTags: boolean) => {
    return {
      showTags,
    };
  }
);

export const useShowIgnoredSetting = createUserDataGetter(userData => {
  return userData.showIgnored;
});
export const useSetShowIgnoredSetting = createSimpleUserDataMutation(
  (userData, showIgnored: boolean) => {
    return {
      showIgnored,
    };
  }
);

export type Theme = 'light' | 'dark' | 'system';
export const useThemeSetting = createUserDataGetter(userData => {
  return userData.theme;
});
export const useSetThemeSetting = createSimpleUserDataMutation(
  (userData, theme: Theme) => {
    return {
      theme,
    };
  }
);

export const useHideDifficultySetting = createUserDataGetter(userData => {
  return userData.hideDifficulty;
});
export const useSetHideDifficultySetting = createSimpleUserDataMutation(
  (userData, hideDifficulty: boolean) => {
    return {
      hideDifficulty,
    };
  }
);

export const useHideModulesSetting = createUserDataGetter(userData => {
  return userData.hideModules;
});
export const useSetHideModulesSetting = createSimpleUserDataMutation(
  (userData, hideModules: boolean) => {
    return {
      hideModules,
    };
  }
);

export const useDivisionTableQuery = createUserDataGetter(
  userData => userData.divisionTableQuery
);
export const useSetDivisionTableQuery = createSimpleUserDataMutation(
  (userData, divisionTableQuery: typeof userData.divisionTableQuery) => {
    return {
      divisionTableQuery,
    };
  }
);

// last viewed module is set in useUpdateStreakEffect
// we keep updates batched to avoid excessive remote writes
export const useLastViewedModule = createUserDataGetter(
  userData => userData.lastViewedModule
);

/*
TODO LATER
export const blindMode = defineBooleanProperty({
  default: false,
});
*/
