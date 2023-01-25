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
const imagemin = require('gulp-imagemin');
const del = require('del');
const browserSync = require('browser-sync').create();

const path = {
    build: {
        html: "dist",
        css: "dist/assets/css/",
        js: "dist/assets/js/",
        images: "dist/assets/images/",
        fonts: "dist/assets/fonts/",
    }
}