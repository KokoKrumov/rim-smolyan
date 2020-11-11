<?php
$paths = [
    '/',
    '/news',
    '/about-us',
    '/contact-us',
];

if ( ! in_array($_SERVER['REQUEST_URI'], $paths)) {
    http_response_code(404);
}

include('react.html');
