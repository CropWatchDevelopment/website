$(document).ready(function() {
    'use strict'; // Start of use strict

    /*------------------------------------------------------------------
    Scrool Top
    ------------------------------------------------------------------*/
    if ($('#scrool-top').length) {
        var scrollTrigger = 100, // px
            backToTop = function() {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('#scrool-top').addClass('show');
                } else {
                    $('#scrool-top').removeClass('show');
                }
            };
        backToTop();
        $(window).on('scroll', function() {
            backToTop();
        });
        $('#scrool-top').on('click', function(e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }

    /*------------------------------------------------------------------
    Header Navigation
    ------------------------------------------------------------------*/
    if ($(window).width() > 991) {
        $('ul.navbar-nav li.dropdown').on('hover', function() {
            $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
        }, function() {
            $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
        });
    }
});
/*------------------------------------------------------------------
Wow animations
------------------------------------------------------------------*/
wow = new WOW({
    animateClass: 'animated',
    offset: 100,
});
wow.init();

jQuery(window).on("load scroll", function() {

    /*------------------------------------------------------------------
    Loader
    ------------------------------------------------------------------*/

    $("#dvLoading").fadeOut("fast");
    /*------------------------------------------------------------------
    Animation Numbers
    ------------------------------------------------------------------*/
    jQuery('.animateNumber').each(function() {
        var num = jQuery(this).attr('data-num');

        var top = jQuery(document).scrollTop() + (jQuery(window).height());
        var pos_top = jQuery(this).offset().top;
        if (top > pos_top && !jQuery(this).hasClass('active')) {
            jQuery(this).addClass('active').animateNumber({
                number: num
            }, 2000);
        }
    });
    jQuery('.animateProcent').each(function() {
        var num = jQuery(this).attr('data-num');
        var percent_number_step = jQuery.animateNumber.numberStepFactories.append('%');
        var top = jQuery(document).scrollTop() + (jQuery(window).height());
        var pos_top = jQuery(this).offset().top;
        if (top > pos_top && !jQuery(this).hasClass('active')) {
            jQuery(this).addClass('active').animateNumber({
                number: num,
                numberStep: percent_number_step
            }, 2000);
            jQuery(this).css('width', num + '%');
        }
    });
});
/*------------------------------------------------------------------
Classic Accordion
------------------------------------------------------------------*/

(function($) {
    "use strict"

    // Accordion Toggle Items
    var iconOpen = 'fa fa-minus',
        iconClose = 'fa fa-plus';

    $(document).on('show.bs.collapse hide.bs.collapse', '.accordion', function(e) {
        var $target = $(e.target)
        $target.siblings('.accordion-heading')
            .find('em').toggleClass(iconOpen + ' ' + iconClose);
        if (e.type == 'show')
            $target.prev('.accordion-heading').find('.accordion-toggle').addClass('active');
        if (e.type == 'hide')
            $(this).find('.accordion-toggle').not($target).removeClass('active');
    });

})(jQuery);