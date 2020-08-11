// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const packageJson = require('../../package.json');


export const environment = {
  appName: 'FB Student',
  production: false,
  test: false,
  hmr: false,
  firebaseConfig: {
    apiKey: 'AIzaSyCSBQ3XhInl0mJjYAN0vmqtGwLi24hbj84',
    authDomain: 'friesbureau-demo.firebaseapp.com',
    databaseURL: 'https://friesbureau-demo.firebaseio.com',
    projectId: 'friesbureau-demo',
    storageBucket: 'friesbureau-demo.appspot.com',
    messagingSenderId: '719015622942',
    appId: '1:719015622942:web:3eb8fd4bf805dfabca710f',
    measurementId: 'G-59W3V955J8'
  },
  i18nPrefix: '',
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    ngxtranslate: packageJson.dependencies['@ngx-translate/core'],
    fontAwesome: packageJson.dependencies['@fortawesome/fontawesome-free'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript'],
    cypress: packageJson.devDependencies['cypress']
  },
  auth0: {
    clientID: '2bpUjikIM7qiETtfysIWEPAh6XI2QJWo',
    domain: 'friesbureau.eu.auth0.com',
    redirectUri: 'https://student.friesbureau.dk',
    logoutUrl: 'https://student.friesbureau.dk'
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
