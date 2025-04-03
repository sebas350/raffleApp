const path = require('path');


module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: ''
    },
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 3000,
        open: true,
        hot: true
    },
    module: {
        rules: [
            {test: /\.css$/,
            use: ["style-loader", "css-loader"],
            },
        ],
    },
    mode: 'production'
};

