'use strict';

var gulp        = require('gulp'),
	browserSync = require('browser-sync').create(),
	sass        = require('gulp-sass'),
	svgSprite   = require('gulp-svg-sprite'),
	path 		= require('path'),
	cheerio 	= require('gulp-cheerio'),
	replace 	= require('gulp-replace'),
	//concat      = require('gulp-concat'),
	//fileinclude = require('gulp-file-include'),
	//rename 	  = require("gulp-rename"),
	//cache       = require('gulp-cache'),
    uglify 		= require('gulp-uglify-es').default,
    cleanCSS 	= require('gulp-clean-css'),
    rimraf 		= require('gulp-rimraf'),
    imagemin 	= require('gulp-imagemin');
    

//================= PATHS ===================

const dir = {

	src:   "src/",
	build: "assets/"

}


const paths = {

	// DEL BUILD
	srcDelBuild: 		dir.build,

	// HTML or PHP
	srcHtmlOrPHP: 		dir.src + '*.{html,php}',
	buildHtmlOrPHP:     dir.build,

	// SASS
	srcSass:        	dir.src + 'sass/**/*.{scss,css}',
	buildCss:         	dir.build + 'css',

	// JS
	srcJs:       		dir.src + 'js/**/*.js',
	buildJs:      	    dir.build + 'js',

	// IMAGES
	srcImagesLoad:   	dir.src + 'img/**/*.{png,jpg,gif}',
	buildImagesLoad: 	dir.build + 'img',

	// SVG
	srcSvg:  	 		dir.src + '**/*.svg',
	buildSvg: 			dir.build + 'img',

	// BROWSER SYNC
	buildBrowser: 	    dir.build,				

};


//============== PLUGINS ===============

gulp.task('delBuild', function () {
	return gulp.src(paths.srcDelBuild, { allowEmpty: true })
   		.pipe(rimraf());
});


gulp.task('htmlOrPHP', function () {

	return gulp.src(paths.srcHtmlOrPHP)
		.pipe(gulp.dest(paths.buildHtmlOrPHP))
		.pipe(browserSync.stream());
});


gulp.task('sass', function () {

 	return gulp.src(paths.srcSass)
 		.pipe(sass.sync({outputStyle: 'expanded'}).on('error', sass.logError))
 		//.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(paths.buildCss))
		.pipe(gulp.src(paths.srcSass)) // fix reload scss
		.pipe(browserSync.stream());
});


gulp.task('js', function () {

	return gulp.src(paths.srcJs)
		//.pipe(fileinclude({
      	//	prefix: '@@',
      	//	basepath: '@file'
    	//}))
        //.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(paths.buildJs))
		.pipe(browserSync.stream());
});


gulp.task('imagesLoad', function () {

	return gulp.src(paths.srcImagesLoad)
		.pipe(gulp.dest(paths.buildImagesLoad))
		.pipe(browserSync.stream());

});


gulp.task('svg', function () {

	return gulp.src(paths.srcSvg)
		.pipe(cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill');
				$('[class]').removeAttr('class');
			},
			parserOptions: {xmlMode: true}
		}))
		.pipe(replace('&gt;', '>'))
		.pipe(svgSprite( {
			shape: {
				id: {
					generator: function (name) {
						return path.basename(name, '.svg')
					}
				}
			},
			mode: {
				symbol: {
					sprite : 'sprite.svg',
					dest : '.'
				}
			}
		}))

  		.pipe(gulp.dest(paths.buildSvg))
  		.pipe(browserSync.stream());
});


gulp.task('browserSync', function (done) {

	browserSync.init({
		server: {
            baseDir: paths.buildBrowser
        },
        notify: false,
       
    });

    done();

});


//============== WATCH ===============

gulp.task('default',

	gulp.series('delBuild', 'htmlOrPHP', 'sass', 'js', 
		'imagesLoad', 'svg', 'browserSync', function watch () {

		gulp.watch(paths.srcHtmlOrPHP, gulp.series('htmlOrPHP'));
		gulp.watch(paths.srcSass, gulp.series('sass'));
		gulp.watch(paths.srcJs, gulp.series('js'));
		gulp.watch(paths.srcImagesLoad, gulp.series('imagesLoad'));
		gulp.watch(paths.srcSvg, gulp.series('svg'));
		
}));



//------------------------------------------------------------
//======================== COMPRESS ==========================
//------------------------------------------------------------


//============== PLUGINS ===============


gulp.task('compressSass', function () {

 	return gulp.src(paths.srcSass)
 		.pipe(sass.sync({outputStyle: 'expanded'}).on('error', sass.logError))
 		.pipe(cleanCSS())
 		//.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(paths.buildCss))
		.pipe(gulp.src(paths.srcSass)); // fix reload scss
});


gulp.task('compressJs', function () {

	return gulp.src(paths.srcJs)
		/*.pipe(fileinclude({
      		prefix: '@@',
      		basepath: '@file'
    	}))*/
        .pipe(uglify())
        //.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(paths.buildJs));		
});


gulp.task('imagesMin', function () {

	return gulp.src(paths.srcImagesLoad)
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
		.pipe(gulp.dest(paths.buildImagesLoad));
});



//============== COMPRESS FILES ===============

gulp.task('compress',

	gulp.series('delBuild', 'htmlOrPHP',
		'compressSass', 'compressJs', 'imagesMin',
		'svg', 'browserSync'
));