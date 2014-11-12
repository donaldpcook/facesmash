'use strict';

var gulp = require('gulp'),
    notify = require('gulp-notify'),
    connect = require('connect'),
    serveStatic = require('serve-static'),
    path = require('path'),
    connectLivereload = require('connect-livereload'),
    tinylr = require('tiny-lr'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    sass = require('gulp-ruby-sass'),
    prefix = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    ngHtml2Js = require('gulp-ng-html2js');

// standard LiveReload port
var port = 35729;

gulp.task('move', function() {
  gulp.src('./app/index.html')
    .pipe(gulp.dest('dest'));
  gulp.src('./app/js/vendor/facepp-sdk.js')
    .pipe(gulp.dest('dest/js/vendor'));
});

gulp.task('sass', function() {
  gulp.src('app/scss/app.scss')
    .pipe(sass({sourcemap: 'inline', style: 'compact'}))
    .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
    .on('error', handleErrors)
    .pipe(gulp.dest('dest/css'));
});

gulp.task('browserify', function() {
  return browserify({
    entries: ['./app/js/app.js'],
    debug: true
  })
  .bundle()
  .on('error', handleErrors)
  .pipe(source('app.js'))
  .pipe(gulp.dest('./dest/js/'));
});

gulp.task('lr', function() {
  tinylr().listen(port);
});

gulp.task('buildTemplates', function() {
  gulp.src('./app/js/**/*.html')
    .pipe(ngHtml2Js({
      prefix: '/',
      moduleName: 'partials'
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('./dest/js'))
    //.pipe(connect.reload());
});

gulp.task('serve', function() {
  connect()
    .use(connectLivereload())
    .use('/auth', serveStatic('dest'))
    .use(serveStatic('dest'))
    .listen(3000);
});

gulp.task('default', ['buildTemplates', 'move', 'sass', 'browserify', 'lr', 'serve'], function() {
  gulp.watch('app/index.html', ['move']);
  gulp.watch('app/scss/**', ['sass']);
  gulp.watch('app/js/**/*.js', ['browserify']);
  gulp.watch('app/js/**/*.html', ['buildTemplates']);

  gulp.watch('dest/**/*.html', function(event) {
    tinylr.changed(path.relative(__dirname, event.path));
  });

  gulp.watch('dest/**/*.css', function(event) {
    tinylr.changed(path.relative(__dirname, event.path));
  });

  gulp.watch('dest/**/*.js', function(event) {
    tinylr.changed(path.relative(__dirname, event.path));
  });
});

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);

  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  this.emit('end');
}
