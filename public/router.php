<?php
$path_beginings = [
    '/',
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

if ( ! in_array($path_begining, $path_beginings)) {
    http_response_code(404);
}

include('react.html');
