"use strict"

const {src, dest} = require("gulp");
const gulp = require("gulp");
const autoprefixer = require('gulp-autoprefixer');
const cssbeautify = require('gulp-cssbeautify');
const removeComments = require('gulp-strip-css-comments');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const panini = require('panini');
const rigger = require('gulp-rigger');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const webpHTML = require('gulp-webp-html');
const newer = require('gulp-newer');
const del = require('del');
const { stream } = require("browser-sync");
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();

// переменные путей
const srcPath = "src/"
const distPath = "dist/"

const path = {
    build: {
        html: distPath, 
        css: distPath + "assets/css/",
        basecss: distPath + "assets/css",
        js: distPath + "assets/js/",
        images: distPath + "images/",
        icons: distPath + "assets/css/",
        fonts: distPath + "assets/webfonts/",
    },
    src: {
        html: srcPath + "*.html",
        css: srcPath + "assets/scss/*.scss",
        basecss: srcPath + "assets/scss/*.css",
        js: srcPath + "assets/js/*.js",
        images: srcPath + "assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}",
        icons: srcPath + "assets/scss/images/*.svg",
        fonts: srcPath + "assets/webfonts/**/*.{ttf,woff,woff2,eot,svg}",
    },
    watch: {
        html: srcPath + "**/*.html",
        css: srcPath + "assets/scss/**/*.scss",
        basecss: srcPath + "assets/scss/*.css",
        js: srcPath + "assets/js/**/*.js",
        images: srcPath + "assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}",
        fonts: srcPath + "assets/webfonts/**/*.{ttf,woff,woff2,eot,svg}",
    },
    clean: "./" + distPath
}

function html() {
    panini.refresh()
    return src(path.src.html, {base: srcPath})
        .pipe(plumber())
        .pipe(panini({
            root: srcPath,
            layouts: srcPath + "templates/layouts/",
            partials: srcPath + "templates/partials/**/",
        }))
        .pipe(webpHTML())
        .pipe(dest(path.build.html))
        .pipe(browserSync.reload({stream: true}))
}



function css() {
    return src(path.src.css, {base: srcPath + "assets/scss/"})
        .pipe(plumber(
            {
                errorHandler : function(err){
                    notify.onError({
                        title: "SCSS Error",
                        message: "Error: <%- error.message %>"
                    })(err);
                    this.emit('end');
                }
            }
        ))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssbeautify())
        .pipe(dest(path.build.css))
        .pipe(cssnano(
            {
                zindex: false,
                discardComments: {
                    removeAll: true
                }
            }
        ))
        .pipe(removeComments())
        .pipe(rename(
            {
                suffix: ".min",
                outname: ".css"
            }
        ))
        .pipe(dest(path.build.css))        
        .pipe(browserSync.reload({stream: true}))
}

function js() {
    return src(path.src.js, {base: srcPath + "assets/js/"})
        .pipe(plumber())
        .pipe(rigger())
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(rename(
            {
                suffix: ".min",
                outname: ".js"
            }
        ))
        .pipe(dest(path.build.js))
        .pipe(browserSync.reload({stream: true}))
}

function images() {
    return src(path.src.images, {base: srcPath + "assets/images/"})
    .pipe(newer(path.build.images))
    .pipe(webp())
    .pipe(dest(path.build.images))
    .pipe(src(path.src.images))
    .pipe(newer(path.build.images))
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(dest(path.build.images))
    .pipe(browserSync.reload({stream: true}))

}

function fonts() {
    return src(path.src.fonts, {base: srcPath + "assets/webfonts/"})
    .pipe(dest(path.build.fonts))
    .pipe(browserSync.reload({stream: true}))

}

function basecss() {
    return src(path.src.basecss, {base: srcPath + "assets/scss/"})
    .pipe(dest(path.build.basecss))
    .pipe(cssnano(
        {
            zindex: false,
            discardComments: {
                removeAll: true
            }
        }
        ))
        .pipe(removeComments())
        .pipe(rename(
            {
                suffix: ".min",
                outname: ".css"
            }
        ))
    .pipe(dest(path.build.basecss))
    .pipe(browserSync.reload({stream: true}))
}
function icons() {
    return src(path.src.icons, {base: srcPath + "assets/scss/"})
    .pipe(dest(path.build.icons))
    .pipe(browserSync.reload({stream: true}))
}

function clean() {
    return del(path.clean)
}

function watchFiles() {
    gulp.watch([path.watch.html], html)
    gulp.watch([path.watch.css], css)
    gulp.watch([path.watch.basecss], basecss)
    gulp.watch([path.watch.js], js)
    gulp.watch([path.watch.images], images)
    gulp.watch([path.watch.fonts], fonts)
}

function server() {
    browserSync.init({
        server: {
            baseDir: "./" + distPath
        }
    });
}

const build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts, basecss, icons))
const watch = gulp.parallel(build, watchFiles, server)


exports.build = build 
exports.watch = watch
exports.default = watch
