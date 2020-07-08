
const path = require('path');
const fs = require("fs");
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 拆分css样式的插件
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

let { CleanWebpackPlugin } = require('clean-webpack-plugin');
let webpack = require('webpack');

module.exports = {
    mode: 'development',    // 模式配置
    // 入口文件,/多页面开发，配置多个页面
    entry: {
        index: './src/index.js' //入口文件相对路径,入口文件是整个项目开始运行的地方
        // login: './src/pages/login.js'
    },
    // 出口文件
    output: {
        path: path.resolve(__dirname, 'dist'), //打包文件的输出路径
        filename: '[name]/[name].js' //打包文件名
    },
    // 模块配置
    module: {
        rules: [//配置加载器
            {
                test: /\.js|jsx$/, //配置要处理的文件格式，一般使用正则表达式匹配
                // use: ['babel-loader'] //使用的加载器名称
                //或者这样写
                use: { loader: "babel-loader" },
                include: /src/,   // 只转化src目录下的js
                exclude: /node_modules/  // 排除掉node_modules，优化打包速度
            }, {
                test: /\.css$/,     // 解析css
                exclude: /node_modules|antd\.css/,
                // loader: 'style-loader!css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]',
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                localIdentName: '[name]_[local]-[hash:base64:5]'
                            }

                        }
                    },
                ]

            },
            {
                test: /\.less$/,     // 解析less
                // use: ExtractTextWebpackPlugin.extract({
                //     // 将css用link的方式引入就不再需要style-loader了
                //     fallback: "style-loader",
                //     use: ['css-loader', 'less-loader'] // 从右向左解析
                // })
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            modules: true,//开启
                            // localIndexName:"[name]__[local]___[hash:base64:5]"//配置class的名字
                        },

                    },
                    {
                        loader: require.resolve('less-loader'), // compiles Less to CSS
                    },
                ]
            },
            {
                test: /\.css$/,
                include:/node_modules|antd\.css/,
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                // autoprefixer({
                                //     browsers: [
                                //         '>1%',
                                //         'last 4 versions',
                                //         'Firefox ESR',
                                //         'not ie < 9', // React doesn't support IE8 anyway
                                //     ],
                                //     flexbox: 'no-2009',
                                // }),
                            ],
                        },
                    },
                ],
            },
            { //css 中引用图片
                test: /\.(jpe?g|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,    // 小于8k的图片自动转成base64格式，并且不会存在实体图片
                            outputPath: 'images/'   // 图片打包后存放的目录
                        }
                    }
                ]
            },
            { //页面img引用图片
                test: /\.(htm|html)$/,
                use: 'html-withimg-loader'
            },
            { //引用字体图片和svg图片
                test: /\.(eot|ttf|woff|svg)$/,
                use: 'file-loader'
            }
        ]
    },
    // 插件配置
    plugins: [
        // 生成HTML文件
        new HtmlWebpackPlugin({
            template: './public/index.html', //模板文件 指定路径,模板文件是构建DOM树的地方
            filename: 'index.html', //指定文件名,
            chunks: ["index"],
            inject: true,
            // hash: true, // 会在打包好的bundle.js后面加上hash串
        }),
        // new HtmlWebpackPlugin({
        //     template: './public/index.html', //模板文件 指定路径,模板文件是构建DOM树的地方
        //     filename: 'login.html', //指定文件名,
        //     chunks: ["index"],
        //     inject: true,
        //     // hash: true, // 会在打包好的bundle.js后面加上hash串
        // }),
        // 拆分后会把css文件放到dist目录下的css/style.css
        // new ExtractTextWebpackPlugin('[name]/[name].css'),
        // 打包前先清空
        new CleanWebpackPlugin(),
        // 热更新，热更新不是刷新
        new webpack.HotModuleReplacementPlugin(),

    ],
    // 开发服务器配置
    devServer: {
        host: 'localhost',
        port: 3000,             // 端口
        open: true,             // 自动打开浏览器
        hot: true,               // 开启热更新
        overlay: true, // 浏览器页面上显示错误
        // historyApiFallback: true,
        // publicPath: '/',
        // proxy: {
        //     '/api/**': {
        //         target: 'https://xlite.kedacom.com',
        //         pathRewrite: {
        //             '^/api': ''   //重写接口
        //           },          
        //         secure:false,              
        //         changeOrigin: true,
        //     }
        // }
    },

};
