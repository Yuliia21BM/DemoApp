/*     AUTH SLICE     */
export interface User {
  email: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

/*     FEED SLICE     */
export interface ImageItem {
  id: number;
  uri: string;
  author: string;
}

export interface FeedState {
  images: ImageItem[];
  loading: boolean;
  refreshing: boolean;
  page: number;
}

/*     THEME SLICE     */
export interface ThemeState {
  darkMode: boolean;
}
