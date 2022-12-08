<div class="w-1/4 h-full bg-white px-2 absolute py-4 border-r">
    <ul class="relative">
        <li class="relative mb-2">
            <a class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded transition duration-300 ease-in-out <?= $_SERVER['REQUEST_URI'] !== '/register' && $_SERVER['REQUEST_URI'] !== '/simulate' ? 'active-nav' : 'hover:bg-gray-100 hover:text-gray-900' ?>" href="/" data-mdb-ripple="true" data-mdb-ripple-color="dark">
                <i class="uil uil-home mr-1"></i>
                <span>Manage Devices</span>
            </a>
        </li>
        <li class="relative mb-2">
            <a class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded transition duration-300 ease-in-out <?= $_SERVER['REQUEST_URI'] == '/register' ? 'active-nav' : 'hover:bg-gray-100 hover:text-gray-900' ?>" href="/register" data-mdb-ripple="true" data-mdb-ripple-color="dark">
                <i class="uil uil-desktop mr-1"></i>
                <span>Register Device</span>
            </a>
        </li>
        <li class="relative mb-2">
            <a class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded transition duration-300 ease-in-out <?= $_SERVER['REQUEST_URI'] == '/simulate' ? 'active-nav' : 'hover:bg-gray-100 hover:text-gray-900' ?>" href="/simulate" data-mdb-ripple="true" data-mdb-ripple-color="dark">
                <i class="uil uil-border-clear mr-1"></i>
                <span>Simulate Devices</span>
            </a>
        </li>
    </ul>
</div>