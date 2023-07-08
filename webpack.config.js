const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  resolve: {
    fallback: {
      "buffer": false,
      "crypto": false,
      "http": false,
      "https": false,
      "os": false,
      "path": false,
      "util": false,
      "zlib": false
    }
  }
};
