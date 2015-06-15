#Faces of Death Row

The [Faces of Death Row](http://apps.texastribune.org/death-row) news app was built by Jolie McCullough for The Texas Tribune. It is a display of all the inmates currently on death row in Texas filterable by the length of their stay, race, age and sex. It could easily be altered to show other filterable data.

##Parent App
This app was produced using the [Tribune's App Kit](https://github.com/texastribune/newsapps-app-kit), which is built on Gulp, a task runner written in Node.js. We use Gulp to power our build system, which is configured to handle our deploy process.

##Features
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

##Data
The data in this app was originally received from the Texas Department of Criminal Justice (TDCJ) in April 2015 through an open records request. The conviction summaries are gathered from TDCJ records, court documents and news articles and written by the Texas Tribune. The data will be regularly updated by Tribune staff.

##Code
The data is pulled into the app from a Google Spreadsheet, and JavaScript/jQuery and SCSS were used to build the front-end.
