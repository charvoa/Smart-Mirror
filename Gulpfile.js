var gulp = require('gulp'),
babel = require('gulp-babel'),
run = require('gulp-run'),
rename = require('gulp-rename');

gulp.task('transpile-app', function() {
  return gulp.src(['app/index.es6.js','core/*.es6.js',,'modules/**/*.es6.js'])
  .pipe(babel({
          presets: ['es2015']
      }))
    .pipe(rename(function(path){
      path.dirname = "/" + path.dirname;
      path.basename = path.basename.split('.')[0];
    }))
    .pipe(gulp.dest(function(file) {
      return file.base;
    }));
});
gulp.task('run', ['default'], function() {
  var cmd = new run.Command('npm start');
  cmd.exec();
});
gulp.task('default',['transpile-app']);
