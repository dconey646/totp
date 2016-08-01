'use strict';

var gulp = require('gulp'),
	clean = require('gulp-clean'),
	cleanhtml = require('gulp-cleanhtml'),
	minifycss = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	stripdebug = require('gulp-strip-debug'),
	uglify = require('gulp-uglify'),
	zip = require('gulp-zip');

//clean build directory
gulp.task('clean', function() {
	return gulp.src('build/*', {read: false})
		.pipe(clean());
});

//copy static folders to build directory
gulp.task('copy', function() {
	gulp.src('src/fonts/**')
		.pipe(gulp.dest('build/fonts'));
	gulp.src('src/icons/**')
		.pipe(gulp.dest('build/icons'));
	gulp.src('src/_locales/**')
		.pipe(gulp.dest('build/_locales'));
	return gulp.src('src/manifest.json')
		.pipe(gulp.dest('build'));
});