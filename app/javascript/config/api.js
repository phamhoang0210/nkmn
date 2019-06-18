let host;
const baseUri = host + "/api/v01"
let hostAppCode = host;

if(process.env.NODE_ENV === 'development') {
  hostAppCode = 'http://localhost:3000';
}else if(process.env.API_ENV !== 'production') {
  hostAppCode = 'https://appcode.vn'
}else {
  hostAppCode = 'http://appcode-staging.vn'
}

export const APP_CODE_CONFIG = {
  host: hostAppCode,
  baseUri: baseUri,
  users: 'users',
};
