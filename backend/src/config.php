<?php

$config = [
    'app' => [
        'name' => $_ENV['APP_NAME'] ?? 'BB FORM',
        'url' => $_ENV['APP_URL'] ?? $_SERVER['DOCUMENT_ROOT'],
        'frontend' => $_ENV['FRONTEND_URL'] ?? ''
    ],

    'db' => [
        'host' => $_ENV['DB_HOST'] ?? 'localhost',
        'user' => $_ENV['DB_USERNAME'],
        'pass' => $_ENV['DB_PASSWORD'],
        'name' => $_ENV['DB_NAME']
    ]
];