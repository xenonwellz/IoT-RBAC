<?php
ini_set('display_errors', 1);
require_once __DIR__ . '/index.php';

get('/', 'views/home.php');
get('/simulate', 'views/simulate.php');
get('/manage/device/$device', 'views/manage.php');
get('/register', 'views/register.php');
any('/404', 'views/404.php');
