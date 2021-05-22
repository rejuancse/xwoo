/**
 * frontend.js
 *
 * @author Your Inspiration Themes
 * @package XWOO WooCommerce Quick View
 * @version 1.0.0
 */

jQuery(document).ready(function($){
    "use strict";

    if( typeof xwoo_qv === 'undefined' ) {
        return;
    }

    var qv_modal    = $(document).find( '#xwoo-quick-view-modal' ),
        qv_overlay  = qv_modal.find( '.xwoo-quick-view-overlay'),
        qv_content  = qv_modal.find( '#xwoo-quick-view-content' ),
        qv_close    = qv_modal.find( '#xwoo-quick-view-close' ),
        qv_wrapper  = qv_modal.find( '.xwoo-wcqv-wrapper'),
        qv_wrapper_w = qv_wrapper.width(),
        qv_wrapper_h = qv_wrapper.height(),
        center_modal = function() {

            var window_w = $(window).width(),
                window_h = $(window).height(),
                width    = ( ( window_w - 60 ) > qv_wrapper_w ) ? qv_wrapper_w : ( window_w - 60 ),
                height   = ( ( window_h - 120 ) > qv_wrapper_h ) ? qv_wrapper_h : ( window_h - 120 );

            qv_wrapper.css({
                'left' : (( window_w/2 ) - ( width/2 )),
                'top' : (( window_h/2 ) - ( height/2 )),
                'width'     : width + 'px',
                'height'    : height + 'px'
            });
        };


    /*==================
     *MAIN BUTTON OPEN
     ==================*/

    $.fn.xwoo_quick_view = function() {

        $(document).off( 'click', '.xwoo-wcqv-button' ).on( 'click', '.xwoo-wcqv-button', function(e){
            e.preventDefault();

            var t           = $(this),
                product_id  = t.data( 'product_id' ),
                is_blocked  = false;

            if ( typeof xwoo_qv.loader !== 'undefined' ) {
                is_blocked = true;
                t.block({
                    message: null,
                    overlayCSS  : {
                        background: '#fff url(' + xwoo_qv.loader + ') no-repeat center',
                        opacity   : 0.5,
                        cursor    : 'none'
                    }
                });

                if( ! qv_modal.hasClass( 'loading' ) ) {
                    qv_modal.addClass('loading');
                }

                // stop loader
                $(document).trigger( 'qv_loading' );
            }
            ajax_call( t, product_id, is_blocked );
        });
    };

    /*================
     * MAIN AJAX CALL
     ================*/

    var ajax_call = function( t, product_id, is_blocked ) {

        $.ajax({
            url: xwoo_qv.ajaxurl,
            data: {
                action: 'xwoo_load_product_quick_view',
                product_id: product_id,
                lang: xwoo_qv.lang,
				context: 'frontend',
            },
            dataType: 'json',
            type: 'POST',
            success: function (data) {

                qv_content.html(data.html);

                // Variation Form
				var form_variation = qv_content.find('.variations_form');
                form_variation.each( function() {
                    $( this ).wc_variation_form();
                    // add Color and Label Integration
                    if( typeof $.fn.xwoo_wccl !== 'undefined' ) {
                        $(this).xwoo_wccl();
                    }
                    else if( typeof $.xwoo_wccl != 'undefined' && data.prod_attr ) {
						
                        $.xwoo_wccl( data.prod_attr );
                    }
                });

                form_variation.trigger( 'check_variations' );
                form_variation.trigger( 'reset_image' );

                if( typeof $.fn.wc_product_gallery !== 'undefined' ) {
                    qv_content.find('.woocommerce-product-gallery').each(function () {
                        $(this).wc_product_gallery();
                    });
                }

                if (!qv_modal.hasClass('open')) {
                    qv_modal.removeClass('loading').addClass('open');
                    if (is_blocked)
                        t.unblock();
                }

                // stop loader
                $(document).trigger('qv_loader_stop');

            }
        });
    };

    /*===================
     * CLOSE QUICK VIEW
     ===================*/

    var close_modal_qv = function() {

        // Close box by click overlay
        qv_overlay.on( 'click', function(e){
            close_qv();
        });
        // Close box with esc key
        $(document).keyup(function(e){
            if( e.keyCode === 27 )
                close_qv();
        });
        // Close box by click close button
        qv_close.on( 'click', function(e) {
            e.preventDefault();
            close_qv();
        });

        var close_qv = function() {
            qv_modal.removeClass('open').removeClass('loading');

            setTimeout(function () {
                qv_content.html('');
            }, 1000);
        }
    };

    close_modal_qv();


    center_modal();
    $( window ).on( 'resize', center_modal );

    // START
    $.fn.xwoo_quick_view();

    $( document ).on( 'xwoo_infs_adding_elem xwoo-wcan-ajax-filtered', function(){
        // RESTART
        $.fn.xwoo_quick_view();
    });

});