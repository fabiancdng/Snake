const path = require('path');

module.exports = {
    entry: './src/App.ts',
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'game-bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts']
    }
}