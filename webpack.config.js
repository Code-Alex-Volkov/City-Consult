const webpack = require('webpack');

const config = {
    entry: {
        works: "./src/assets/scripts/works.js"
    },
    output: {
        filename: "[name].bundle.js"
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    mode: 'development',
};

module.exports = config;