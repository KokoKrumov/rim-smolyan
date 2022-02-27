<?php
$path_beginings = [
    '/',
    '/news',
    '/about-us',
    '/services',
    '/prices',
    '/contact-us',
    '/support-us',
    '/administrative',
    '/privacy-policy',
    '/terms',
    '/laslo-nagi',
];

$path_begining = '/' . explode('/', $_SERVER['REQUEST_URI'])[1];

if ( ! in_array($path_begining, $path_beginings)) {
    http_response_code(404);
}

include('react.html');
