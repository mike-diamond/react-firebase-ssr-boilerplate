# react-firebase-ssr-boilerplate
React app boilerplate with server side rendering, code and styles splitting, multilingual i18n

[DEMO](https://react-firebase-chat-11658.firebaseapp.com/)

[![Npm Version](https://badge.fury.io/js/react-firebase-ssr-boilerplate.svg)](https://www.npmjs.com/package/react-firebase-ssr-boilerplate)
[![Month Downloads](https://img.shields.io/npm/dm/react-firebase-ssr-boilerplate.svg)](http://npm-stat.com/charts.html?package=react-firebase-ssr-boilerplate)
[![Npm Licence](https://img.shields.io/npm/l/react-firebase-ssr-boilerplate.svg)](https://www.npmjs.com/package/react-firebase-ssr-boilerplate)

### Instalation
`npm install react-firebase-ssr-boilerplate`

### Usage

### Initial installation
1. Install npm dependencies in the root folder.

    Run: `npm install` 
2. Install npm dependencies in the `functions` folder (needed for firebase environment).

    Run: `cd functions && npm install && cd ../`
3. Add your config to `/firebase-config.json`
4. Add alias and projectId to `/.firebaserc`
5. Add service account data to `/server/site/middleware/service-account.json`
6. If you using firestore (if not just skip this step) - uncomment imports and functions in
`/site/client/redux/store/index.js` and use `firestoreConnect` where you need, for example
in `/site/client/pages/ChatPage/Chat/Chat.js`

### Run project
- After initial installation you can start the project in development mode:

    `npm run site:dev`
- You can build the project and run it with server side rendering:
  - To run without firebase environment: `npm run site:start`
  - To run with firebase environment: `npm run site:build && cd functions && firebase serve`
- Or you can deploy the app to the firebase hosting:

    `npm run site:build && cd functions && firebase deploy`


### Boilerplate composition

#### - Multilanguage internationalisation
Based on [react-intl](https://github.com/yahoo/react-intl). Translation switches on change
store property `state.me.locale`.
All translations defines in `messages.js` file in the root of each component.

#### - Code splitting
Based on [react-loadable](https://github.com/jamiebuilds/react-loadable) and splits code for each page in routes.

#### - Styles splitting
Based on [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) which splits
styles for each page and [media-query-splitting-plugin](https://github.com/mike-diamond/media-query-splitting-plugin)
which splits styles by media query (mobile, tabletLandscape, tabletPortrait and desktop).

#### - SEO
Based on [react-helmet](https://github.com/nfl/react-helmet) which allows to manage SEO tags (title, meta etc)
