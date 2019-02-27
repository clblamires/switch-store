var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

var paths = {
    styles: {
        src: "src/scss/*.scss",
        main: "src/scss/app.scss",
        dest: "src/css"
    }
}

function style(){
    return gulp
        .src( paths.styles.main )
        .pipe( sourcemaps.init() )
        .pipe( sass() )
        .on("error", sass.logError)
        .pipe( postcss( [autoprefixer(), cssnano()] ))
        .pipe( sourcemaps.write() )
        .pipe( gulp.dest(paths.styles.dest))
        .pipe( browserSync.stream());
}

function reload(){
    console.log("reloading");
    browserSync.reload();
}

function watch(){
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
    gulp.watch(paths.styles.src, style);
    gulp.watch("src/*.html").on('change', browserSync.reload );
}

exports.watch = watch;
exports.style = style;

var build = gulp.parallel( style, watch );
gulp.task('build', build);
gulp.task('default', build);