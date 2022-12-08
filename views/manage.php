<?php include __DIR__ . "/components/header.php"; ?>


<div class="p-5">
    <h2 class="text-2xl font-bold">
        Manage Devices [<?= $device ?>]
    </h2>

    <div class="py-12">

        <form onsubmit="updateDevice(event)" action="#">
            <input type="hidden" id="device_id" value="<?= $device ?>">
            <div class="relative z-0 mb-6 w-full group">
                <input type="text" name="e_device_name" id="e_device_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer" placeholder=" " required />
                <label for="e_device_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Device Name (Max: 32 Characters)</label>
            </div>

            <div class="grid md:grid-cols-2 md:gap-6">
                <div class="relative z-0 mb-6 w-full group">
                    <input type="number" name="e_min_toggle" id="e_min_toggle" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer" placeholder=" " required />
                    <label for="e_min_toggle" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Min. Toggle</label>
                </div>
                <div class="relative z-0 mb-10 w-full group">
                    <input type="number" name="e_max_toggle" id="e_max_toggle" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer" placeholder=" " required />
                    <label for="e_max_toggle" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Max. Toggle</label>
                </div>
            </div>

            <button type="submit" class="text-white bg-black/80 hover:bg-black/70 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Update Device</button>
        </form>

    </div>
    <div class="border-t py-12">
        <h2 class="text-xl pb-6">Toggle Device</h2>
        <div>
            <form onsubmit="toggleDevice(event)">
                <label for="underline_select" class="text-gray-600 text-xs">Set Device Mode</label>
                <select id="underline_select" class="block py-2.5 mb-6 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                </select>
                <button type="submit" class="text-white bg-black/80 hover:bg-black/70 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Toggle</button>
            </form>
        </div>
    </div>

    <div class="border-t pt-12">
        <h2 class="text-xl pb-6">Transfer Ownership of Device</h2>
        <div class="text-sm">This action cannot be reversed, ensure to send to an existing wallet to avoid losing this device</div>
        <div>
            <form onsubmit="transferDevice(event)">
                <div class="relative z-0 mb-10 w-full group pt-4">
                    <input type="text" name="new_owner" id="new_owner" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer" placeholder=" " required />
                    <label for="new_owner" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New Owner</label>
                </div>
                <button type="submit" class="text-white bg-black/80 hover:bg-black/70 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Transfer</button>
            </form>
        </div>
    </div>

    <script>
        deviceId = <?= $device ?>;

        window.addEventListener('web3-loaded', async () => {
            manage(deviceId);
        });
    </script>

    <?php include __DIR__ . "/components/footer.php"; ?>