'use strict';

var gulp = require('gulp');

///////////////////////////////////////////////////////////
// Requires
var args = require('yargs').argv;
var bowerMainFiles = require('main-bower-files');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var del = require('del');
var filter = require('gulp-filter');
var ngHtml2Js = require('gulp-ng-html2js');
var livereload = require('gulp-livereload');
var wrap = require('gulp-wrap');




///////////////////////////////////////////////////////////
// Dir Setup
var clientDir = './client/';
var appDir = clientDir + 'app/';

var publicDir = './public/';
var publicCssDir = publicDir + 'css/';
var publicJsDir = publicDir + 'js/';

///////////////////////////////////////////////////////////
// File Setup
var indexFile = clientDir + 'index.html';
var htmlFiles = appDir + '**/*.html';
var appJsFiles = appDir + '**/*.js';

///////////////////////////////////////////////////////////
// Filter Setup
var jsFilter = filter('**/*.js');
var cssFilter = filter('**/*.css');

///////////////////////////////////////////////////////////
// concatenate and compress bower_components to vendor.{js|css}
gulp.task('vendor', function () {
    var jsfile = 'vendor.js';
    var ccsFile = 'vendor.css';
    var bowerFiles = bowerMainFiles();


    // build vendor js files
    gulp.src(bowerFiles)
        .pipe(jsFilter)
        .pipe(concat(jsfile))
        .pipe(gulp.dest(publicJsDir));

    // build vendor css files
    return gulp.src(bowerFiles)
        .pipe(cssFilter)
        .pipe(concat(ccsFile))
        .pipe(gulp.dest(publicCssDir));
});


///////////////////////////////////////////////////////////
// Views task
gulp.task('views', function () {
    // Get our index.html
    gulp.src(indexFile)
        .pipe(gulp.dest(publicDir));

    // copy all assets files to public
    var tplfile = 'app.templates.js';

    return gulp.src([htmlFiles])
        .pipe(ngHtml2Js({moduleName: 'app.templates'}))
        .pipe(concat(tplfile))
        .pipe(gulp.dest(publicJsDir));

});

///////////////////////////////////////////////////////////
// concatenate and compress app js & styl file to app.{js|css}
gulp.task('app', function () {
    var jsFile = 'app.js', paths = [appJsFiles];


    // build applications js files
    return gulp.src(paths)
        .pipe(wrap('!function(){\n<%= contents %>\n}();'))
        .pipe(concat(jsFile))
        .pipe(gulp.dest(publicJsDir));
});

///////////////////////////////////////////////////////////
gulp.task('watch', ['build'], function () {
    gulp.watch(['app.js', appJsFiles], ['app']);
    gulp.watch([indexFile, htmlFiles], ['views']);
});

///////////////////////////////////////////////////////////
// Build task - sequential
gulp.task('build', ['vendor', 'views', 'app'], function () {
});

///////////////////////////////////////////////////////////
// Build task
gulp.task('default', function () {
    gulp.start('vendor', 'views', 'app');
});