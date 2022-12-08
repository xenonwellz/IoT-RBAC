<?php $base = '/'; ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="stylesheet" href="<?= $base ?>css/bundle/app.css">
    <link rel="stylesheet" href="<?= $base ?>css/toastr.min.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css">
    <!-- <script src="/js/turbolinks.js"></script> -->

    <title>IoT - RBAC</title>
</head>

<body class="">

    <?php include __DIR__ . "/nav.php"; ?>
    <main class="pl-[25%] h-screen overflow-auto">
        <div id="connect">
            <button onclick="connect()" class="bg-red-600 inline-block px-4 py-2 mx-5 my-2 text-white rounded-full font-semibold text-sm">
                Not Connected. Click to connect
            </button>
        </div>