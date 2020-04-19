

/*================== PAGE ==================*/	


/*------------------ GLOBAL VARIABLES -------------------*/

var $window = $(window),
	$document = $(document),
	html = $('html'),
	body = $('body');


/*------------------ CROSS BROWSER -------------------*/

$.browser = {};
$.browser.ie = /(MSIE |Trident.*rv[ :])([0-9]+)/.test(navigator.userAgent);
$.browser.firefox = /Firefox/.test(navigator.userAgent);
$.browser.opera = /OPR/.test(navigator.userAgent);
if (!($.browser.opera)) $.browser.chrome = /Chrome/.test(navigator.userAgent);


var svgClass = $('svg[class]');
var svgClassParent = svgClass.parent();

if ($.browser.firefox) svgClassParent.css('transform', 'translateY(0)');
			
if ($.browser.ie)
	if (svgClassParent.css('position') == 'static') svgClassParent.css('position', 'relative');


/*------------------ ADAPTIVE INDENTS -------------------*/

$('head').append('<style class="adaptive-indents-and-font-size"></style>');

var	indent, indentClass,
	strPaddingTop, strPaddingBottom,
	intPaddingTop0, intPaddingBottom0,
	intPaddingTop768, intPaddingBottom768,
	intPaddingTop992, intPaddingBottom992,
	pxPaddingTop, pxPaddingBottom,
	strMarginTop, strMarginBottom,
	intMarginTop0, intMarginBottom0,
	intMarginTop768, intMarginBottom768,
	intMarginTop992, intMarginBottom992,
	pxMarginTop, pxMarginBottom,
	intPaddingTop = [], intPaddingBottom = [],
	intMarginTop = [], intMarginBottom = [],
	indentCount = 1,
	style = $('.adaptive-indents-and-font-size');


$('body *:not(.header *, .slider, .product-gallery__filter li, .our-app__store a+a)').each(function() {	

	indent = $(this);
	
	intPaddingTop[indentCount] = parseInt(indent.css('padding-top'));
	intPaddingBottom[indentCount]= parseInt(indent.css('padding-bottom'));

	intMarginTop[indentCount] = parseInt(indent.css('margin-top'));
	intMarginBottom[indentCount] = parseInt(indent.css('margin-bottom'));

	if(!(intPaddingTop[indentCount] || intPaddingBottom[indentCount] || intMarginTop[indentCount] || intMarginBottom[indentCount])) return true;

	for(var i = 1; i < indentCount; i++) {

		if(intPaddingTop[i] == intPaddingTop[indentCount] && intPaddingBottom[i] == intPaddingBottom[indentCount] &&
			intMarginTop[i] == intMarginTop[indentCount] && intMarginBottom[i] == intMarginBottom[indentCount]) {

				indent.addClass('indent-'+i);
				return true;
			}

	}

	if(intPaddingTop[indentCount]) {
		strPaddingTop = 'padding-top: ';
		intPaddingTop0 = Math.round(intPaddingTop[indentCount] - intPaddingTop[indentCount] / 2.7);
		intPaddingTop768 = Math.round(intPaddingTop[indentCount] - intPaddingTop[indentCount] / 4);
		intPaddingTop992 = intPaddingTop[indentCount];
		pxPaddingTop = 'px !important; ';
	}
	else {
		strPaddingTop = '';
		intPaddingTop0 = '';
		intPaddingTop768 = '';
		intPaddingTop992 = '';
		pxPaddingTop = '';
	}

	if(intPaddingBottom[indentCount]) {
		strPaddingBottom = 'padding-bottom: ';
		intPaddingBottom0 = Math.round(intPaddingBottom[indentCount] - intPaddingBottom[indentCount] / 2.7);
		intPaddingBottom768 = Math.round(intPaddingBottom[indentCount] - intPaddingBottom[indentCount] / 4);
		intPaddingBottom992 = intPaddingBottom[indentCount];
		pxPaddingBottom = 'px !important; ';
	}
	else {
		strPaddingBottom = '';
		intPaddingBottom0 = '';
		intPaddingBottom768 = '';
		intPaddingBottom992 = '';
		pxPaddingBottom = '';
	}


	if(intMarginTop[indentCount]) {
		strMarginTop = 'margin-top: ';
		intMarginTop0 = Math.round(intMarginTop[indentCount] - intMarginTop[indentCount] / 2.7) + 1;
		intMarginTop768 = Math.round(intMarginTop[indentCount] - intMarginTop[indentCount] / 4);
		intMarginTop992 = intMarginTop[indentCount];
		pxMarginTop = 'px !important; ';
	}
	else {
		strMarginTop = '';
		intMarginTop0 = '';
		intMarginTop768 = '';
		intMarginTop992 = '';
		pxMarginTop = '';
	}

	if(intMarginBottom[indentCount]) {
		strMarginBottom = 'margin-bottom: ';
		intMarginBottom0 = Math.round(intMarginBottom[indentCount] - intMarginBottom[indentCount] / 2.7) + 1;
		intMarginBottom768 = Math.round(intMarginBottom[indentCount] - intMarginBottom[indentCount] / 4);
		intMarginBottom992 = intMarginBottom[indentCount];
		pxMarginBottom = 'px !important; ';
	}
	else {
		strMarginBottom = '';
		intMarginBottom0 = '';
		intMarginBottom768 = '';
		intMarginBottom992 = '';
		pxMarginBottom = '';
	}
	
	
	indentClass = 'indent-'+indentCount;
	indent.addClass(indentClass);
	++indentCount;

	
style.append('.'+indentClass+' { '+
				strPaddingTop+intPaddingTop0+pxPaddingTop+
	  			strPaddingBottom+intPaddingBottom0+pxPaddingBottom+
	  			strMarginTop+intMarginTop0+pxMarginTop+
	  			strMarginBottom+intMarginBottom0+pxMarginBottom+
		  	'}');
			

style.append('@media (min-width: 768px) { '+
			'.'+indentClass+' { '+
				strPaddingTop+intPaddingTop768+pxPaddingTop+
	  			strPaddingBottom+intPaddingBottom768+pxPaddingBottom+
	  			strMarginTop+intMarginTop768+pxMarginTop+
	  			strMarginBottom+intMarginBottom768+pxMarginBottom+
		  	'}'+
		'}');

	
	style.append('@media (min-width: 992px) { '+
					'.'+indentClass+' { '+
						strPaddingTop+intPaddingTop992+pxPaddingTop+
			  			strPaddingBottom+intPaddingBottom992+pxPaddingBottom+
			  			strMarginTop+intMarginTop992+pxMarginTop+
			  			strMarginBottom+intMarginBottom992+pxMarginBottom+
				  	'}'+
				'}');

});


