//

/*----------------------------------------------------*/
/* MOBILE DETECT FUNCTION
/*----------------------------------------------------*/
var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

var windowVar = $(window);


/////////////////////// ready
$(document).on('ready', function () {
    "use strict";


    var testimonialCarousel = $('#testimonials').find('.carousel.main ul');

    /*----------------------------------------------------*/
    // carouFredSel.
    /*----------------------------------------------------*/
    testimonialCarousel.carouFredSel({
        auto: {
            timeoutDuration: 8000
        },
        responsive: true,
        prev: '.testimonials_prev',
        next: '.testimonials_next',
        width: '100%',
        scroll: {
            items: 1,
            duration: 1000,
            easing: "easeOutExpo"
        },
        items: {
            width: '2000',
            height: 'variable', //  optionally resize item-height
            visible: {
                min: 1,
                max: 1
            }
        },
        mousewheel: false,
        swipe: {
            onMouse: true,
            onTouch: true
        }
    });


    windowVar.on("resize", updateSizes_vat).on("load", updateSizes_vat);

    function updateSizes_vat() {
        testimonialCarousel.trigger("updateSizes");
    }

    updateSizes_vat();


    /*----------------------------------------------------*/
    // Sticky.
    /*----------------------------------------------------*/
    $("#top2").sticky({
        topSpacing: 0,
        getWidthFrom: 'body',
        responsiveWidth: true
    });

    /*----------------------------------------------------*/
    // PRELOADER CALLING
    /*----------------------------------------------------*/
    // $("body.onepage").queryLoader2({
    //     //barColor: "#fff",
    //     //backgroundColor: "#000",
    //     percentage: true,
    //     barHeight: 3,
    //     completeAnimation: "fade",
    //     minimumTime: 200
    // });


    /*----------------------------------------------------*/
    // PARALLAX CALLING
    /*----------------------------------------------------*/
    windowVar.on('load', function () {
        parallaxInit();
    });

    function parallaxInit() {
        var testMobile;
        testMobile = isMobile.any();

        if (testMobile == null) {
            $('.parallax .bg1').addClass("bg-fixed").parallax("50%", 0.5);
            $('.parallax .bg2').addClass("bg-fixed").parallax("50%", 0.5);
            $('.parallax .bg3').addClass("bg-fixed").parallax("50%", 0.5);
            $('.parallax .bg4').addClass("bg-fixed").parallax("50%", 0.5);
        }
    }

    parallaxInit();


    /*----------------------------------------------------*/
    // prettyPhoto
    /*----------------------------------------------------*/
    $("a[data-gal^='prettyPhoto']").prettyPhoto({animation_speed: 'normal', theme: 'facebook', social_tools: false, allow_resize: true, default_width: 500, default_height: 344});


    // below code is commented because it is already present in public/js/script.js
    /*----------------------------------------------------*/
    // MENU SMOOTH SCROLLING
    /*----------------------------------------------------*/
    // $(document).on('click', ".navbar_ .nav a, .menu_bot a, .scroll-to", function (event) {
    //
    //     //$(".navbar_ .nav a a").removeClass('active');
    //     //$(this).addClass('active');
    //     // var headerH = $('#top1').outerHeight();
    //     var headerH = $('#top2').outerHeight();
    //
    //     if ($(this).attr("href") == "#home") {
    //         $("html, body").animate({
    //             scrollTop: 0 + 'px'
    //             // scrollTop: $($(this).attr("href")).offset().top + 'px'
    //         }, {
    //             duration: 1200,
    //             easing: "easeInOutExpo"
    //         });
    //     }
    //     else {
    //         $("html, body").animate({
    //             scrollTop: $($(this).attr("href")).offset().top - headerH + 'px'
    //             // scrollTop: $($(this).attr("href")).offset().top + 'px'
    //         }, {
    //             duration: 1200,
    //             easing: "easeInOutExpo"
    //         });
    //     }
    //
    //
    //     event.preventDefault();
    // });

    /*----------------------------------------------------*/
    // Appear
    /*----------------------------------------------------*/
    $('.animated').appear(function () {
        // console.log("111111111111");
        var elem = $(this);
        var animation = elem.data('animation');
        if (!elem.hasClass('visible')) {
            var animationDelay = elem.data('animation-delay');
            if (animationDelay) {
                setTimeout(function () {
                    elem.addClass(animation + " visible");
                }, animationDelay);
            } else {
                elem.addClass(animation + " visible");
            }
        }
    });


});

/////////////////////// load
windowVar.on('load', function () {

    /*----------------------------------------------------*/
    // flexslider
    /*----------------------------------------------------*/


    /////// flexslider
    $('#flexslider').flexslider({
        animation: "fade",
        slideshow: true,
        slideshowSpeed: 7000,
        animationDuration: 600,
        pauseOnAction: true,
        prevText: "",
        nextText: "",
        controlNav: false,
        directionNav: true
    });

    /*----------------------------------------------------*/
    // LOAD
    /*----------------------------------------------------*/
    //$('#load').fadeOut(2000).remove();
    $("#load").fadeOut(200, function () {
        $(this).remove();
    });

    /*----------------------------------------------------*/
    // IZOTOPE
    /*----------------------------------------------------*/
    var $container = $('#container');
    //Run to initialise column sizes
    updateSize();

    //Load fitRows when images all loaded
    $container.imagesLoaded(function () {

        $container.isotope({
            // options
            itemSelector: '.element',
            layoutMode: 'fitRows',
            transformsEnabled: true,
            columnWidth: function (containerWidth) {
                containerWidth = $browserWidth;
                return Math.floor(containerWidth / $cols);
            }
        });
    });

    // update columnWidth on window resize
    windowVar.smartresize(function () {
        updateSize();
        $container.isotope('reLayout');
    });

    //Set item size
    function updateSize() {
        $browserWidth = $container.width();
        $cols = 4;

        if ($browserWidth >= 1170) {
            $cols = 4;
        }
        else if ($browserWidth >= 767 && $browserWidth < 1170) {
            $cols = 3;
        }
        else if ($browserWidth >= 480 && $browserWidth < 767) {
            $cols = 2;
        }
        else if ($browserWidth >= 0 && $browserWidth < 480) {
            $cols = 1;
        }
        //console.log("Browser width is:" + $browserWidth);
        //console.log("Cols is:" + $cols);

        // $gutterTotal = $cols * 20;
        $browserWidth = $browserWidth; // - $gutterTotal;
        $itemWidth = $browserWidth / $cols;
        $itemWidth = Math.floor($itemWidth);

        $(".element").each(function (index) {
            $(this).css({"width": $itemWidth + "px"});
        });


        var $optionSets = $('#options').find('.option-set'),
            $optionLinks = $optionSets.find('a');

        $optionLinks.on('click', function () {
            var $this = $(this);
            // don't proceed if already selected
            if ($this.hasClass('selected')) {
                return false;
            }
            var $optionSet = $this.parents('.option-set');
            $optionSet.find('.selected').removeClass('selected');
            $this.addClass('selected');

            // make option object dynamically, i.e. { filter: '.my-filter-class' }
            var options = {},
                key = $optionSet.attr('data-option-key'),
                value = $this.attr('data-option-value');
            // parse 'false' as false boolean
            value = value === 'false' ? false : value;
            options[key] = value;
            if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
                // changes in layout modes need extra logic
                changeLayoutMode($this, options)
            } else {
                // otherwise, apply new options
                $container.isotope(options);
            }

            return false;
        });

    };


});