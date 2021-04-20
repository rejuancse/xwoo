<?php
defined( 'ABSPATH' ) || exit;

//SHORTCODES
add_shortcode( 'wp_crowdfunding_campaign_box',          array( $XWOO_campaign_box, 'campaign_box_callback' ) );
add_shortcode( 'wpneo_crowdfunding_dashboard',          array( $XWOO_dashboard, 'dashboard_callback' ) );
add_shortcode( 'wpneo_crowdfunding_listing',            array( $XWOO_project_listing, 'listing_callback' ) );
add_shortcode( 'wpneo_crowdfunding_form',               array( $XWOO_campaign_submit_from, 'campaign_form_callback' ) );
add_shortcode( 'wpneo_search_shortcode',                array( $XWOO_search_box, 'search_callback' ) );
add_shortcode( 'wpneo_registration',                    array( $XWOO_registraion, 'registration_callback' ) );
add_shortcode( 'wp_crowdfunding_single_campaign',       array( $XWOO_single_campaign, 'single_campaign_callback' ) );
add_shortcode( 'wp_crowdfunding_donate',                array( $XWOO_donate, 'donate_callback' ) );
add_shortcode( 'wp_crowdfunding_popular_campaigns',     array( $XWOO_popular_campaign, 'popular_campaigns_callback' ) );