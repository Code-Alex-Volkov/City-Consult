const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const del = require('del');
const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const browserSync = require('browser-sync').create();

const paths = {
    root: './production',
    templates: {
        src: './src/views/pages/*.html',
        dest: './production'
    },
    styles: {
        main: './src/assets/styles/*.scss',
        src: './src/assets/styles/section/*.scss',
        dest: './production/assets/styles'
    },
    scripts: {
        src: './src/assets/scripts/*.js',
        dest: './production/assets/scripts'
    },
    fonts: {
        src: './src/assets/fonts/*.{otf,eot,ttf,woff,woff2,svg}',
        dest: './production/assets/fonts'
    },
    images: {
        src: './src/assets/images/**/*.{png,jpg,jpeg,gif,svg}',
        dest: './production/assets/images/'
    }
}

// слежка
function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.templates.src, templates);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.fonts.src, fonts);
    gulp.watch(paths.images.src, images);
}

// следим за build и релоадим браузер
function server() {
    browserSync.init({
        server: paths.root
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

// очистка
function clean() {
    return del(paths.root);
}

// html
function templates() {
    return gulp.src(paths.templates.src)
        .pipe(gulp.dest(paths.root));
}

// scss
function styles() {
    return gulp.src(paths.styles.main)
        .pipe(sourcemaps.init())
        .pipe(postcss(require("./postcss.config")))
        .pipe(sourcemaps.write())
        .pipe(rename("main.min.css"))
        .pipe(gulp.dest(paths.styles.dest))
}

// webpack
function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(gulpWebpack(webpackConfig, webpack))
        .pipe(gulp.dest(paths.scripts.dest));
}

function fonts() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest))
}

function images() {
    return gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest))
}

exports.templates = templates;
exports.styles = styles;
exports.scripts = scripts;
exports.fonts = fonts;
exports.images = images;
exports.clean = clean;

gulp.task('default', gulp.series(
    clean,
    gulp.parallel(styles, templates, scripts, images, fonts),
    gulp.parallel(watch, server)
));