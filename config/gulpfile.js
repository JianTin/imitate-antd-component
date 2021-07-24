const {src, dest, task, watch, parallel, series} = require('gulp')
const through = require('through2')
const babel = require('gulp-babel')
const babelConfigFn = require('./babelConfigFn')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify');
const merge2 = require('merge2')
const postcss = require('gulp-postcss')
const postcssPresetEnv = require('postcss-preset-env')
const cssnano = require('cssnano')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const babelify = require('babelify')
const {join, dirname} = require('path')
const dirFloder = dirname(__dirname)
const {Buffer: {from}} = require('buffer')
const gulpNotify = require('gulp-notify')
const browserAsync = require('browser-sync').create()
var {notify : nodeNotify} = require('node-notifier');
const compiteLess = require('gulp-less')

// 返回 js compite 处理流
function resultJsTaskFn(isESModule){
    const babelConfig = babelConfigFn(isESModule)
    const destFolder = isESModule ? '../es' : '../lib'
    return src(['../component/**/*.js', '../component/**/*.jsx'])
    .pipe(babel(babelConfig))
    .pipe(dest(destFolder))
}

// 编译为库形式包
task('npm-js-compite', function(){
    return merge2(resultJsTaskFn(true), resultJsTaskFn(false))
})

// 编译为库形式包
task('npm-css-compite', function(){
    const plugins = [postcssPresetEnv()]

    return src('../component/**/*.less')
    .pipe(dest('../lib'))
    .pipe(dest('../es'))
    .pipe(compiteLess())
    .pipe(postcss(plugins))
    .pipe(dest('../lib'))
    .pipe(dest('../es'))
})

// 生成最终distCss的打包文件
task('distCss', function(){
    const plugins = [
        postcssPresetEnv(),
        cssnano(
            {preset: 'default'}
        )
    ]
    // 打包为一个 css 压缩文件
    return  src('../component/**/*.less')
    .pipe(compiteLess())
    .pipe(concat('index.css'))
    .pipe(postcss(plugins))
    .pipe(dest('../dist'))
})

// 编译库资源
task('compite',
    parallel('npm-css-compite','npm-js-compite', 'distCss' )
)

// dev环境打包
task('dev-js', function bundleDev(){
            return browserify(join(dirFloder, '/devMode/main.js'))
            .transform(babelify, babelConfigFn(false))
            .bundle()
            .pipe(source('main.js'))
            .pipe(dest('../dist'))
        }
)

// 运行 dev 环境的资源 和 html
task('dev', parallel('distCss', 'dev-js',
    function initHtml(){
            // 打开服务
            browserAsync.init({
                server: '../dist'
            })
            // 生成 html
            return src('../assets/*.html')
            .pipe(through.obj(function (chunk, encodind, cb){
                let htmlStr = chunk.contents.toString()
                htmlStr = htmlStr.replace('<!-- css -->', "<link href='./index.css' rel='stylesheet' />")
                htmlStr = htmlStr.replace('<!-- js -->', "<script src='./main.js'></script>")
                chunk.contents = from(htmlStr)
                cb(null, chunk)
            }))
            .pipe(dest('../dist'))
            .pipe(gulpNotify('init html'))
        }
    )
)

task('reload', function(cb){
    browserAsync.reload()
    nodeNotify('browser reload')
    cb()
})

// 监听 dev环境 打包后，刷新浏览器
if(process.env.NODE_ENV === 'development'){
    watch(['../component/**/*.js', '../component/**/*.jsx', '../devMode/*.js'],
        series('dev-js','reload')
    )
    watch(['../component/**/*.less'],
        series('distCss','reload')
    )
}