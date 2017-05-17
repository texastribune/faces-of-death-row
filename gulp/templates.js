'use strict';

const gulp = require('gulp');
const gulpIf = require('gulp-if');
const htmlmin = require('gulp-htmlmin');
const map = require('vinyl-map');
const path = require('path');
const quaff = require('quaff');
const rename = require('gulp-rename');
const size = require('gulp-size');
const url = require('url');

const bs = require('./browsersync');
const nunjucksEnv = require('./nunjucks');

const config = require('../project.config');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const PROJECT_URL = IS_PRODUCTION ? `https://${config.bucket}/${config.folder}/` : '/';

module.exports = () => {
  const data = quaff(config.dataDir);

  const nunjuckify = map((buffer, filePath) => {
    const appDirectory = path.join(process.cwd(), 'app');
    const relPath = path.relative(appDirectory, filePath);

    const extName = path.extname(relPath);
    const baseName = path.basename(relPath, extName);
    const dirName = baseName === 'index' ? '' : relPath.replace(extName, '');

    nunjucksEnv.addGlobal('CURRENT_PAGE_URL', `${url.resolve(PROJECT_URL, dirName)}${dirName && '/'}`);

    return nunjucksEnv.renderString(buffer.toString(), { data });
  });

  return gulp.src(['./app/**/*.html', '!./app/templates/**', '!./app/scripts/**'])
    .pipe(nunjuckify)
    .pipe(rename((file) => {
      if (file.basename !== 'index') {
        file.dirname = path.join(file.dirname, file.basename);
        file.basename = 'index';
      }
    }))
    .pipe(gulp.dest('./.tmp'))
    .pipe(gulpIf(IS_PRODUCTION, htmlmin({
      collapseWhitespace: true,
      minifyJS: true
    })))
    .pipe(gulpIf(IS_PRODUCTION, gulp.dest('./dist')))
    .pipe(bs.stream({once: true}))
    .pipe(size({title: 'templates', showFiles: true}));
};
