/*
 * @name: 文件
 * @Author: Haojin Sun
 * @Date: 2019-12-18 19:34:04
 * @LastEditors  : Haojin Sun
 * @LastEditTime : 2019-12-20 09:47:37
 */
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',

  /**
   * 在 examples 目录下建多个子目录
   * 把不同章节的 demo 放到不同的子目录中
   * 每个子目录的下会创建一个 app.ts
   * app.ts 作为 webpack 构建的入口文件
   * entries 收集了多目录个入口文件，并且每个入口还引入了一个用于热更新的文件
   * entries 是一个对象，key 为目录名
   */
  entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
    
    const fullDir = path.join(__dirname, dir)
    if(fs.statSync(fullDir).isDirectory()){
      fs.readdirSync(fullDir).reduce((entries2, dir2) => {
        const Subdirectory =  path.join(fullDir, dir2)
        const entry = path.join(Subdirectory, 'app.ts')
        if (fs.statSync(Subdirectory).isDirectory() && fs.existsSync(entry)) {
          entries[`${dir}${dir2}`] = ['webpack-hot-middleware/client', entry]
        }
      },{})
    }
    return entries
  }, {}),

  /**
   * 根据不同的目录名称，打包生成目标 js，名称和目录名一致
   */
  output: {
    path: path.join(__dirname, '__build__'),
    filename: '[name].js',
    publicPath: '/__build__/'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader'
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}