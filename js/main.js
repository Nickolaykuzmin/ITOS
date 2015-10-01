var WW = '';

jQuery(function($) {
	
	// Fix fixed bg's jump
	/MSIE [6-8]|Mac/i.test(navigator.userAgent)||$("header, article, footer").each(function(){if("fixed"==$(this).css("backgroundAttachment")){var i=$(this),a=/WebKit/i.test(navigator.userAgent)?9:8;i.addClass("froid-fixed-bg").data({bgX:i.css("backgroundPosition").slice(0,i.css("backgroundPosition").indexOf(" ")),bgY:i.css("backgroundPosition").slice(i.css("backgroundPosition").indexOf(" ")),margin:a})}}),$(window).bind("SIModals.modalsOpen",function(){$(".froid-fixed-bg").each(function(){var i=$(this);i.css("backgroundPosition","calc("+i.data("bgX")+" - "+i.data("margin")+"px) "+i.data("bgY"))})}),$(window).bind("SIModals.modalsClose",function(){$(".froid-fixed-bg").each(function(){var i=$(this);i.css("backgroundPosition",i.data("bgX")+" "+i.data("bgY"))})});
	
	// Mobile full-width && disable animation
	if(is_mobile()) {
		
		// Fix mobile fixed bg's
		$("header, article, footer").each(function(){if ("fixed" == $(this).css("backgroundAttachment")) $(this).css('backgroundAttachment', 'scroll');});
		
		// Mobile stretch
		$('html, body').css('min-width', '1400px').addClass('mobile');
		$('html').css('width', window.innerWidth + 'px');
		
		// Remove animation
		$('.cre-animate').css({'transform': 'none', '-webkit-transform': 'none', '-moz-transform': 'none', '-ms-transform': 'none', '-o-transform': 'none', 'transition': 'none', '-webkit-transition': 'none', 'opacity' : 1}).removeClass('.cre-animate');
		
		$('.countTo').each(function() {
			$(this).text($(this).data('to'));
		})
		
	}
	
	// Init all plugins and scripts
	$.fn.SIInit = function() {
	
		// Modal photos
		$('a[data-rel]').each(function() {$(this).attr('rel', $(this).data('rel'));});
		$('a[rel^=fancybox]').not('.cloned a').fancybox({
			helpers : {
				thumbs : true
			}
		});
		
		// Forms
		$('.send-form').SIForms({
			'validateFields': { 
				'client_name' 		: 'Укажите Ваше имя',
				'client_phone' 		: 'Укажите Ваш телефон',
				'client_mail' 		: 'Укажите Ваш e-mail',
				'client_message'	: 'Укажите Ваше сообщение'
			},
			'sendSuccess' : function(res) {
				
				/*
				yaCounter.reachGoal('target' + res.id);
				
				ga('send', 'event', res.gcode, res.gcode); break;
				*/
				
			}
			
		});
	
	};
	
	$.fn.SIInit();

	// All sound load
	$.ionSound({sounds: ["bip-1","bip-2","wuf-1","wuf-2","wuf-3","wuf-4"], path: template_url + "/sounds/", volume: 0.3});
	
	// Styler
	$('input[type=file]').styler();
	
	// Sounds
	$(document).on('mouseenter', '.button, .submit, .phone-line, .si-jump', function() {
		//$.ionSound.play('bip-2');
	});
	SIModals.settings.resizeElements = '#global-wrapper, #top';
	//SIModals.beforeOpen = function() {$.ionSound.play('wuf-4');}
	//SIModals.beforeClose = function() {$.ionSound.play('wuf-3');}

	// Jump links
	$('.si-jump').SIJump();

	
	// Facts
		
		// CountTO
		
		$('#facts-go').seainside_screen_control(200);
		$('#facts-go').bind('start-animation', function() {
			$('.countTo').countTo({
				speed:1500, 
				refreshInterval:10
			});
		});
	
	// Top
	$(window).on('scroll resize load', function() {
	
		var top = $(window).scrollTop();
		
		if (top > 0) {
			$('#top').addClass('go');
		}else{
			$('#top').removeClass('go');
		}
	
	});
	
	// Catalog
		
		// AutoHeight
		$('.catalog-row').each(function(){
			mh = 0;
			$(this).find('.catalog-item').each(function() {
				mh = Math.max($(this).find('.catalog-item-text').height(), mh);
			})
			$(this).find('.catalog-item-text').animate({height:mh},500);
		});

	// Projects
		
		// Carousel
		WW = $('#projects-photos').waterwheelCarousel({
			flankingItems : 1,
			topPadding : 0,
			sizeMultiplier: 0.6,
			opacityMultiplier: 1,
			separation: 280,
			movedToCenter: function($newCenterItem) {
				var index = $newCenterItem.index();
				$('.project-dot').removeClass('active');
				$('.project-dot').eq(index).addClass('active');
				$('.project-title').removeClass('active');
				$('.project-title').eq(index).addClass('active');
				//$.ionSound.play('wuf-4');
			}
		});
		
		// Dots
		for (var i = 0; i < $('.project-image').size(); i++) {
			$('.projects-dots').append('<div class="project-dot"></div>');
		}
		$('.project-dot').first().addClass('active');
		
		// Dots click
		$('.projects-dots').on('click', '.project-dot', function() {
			var index = $(this).index();
			$('.project-image').eq(index).click();
			$('.project-dot').removeClass('active');
			$(this).addClass('active');
			return false;
		});
		
		// Arrows
		$('.project-arrow').click(function() {
			
			if ($(this).hasClass('left'))
				WW.prev();
			else
				WW.next();
				
			return false;
			
		})
		
	// Advantages
		
		// Fade
		if (!is_mobile()) {
			
			$('.advantage-yellow-circle').addClass('hidden');
			$('.advantage-text').addClass('hidden');
			
			$('#advantages-go').seainside_screen_control(100);
			$('#advantages-go').on('start-animation', function(){
				
				$('.advantage-yellow-circle').each(function(i) {
					var $this = $(this);
					var index = $('.advantage-yellow-circle').index($this);
					setTimeout(function(){
						$this.removeClass('hidden');
						$('.advantage-text').eq(index).removeClass('hidden');
					}, i*200);

				});
				
			});
			
		}
	
	// Reviews
	
		// Slider
		$('.reviews').owlCarousel({loop:true,items:1,margin:5,nav:true,dots:true,navText:['<span class="si-arrow-left"></span><span class="si-arrow-left hovered"></span>', '<span class="si-arrow-right"></span><span class="si-arrow-right hovered"></span>'],
			onChange : function(){
				//$.ionSound.play('wuf-4');
			}
		});
		$('#reviews').on('mouseenter', '.owl-prev, .owl-next, .owl-dot', function() {
			//$.ionSound.play('bip-2');
		});
	
	
	// Modals
	SIModals.init();
		
		// Init modals
		SIModals.attachModal('.open-phone-modal', '.phone-modal', {'.send-extra' : 'extra'});
		SIModals.attachModal('.open-for-modal', '.for-modal', {'.send-extra' : 'extra'});
		SIModals.attachModal('.open-more-modal', '.more-modal', {'.send-extra' : 'extra'});
		SIModals.attachModal('.open-buy-modal', '.buy-modal', {'.send-extra' : 'extra'});
		SIModals.attachModal('.open-simple-modal', '.simple-modal', {'.send-extra' : 'extra'});

		// Modal controls
		SIModals.attachClose('.si-close');
		
});
