'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence');

/*
Main tasks
 */
gulp.task('images', require('./gulp/images'));
gulp.task('scripts', require('./gulp/scripts'));
gulp.task('styles', require('./gulp/styles'));
gulp.task('templates', require('./gulp/templates'));

/*
Utility tasks
 */
gulp.task('clean', require('./gulp/clean'));
gulp.task('serve', ['styles', 'templates'], require('./gulp/serve'));

/*
Build tasks
 */
gulp.task('rev', require('./gulp/rev'));
gulp.task('rev-replace', ['rev'], require('./gulp/rev-replace'));

gulp.task('build', ['clean'], (done) => {
  runSequence(['images'], ['styles'], ['scripts', 'templates'], ['rev-replace'], done);
});

gulp.task('default', ['build']);
