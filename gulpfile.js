var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var scsslint = require('gulp-scss-lint');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var format = require('gulp-clang-format');
var cp = require('child_process');
var sequence = require('run-sequence');

gulp.task('sass', function() {
  gulp.src('./_dev/css/main.scss')
  .pipe(sass({style: 'expanded'}))
    .on('error', gutil.log)
  .pipe(gulp.dest('./_dev/css'))
});


gulp.task('scss-lint', function() {
  return gulp.src(['./core/**/*.scss'])
    .pipe(scsslint({ 'config': 'scss-lint.yml' }));
});

gulp.task('compress', function (cb) {
  gulp.src('./core/dialectics/js/*.js')
  .pipe(uglify())
  .pipe(rename({
            suffix: '.min'
        }))
  .pipe(gulp.dest('./_dev/js'));
  
});

gulp.task('watch', function() {
  gulp.watch('./**/*.scss', ['sass','scss-lint']);
});

gulp.task('jshint', function(){
	gulp.src(['./core/dialectics/js/*.js'])
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('format', function() {
  // The base option ensures the glob doesn't strip prefixes
  return gulp.src(['./core/dialectics/js/*.js'], {base: '.'})
      .pipe(format.format())
      .pipe(gulp.dest('.'));
});

gulp.task('build-jekyll', (code) => {
  return cp.spawn('jekyll', ['build']) 
    .on('error', (error) => gutil.log(gutil.colors.red(error.message)))
    .on('close', code);
})


gulp.task('default', ['scss-lint','sass']);
gulp.task('jekyll', function(callback){
  sequence('build-jekyll', 'default', 'compress', callback);
});