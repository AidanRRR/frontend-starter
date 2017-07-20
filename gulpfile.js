var gulp = require('gulp')
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var ts = require('gulp-typescript');

gulp.task('default', ['watch']);
gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('app/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('sass', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('css', function () {
    return gulp.src('src/css/**/*.css')
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('js', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('typescript', function () {
    return gulp.src('src/ts/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            outFile: 'main.js'
        }))
        .pipe(gulp.dest('app/js'));
})
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    });
});
gulp.task('images', function () {
    return gulp.src('src/images/**/*.+(png|jpg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest('app/images'))
});
gulp.task('fonts', function () {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('app/fonts'))
});
gulp.task('clean', function () {
    return del(['app/**/**/**']);
});
gulp.task('default', function (callback) {
    runSequence(['sass', 'css', 'browserSync', 'watch'],
        callback
    );
});
gulp.task('watch', ['browserSync', 'html', 'sass', 'css', 'js', 'typescript'], function () {
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/css/**/*.css', ['css']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/ts/**/*.ts', ['typescript']);
    gulp.watch('app/*.html', browserSync.reload);
});