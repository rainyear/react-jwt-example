var gulp = require('gulp');
var notify = require('gulp-notify');
var util = require('gulp-util');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');

var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

// gulp-plumber for error handling
function onError() {
    /* jshint ignore:start */
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: "Compile Error",
        message: "<%= error.message %>"
    }).apply(this, args);
    this.emit('end'); // Keep gulp from hanging on this task
    /* jshint ignore:end */
}
gulp.task('scripts', function() {
    var bundler;
    bundler = browserify({
        basedir: __dirname,
        noparse: ['react/addons', 'reflux', 'fastclick', 'react-router'],
        entries: ['./scripts/app.js'],
        transform: [reactify],
        extensions: ['.js'],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    });

    bundler = watchify(bundler);

    function rebundle() {
        console.log('Bundling Scripts...');
        var start = Date.now();
        return bundler.bundle()
            .on('error', onError)
            .pipe(source('dist.js'))
            .pipe(util.env.prod ? streamify(uglify()) : util.noop())
            .pipe(gulp.dest('scripts/build/'))
            .pipe(notify(function() {
                console.log('Bundling Complete - ' + (Date.now() - start) + 'ms');
            }));
    }

    bundler.on('update', rebundle);

    return rebundle();
});

// Webserver
gulp.task('serve', function() {
    gulp.src('.')
        .pipe(webserver({
            livereload: true,
            port: 9000,
            fallback: 'index.html'
        }));
});

gulp.task('watch', ['scripts', 'serve'], function() {
    gulp.watch("scripts/**/*.js", ["js"])
})

gulp.task('default', ['scripts', 'serve']);
