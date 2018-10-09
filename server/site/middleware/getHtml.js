import React from 'react'
import ReactDOM from 'react-dom/server'
import { Provider } from 'react-redux'
import { getBundles } from 'react-loadable/webpack'

import { minify } from 'html-minifier'
import { RouterContext } from 'react-router'

import stats from 'functions/site-build/react-loadable.json'
import assets from 'functions/site-build/assets.json'
import { Helmet, Loadable, ContextProvider, LanguageProvider, translationMessages } from 'functions/site-build/server'


const getStylesheet = (globals, path) => {
  let mediaType = 'desktop'

  if (globals.isMobile) {
    mediaType = 'mobile'
  }
  else if (globals.isTablet) {
    mediaType = 'tablet'
  }

  const chunkId     = path.replace(/\..*/, '')
  const mediaPath   = path.replace(chunkId, `${chunkId}.${mediaType}`)

  return `
    <link rel="stylesheet" href="${path}" />
    <link rel="stylesheet" href="${mediaPath}" />
  `
}

const getBundlesFiles = (globals, modules) => {
  const bundles   = getBundles(stats, modules).map(({ publicPath }) => publicPath)
  const jsFiles   = bundles.filter((publicPath) => /\.js$/.test(publicPath))
  const cssFiles  = [`/assets/${assets.site.css}`]
    .concat(bundles.filter((publicPath) => /\.css$/.test(publicPath)))
    .map((path) => getStylesheet(globals, path))

  return {
    jsFiles,
    cssFiles,
  }
}

const renderPage = ({ store, globals, addModule, renderProps }) => {
  let html

  try {
    html = ReactDOM.renderToString(
      <Loadable.Capture report={addModule}>
        <Provider store={store}>
          <LanguageProvider messages={translationMessages}>
            <ContextProvider globals={globals}>
              <RouterContext {...renderProps} />
            </ContextProvider>
          </LanguageProvider>
        </Provider>
      </Loadable.Capture>
    )
  }
  catch (err) {
    html = `
      <div>
        500 Error
        <div>${err}</div>
      </div>
    `
    console.log('Render error', err)
  }

  return html
}

const getHtml = ({ store, globals, renderProps }) => {
  const modules                = []
  const addModule              = (module) => modules.push(module)
  const html                   = renderPage({ store, globals, renderProps, addModule })
  const helmet                 = Helmet.renderStatic()
  const { cssFiles, jsFiles }  = getBundlesFiles(globals, modules)

  return minify(`
    <!DOCTYPE html>
      <html>
      <head>
        ${helmet.title.toString()}
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        ${helmet.meta.toString()}
        ${cssFiles.join('')}
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__initialState__ = ${JSON.stringify(store.getState())};
          window.__globals__ = ${JSON.stringify(globals)};
        </script>
        <script src="/assets/${assets['vendors~site'].js}"></script>
        <script src="/assets/${assets.vendors.js}"></script>
        ${jsFiles.map((publicPath) => `<script src="${publicPath}"></script>`).join('')}
        <script src="/assets/${assets.site.js}"></script>
      </body>
    </html>
  `, {
    minifyJS: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true,
  })
    .replace(/\n|\r|\s+/g, ' ')
}


export default getHtml
