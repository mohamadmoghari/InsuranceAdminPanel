var path = require('path')
var webpack = require('webpack')
var moment = require('moment-jalaali')
var isProduction = process.env.NODE_ENV === 'production'

var buildName = 'Insurance.bundle.js'
var buildVersion = moment().format('jYYjMMjDDHHmm')
var buildNameVersion = buildName + '?v=' + buildVersion

var fs = require('fs')
fs.readFile('./index.html', 'utf8', function(err, data) {
    // eslint-disable-next-line
    if (err) return console.error(err)
    var regEx = 'script(.+?)src="dist/(.+?)"'
    var replace = 'script$1src="dist/' + buildNameVersion + '"'
    var result = data.replace(new RegExp(regEx), replace)
    fs.writeFile('./index.html', result, 'utf8', function(err) {
        // eslint-disable-next-line
        if (err) return console.error(err)
    })
})

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: 'dist/',
        filename: buildNameVersion
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        scss: 'vue-style-loader!css-loader!sass-loader',
                        sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(ttf|woff|eot|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]?[hash]'
                }
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: 'vue-style-loader' },
                    { loader: 'css-loader', options: { sourceMap: !isProduction } },
                    { loader: 'sass-loader', options: { sourceMap: !isProduction } }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            //'vue$': 'vue/dist/vue.esm.js',
            jquery: 'jquery/src/jquery.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jquery: 'jQuery',
            'window.jQuery': 'jquery'
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        port: 9090
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
        // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "vendor",
        //     minChunks: function (module) {
        //         return module.context && module.context.indexOf("node_modules") !== -1;
        //     }
        // }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
