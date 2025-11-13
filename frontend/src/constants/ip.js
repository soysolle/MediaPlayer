// Enable or disable proxy usage
export const USE_PROXY = false;

// Backend address (local IP or public URL)
export const HOST_ADDR = 'http://192.168.0.5:3000';
// export const HOST_ADDR = "https://cf09-163-239-201-180.ngrok.io"; // Optional alternative address

// ###### API Endpoints ######

// Search endpoint
const searchEndpoint = '/mediaitems/search';
export const SEARCH_ADDR = USE_PROXY 
    ? searchEndpoint 
    : HOST_ADDR + searchEndpoint;

// Login endpoint
const loginEndPoint = '/login';
export const LOGIN_ADDR = USE_PROXY 
    ? loginEndPoint 
    : HOST_ADDR + loginEndPoint;

// Favorite endpoints
const favoriteEndPoint = '/favorite';
export const FAVORITE_LIST_ADDR = USE_PROXY 
    ? favoriteEndPoint 
    : HOST_ADDR + favoriteEndPoint + '/list';
export const FAVORITE_CHECK_ADDR = USE_PROXY 
    ? favoriteEndPoint 
    : HOST_ADDR + favoriteEndPoint + '/check';
export const FAVORITE_ADD_ADDR = USE_PROXY 
    ? favoriteEndPoint 
    : HOST_ADDR + favoriteEndPoint + '/add';
export const FAVORITE_REMOVE_ADDR = USE_PROXY 
    ? favoriteEndPoint 
    : HOST_ADDR + favoriteEndPoint + '/remove';

// Playback endpoints
const playbackEndpoint = '/playback';
export const PLAYBACK_ADDR = USE_PROXY 
    ? playbackEndpoint 
    : HOST_ADDR + playbackEndpoint;
export const PLAYBACK_FIND_ADDR = USE_PROXY 
    ? playbackEndpoint 
    : HOST_ADDR + playbackEndpoint + '/find';
