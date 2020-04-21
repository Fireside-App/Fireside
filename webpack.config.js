path = require("path");
HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: [
    // entry point of our app
    "./src/index.js"
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "bundle.js"
  },
  devtool: "eval-source-map",
  mode: "development",
  devServer: {
    host: "localhost",
    port: 8080,
    // match the output path
    contentBase: path.resolve(__dirname, "dist"),
    // enable HMR on the devServer
    hot: true,
    // match the output 'publicPath'
    publicPath: "/",
    // fallback to root for other urls
    historyApiFallback: true,

    inline: true,

    headers: { "Access-Control-Allow-Origin": "*" },
    /**
     * proxy is required in order to make api calls to
     * express server while using hot-reload webpack server
     * routes api fetch requests from localhost:8080/api/* (webpack dev server)
     * to localhost:3000/api/* (where our Express server is running)
     */
    proxy: {
      "/": {
        target: "http://localhost:3000/",
        secure: false
      },
      "/camp/*": {
        target: "http://localhost:3000/",
        secure: false
      },
      "/user/login": {
        target: "http://localhost:3000/",
        secure: false
      }
    }
  },
  //   //this node was added to fix fs and net errors
  //   node: {
  //     fs: "empty",
  //     net: 'empty',
  //     tls: 'empty',
  //     dns: 'empty'
  //  },
  module: {
    //   //added to fix the dependency warning
    //   noParse: function (content) {
    //     return /express/.test(content);
    // },
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /.(css|scss)$/,
        // exclude: /node_modules/,
        // use: ['style-loader', 'css-loader', 'sass-loader'],
        use: [
          {
            loader: "style-loader" // inject CSS to page
          },
          {
            loader: "css-loader" // translates CSS into CommonJS modules
          },
          {
            loader: "postcss-loader", // Run post css actions
            options: {
              plugins: function() {
                // post css plugins, can be exported to postcss.config.js
                return [require("precss"), require("autoprefixer")];
              }
            }
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: [".js", ".jsx"]
  }
};
