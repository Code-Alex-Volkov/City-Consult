$(document).ready(function(){
	'use strict';

	/* slider Header 111 */
	if ($('.header_slider').length) {
		var helpers = {
			addZeros: function (n) {
					return (n < 10) ? '0' + n : '' + n;
				}
			};

	function sliderInit() {
		var $slider = $('.header_slider');
		$slider.each(function() {
			var $sliderParent = $(this).parent();
			$(this).slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: false,
				infinite: true,
				appendArrows: $('.slides_numbers'),
				prevArrow: "<div class=\"left\"><img src=\"./assets/img/icon/arrow_left.svg\" alt=\"Left\"></div>",
				nextArrow: "<div class=\"right\"><img src=\"./assets/img/icon/arrow_right.svg\" alt=\"Right\"></div>",
				responsive: [{
					breakpoint: 767,
					settings: {
						adaptiveHeight: true
					}
				}]
			});

			if ($(this).find('.item').length > 1) {
				$(this).siblings('.slides_numbers').show();
			}

			$(this).on('afterChange', function(event, slick, currentSlide){
				$sliderParent.find('.slides_numbers .active').html(helpers.addZeros(currentSlide + 1));
			});

			var sliderItemsNum = $(this).find('.slick-slide').not('.slick-cloned').length;
			$sliderParent.find('.slides_numbers .total').html(helpers.addZeros(sliderItemsNum));

		});

		$('.slick-next').on('click', function () {
			console.log('test');
			$('.header_slider').slick('slickGoTo', 5);
		});
	};

	sliderInit();
	}

	/* slider one */
	if ($('.slider_lorem').length) {
		$('.slider_lorem').slick({
		  infinite: true,
		  centerMode: true,
		  slidesToShow: 5,
		  slidesToScroll: 1,
		  appendArrows: $('.lorem_navigation'),
		  prevArrow: "<div class=\"left\"><span class=\"one\"></span><span class=\"two\"></span></div>",
		  nextArrow: "<div class=\"right\"><span class=\"one\"></span><span class=\"two\"></span></div>",
		  responsive: [
			  	{
			  		breakpoint: 993,
			  		settings: {
			  			slidesToShow: 2,
			  			slidesToScroll: 1
			  		}
			  	},
			  	{
			  		breakpoint: 577,
			  		settings: {
			  			slidesToShow: 1,
			  			slidesToScroll: 1,
			  			dots: true,
			  			arrows: false
			  		}
			  	}
		  ]
		});
	}

	/* slider two */
	if ($('.slider_trust').length) {
		$('.slider_trust').slick({
		  infinite: true,
		  centerMode: true,
		  slidesToShow: 5,
		  slidesToScroll: 1,
		  appendArrows: $('.trust_navigation'),
		  prevArrow: "<div class=\"left\"><span class=\"one\"></span><span class=\"two\"></span></div>",
		  nextArrow: "<div class=\"right\"><span class=\"one\"></span><span class=\"two\"></span></div>",
		  responsive: [
			  	{
			  		breakpoint: 993,
			  		settings: {
			  			slidesToShow: 2,
			  			slidesToScroll: 1
			  		}
			  	},
			  	{
			  		breakpoint: 577,
			  		settings: {
			  			slidesToShow: 1,
			  			slidesToScroll: 1,
			  			dots: true,
			  			arrows: false
			  		}
			  	}
		  ]
		});
	}
	
	bouncy_filter($('.cd-gallery-container'));

	function bouncy_filter($container) {
		$container.each(function(){
			var $this = $(this);
			var filter_list_container = $this.children('.cd-filter'),
				filter_values = filter_list_container.find('li:not(.placeholder) a'),
				filter_list_placeholder = filter_list_container.find('.placeholder a'),
				filter_list_placeholder_text = filter_list_placeholder.text(), 
				filter_list_placeholder_default_value = 'Select',
				gallery_item_wrapper = $this.children('.cd-gallery').find('.cd-item-wrapper');

			//store gallery items
			var gallery_elements = {};
			filter_values.each(function(){
				var filter_type = $(this).data('type');
				gallery_elements[filter_type] = gallery_item_wrapper.find('li[data-type="'+filter_type+'"]');
			});

			//detect click event
			filter_list_container.on('click', function(event){
				event.preventDefault();
				//detect which filter item was selected
				var selected_filter = $(event.target).data('type');
					
				//check if user has clicked the placeholder item (for mobile version)
				if( $(event.target).is(filter_list_placeholder) || $(event.target).is(filter_list_container) ) {

					(filter_list_placeholder_default_value == filter_list_placeholder.text()) ? filter_list_placeholder.text(filter_list_placeholder_text) : filter_list_placeholder.text(filter_list_placeholder_default_value) ;
					filter_list_container.toggleClass('is-open');

				//check if user has clicked a filter already selected 
				} else if( filter_list_placeholder.data('type') == selected_filter ) {
					
					filter_list_placeholder.text($(event.target).text()) ;
					filter_list_container.removeClass('is-open');	

				} else {
					//close the dropdown (mobile version) and change placeholder text/data-type value
					filter_list_container.removeClass('is-open');
					filter_list_placeholder.text($(event.target).text()).data('type', selected_filter);
					filter_list_placeholder_text = $(event.target).text();
					
					//add class selected to the selected filter item
					filter_values.removeClass('selected');
					$(event.target).addClass('selected');

					//give higher z-index to the gallery items selected by the filter
					show_selected_items(gallery_elements[selected_filter]);

					//rotate each item-wrapper of the gallery
					//at the end of the animation hide the not-selected items in the gallery amd rotate back the item-wrappers
					
					// fallback added for IE9
					var is_explorer_9 = navigator.userAgent.indexOf('MSIE 9') > -1;
					
					if( is_explorer_9 ) {
						hide_not_selected_items(gallery_elements, selected_filter);
						gallery_item_wrapper.removeClass('is-switched');
					} else {
						gallery_item_wrapper.addClass('is-switched').eq(0).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {		
							hide_not_selected_items(gallery_elements, selected_filter);
							gallery_item_wrapper.removeClass('is-switched');
						});
					}
				}
			});
		});
	}
	
	function show_selected_items(selected_elements) {
		selected_elements.addClass('is-selected');
	}
	
	function hide_not_selected_items(gallery_containers, filter) {
		$.each(gallery_containers, function(key, value){
			  if ( key != filter ) {	
				$(this).removeClass('is-visible is-selected').addClass('is-hidden');
	
			} else {
				$(this).addClass('is-visible').removeClass('is-hidden is-selected');
			}
		});
	}

	$('.click_open1').on('click', function(event) {
		event.preventDefault();
		$('.open_block1').toggleClass('open_nav');
		/*$('.open_block1').parent().toggleClass( "over_hidden" );*/
		
	});
	$('.click_open2').on('click', function(event) {
		event.preventDefault();
		$('.open_block2').toggleClass('open_nav');
	});
	$('.click_open3').on('click', function(event) {
		event.preventDefault();
		$('.open_block3').toggleClass('open_nav');
	});

	

















	/* btn menu */
	$('.nav_btn').click(function(){
	   $('.nav_btn').toggleClass('nav-active');
		$('.nav_mobile').toggleClass('nav-active');
	});


	

	/* slider one */
	if ($('.slider_stairs').length) {
		$('.slider_stairs').slick({
		  infinite: true,
		  slidesToShow: 3,
		  slidesToScroll: 1,
		  appendArrows: $('.stairs_slider_navigation'),
		  prevArrow: "<div class=\"left\"><i class=\"fas fa-chevron-left\"></i></div>",
		  nextArrow: "<div class=\"right\"><i class=\"fas fa-chevron-right\"></i></div>",
		  responsive: [
			  	{
			  		breakpoint: 993,
			  		settings: {
			  			slidesToShow: 2,
			  			slidesToScroll: 1
			  		}
			  	},
			  	{
			  		breakpoint: 577,
			  		settings: {
			  			slidesToShow: 1,
			  			slidesToScroll: 1,
			  			dots: true,
			  			arrows: false
			  		}
			  	}
		  ]
		});
	}

	/* slider two */
	/*if ($('.slider_work').length) {
		$('.slider_work').slick({
		  infinite: true,
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  dots: true,
		  appendArrows: $('.work_slider_navigation'),
		  prevArrow: "<div class=\"left\"><i class=\"fas fa-chevron-left\"></i></div>",
		  nextArrow: "<div class=\"right\"><i class=\"fas fa-chevron-right\"></i></div>"
		});
	}*/

	/*if ($('.slider_work').length) {
		$('.slider_work').slick({
		  infinite: true,
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  dots: true,
		  appendArrows: $('.work_slider_navigation'),
		  prevArrow: "<div class=\"left\"><i class=\"fas fa-chevron-left\"></i></div>",
		  nextArrow: "<div class=\"right\"><i class=\"fas fa-chevron-right\"></i></div>"
		});
	}

		$('.work_slider_navigation').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		  var tabs_container = $('.project_tab_container');

		  tabs_container.find($('.tab-item')).hide();
		  tabs_container.find($('.tab-' + nextSlide)).show();
		});*/


		if ($('.slider_work').length) {
			$('.slider_work').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				fade: false,
				dots: true,
				appendArrows: $('.work_slider_navigation'),
			   prevArrow: "<div class=\"left\"><i class=\"fas fa-chevron-left\"></i></div>",
			   nextArrow: "<div class=\"right\"><i class=\"fas fa-chevron-right\"></i></div>",
				asNavFor: '.project_slider_nav',
				responsive: [
					  	{
					  		breakpoint: 769,
					  		settings: {
					  			slidesToShow: 1,
					  			slidesToScroll: 1,
					  			arrows: false
					  		}
					  	},
					  	{
					  		breakpoint: 577,
					  		settings: {
					  			slidesToShow: 1,
					  			slidesToScroll: 1,
					  			dots: true,
					  			arrows: false
					  		}
					  	}
				  ]
			});
			$('.project_slider_nav').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				asNavFor: '.slider_work',
				dots: true,
				arrows: false,
				fade: true,
				//centerMode: false,
				focusOnSelect: true
			});

			/*$('.project_slider_nav').on('beforeChange', function(event, slick, currentSlide, nextSlide){
			  var tabs_container = $('.project_tab_container');

			  tabs_container.find($('.tab-item')).hide();
			  tabs_container.find($('.tab-' + nextSlide)).show();
			});*/
		}

	/* slider one */
	if ($('.slider_works').length) {
		$('.slider_works').slick({
		  infinite: true,
		  slidesToShow: 3,
		  slidesToScroll: 1,
		  appendArrows: $('.works_slider_navigation'),
		  prevArrow: "<div class=\"left\"><i class=\"fas fa-chevron-left\"></i></div>",
		  nextArrow: "<div class=\"right\"><i class=\"fas fa-chevron-right\"></i></div>",
		 responsive: [
			  	{
			  		breakpoint: 993,
			  		settings: {
			  			slidesToShow: 2,
			  			slidesToScroll: 1
			  		}
			  	},
			  	{
			  		breakpoint: 577,
			  		settings: {
			  			slidesToShow: 1,
			  			slidesToScroll: 1,
			  			dots: true,
			  			arrows: false
			  		}
			  	}
		  ]
		});
	}

	$('.popup-btn-quiz').on('click', function(event) {
		event.preventDefault();
		$('.popup_quiz').fadeIn(400);
		$('body').addClass('over_hidden');
		$('.slider_box_quiz').slick('refresh');
	});



	$('.next_quiz2').on('click', function(event) {
		event.preventDefault();
		$('.popup_quiz').fadeOut(400);
		$('.popup_quiz2').fadeIn(400);
		$('.popup_quiz3').fadeOut(400);
		$('.popup_quiz4').fadeOut(400);
		$('body').addClass('over_hidden');
	});

	$('.next_quiz3').on('click', function(event) {
		event.preventDefault();
		$('.popup_quiz').fadeOut(400);
		$('.popup_quiz2').fadeOut(400);
		$('.popup_quiz3').fadeIn(400);
		$('.popup_quiz4').fadeOut(400);
		$('body').addClass('over_hidden');
		$('.box_quiz_three').slick('refresh');
	});

	$('.next_quiz4').on('click', function(event) {
		event.preventDefault();
		$('.popup_quiz').fadeOut(400);
		$('.popup_quiz2').fadeOut(400);
		$('.popup_quiz3').fadeOut(400);
		$('.popup_quiz4').fadeIn(400);
		$('body').addClass('over_hidden');
	});


	/*$('.popup-close_quiz').on('click', function(event) {
		event.preventDefault();
		$('.popup_quiz').fadeOut(400);
		$('body').removeClass('over_hidden');
	});*/

	$('.popup-btn').on('click', function(event) {
		event.preventDefault();
		$('.popup').fadeIn(400);
		$('body').addClass('over_hidden');
	});
	$('.popup-close').on('click', function(event) {
		event.preventDefault();
		$('.popup').fadeOut(400);
		$('body').removeClass('over_hidden');
	});
	/*$('.submit').on('click', function(event) {
		event.preventDefault();
		$('.popup').fadeOut(400);
		$('.popup-ok').fadeIn(400);
		$('body').addClass('over_hidden');
	});*/
	

	/*$(".wpcf7").on('wpcf7:mailsent', function(event){
		$('.popup').fadeOut(400);
		$('.popup-ok').fadeIn(400);						
	});
*/
	$('.popup-close-ok').on('click', function(event) {
		event.preventDefault();
		$('.popup-ok').fadeOut(400);
		$('body').removeClass('over_hidden');
	});


	/* slider 3 */
	if ($('.slider_box_quiz').length) {
		$('.slider_box_quiz').slick({
		  infinite: true,
		  slidesToShow: 5,
		  slidesToScroll: 1,
		  appendArrows: $('.quiz_slider_navigation'),
		  prevArrow: "<div class=\"left\"><i class=\"fas fa-chevron-left\"></i></div>",
		  nextArrow: "<div class=\"right\"><i class=\"fas fa-chevron-right\"></i></div>",
		  responsive: [
			  	{
			  		breakpoint: 993,
			  		settings: {
			  			slidesToShow: 4,
			  			slidesToScroll: 1
			  		}
			  	},
			  	{
			  		breakpoint: 769,
			  		settings: {
			  			slidesToShow: 3,
			  			slidesToScroll: 1
			  		}
			  	},
			  	{
			  		breakpoint: 577,
			  		settings: {
			  			slidesToShow: 2,
			  			slidesToScroll: 1,
			  			dots: true,
			  			arrows: false
			  		}
			  	},
			  	{
			  		breakpoint: 401,
			  		settings: {
			  			slidesToShow: 1,
			  			slidesToScroll: 1,
			  			dots: true,
			  			arrows: false
			  		}
			  	}
		  ]
		});
	}

	 $('.next_quiz2').click(function(){
       var text = $('input[type="radio"][name="happy"]:checked').val();
       $('.right_param_1').text(text);
    });

    $('.next_quiz3').click(function(){
       var text = $('input[type="radio"][name="vid"]:checked').val();
       var height = $('#your_height').val();
       var large = $('#your_large').val();
       var width = $('#your_width').val();
       $('.right_param_2').text(text);
       $('.right_param_3').text(height);
       $('.right_param_4').text(large);
       $('.right_param_5').text(width);
    });

    $('.next_quiz4').click(function(){
       var text = $('input[type="radio"][name="interior"]:checked').val();
       $('.right_param_6').text(text);
    });


	

});


