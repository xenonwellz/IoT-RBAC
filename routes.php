<?php
require_once __DIR__ . '/index.php';

$base = '/';

get($base . '', 'views/home.php');
get($base . 'simulate', 'views/simulate.php');
get($base . 'manage/device/$device', 'views/manage.php');
get($base . 'register', 'views/register.php');
any($base . '404', 'views/404.php');
