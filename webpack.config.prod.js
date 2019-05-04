const path = require("path");

module.exports = {

    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        modules: [
            "node_modules",
            "src",
        ]
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                loader: "babel-loader"
            }
        ]
    }
};