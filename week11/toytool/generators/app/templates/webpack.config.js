const HtmlWebpackPlugin = require(require.resolve('html-webpack-plugin', { paths: [process.cwd()] }));
const webpack = require('webpack'); //to access built-in plugins
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: "./src/main.js",
    module: {
        rules: [
            { test: /\.vue$/, use: 'vue-loader' },
            { test: /\.css$/, use: ['vue-style-loader', 'css-loader'] }
        ],
    },
    plugins: [
        new VueLoaderPlugin()
        ],
};