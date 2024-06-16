export const loginRoute = '/auth/login';
export const registerRoute = '/auth/register';
export const logoutRoute = '/auth/logout';

/**
 * An array of routes that are used for authentication
 * These routes will redirect to the login page if the user is not authenticated
 */
export const authRoutes = [loginRoute, registerRoute];

/**
 * The home route to redirect to if the user is authenticated
 */
export const appHomeRoute = '/dashboard';
