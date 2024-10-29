import {RootState} from './index';

/*     AUTH SLICE     */

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;

/*     FEED SLICE     */

export const selectFeed = (state: RootState) => state.feed;

/*     THEME SLICE     */

export const selectIsDarkMode = (state: RootState) => state.theme.darkMode;
