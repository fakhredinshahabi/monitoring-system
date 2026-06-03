export const environment = {
  baseUrl: 'http://localhost:3000',
  authApi: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    profile: '/api/auth/profile',
    refresh: '/api/auth/refresh',
    users: '/api/users',
  },
  devicesApi: {
    devicesList: '/api/devices',
  },
};
