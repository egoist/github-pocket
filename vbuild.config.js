const path = require('path')

module.exports = {
  entry: 'src/index.js',
  dist: 'extension/dist',
  html: false,
  extract: true,
  vendor: false,
  filename: {
    js: 'github-improved.js',
    css: 'github-improved.css'
  },
  production: {
    sourceMap: false
  },
  webpack: {
    resolve: {
      modules: [
        path.resolve('src')
      ]
    }
  }
}