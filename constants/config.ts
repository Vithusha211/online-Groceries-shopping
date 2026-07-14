/**
 * Backend API base URL.
 * On a physical phone, use your PC LAN IP (set automatically by `npm start`).
 * Example: http://192.168.8.135:4000/api
 */
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? 'http://127.0.0.1:4000/api';