/*------------------ ADAPTIVE FONT-SIZE -------------------*/

// FS = font-size
var thisFS, sourceFS, 
	adaptiveFS, classFS, transformFS,
	arrayFS = [], countFS = 1;


$('body *:not(br, i, .title, .title *, .slider *)').each(function() {

	thisFS = $(this);
	sourceFS = thisFS.css('font-size');
	transformFS = thisFS.css('transform');

	if(transformFS == 'none') transformFS = true;
	else {
		transformFS = transformFS.substring(0, transformFS.length-1).split(',');

		if(transformFS[1] == 0 && transformFS[2] == 0 && transformFS[4] == 0 && transformFS[5] == 0) transformFS = false;
		else transformFS = true;
	}

	if( (sourceFS > '18px') && transformFS ) {

		arrayFS[countFS] = sourceFS;

		for(var i = 1; i < countFS; i++) {

			if(arrayFS[i] == arrayFS[countFS]) {
				thisFS.addClass('font-size-'+i);
				return true;
			}

		}

		adaptiveFS = Math.round(parseInt(sourceFS) / 1.1) + 'px';

		classFS = 'font-size-'+countFS;
		thisFS.addClass(classFS);
		++countFS;

		style.append('.'+classFS+' { '+
						'font-size: '+adaptiveFS+' !important; '+
					'}');

		style.append('@media (min-width: 768px) { '+
						'.'+classFS+' { '+
							'font-size: '+sourceFS+' !important; '+
						'}'+
					'}');

	}

});



/*------------------ ADD MARGING FOR 2 COLS AND ADD IMG COL-SM-------------------*/

