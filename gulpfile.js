var gulp = require('gulp');
var less = require('gulp-less');
var min = require('gulp-usemin');
var jshint = require('gulp-jshint');
var livereload = require('gulp-livereload');
var open = require('gulp-open');
var protractor = require('gulp-protractor');
var exec = require('child_process').exec;
var runSequence = require('run-sequence');
var olivejs = require('./lib');

gulp.task('test', ['seed'], function(callback) {
  //runSequence('server:start', 'protractor', 'server:stop', callback);
});

gulp.task('run', function (callback) {

  olivejs.start();
  /*exec('node index.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    callback(err);
  });*/
});

gulp.task('server:stop', function (callback) {
  server.stop(function() {
    process.exit(0);
    callback();
  });
});

/*gulp.task('protractor', function(callback){
  exec('protractor test/config.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    callback();
  });
});

gulp.task('less', function () {
  gulp.src('./app/styles/main.less')
  .pipe(less({
    paths: ['app/styles']
  }))
  .pipe(min({
    cssmin: true
  }))
  .pipe(gulp.dest('./app/styles/'));
});*/

gulp.task('jshint', function() {
  gulp.src('./app/scripts/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

gulp.task('open', function(){
  var options = {
    uri: 'http://localhost:3000/admin/'
  };
  gulp.src(__filename)
  .pipe(open(options));
});

gulp.task('default', ['run', 'open'], function() {
  livereload.listen();
  //gulp.watch('app/styles/*.less', ['less']).on('change', livereload.changed);
  //gulp.watch('app/**/*.js', ['jshint']).on('change', livereload.changed);
  //gulp.watch('app/**/*.html').on('change', livereload.changed);
});
