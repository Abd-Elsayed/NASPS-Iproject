/**
 * Keep localhost behavior on the development Mac, while allowing the same Angular
 * build to call the API through the Mac's LAN address from another device.
 */
const browserHost = typeof window === 'undefined' ? 'localhost' : window.location.hostname;
const browserProtocol = typeof window !== 'undefined' && window.location.protocol === 'https:' ? 'https:' : 'http:';
export const API_BASE_URL = `${browserProtocol}//${browserHost}:5222/api`;
