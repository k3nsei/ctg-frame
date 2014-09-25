var gulp = require('gulp');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var rimraf = require('gulp-rimraf');
var uglify = require('gulp-uglify');
var wrap = require('gulp-wrap');

gulp.task('clean-dist', function (cb) {
    rimraf('./dist', cb);
});

gulp.task('coffee', function() {
    gulp.src('./src/server-side/ctg-frame.coffee')
        .pipe(coffee())
        .pipe(gulp.dest('./dist/server-side/'))
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

gulp.task('default', ['clean-dist', 'scripts', 'coffee']);
