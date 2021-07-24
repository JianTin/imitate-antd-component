function resultConfig(isESModule){
    return {
        presets: [
            [
                '@babel/preset-env',
                {
                    modules: isESModule ? false : 'commonjs'
                }
            ],
            '@babel/preset-react'
        ],
        plugins: [
            "babel-plugin-inline-import-data-uri",
            "@babel/plugin-transform-object-assign",
            "@babel/plugin-transform-runtime"
        ]
    }
}

module.exports = resultConfig