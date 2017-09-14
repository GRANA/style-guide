var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var scsslint = require('gulp-scss-lint');
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cp = require('child_process');
var sequence = require('run-sequence');
var concat = require('gulp-concat');
var pump = require('pump');

// Style check SCSS
gulp.task('scss-lint', function() {
  return gulp.src(['./core/**/*.scss'])
    .pipe(scsslint({ 'config': 'scss-lint.yml' }));
});

// Style check JS
gulp.task('eslint', () => {
  return gulp.src(['./core/dialectics/js/**/*.js',
    '!./core/dialectics/js/jquery-ui.js',
    './_dev/_assets/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

//Compile sass into css
gulp.task('sass', function() {
  gulp.src('./_dev/css/main.scss')
  .pipe(sass({style: 'expanded'}))
  .on('error', gutil.log)
  .pipe(gulp.dest('./_dev/css'))
});

// This watches all modifications in SCSS, and have it checked and generated on the run-time.
gulp.task('watch', function() {
  gulp.watch('./**/*.scss', ['sass','scss-lint']);
});

// Triggers Jekyll to build the website generating from the _dev folder.
gulp.task('build-jekyll', (code) => {
  return cp.spawn('jekyll', ['build']) 
    .on('error', (error) => gutil.log(gutil.colors.red(error.message)))
    .on('close', code);
});

// This minifies all the javascript code into one file, to make it easier for inclusion in Jekyll.
gulp.task('jekyll-compress', function () {
  return pump([
    gulp.src('./core/dialectics/js/*.js'),
    concat('core.concat.js'),
    uglify(),
    rename({
      suffix: '.min'
    }),
    gulp.dest('./_dev/js'),
    gulp.src('./_dev/_assets/_js/*.js'),
    uglify(),
    rename({
      suffix: '.min'
    }),
    gulp.dest('./_dev/js')
  ]);
});

// This copies the fonts that are currently embeddedd in our core style.
gulp.task('jekyll-fontcopy', function() {
   gulp.src('./core/dialectics/fonts/**/*')
  .pipe(gulp.dest('./_dev/fonts'));

});

// This specifies the `CI` pipeline of style-guide. It checks the styles of CSS and JS, and then generates a
// main.css in `_dev` folder.
gulp.task('default', ['scss-lint','sass','eslint']);

// This commands runs through the entire CI pipeline to build a jekyll site incorporating all the latest style
// guide elements.
gulp.task('jekyll', function(callback){
  sequence('default', 'jekyll-fontcopy','jekyll-compress', 'build-jekyll', callback);
});