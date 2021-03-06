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
            "@babel/plugin-transform-object-assign",
            "@babel/plugin-transform-runtime",
            [
                "babel-plugin-replace-import-extension", {
                    // 开发环境，不进行转换。否则会导致 browserify 依赖图出现错误
                    // 作用： 替换 import 导入的 扩展名
                    "extMapping": process.env.NODE_ENV === 'development' ? {} : {
                        ".jsx": ".js"
                    }
                }
            ]
        ]
    }
}

module.exports = resultConfig