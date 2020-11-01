export const authInitialStatus: AuthStatus = {
  inProgress: null,
  authenticated: null,
  username: null,
  error: null
};

export interface AuthStatus {
  inProgress: boolean;
  authenticated: boolean;
  username: string;
  error?: string;
}

export interface Credentials {
  username: string;
  password: string;
}
