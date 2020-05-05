export const environment = {
  production: true,
  GCP: {
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    client_secret: 'tRS1nGoMFNK-88vAePccX7Gi',
    TRAVEL: {
      name: 'MyTravelMaps',
      client_id: '207524266129-eofqorqkgmbduk96ur44rukok58r0pla.apps.googleusercontent.com',
      apiKey: 'AIzaSyC5-HvS8pMo3xEKtt6SlrC0J7-vfjLP9nE',
      project_id: 'mytravelmaps',
    },
    MY_MAPS: {
      name: 'My Maps Project',
      apiKey: 'AIzaSyB19_zfT_vKvOlGa0pz0uQqPh2L_eHleUI',
      project_id: 'totemic-vim-276208'
    }
  },
  OPENWEATHER: {
    appid: '24aac48b2c5f1c06ed90d17dc31ae21c',
    api_endpoint: 'https://api.openweathermap.org/data/2.5/'
  },
  useMock: true
};
