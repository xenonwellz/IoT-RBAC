<?php include __DIR__ . "/components/header.php"; ?>


<div class="p-5">
    <h2 class="text-2xl font-bold">
        Manage My Devices
    </h2>

    <div class="mt-8 grid grid-cols-2 gap-6" id="devices">
    </div>
</div>

<script>
    window.addEventListener('web3-loaded', async () => {
        refreshDevices();
    });
</script>

<?php include __DIR__ . "/components/footer.php"; ?>