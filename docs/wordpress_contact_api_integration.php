<?php
/**
 * Plugin Name: LAYA Contact API Handler
 * Description: Registers a secure REST endpoint for the LAYA React SPA contact form with rate limiting, sanitization, length boundaries, and CORS headers.
 * Version: 1.1.0
 * Author: LAYA
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

add_action('rest_api_init', function () {
    register_rest_route('contact/v1', '/send', [
        'methods'             => 'POST',
        'callback'            => 'laya_handle_contact_submission',
        'permission_callback' => '__return_true', // Public submission with rate limiting
    ]);
});

/**
 * Handle incoming contact form submissions.
 *
 * @param WP_REST_Request $request
 * @return WP_REST_Response
 */
function laya_handle_contact_submission(WP_REST_Request $request) {
    // 0. Payload size check: reject raw request bodies exceeding 10 KB
    $raw_body = $request->get_body();
    if (strlen($raw_body) > 10240) {
        return new WP_REST_Response([
            'code'    => 'payload_too_large',
            'message' => 'Request payload exceeds the maximum allowed size.'
        ], 413);
    }

    /**
     * 1. Rate limiting by IP (maximum 5 submissions per hour)
     *
     * PROXY ARCHITECTURE REQUIREMENT:
     * If WordPress sits behind a reverse proxy or CDN (e.g., Hostinger CDN, Cloudflare, IIS ARR),
     * $_SERVER['REMOTE_ADDR'] may reflect the proxy node rather than the client IP.
     *
     * DO NOT blindly read untrusted headers like HTTP_X_FORWARDED_FOR in PHP, as clients can
     * spoof them to bypass limits unless the web server validates the proxy origin.
     *
     * REQUIRED HOST CONFIGURATION:
     * Configure trusted proxies at the web server layer (e.g., Apache mod_remoteip, Nginx set_real_ip_from,
     * or official Cloudflare plugin) so that $_SERVER['REMOTE_ADDR'] is securely restored.
     */
    $client_ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    $rate_key  = 'laya_contact_rate_' . md5($client_ip);
    $attempts  = (int) get_transient($rate_key);

    if ($attempts >= 5) {
        return new WP_REST_Response([
            'code'    => 'rate_limit_exceeded',
            'message' => 'Too many requests. Please try again later.'
        ], 429);
    }

    // 2. Parse parameters
    $params = $request->get_json_params();
    if (!is_array($params)) {
        return new WP_REST_Response([
            'code'    => 'invalid_json',
            'message' => 'Malformed JSON request.'
        ], 400);
    }

    // 3. Extract and sanitize input fields
    $name    = isset($params['name']) ? sanitize_text_field($params['name']) : '';
    $email   = isset($params['email']) ? sanitize_email($params['email']) : '';
    $subject = isset($params['subject']) ? sanitize_text_field($params['subject']) : 'LAYA Website Enquiry';
    $message = isset($params['message']) ? sanitize_textarea_field($params['message']) : '';

    // 4. Strict Validation (minimum and maximum bounds)
    if (empty($name) || strlen($name) < 2 || strlen($name) > 100) {
        return new WP_REST_Response([
            'code'    => 'invalid_name',
            'message' => 'Please provide a valid name between 2 and 100 characters.'
        ], 400);
    }

    if (empty($email) || !is_email($email) || strlen($email) > 100) {
        return new WP_REST_Response([
            'code'    => 'invalid_email',
            'message' => 'Please provide a valid email address (maximum 100 characters).'
        ], 400);
    }

    if (empty($subject) || strlen($subject) > 200) {
        return new WP_REST_Response([
            'code'    => 'invalid_subject',
            'message' => 'Subject must not exceed 200 characters.'
        ], 400);
    }

    if (empty($message) || strlen($message) < 10 || strlen($message) > 5000) {
        return new WP_REST_Response([
            'code'    => 'invalid_message',
            'message' => 'Message must be between 10 and 5,000 characters.'
        ], 400);
    }

    // 5. Email-Header Injection Prevention
    // Strip carriage returns, newlines, null bytes, and quotes from header fields
    $safe_subject = preg_replace('/[\r\n\t\0]+/', ' ', $subject);
    $safe_name    = preg_replace('/[\r\n\t\0",]+/', '', $name);

    $to            = 'info@laya.org.in';
    $email_subject = '[LAYA Web Enquiry] ' . $safe_subject;
    $body          = "You have received a new enquiry via the LAYA website:\n\n"
                   . "Name:    " . $name . "\n"
                   . "Email:   " . $email . "\n"
                   . "Subject: " . $safe_subject . "\n"
                   . "IP:      " . $client_ip . "\n\n"
                   . "Message:\n" . $message . "\n\n"
                   . "---\nThis is an automated notification from the LAYA website contact system.";

    $headers = [
        'Content-Type: text/plain; charset=UTF-8',
        'From: LAYA Website <no-reply@laya.org.in>',
        'Reply-To: "' . $safe_name . '" <' . $email . '>',
    ];

    $mail_sent = wp_mail($to, $email_subject, $body, $headers);

    // 6. Generic failure response (prevent technical information disclosure)
    if (!$mail_sent) {
        return new WP_REST_Response([
            'code'    => 'mail_error',
            'message' => 'Unable to send message at this time. Please try again later or contact us directly at info@laya.org.in.'
        ], 500);
    }

    // 7. Update rate limit transient (1 hour expiration)
    set_transient($rate_key, $attempts + 1, HOUR_IN_SECONDS);

    return new WP_REST_Response([
        'success' => true,
        'message' => 'Message sent successfully.'
    ], 200);
}

/**
 * REST API CORS handling via WordPress rest_pre_serve_request filter.
 * Avoids early exits on 'init' and maintains native REST lifecycle integrity.
 */
add_filter('rest_pre_serve_request', function ($served, $result, $request, $server) {
    $allowed_origins = [
        'https://laya.org.in',
        'https://springgreen-squid-138681.hostingersite.com',
    ];

    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if (in_array($origin, $allowed_origins, true)) {
        $server->send_header('Access-Control-Allow-Origin', $origin);
        $server->send_header('Access-Control-Allow-Methods', 'POST, OPTIONS');
        $server->send_header('Access-Control-Allow-Headers', 'Content-Type, X-WP-Nonce');
        $server->send_header('Vary', 'Origin');
    }

    return $served;
}, 10, 4);
