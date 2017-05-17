const gulp = require('gulp');
const rev = require('gulp-rev');

module.exports = () => {
  return gulp.src([
    './dist/**/*.css',
    './dist/**/*.js',
    './dist/assets/images/**/*'
  ], { base: './dist' })
  .pipe(rev())
  .pipe(gulp.dest('./dist'))
  .pipe(rev.manifest())
  .pipe(gulp.dest('./dist'));
};
