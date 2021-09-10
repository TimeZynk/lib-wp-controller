<?php
/**
 * Plugin Name: Timezynk Scripts
 * Plugin URI: https://github.com/TimeZynk/lib-wp-controller
 * Description: Links in signup and pricing scripts
 * Version: 1.3.3
 * Author: Timezynk Dev
 * Author URI: https://timezynk.com
 * GitHub Plugin URI: https://github.com/TimeZynk/lib-wp-controller
 */

function timezynk_scripts_enqueue_scripts() {
    $script_version = '1.3.3';
    wp_enqueue_script('timezynk_password_strength', plugins_url( 'js/password-strength.js', __FILE__ ), array(), $script_version, true);
    wp_enqueue_script('timezynk_pricing', plugins_url( 'js/pricing.js', __FILE__ ), array(), $script_version, true);
    wp_enqueue_script('timezynk_signup', plugins_url( 'js/signup.js', __FILE__), array(), $script_version, true);
}

function timezynk_scripts_mixpanel_snippet() {
    ?>
        <script type="text/javascript">
            (function(f,b){if(!b.__SV){var e,g,i,h;window.mixpanel=b;b._i=[];b.init=function(e,f,c){function g(a,d){var b=d.split(".");2==b.length&&(a=a[b[0]],d=b[1]);a[d]=function(){a.push([d].concat(Array.prototype.slice.call(arguments,0)))}}var a=b;"undefined"!==typeof c?a=b[c]=[]:c="mixpanel";a.people=a.people||[];a.toString=function(a){var d="mixpanel";"mixpanel"!==c&&(d+="."+c);a||(d+=" (stub)");return d};a.people.toString=function(){return a.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");
            for(h=0;h<i.length;h++)g(a,i[h]);var j="set set_once union unset remove delete".split(" ");a.get_group=function(){function b(c){d[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));a.push([e,call2])}}for(var d={},e=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<j.length;c++)b(j[c]);return d};b._i.push([e,f,c])};b.__SV=1.2;e=f.createElement("script");e.type="text/javascript";e.async=!0;e.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?
            MIXPANEL_CUSTOM_LIB_URL:"file:"===f.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";g=f.getElementsByTagName("script")[0];g.parentNode.insertBefore(e,g)}})(document,window.mixpanel||[]);
            mixpanel.init('57111939d0a72cc88f6c6f93c941d125', {
                loaded: function() {
                    var event = new Event('mixpanelReady');
                    document.dispatchEvent(event)
                }
            });
            mixpanel.track('View Web Page');
        </script>
    <?php
}

function timezynk_scripts_monitoringservice_snippet() {
    ?>
        <script>
            !function(e, t, n, i) {
                b = e.URL, v = -1 !== b.indexOf(i) ? b.substr(b.indexOf(i)).replace(i + "=", "").toString() : Date.now().toString(),
                i = -1 !== v.indexOf("&") ? v.split("&")[0] : v,
                a = e.createElement(t), m = e.getElementsByTagName(t)[0],
                a.async = 1,
                a.setAttribute("crossorigin", "anonymous"),
                a.src = "https://analytics.gen.shield.monitoringservice.co/client?ak=f8HW13kB9NwNAnkd_2zT&lpi=" + i + "&lpu=" + encodeURIComponent(b),
                m.parentNode.insertBefore(a, m)
            }(document, "script", 0, "gclid");
        </script>
    <?php
}


// add_action('wp_head', 'timezynk_scripts_mixpanel_snippet');
add_action('wp_head', 'timezynk_scripts_monitoringservice_snippet');
add_action('wp_enqueue_scripts', 'timezynk_scripts_enqueue_scripts');
