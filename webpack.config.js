const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = {
 
    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: {
      planCreate: `./script/planCreate.js`,
      learningRecord: `./script/learningRecord.js`
    },
    mode: 'development',
   
    // ファイルの出力設定
    output: {
      // path: './dist',
      // 出力ファイル名
      filename: "[name].bundle.js",
      path: path.join(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          loader: "html-loader"
        }
      ]
    }
  };
  