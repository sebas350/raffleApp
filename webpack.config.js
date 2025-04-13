const path = require('path');


module.exports = {
    entry: './src/index.ts',
    watchOptions: {
      ignored: /node_modules|\/data\//,
    },
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
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {test: /\.css$/,
            use: ["style-loader", "css-loader"],
            },
            {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
            },
        ],
    },
    mode: 'production'
};

