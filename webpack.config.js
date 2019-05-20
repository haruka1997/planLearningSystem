const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
 
    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: {
      login: './script/login.js',
      moduleInit: `./script/module/moduleInit.js`,
      planCreate: `./script/planCreate.js`,
      learningRecord: `./script/learningRecord.js`
    },
    mode: 'development',
   
    // ファイルの出力設定
    output: {
      // path: './dist',
      // 出力ファイル名
      filename: "[name].bundle.js",
      path: path.join(__dirname, 'application/dist')
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          loader: "html-loader"
        },
        { test: /\.svg$/, 
          loader: 'svg-url-loader'
        },
        {
          test: /\.css/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: { url: false }
            }
          ]
        }
      ]
    }
  };
  