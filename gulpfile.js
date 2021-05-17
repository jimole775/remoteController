var gulp = require('gulp')
var path = require('path')
var del = require('del')
var through = require('through2')
// var gulpCopy = require('gulp-copy')
var webpack = require('webpack')
var fs = require('fs')
var devConfig = require("./build/dev.config.js")
var prodConfig = require("./build/prod.config.js")

function parseArgv () {
  var params = {}
  process.argv.forEach((a, i) => {
    if (/--/.test(a)) {
      params[a.replace('--', '')] = process.argv[i + 1]
    }
  })
  return params
}
function injectEnv (config) {
  let envprops = {}
  if (parseArgv().env === 'dev') {
    envprops = devConfig
  }
  if (parseArgv().env === 'prod') {
    envprops = prodConfig
  }
  config.plugins.push(new webpack.DefinePlugin({ 'global.env': JSON.stringify(envprops) }))
  return config
}

gulp.task('clean:dist', function (done) {
  var dist = fs.existsSync(path.join(__dirname, './client/dist'))
  dist && del(['./client/dist'], { force: true })
  return done && done()
})

gulp.task('clean:lib', function (done) {
  var lib = fs.existsSync(path.join(__dirname, './client/lib'))
  lib && del(['./client/lib'], { force: true })
  return done && done()
})

gulp.task('copy:lib', function (done) {
  gulp.src(['./client/lib/*.js', './client/lib/*.json'])
    .pipe(gulp.dest('./client/dist/static/lib/'))
  return done && done()
})

gulp.task('copy:static', function (done) {
  gulp.src('./client/static/*')
    .pipe(gulp.dest('./client/dist/static/'))
  return done && done()
})

gulp.task('inject:tags', function (done) {
  gulp.src('./client/app/src/index.html')
    .pipe(through.obj(injectHtmlTags))
    .pipe(gulp.dest('./client/'))
  // 往index.html中注入内容
  function injectHtmlTags(chunk, enc, callback) {
    var contents = chunk.contents.toString('utf8')
    var sp = contents.split('</body>')
    var pre = sp[0]
    this.push(chunk)
    // var a = fs.readFileSync(chunk)
    console.log('dasdassd',)
    callback()
  }
  return done && done()
})

// 打包
gulp.task('build:dll', function (done) {
  var config = require("./webpack.dll.js")
  webpack(config, function (err, stats) {
    // compileLogger(err, stats)
    // callback()
  })
  return done && done()
})

// 打包
gulp.task('build:server', function (done) {
  var config = require("./webpack.config.js")
  webpack(injectEnv(config.server), function (err, stats) {
    // compileLogger(err, stats)
    // callback()
  })
  return done && done()
})

// 打包
gulp.task('build:client', function (done) {
  var config = require("./webpack.config.js")
  webpack(injectEnv(config.client), function (err, stats) {
    // compileLogger(err, stats)
    // callback()
  })
  return done && done()
})

gulp.task('copy', gulp.series('copy:static', 'copy:lib'))
gulp.task('clean', gulp.series('clean:dist', 'clean:lib'))
gulp.task('dll', gulp.series('build:dll'))
gulp.task('build', gulp.series('build:server', 'build:client'))
