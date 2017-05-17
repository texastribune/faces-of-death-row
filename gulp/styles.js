'use strict';

const cleancss = require('gulp-clean-css');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const size = require('gulp-size');

const autoprefixer = require('autoprefixer');

const bs = require('./browsersync');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = () => {
  return gulp.src('./app/styles/*.scss')
    .pipe(sass({
      includePaths: ['node_modules'],
      precision: 10
    }).on('error', sass.logError))
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions', 'iOS >= 8'] }) ]))
    .pipe(gulp.dest('./.tmp/styles'))
    .pipe(gulpIf(IS_PRODUCTION, cleancss()))
    .pipe(gulpIf(IS_PRODUCTION, gulp.dest('./dist/styles')))
    .pipe(bs.stream({match: '**/*.css'}))
    .pipe(size({title: 'styles'}));
};
