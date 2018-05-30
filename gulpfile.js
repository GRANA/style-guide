var gulp = require('gulp');
var log = require('fancy-log');
var colors = require('ansi-colors');
var sass = require('gulp-sass');
var scsslint = require('gulp-scss-lint');
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cp = require('child_process');
var sequence = require('run-sequence');
var concat = require('gulp-concat');
var pump = require('pump');
var bump = require('gulp-bump');
var babel = require("gulp-babel");


gulp.task('compress-core', function () {
  return pump([
    gulp.src('./core/dialectics/js/*.js'),
    concat('core.concat.js'),
    uglify(),
    rename({
      suffix: '.min'
    }),
    gulp.dest('./_dev/js')
  ]);
});

// This minifies all the javascript code into one file, to make it easier for inclusion in Jekyll.
gulp.task('compress-doc', function () {
  return pump([
    gulp.src('./_dev/_assets/_js/doc.js'),
    uglify(),
    rename({
      suffix: '.min'
    }),
    gulp.dest('./_dev/js')
  ]);
});

gulp.task('compress-example', function () {
  return pump([
    gulp.src('./_dev/_assets/_js/example-*.js'),
    concat('examples.concat.js'),
    uglify(),
    rename({
      suffix: '.min'
    }),
    gulp.dest('./_dev/js')
  ]);
});

// Style check SCSS
gulp.task('scss-lint', function() {
  return gulp.src(['./core/**/*.scss'])
    .pipe(scsslint({ 'config': 'scss-lint.yml' }));
});

// Style check JS
gulp.task('eslint', () => {
  return gulp.src(['./core/dialectics/js/**/*.js',
    '!./core/dialectics/js/jquery-ui.js',
    '!./core/dialectics/js/src/*.js',
    '!./core/dialectics/js/dist/*.js',
    './_dev/_assets/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

//Compile sass into css
gulp.task('sass', function() {
  return gulp.src('./_dev/css/main.scss')
  .pipe(sass({style: 'expanded'}))
  .on('error', log)
  .pipe(gulp.dest('./_dev/css'));
});

// This watches all modifications in SCSS, and have it checked and generated on the run-time.
gulp.task('watch', function() {
  gulp.watch('./**/*.scss', ['sass','scss-lint']);
});

gulp.task("build-babel", function () {
    return gulp.src("./core/dialectics/js/src/app.jsx")
    .pipe(babel())
    .pipe(rename("bundle.js"))
    .pipe(gulp.dest("./core/dialectics/js/dist"));
});

gulp.task("copy-babel", function () {
    return gulp.src('./core/dialectics/js/dist/*.js')
    .pipe(gulp.dest('./_dev/js'));
});

// Triggers Jekyll to build the website generating from the _dev folder.
gulp.task('build-jekyll', (code) => {
  return cp.spawn('bundle', ['exec', 'jekyll', 'build'])
    .on('error', (error) => log(colors.red(error.message)))
    .on('close', code);
});

// This minifies all the javascript code into one file, to make it easier for inclusion in Jekyll.
gulp.task('jekyll-compress', gulp.parallel('compress-core','compress-doc','compress-example'));

// This copies the fonts that are currently embeddedd in our core style.
gulp.task('jekyll-fontcopy', function() {
   return gulp.src('./core/dialectics/fonts/**/*')
  .pipe(gulp.dest('./_dev/fonts'));
});

// This specifies the `CI` pipeline of style-guide. It checks the styles of CSS and JS, and then generates a
// main.css in `_dev` folder.
gulp.task('default', gulp.parallel(['scss-lint','sass','eslint','build-babel']));

// This commands runs through the entire CI pipeline to build a jekyll site incorporating all the latest style
// guide elements.
gulp.task('jekyll', gulp.series('default','copy-babel','jekyll-fontcopy','jekyll-compress', 'build-jekyll'));

// Bumps package and bower JSON files
gulp.task('bump', function(){
  gulp.src([
    './package.json', 
    './bower.json'
  ])
  .pipe(bump({type:'patch'}))
  .pipe(gulp.dest('./'));
});