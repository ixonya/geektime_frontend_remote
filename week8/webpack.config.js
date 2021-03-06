module.exports = {
    entry: "./gesture/gesture.js",
    output: {
        filename:"bundle.js",
        path: __dirname + '/dist'
    },
    module: {
        rules: [
            {
                test: /.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: [
                            [
                                "@babel/plugin-transform-react-jsx",
                                {
                                    pragma: "createElement"
                                }
                            ]
                        ]
                    }
                }
            }
        ]
    },
    mode: "development"
}