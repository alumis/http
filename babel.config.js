module.exports = function (api) {

    api.cache(true);

    const presets = [
        // [
        //     "@babel/env",
        //     {
        //         // "targets": {
        //         //     "chrome": "49",
        //         //     "ie": "11",
        //         //     "safari": "9",
        //         //     "edge": "17"
        //         //   },
        //         // "useBuiltIns": "usage", "corejs": 3
        //     }
        // ],
        "@babel/typescript",
    ];

    const plugins = [
        "@babel/proposal-class-properties",
        ["@babel/plugin-transform-react-jsx", { "pragma": "createNode" }],
        "@babel/plugin-syntax-dynamic-import"
    ];

    return {
        presets,
        plugins,
    };
};