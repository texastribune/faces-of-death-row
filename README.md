# Faces of Death Row

[Faces of Death Row](http://apps.texastribune.org/death-row) was produced by Jolie McCullough for The Texas Tribune. It is a visualization of all inmates currently on death row in Texas filterable by length of stay, race, age and sex. It could easily be modified to show other filterable data.

## Build Tool
This app was produced using the [Tribune's App Kit](https://github.com/texastribune/newsapps-app-kit). Built on Gulp – a task runner written in Node.js – the kit powers our build system and deploy process.

## Build Tool Features
- Live reloading and viewing powered by [BrowserSync](http://www.browsersync.io/)
- Compiling of Sass/SCSS with [Ruby Sass](http://sass-lang.com/)
- CSS prefixing with [autoprefixer](https://github.com/postcss/autoprefixer)
- CSS sourcemaps with [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
- CSS compression with [csso](https://github.com/css/csso)
- JavaScript linting with [jshint](http://jshint.com/)
- JavaScript compression with [uglifyjs](https://github.com/mishoo/UglifyJS2)
- Template compiling with [nunjucks](http://mozilla.github.io/nunjucks/)
- Image compression with [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin)
- Asset revisioning with [gulp-rev](https://github.com/sindresorhus/gulp-rev) and [gulp-rev-replace](https://github.com/jamesknelson/gulp-rev-replace)

## Data
The data in this app was originally collected from the [Texas Department of Criminal Justice](http://www.tdcj.state.tx.us/) (TDCJ) in April 2015 via an open records request. The conviction summaries are gathered from TDCJ records, court documents and news articles and summarized by the Texas Tribune. The data will be regularly updated by Tribune staff.
