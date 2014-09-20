var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var rimraf = require('gulp-rimraf');
var uglify = require('gulp-uglify');
var wrap = require('gulp-wrap');

gulp.task('clean-dist', function (cb) {
    rimraf('./dist', cb);
});

gulp.task('scripts', function () {
    gulp.src(['src/controller.js', 'src/component.js', 'src/initializer.js'])
        .pipe(concat('ctg-frame.js'))
        .pipe(wrap('(function (Ember) {\n<%= contents %>\n}(window.Ember));'))
        .pipe(gulp.dest('dist'))
        .pipe(uglify())
        .pipe(rename('ctg-frame.min.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean-dist', 'scripts']);
