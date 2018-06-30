var gulp = require('gulp');
const babel = require('gulp-babel');
// var browserify = require('browserify');
var browserify = require('gulp-browserify');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var gulpsync = require('gulp-sync')(gulp);
const gzip = require('gulp-gzip');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var babelify = require('babelify');

// gulp.task('js', function () {
//     gulp.src('scripts/*.js')
//         .pipe(browserify({
//             insertGlobals: true,
//             debug: !gulp.env.production
//         }))
//         .pipe(uglify())
//         .pipe(gulp.dest('./build/scripts'))
// });

// gulp.task('js', function () {
//     return browserify('scripts/index.js')
//         .transform('babelify', {
//             presets: ['env']
//         })
//         .bundle()
//         .pipe(source('app.js')) // Converts To Vinyl Stream
//         .pipe(buffer()) // Converts Vinyl Stream To Vinyl Buffer
//         // Gulp Plugins Here!
//         .pipe(uglify())
//         .pipe(gulp.dest('./build/scripts'));

// });

gulp.task('js', function () {
    gulp.src('public/js/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('./build/public/js'))
        .pipe(livereload())
})

gulp.task('sw', function () {
    gulp.src('public/serviceWorker.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('./build/public'))
})

gulp.task('html', function () {
    gulp.src('public/*.html')
        .pipe(gulp.dest('./build/public'))
        .pipe(livereload())
})

gulp.task('css', function () {
    gulp.src('public/css/*.css')
        .pipe(gulp.dest('./build/public/css'))
        .pipe(livereload())
})

gulp.task('assets:js', function () {
    gulp.src('node_modules/getmdl-select/getmdl-select.min.js')
        .pipe(gulp.dest('./build/public/assets/js'))
})

gulp.task('assets:css', function () {
    gulp.src('node_modules/getmdl-select/getmdl-select.min.css')
        .pipe(gulp.dest('./build/public/assets/css'))
})

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('public/js/*.js', ['js']);
    gulp.watch('public/*.html', ['html']);
    gulp.watch('public/css/*.css', ['css']);
})


gulp.task('connect', function () {
    connect.server({
        root: './build/public',
        livereload: true,
    })
})

gulp.task('serve', gulpsync.sync(['js', 'sw', 'html', 'css', 'assets:css', 'assets:js', 'watch', 'connect']));