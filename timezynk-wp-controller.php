<?php
/**
 * Plugin Name: Timezynk Scripts
 * Text Domain: timezynk-wp-controller
 * Plugin URI: https://github.com/TimeZynk/timezynk-wp-controller
 * Description: Links in signup and pricing scripts
 * Version: 1.7.3
 * Author: Timezynk Dev
 * Author URI: https://timezynk.com
 * GitHub Plugin URI: https://github.com/TimeZynk/timezynk-wp-controller
 */

function timezynk_scripts_enqueue_scripts() {
    $script_version = '1.7.3';
    wp_enqueue_script('timezynk_password_strength', plugins_url( 'js/password-strength.js', __FILE__ ), array(), $script_version, true);
    wp_enqueue_script('timezynk_signup', plugins_url( 'js/signup.js', __FILE__), array(), $script_version, true);
    wp_localize_script('timezynk_password_strength', 'password_messages', array(
        0 => __('Insecure password! Please make it longer or use numbers and special characters.', 'timezynk-wp-controller'),
        1 => __('Insecure password! Please make it longer or use numbers and special characters.', 'timezynk-wp-controller'),
        2 => __('Weak password! Please make it longer or use numbers and special characters.', 'timezynk-wp-controller'),
        3 => __('Good password', 'timezynk-wp-controller'),
        4 => __('Strong password', 'timezynk-wp-controller')
    ));
}

function timezynk_scripts_nativeforms_snippet() {
    $my_current_lang = apply_filters( 'wpml_current_language', NULL );
    $widgetId = $my_current_lang == "sv" ? 'b7i4' : '1';
    ?>
        <script>
        window.nativeForms = {
            license: "6nLEzw",
            widgetId: "<?php echo $widgetId ?>"
        };
        </script>
        <script src="https://script.nativeforms.com/main.js" async></script>
    <?php
}

add_action('wp_head', 'timezynk_scripts_nativeforms_snippet');
add_action('wp_enqueue_scripts', 'timezynk_scripts_enqueue_scripts');