//project block slider
	/*if ($('.project_slider').length) {
		$('.project_slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			asNavFor: '.project_slider_nav'
		});
		$('.project_slider_nav').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			asNavFor: '.project_slider',
			dots: false,
			arrows: false,
			//centerMode: false,
			focusOnSelect: true
		});

		$('.project_slider_nav').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		  var tabs_container = $('.project_tab_container');

		  tabs_container.find($('.tab-item')).hide();
		  tabs_container.find($('.tab-' + nextSlide)).show();
		});
	}*/

	/*<section class="centr_box">
		<div class="price_container">
			<div class="left_block">
				<div class="project_slider">
					<div class="slid"><img src="assets/images/project-single/img1.jpg" alt=""></div>
					<div class="slid"><img src="assets/images/project-single/img2.jpg" alt=""></div>
					<div class="slid"><img src="assets/images/project-single/img3.jpg" alt=""></div>
					<div class="slid"><img src="assets/images/project-single/img4.jpg" alt=""></div>
					<div class="slid"><img src="assets/images/project-single/img5.jpg" alt=""></div>
				</div>	
			</div>
			<div class="right_block">
				<div class="project_tab_container">
					<div class="top_box tab-item tab-0">
						<h2 class="title">Проект</h2>
						<h1 class="title_project">Название блока 1</h1>
						<span class="sub_title">Краткое описание сайта, пару строк про сайт и ещё что нибудь.</span>
						<div class="price_box">
							<div class="time_block">
								<span class="text">Время:</span>
								<span class="time">53 мин</span>
							</div>
							<div class="price_block">
								<span class="text">Цена:</span>
								<span class="price">300 руб</span>
							</div>
							<div class="btn_clic">
								<a class="popup-btn" href="#">Заказать сайт</a>
							</div>
						</div>
					</div>
					<div class="top_box tab-item tab-1">
						<h2 class="title">Проект</h2>
						<h1 class="title_project">Название блока 2</h1>
						<span class="sub_title">Краткое описание сайта, пару строк про сайт и ещё что нибудь.</span>
						<div class="price_box">
							<div class="time_block">
								<span class="text">Время:</span>
								<span class="time">52 мин</span>
							</div>
							<div class="price_block">
								<span class="text">Цена:</span>
								<span class="price">350 руб</span>
							</div>
							<div class="btn_clic">
								<a class="popup-btn" href="#">Заказать сайт</a>
							</div>
						</div>
					</div>
					<div class="top_box tab-item tab-2">
						<h2 class="title">Проект</h2>
						<h1 class="title_project">Название блока 3</h1>
						<span class="sub_title">Краткое описание сайта, пару строк про сайт и ещё что нибудь.</span>
						<div class="price_box">
							<div class="time_block">
								<span class="text">Время:</span>
								<span class="time">51 мин</span>
							</div>
							<div class="price_block">
								<span class="text">Цена:</span>
								<span class="price">400 руб</span>
							</div>
							<div class="btn_clic">
								<a class="popup-btn" href="#">Заказать сайт</a>
							</div>
						</div>
					</div>
					<div class="top_box tab-item tab-3">
						<h2 class="title">Проект</h2>
						<h1 class="title_project">Название блока 4</h1>
						<span class="sub_title">Краткое описание сайта, пару строк про сайт и ещё что нибудь.</span>
						<div class="price_box">
							<div class="time_block">
								<span class="text">Время:</span>
								<span class="time">50 мин</span>
							</div>
							<div class="price_block">
								<span class="text">Цена:</span>
								<span class="price">450 руб</span>
							</div>
							<div class="btn_clic">
								<a class="popup-btn" href="#">Заказать сайт</a>
							</div>
						</div>
					</div>
					<div class="top_box tab-item tab-4">
						<h2 class="title">Проект</h2>
						<h1 class="title_project">Название блока 5</h1>
						<span class="sub_title">Краткое описание сайта, пару строк про сайт и ещё что нибудь.</span>
						<div class="price_box">
							<div class="time_block">
								<span class="text">Время:</span>
								<span class="time">49 мин</span>
							</div>
							<div class="price_block">
								<span class="text">Цена:</span>
								<span class="price">500 руб</span>
							</div>
							<div class="btn_clic">
								<a class="popup-btn" href="#">Заказать сайт</a>
							</div>
						</div>
					</div>
				</div>				
				
				<div class="project_slider_nav">
					<div class="slid_nav"><img src="assets/images/project-single/img1.jpg" alt=""></div>
					<div class="slid_nav"><img src="assets/images/project-single/img2.jpg" alt=""></div>
					<div class="slid_nav"><img src="assets/images/project-single/img3.jpg" alt=""></div>
					<div class="slid_nav"><img src="assets/images/project-single/img4.jpg" alt=""></div>
					<div class="slid_nav"><img src="assets/images/project-single/img5.jpg" alt=""></div>
				</div>
			</div>
		</div>		
	</section>*/