$window.on('load resize', function() {

	var block, blockClass, cols, col1, col2, style2, imgCol1, imgCol2,
		colMarginValue = '50px; ',
		colMarginTop = 'col-margin-top', // flex-wrap: wrap;
		colMarginBottom = 'col-margin-bottom', // flex-wrap: wrap-reverse;
		blockCount = 1,
		excludeMargins = '.our-app',
		excludeColSm = '';


	$('body > *:not(script)').each(function() {

		block = $(this);
		blockClass = 'block'+blockCount;
		block.addClass(blockClass);

		cols = $('.'+blockClass+' [class*=col-]');
		col1 = $('.'+blockClass+' [class*=col-]:first');
		col2 = $('.'+blockClass+' [class*=col-]:last');

		if( $('head > style').hasClass('margin-two-cols') ) $('.margin-two-cols').remove();

		
		if( cols.length == 2 && (col1.css('margin-top') == '0px') && (col1.css('margin-bottom') == '0px') && 
			(col2.css('margin-top') == '0px') && (col2.css('margin-bottom') == '0px') ) {


			if(!$('.'+blockClass).is(excludeMargins)) {

				if ( col1.css('display') == 'none' ||  col2.css('display') == 'none') {

					if(col2.hasClass(colMarginBottom)) col2.removeClass(colMarginBottom);

					if(col2.hasClass(colMarginTop)) col2.removeClass(colMarginTop);
				}
				else if( col2.parent().css('flex-wrap') == 'wrap') {

					col2.addClass(colMarginTop);
					
					if(col2.hasClass(colMarginBottom)) col2.removeClass(colMarginBottom);
				}
				else {

					col2.addClass(colMarginBottom);

					if(col2.hasClass(colMarginTop)) col2.removeClass(colMarginTop);
				}

			}	


			imgCol1 = col1.children('img');
			imgCol2 = col2.children('img');
		
			if( (imgCol1.length == 1) && (col1.children('*').length == 1) ) {
				
				imgCol1.css('width', '100%');

				if( !$('.'+blockClass).is(excludeColSm) && !col1.is('[class*=col-sm]') )
					col1.addClass('col-sm-10');
			}

			if( (imgCol2.length == 1) && (col2.children('*').length == 1) ) {
				
				imgCol2.css('width', '100%');

				if( !$('.'+blockClass).is(excludeColSm) && !col2.is('[class*=col-sm]') )
					col2.addClass('col-sm-10');
			}
			
				
		}


		block.removeClass('block'+blockCount);
		++blockCount;

	});


	$('head').append('<style class="margin-two-cols"></style>');
	style2 = $('.margin-two-cols');


	style2.append('.'+colMarginTop+' { '+
					'margin-top: '+colMarginValue+
				'}');
				
	style2.append('@media (min-width: 768px) { '+
					'.'+colMarginTop+' { '+
						'margin-top: 0; '+
					'}'+
				'}');


	style2.append('.'+colMarginBottom+' { '+
					'margin-bottom: '+colMarginValue+
				'}');
				
	style2.append('@media (min-width: 768px) { '+
					'.'+colMarginBottom+' { '+
						'margin-bottom: 0; '+
					'}'+
				'}');
	

});


/*------------------ HOVER TOUCH DEVICE -------------------*/

var hasHoverClass = false;
var container = document.body;
var lastTouchTime = 0;

function enableHover() {
    
    if (new Date() - lastTouchTime < 500) return;
    if (hasHoverClass) return;

    container.className += ' hasHover';
    hasHoverClass = true;
}

function disableHover() {
    if (!hasHoverClass) return;

    container.className = container.className.replace(' hasHover', '');
    hasHoverClass = false;
}

function updateLastTouchTime() {
    lastTouchTime = new Date();
}

document.addEventListener('touchstart', updateLastTouchTime, true);
document.addEventListener('touchstart', disableHover, true);
document.addEventListener('mousemove', enableHover, true);

enableHover();


/*================== PRELOADER ==================*/

$window.on('load', function() {

	body.css('overflow', 'visible');

	$('.preloader').fadeOut(function() {
		$(this).removeClass('preloader');
	});
	
});

$window.on('resize', function() {

	var vh = $window.innerHeight() * 0.01;
	html.css('--vh', vh+'px');
   
});


/*================== HEADER ==================*/

/*------------------ SCROLL SPY -------------------*/

var offsetTop, hash,
	homeSectionOffsetTop,
	scrollHeaderHeight,
	windowWidth,
	homeHash = '#home',
	homeSection = $(homeHash),
	header = $('header'),
	decreaseBy992 = 20,
	allHash = $('a[href*="#"]'),
	arrowUp = $('.arrow-up');


allHash.each(function() {

	hash = this.hash;

	if(hash == '') return true;
	else $(this).attr('data-target', hash);

});

$window.on('load resize', function() {

	windowWidth = $window.width();
	
	if (windowWidth >= 992) {

		homeSectionOffsetTop = homeSection.offset().top;
		scrollHeaderHeight = homeSectionOffsetTop - decreaseBy992; 

		body.scrollspy('dispose');
		body.scrollspy({ offset: homeSectionOffsetTop });
	
	}
	else if (windowWidth <= 991.98) {

		homeSectionOffsetTop = homeSection.offset().top;
		scrollHeaderHeight = homeSectionOffsetTop;

		body.scrollspy('dispose');
		body.scrollspy({ offset: homeSectionOffsetTop });
		
	}

});


