var instance;
var Contract;
var account;
var provider;
var http_host = 'http://127.0.0.1:7547';

eventt = new Event("web3-loaded");
window.addEventListener('load', connect());

async function loadWeb3() {

    fetch('/resources/artifacts/DeviceManager.json')
        .then((response) => response.json())
        .then(async (json) => {

            Contract = TruffleContract(json);
            Contract.setProvider(provider);
            await Contract.deployed().then((i) => {
                instance = i;
                window.dispatchEvent(eventt);

                $("#connect").html(`
                <div class="bg-green-500 font-bold cursor-pointer inline-block px-4 py-2 mx-5 my-2 text-white rounded-full text-sm">
                    Connected as: ${account}
                </div> `);
            }).catch(() => {
                toastr.error("Error: Check if smart contract was deployed on the selected network. Or if network server is available.");
                $("#connect").html(`<button onclick="connect()" class="bg-red-600 inline-block px-4 py-2 mx-5 my-2 text-white rounded-full font-semibold text-sm">
                    Not Connected. Click to connect
                </button>`);
            });

        }).catch(() => {
            toastr.error("An error occured while connecting.");
            $("#connect").html(`<button onclick="connect()" class="bg-red-600 inline-block px-4 py-2 mx-5 my-2 text-white rounded-full font-semibold text-sm">
                Not Connected. Click to connect
            </button>`);
        });

}

async function connect() {
    if (typeof window.ethereum !== 'undefined') {
        provider = window.ethereum;
    } else {
        toastr.error("Metamask not installed.");
        return;
    }

    await provider.request({ method: 'eth_requestAccounts' }).then((accounts) => {
        if (accounts.length > 0) {
            account = accounts[0];
            $("#connect").html(`
            <div class="bg-yellow-500 font-bold cursor-pointer inline-block px-4 py-2 mx-5 my-2 text-white rounded-full text-sm">
                Connecting as: ${account}
            </div> `);
        }
        loadWeb3();
    }).catch(err => {
        if (err.code === -32002) {
            toastr.error("Please check your metamask extension notification.");
        } else {
            toastr.error("An error occured while trying to connect.");
        }
    });

}

if (typeof window.ethereum !== 'undefined') {
    window.ethereum.on('accountsChanged', function (accounts) {
        connect();
        toastr.info("Account change detected");
    });

    window.ethereum.on('chainChanged', function (accounts) {
        connect();
        toastr.info("Network change detected");
    });
}