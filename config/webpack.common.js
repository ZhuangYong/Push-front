/**
 * Created by walljack@163.com on 2017/7/11.
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const {HtmlHandel} = require('./webpack.plugin');
const config = require('./project.config');

const PATH_BUILD = path.join(__dirname, '../build/');
const PATH_ROOT = path.join(__dirname, '../');
const PATH_MAIN_JS = path.join(PATH_ROOT, 'src/index.js');
const PATH_CONFIG = path.join(PATH_ROOT, 'config/');
const PATH_SRC = path.join(PATH_ROOT, 'src/');
const PATH_SRC_JS = path.join(PATH_SRC, 'js/');
const PATH_SRC_JSS = path.join(PATH_SRC, 'assets/jss/');
const PATH_SRC_JS_LIB = path.join(PATH_SRC_JS, 'lib/');
const PATH_SRC_CSS = path.join(PATH_SRC, 'css/');
const PATH_SRC_THEME_SASS = path.join(PATH_SRC, 'js/themes');
const PATH_SRC_SASS = path.join(PATH_SRC, 'assets/scss/');
const PATH_MODULES = path.join(PATH_ROOT, 'node_modules/');

let env;
switch (process.env.NODE_ENV) {
    case "development":
        env = config.build['devEnv'];
    break;
    case "test":
        env = config.build['testEnv'];
        break;
    case "production":
        env = config.build['prodEnv'];
        break;
    default:
        env = config.build['devEnv'];
}

module.exports = {
    context: path.join(__dirname, "../"),
    entry: {
        'main': PATH_MAIN_JS,
        'vendor': ["babel-polyfill", "material-ui"],
        'polyfills': ["react", "react-dom", "react-router-dom", "react-router", "history",  "mobx", "mobx-react"]
    },

    output: {
        path: PATH_BUILD,
        filename: '[name].bundle.js',
        publicPath: '/build/',
        sourceMapFilename: '[name].map'
    },

    resolve: {
        extensions: [ ' ', '.js', '.json', '.jsx' ],
        // extensions: ['.js', '.jsx'],
        modules: [PATH_SRC, PATH_MODULES]
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [
                    PATH_SRC,
                ],
                exclude: [
                    path.join(PATH_SRC, 'controller'),
                    path.join(PATH_SRC, 'assets/img')
                ],
                use: [
                    {
                        loader: "babel-loader",
                        query: {
                            presets: ['react', 'es2015', 'stage-2'],
                            plugins: [
                                'syntax-dynamic-import',
                                'transform-runtime',
                                'babel-plugin-add-module-exports',
                                'transform-object-assign',
                                'add-module-exports',
                                // 'transform-class-properties',
                                'react-hot-loader/babel',
                                'transform-decorators-legacy'
                            ]
                        }
                    },
                    {
                        loader: "eslint-loader",
                        options: {
                            configFile: path.join(PATH_CONFIG, '.eslintrc.js'),
                            formatter: require('eslint-friendly-formatter')
                        }
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                include: [
                    path.join(PATH_SRC, 'controller')
                ],
                exclude: [
                    path.join(PATH_SRC, 'assets/img')
                ],
                use: [
                    {
                        loader: "bundle-loader?lazy"
                    },
                    {
                        loader: "babel-loader",
                        query: {
                            presets: ['es2015', 'react', 'stage-2'],
                            plugins: [
                                'syntax-dynamic-import',
                                'transform-runtime',
                                'babel-plugin-add-module-exports',
                                'transform-object-assign',
                                'add-module-exports',
                                // 'transform-class-properties',
                                'react-hot-loader/babel',
                                'transform-decorators-legacy'
                            ]
                        }
                    },
                    {
                        loader: "eslint-loader",
                        options: {
                            configFile: path.join(__dirname, '.eslintrc.js'),
                            formatter: require('eslint-friendly-formatter')
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                include: [
                    PATH_SRC_CSS,
                    PATH_MODULES
                ],

                //把css link进去
                // use: ExtractTextPlugin.extract({
                //     fallback: "style-loader",
                //     use: "css-loader"
                // })
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }]

            },

            {
                test: /\.scss$/,
                include: [
                    PATH_SRC,
                    PATH_SRC_THEME_SASS
                ],
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            },

            {
                test: /\.(png|jpg|jpeg|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 512,
                        name: '[path][name].[ext]?[hash]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new ExtractTextPlugin("[name].css"),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['polyfills', 'vendor'].reverse()
        }),

        /*new HtmlHandel({
         paths: ['init/initial.js']
         }),*/

        new HtmlWebpackPlugin({
            template: path.join(PATH_ROOT + '/public/index.html'),
            filename: path.join(PATH_ROOT + '/build/index.html'),
            hash: true,
            chunksSortMode: function (chunk1, chunk2) {
                let order = ['polyfills', 'vendor', 'main'];
                let order1 = order.indexOf(chunk1.names[0]);
                let order2 = order.indexOf(chunk2.names[0]);
                return order1 - order2;
            }
        }),

        // 打开浏览器
        new OpenBrowserPlugin({
            url: 'http://merchant.j-make.com.cn'
        })
    ]
};