/*------------------ HEADER EFFECT -------------------*/

$document.on('scroll', function() {
		
	offsetTop = $window.scrollTop();

	if (offsetTop > homeSectionOffsetTop) 
		header.addClass('reduced-header');
	else
		header.removeClass('reduced-header');
		
	
	if (offsetTop > 600)
		arrowUp.addClass('active');
	else 
		arrowUp.removeClass('active');

});


/*------------------ SMOOTH SCROLL TO ANCHOR -------------------*/

allHash.click(function(e) {
	
	hash = this.hash;

	if(!hash) return;

	var collapse = !($(this).attr('data-toggle'));	
	
	if(body.hasClass('toggler-open') && collapse) 
		body.removeClass('toggler-open');

	if(collapse) {
		
		if(hash == homeHash) offsetTop = 0;
		else 
			offsetTop = $(hash).offset().top - scrollHeaderHeight + 1;
			
		$('html').animate({ scrollTop: offsetTop }, 1000);
	}

});


/*------------------- NAV MOBILE ---------------------*/

	$(document).click(function(e) {
		
	if (body.hasClass('toggler-open') && !e.isDefaultPrevented()) {

		if ( !$(e.target).closest('.nav-mobile').length ) {
			body.removeClass('toggler-open');
		}

	}

	if( $(e.target).attr('href') == '#' ) e.preventDefault();

});


/*--------------------- TOGGLER -----------------------*/

$('.toggler').click(function(e) {

	e.preventDefault();

	body.toggleClass('toggler-open');

});


/*================== SLIDER ==================*/

var slider = new Swiper ('.slider', {
	keyboard: {
		enabled: true,
	},
	speed: 500,
	/*autoplay: {
		delay: 5500,
		disableOnInteraction: false,
	},*/
	loop: true,
	//simulateTouch: false,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
		},
		pagination: {
		el: '.slider__pagination',
		clickable: true,
	},
		
});


/*================== LATEST PRODUCTS ==================*/

/*------------------ SLIDER PRODUCTS ------------------*/

var sliderProducts = new Swiper ('.slider-products', {
	keyboard: {
		enabled: true,
	},
	speed: 500,
	/*autoplay: {
		delay: 5500,
		disableOnInteraction: false,
	},*/
	pagination: {
		el: '.slider-products__pagination',
		clickable: true,
	},
	loop: true,
	//simulateTouch: false,
});


/*================== PRODUCT GALLERY ==================*/


	var grid = $('.product-gallery__imgs').imagesLoaded(function() {

		grid.isotope({
			itemSelector: '.product-gallery__img',
			percentPosition: true,
			masonry: {
				columnWidth: '.product-gallery__img:nth-child(1)'
			}
		});

	});

	$('.product-gallery__filter li').click(function(e) { 

		$('.product-gallery__filter').find('.product-gallery__active').removeClass('product-gallery__active');
		$(this).addClass('product-gallery__active');        

		var filterValue = $(this).attr('data-filter'); 
		grid.isotope({ 
			filter: filterValue, 
			animationOptions: { 
				duration: 750, 
				easing: 'linear', 
				queue: false, 
			} 
		});

	});


/*================== REVIEWS ==================*/

/*------------------ SLIDER REVIEWS ------------------*/

var sliderReviews = new Swiper ('.slider-reviews', {
	keyboard: {
		enabled: true,
	},
	effect: 'fade',
	speed: 800,
	autoplay: {
		delay: 4000,
		disableOnInteraction: false,
	},
	loop: true,
	//simulateTouch: false,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
		},
		pagination: {
		el: '.slider-reviews__pagination',
		clickable: true,
	}
});


/*================== SPONSORS ==================*/

/*------------------ SLIDER SPONSORS ------------------*/

var sliderSponsors = new Swiper ('.slider-sponsors', {
	keyboard: {
		enabled: true,
	},
	speed: 500,
	autoplay: {
		delay: 4000,
		disableOnInteraction: false,
	},
	loop: true,
	slidesPerView: 1,
		spaceBetween: 30,
		breakpoints: {
			576: {
				slidesPerView: 2,
			},
			768: {
				slidesPerView: 3,
			},
			992: {
				slidesPerView: 4,
			},
			1200: {
				slidesPerView: 5
			}
		}
});


/*================== CONTACT DETAILS ==================*/

$('input:text, [type="email"], textarea').focus(function() {
	$(this).addClass('focus');
});

$('input:text, [type="email"], textarea').blur(function() {
	
	if(this.value.length == 0) $(this).removeClass('focus');
});

