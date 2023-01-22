"use strict"

const {src, dest} = require("gulp")
const gulp = require("gulp")
const autoprefixer = require('gulp-autoprefixer')
const cssbeautify = require('gulp-cssbeautify')
const strip_css_comments = require('gulp-strip-css-comments')
const rename = require('gulp-rename')