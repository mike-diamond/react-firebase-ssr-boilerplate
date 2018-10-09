# react-firebase-ssr-boilerplate
React app boilerplate with server side rendering, code and styles splitting, multilingual i18n

[DEMO](https://react-firebase-chat-11658.firebaseapp.com/)

[![Npm Version](https://badge.fury.io/js/react-firebase-ssr-boilerplate.svg)](https://www.npmjs.com/package/react-firebase-ssr-boilerplate)
[![Month Downloads](https://img.shields.io/npm/dm/react-firebase-ssr-boilerplate.svg)](http://npm-stat.com/charts.html?package=react-firebase-ssr-boilerplate)
[![Npm Licence](https://img.shields.io/npm/l/react-firebase-ssr-boilerplate.svg)](https://www.npmjs.com/package/react-firebase-ssr-boilerplate)

### Usage
#### Initial installation
1. Install npm dependencies in the root folder. Run:
`npm install` 
2. Install npm dependencies in the `functions` folder (needed for firebase environment). Run:
`cd functions && npm install && cd ../`
3. Add your config to `/firebase-config.json`
4. Add alias and projectId to `/.firebaserc`
5. Add service account data to `/site/middleware/service-account.json`

#### Run project
- Now you can start the project in development mode:
`npm run site:dev`
- You can build the project and run it with server side rendering:
  - To run without firebase environment `npm run site:start`
  - To run with firebase environment `npm run site:build && cd functions && firebase serve`
- Or you can deploy your app to the firebase hosting:
`npm run site:build && cd functions && firebase deploy`