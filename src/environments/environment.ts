// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  GCP: {
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    client_secret: 'tRS1nGoMFNK-88vAePccX7Gi',
    TRAVEL: {
      name: 'Travel',
      apiKey: 'AIzaSyATc4VrAMYW2-Z31TD2hS1Po4-XgtXw8WI',
      client_id: '826436261333-0707nbu0o7l49bb2fpg1nokb33gtllia.apps.googleusercontent.com',
      project_id: 'travel-272407',
    },
    MY_MAPS: {
      name: 'My Maps Project',
      apiKey: 'AIzaSyCoyLacmAqoMKFecnjIHN6rOguWXmZfruo',
      client_id: '151161582611-i9fkqu14n7giqluadt174na8nil5qo2r.apps.googleusercontent.com',
      project_id: 'ivory-lotus-272709'
    }
  },
  OPENWEATHER: {
    appid: '24aac48b2c5f1c06ed90d17dc31ae21c',
    api_endpoint: 'https://api.openweathermap.org/data/2.5/'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
