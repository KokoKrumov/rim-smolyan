<?php
$path_beginings = [
    '/',
    '/collections',
    '/main-collections',
    '/virtual-collections',
    '/exhibitions',
    '/news-and-events',
    '/news',
    '/events',
    '/about-us',
    '/museum-games',
    '/services',
    '/prices',
    '/contact-us',
    '/support-us',
    '/administrative',
    '/privacy-policy',
    '/terms',
    '/house-museum-laszlo-nagy',
];

$path_begining = '/' . explode('/', $_SERVER['REQUEST_URI'])[1];

// Security headers
header("Content-Security-Policy: frame-ancestors 'self'");
header("Strict-Transport-Security: max-age=63072000; includeSubdomains; preload");
header("X-Frame-Options: SAMEORIGIN");
header("X-XSS-Protection: 1; mode=block");
header("X-Content-Type-Options: nosniff");
header("Referrer-Policy: strict-origin-when-cross-origin");
header("Cache-Control: must-revalidate, proxy-revalidate");

if ( ! in_array($path_begining, $path_beginings)) {
    http_response_code(404);
}

include('react.html');
