<?php include __DIR__ . "/components/header.php"; ?>


<div class="p-5 flex flex-col h-screen">
    <h2 class="text-2xl font-bold">
        IoT Device Simulation
    </h2>
    <div class="pt-12 grid grid-cols-2 h-screen gap-16 grid-rows-3 simulate" id="simulate">

    </div>
</div>

<script>
    window.addEventListener('web3-loaded', async () => {
        simulate();
        setInterval(simulate, 5000);
    });
</script>



<?php include __DIR__ . "/components/footer.php"; ?>