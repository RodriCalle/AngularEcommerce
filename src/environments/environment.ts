// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  name: 'default',
  firebase: {
    config: {
      apiKey: "AIzaSyCCL3SOp8pbrUa8kaN4TJ0o-2vjhjE9PaQ",
      authDomain: "ecommerce-428a9.firebaseapp.com",
      projectId: "ecommerce-428a9",
      storageBucket: "ecommerce-428a9.appspot.com",
      messagingSenderId: "200146560889",
      appId: "1:200146560889:web:fe69d0568d1e3b7d5171a8"
    }
  },
  actionCodeSettings: {
    url: 'http://localhost:5200/profile/new',
    handleCodeInApp: true
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
