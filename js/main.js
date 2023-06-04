type_map = [
    "fan",
    "bulb",
    "ac",
    "door",
    "fan",
];

var devices;
var deviceData;

async function registerDevice(e) {
    e.preventDefault();
    dname = $("#device_name").val().trim();
    dmin = parseInt($("#min_toggle").val());
    dmax = parseInt($("#max_toggle").val());

    if (dname == "") {
        toastr.error("Name cannot be empty or only whitespace");
        return false;
    }

    if (dmin < 1) {
        toastr.error("Minimum function cannot be less than 1");
        return false;
    }

    if (dmax < dmin) {
        toastr.error("Maximum togle cannot be less than minimum toggle")
        return false;

    }

    await instance.createDevice(dname, dmin, dmax, { from: account })
        .then(() => {
            $("#device_name").val("");
            $("#min_toggle").val("");
            $("#max_toggle").val("");

            toastr.success("Device successfully registered")
        })
        .catch(error => toastr.error(error.message));
}

async function toggleDevice(e) {
    e.preventDefault();
    val = $("#underline_select").val();
    did = $("#device_id").val();

    if (val == deviceData.currentFunction) {
        toastr.error("Nothing was changed")
        return false;
    }

    instance.toggleDevice(did, val, { from: account }).then(async () => {
        toastr.success("Device toggled successfully");
        manage(did);
    })
        .catch(error => toastr.error(error.message));
}

async function updateDevice(e) {
    e.preventDefault();
    did = $("#device_id").val();
    dname = $("#e_device_name").val().trim();
    dmin = parseInt($("#e_min_toggle").val());
    dmax = parseInt($("#e_max_toggle").val());


    if (dname == "") {
        toastr.error("Name cannot be empty or only whitespace");
        return false;
    }

    if (dmin < 1) {
        toastr.error("Minimum function cannot be less than 1");
        return false;
    }

    if (dmax < dmin) {
        toastr.error("Maximum togle cannot be less than minimum toggle")
        return false;
    }

    if (dname == deviceData.identifier && dmin == deviceData.minToggleMode && dmax == deviceData.maxToggleMode) {
        toastr.error("Nothing was changed")
        return false;
    }

    await instance.updateDevice(did, dname, dmin, dmax, { from: account })
        .then(async () => {
            toastr.success("Device successfully updated");
        })
        .catch(error => toastr.error(error.message));
}

async function transferDevice(e) {
    e.preventDefault();
    dname = $("#new_owner").val().trim();
    did = $("#device_id").val();

    if (dname == "") {
        toastr.error("Name cannot be empty or only whitespace");
        return false;
    }

    if (dname == account) {
        toastr.error("Nothing was changed.");
        return false;
    }

    await instance.transferDevice(did, dname, { from: account })
        .then(async () => {
            toastr.success("Device successfully transferred");
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
        })
        .catch((err) => {
            toastr.error("Could not transfer this device.");
            console.log(err);
        });
}

async function refreshDevices() {
    let deviceIds = (await instance.getDevicesByOwner(account)).map(el => el.toNumber());

    let devicePromises = [];
    for (let deviceId of deviceIds) {
        let devicePromise = instance.devices(deviceId);
        devicePromises.push(devicePromise);
    }
    devices = await Promise.all(devicePromises);

    $('#devices').html("");

    count = 0;
    for (let device of devices) {
        num = deviceIds[count];
        d = $('<a></a>').addClass("device block").attr("href", "/manage/device/" + num);

        p = $("<p></p>").addClass("text-lg font-semibold");
        p.append($("<i></i>").addClass("uil uil-setting mr-2"));
        p.append($("<span></span>").text(device.identifier));
        d.append(p);

        p = $("<p></p>").addClass("pl-6 pt-1");
        p.append($("<span></span>").text("Device ID: "));
        p.append($("<span></span>").text(num));
        d.append(p);

        $('#devices').append(d);
        count++
    }

}

function fan(name, speed) {
    return `<div class="flex flex-col justify-center items-center">
    <svg class="flex-shrink-0" version="1.1" id="Capa_1" height="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 298.666 298.666" style="enable-background:new 0 0 298.666 298.666;" xml:space="preserve">
        <g class="animate-spin-${speed} origin-center duration-75">
            <path d="M162.466,137.052c7.732-7.119,39.268-38.192,36.846-69.387c-2.057-26.462-32.63-34.426-49.585-34.426
c-16.956,0-47.464,7.964-49.52,34.426c-2.373,30.564,27.901,61.014,36.41,68.928c3.257-3.25,7.751-5.26,12.716-5.26
C154.52,131.333,159.182,133.54,162.466,137.052z" />
            <path d="M131.332,149.333c0-3.023,0.754-5.867,2.07-8.369c-11.169-3.415-52.577-14.314-77.824,3
c-21.89,15.012-13.499,45.469-5.021,60.154c8.479,14.684,30.628,37.122,54.573,25.672c25.487-12.189,37.025-48.342,40.714-62.802
C137.573,165.362,131.332,158.08,131.332,149.333z" />
            <path d="M243.072,144.464c-25.053-17.181-66.036-6.541-77.584-3.028c1.169,2.387,1.844,5.061,1.844,7.897
c0,8.808-6.33,16.125-14.686,17.682c3.546,14.076,11.072,50.938,40.874,63.275c23.944,11.452,46.128-11.043,54.606-25.729
C256.604,189.878,264.961,159.477,243.072,144.464z" />
        </g>
        <path d="M149.333,0C66.99,0,0,66.99,0,149.333s66.99,149.333,149.333,149.333s149.333-66.99,149.333-149.333S231.676,0,149.333,0z
M149.333,282.666C75.812,282.666,16,222.854,16,149.333S75.812,16,149.333,16s133.333,59.813,133.333,133.333
S222.853,282.666,149.333,282.666z" />
    </svg>
    <div class="text-lg pt-2">
        <p><span class="font-bold">Device Name:</span> ${name}</p>
        <div>
            <span class="font-bold">Switch:</span>On: Speed - ${speed}
        </div>
    </div>
</div>`;
}

function bulb(name, sw) {
    console.log(sw);
    return `<div class="flex flex-col justify-center items-center">
    <svg class="flex-shrink-0" version="1.1" id="Capa_1" height="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 279.682 279.682" style="enable-background:new 0 0 279.682 279.682;" xml:space="preserve">
        <g>
            <path style="fill:#000002;" d="M143.25,55.486c-41.06,0-74.465,33.405-74.465,74.465c0,16.824,5.511,32.711,15.938,45.939
c1.998,2.536,4.15,5.033,6.23,7.448c6.212,7.208,12.078,14.017,14.166,21.675c0.045,0.165,0.438,1.773,0.38,7.247l-0.01,0.791
c-0.063,4.444-0.147,10.528,4.352,15.091c3.081,3.125,7.399,4.645,13.204,4.645h40.272c6.268,0,10.774-1.534,13.776-4.689
c4.061-4.267,3.789-9.779,3.608-13.427c-0.032-0.645-0.066-1.296-0.074-1.944c-0.065-5.48,0.345-7.025,0.362-7.09
c2.121-7.657,8.993-15.732,15.057-22.855c2.023-2.377,3.934-4.622,5.714-6.879c10.431-13.23,15.944-29.12,15.944-45.951
C217.705,88.892,184.305,55.486,143.25,55.486z M189.982,166.614c-1.607,2.036-3.429,4.178-5.358,6.445
c-7.07,8.307-15.084,17.722-18.089,28.572c-0.429,1.546-0.988,4.395-0.905,11.273c0.01,0.835,0.049,1.675,0.091,2.507
c0.032,0.657,0.075,1.523,0.071,2.209c-0.528,0.086-1.325,0.166-2.475,0.166h-40.272c-1.276,0-2.022-0.135-2.405-0.237
c-0.198-0.977-0.17-3.007-0.152-4.287l0.012-0.844c0.072-6.919-0.483-9.789-0.907-11.348c-2.98-10.936-10.575-19.749-17.275-27.524
c-2.066-2.398-4.019-4.664-5.813-6.942c-8.32-10.557-12.718-23.232-12.718-36.654c0-32.789,26.676-59.465,59.465-59.465
c32.783,0,59.455,26.676,59.455,59.465C202.705,143.379,198.306,156.058,189.982,166.614z" />
            <path style="fill:#000002;" d="M161.766,239.564h-37.041c-7.995,0-14.5,6.505-14.5,14.5v11.117c0,7.995,6.505,14.5,14.5,14.5
                h37.041c7.995,0,14.5-6.505,14.5-14.5v-11.117C176.266,246.069,169.761,239.564,161.766,239.564z M161.266,264.682h-36.041v-10.117
                h36.041V264.682z" />
            <g class="${sw ? '' : 'hidden'}">
                <path style="fill:currentColor;" d="M143.245,45.779c4.143,0,7.5-3.357,7.5-7.5V7.5c0-4.143-3.357-7.5-7.5-7.5
c-4.143,0-7.5,3.357-7.5,7.5v30.779C135.745,42.422,139.103,45.779,143.245,45.779z" />
                <path style="fill:currentColor;" d="M241.917,34.598c-2.858-2.995-7.606-3.106-10.604-0.248l-22.77,21.73
c-2.997,2.859-3.107,7.607-0.248,10.604c1.474,1.544,3.448,2.322,5.427,2.322c1.86,0,3.725-0.688,5.177-2.074l22.77-21.731
C244.666,42.342,244.776,37.594,241.917,34.598z" />
                <path style="fill:currentColor;" d="M264.273,109.599c-0.004,0-0.008,0-0.012,0l-29.311,0.047c-4.143,0.007-7.495,3.37-7.488,7.512
c0.007,4.139,3.363,7.488,7.5,7.488c0.004,0,0.008,0,0.012,0l29.311-0.047c4.143-0.007,7.495-3.37,7.488-7.512
C271.767,112.948,268.41,109.599,264.273,109.599z" />
                <path style="fill:currentColor;" d="M74.386,64.684c2.859-2.996,2.749-7.743-0.248-10.604l-22.77-21.73
c-2.994-2.858-7.742-2.749-10.604,0.248c-2.859,2.996-2.749,7.743,0.248,10.604l22.77,21.731c1.452,1.386,3.315,2.074,5.177,2.074
C70.937,67.006,72.912,66.228,74.386,64.684z" />
                <path style="fill:currentColor;" d="M44.729,109.646l-29.31-0.047c-0.004,0-0.008,0-0.012,0c-4.137,0-7.493,3.351-7.5,7.488
c-0.007,4.142,3.346,7.505,7.488,7.512l29.31,0.047c0.004,0,0.008,0,0.012,0c4.137,0,7.493-3.351,7.5-7.488
C52.225,113.016,48.872,109.652,44.729,109.646z" />
            </g>
        </g>
    </svg>
    <div class="text-lg pt-2">
        <p><span class="font-bold">Device Name:</span> ${name}</p>
        <div>
            <span class="font-bold">Switch:</span> ${sw ? 'On' : 'Off'}
        </div>
    </div>
</div>`;
}

function ac(name, sw) {
    return `<div class="flex flex-col items-center justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 455 190" xmlns:v="https://vecta.io/nano">
        <path d="M425.17 0H29.83C13.382 0 0 13.382 0 29.83V182.5a7.5 7.5 0 0 0 7.5 7.5h440a7.5 7.5 0 0 0 7.5-7.5V29.83C455 13.382 441.618 0 425.17 0zM32.5 15h390v9.51c0 4.957-4.033 8.99-8.99 8.99H41.49c-4.957 0-8.99-4.033-8.99-8.99zm390 122.5h-390v-1.01c0-4.957 4.033-8.99 8.99-8.99h372.02c4.957 0 8.99 4.033 8.99 8.99zm-390 10h390v10h-390zm0 20h390v7.5h-390zM440 175h-7.5v-38.51c0-10.471-8.519-18.99-18.99-18.99H41.49c-10.472 0-18.99 8.519-18.99 18.99V175H15V29.83c0-5.51 3.027-10.319 7.5-12.875v7.555c0 10.471 8.519 18.99 18.99 18.99h372.02c10.472 0 18.99-8.519 18.99-18.99v-7.555c4.473 2.556 7.5 7.365 7.5 12.875zM250.5 97.5h-46a5 5 0 1 0 0 10h46a5 5 0 1 0 0-10zm151.003.001c-1.32 0-2.61.53-3.54 1.46s-1.46 2.22-1.46 3.54.53 2.61 1.46 3.53c.93.94 2.22 1.47 3.54 1.47a5 5 0 0 0 3.53-1.47 5.04 5.04 0 0 0 1.47-3.53c0-1.31-.54-2.6-1.47-3.54a5.03 5.03 0 0 0-3.53-1.46zm-23 0c-1.32 0-2.61.53-3.54 1.46s-1.46 2.22-1.46 3.54.53 2.6 1.46 3.53 2.22 1.47 3.54 1.47a5.04 5.04 0 0 0 5-5c0-1.32-.54-2.61-1.47-3.54a5.03 5.03 0 0 0-3.53-1.46z" />
    </svg>
    <div class="text-lg pt-2">
        <p><span class="font-bold">Device Name:</span> ${name}</p>
        <div>
            <span class="font-bold">Switch:</span> ${sw ? 'On' : 'Off'} - ${sw} <i class="uil uil-celsius"></i>
        </div>
    </div>
</div>`;
}

function door(name, sw) {
    open = `<path d="M285.048,21.72L164.234,0v21.72H79.292v433.358h31.403V53.123h53.539V492.5l208.15-37.422v-61.235h9.421v61.235h31.403   V21.72H285.048z M202.526,263.129c-6.997,0-12.67-7.381-12.67-16.486c0-9.104,5.673-16.485,12.67-16.485s12.67,7.381,12.67,16.485   C215.196,255.748,209.523,263.129,202.526,263.129z M381.805,344.646h-9.421V142.621h9.421V344.646z M381.805,93.423h-9.421v-40.3   h9.421V93.423z" />`

    close = `<path d="M71.553,0v478.085l335.561,0.581V0H71.553z M103.109,446.583V31.558h272.445v56.813h-10.781V42.086H113.893v394.468   h250.881V390.27h10.781v56.785L103.109,446.583z M364.773,137.459h10.781V341.18h-10.781V137.459z M165.787,239.32   c0,9.148-7.418,16.566-16.568,16.566c-9.15,0-16.568-7.418-16.568-16.566c0-9.15,7.418-16.568,16.568-16.568   C158.369,222.752,165.787,230.17,165.787,239.32z" />`

    return `<div class="flex items-center flex-col">
    <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" height="100%" viewBox="0 0 478.666 478.666" style="enable-background:new 0 0 478.666 478.666;" xml:space="preserve">
        <g>${sw ? open : close}</g>
    </svg>
    <div class="text-lg pt-2">
        <p><span class="font-bold">Device Name:</span> ${name}</p>
        <div>
            <span class="font-bold">Switch:</span> <g>${sw ? 'Open' : 'Close'}</g>
        </div>
    </div>
</div>`;
}

function unc(name, sw) {
    return `<div class="flex flex-col justify-center items-center">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
                <g>
                    <path d="M500,10C229.4,10,10,229.4,10,500c0,270.6,219.4,490,490,490c270.6,0,490-219.4,490-490C990,229.4,770.6,10,500,10z M500,887.4c-37.9,0-68.6-30.8-68.6-68.6c0-37.9,30.8-68.6,68.6-68.6c37.9,0,68.6,30.8,68.6,68.6C568.6,856.7,537.9,887.4,500,887.4z M595,575.7c-0.4,0.2-0.8,0.3-1.2,0.6c-26.2,12.3-43.1,39-43.1,67.9c0,28-22.7,50.7-50.7,50.7c-28,0-50.7-22.7-50.7-50.7c0-67.5,39.3-129.8,100.1-159c0.4-0.2,0.8-0.4,1.2-0.6c41.7-19.6,68.6-62,68.6-108c0-65.8-53.5-119.3-119.3-119.3c-65.8,0-119.3,53.5-119.3,119.3c0,28-22.7,50.7-50.7,50.7c-28,0-50.7-22.7-50.7-50.7c0-121.7,99-220.6,220.6-220.6c121.7,0,220.6,99,220.6,220.6C720.6,461.2,671.4,539.2,595,575.7z" />
                </g>
            </svg>
            <span class="text-lg font-bold">Unconfigured Device</span>
            <div class="text-lg pt-2">
                <p><span class="font-bold">Device Name:</span> ${name}</p>
                <div>
                    <span class="font-bold">Switch:</span> ${sw ? 'On' : 'Off'} - ${sw}
                </div>
            </div>
            </div>`;
}

async function simulate() {
    let deviceIds = (await instance.getDevicesByOwner(account)).map(el => el.toNumber());

    let devicePromises = [];
    for (let deviceId of deviceIds) {
        let devicePromise = instance.devices(deviceId);
        devicePromises.push(devicePromise);
    }
    devices = await Promise.all(devicePromises);

    count = 0;
    $("#simulate").html("");
    for (let device of devices) {
        if (typeof (type_map[count]) === 'undefined' || type_map[count] == 'null') {
            html = unc(device.identifier, device.currentFunction.words[0]);
        }
        else if (type_map[count] == 'fan') {
            html = fan(device.identifier, device.currentFunction.words[0]);
        } else if (type_map[count] == 'bulb') {
            html = bulb(device.identifier, device.currentFunction.words[0]);
        } else if (type_map[count] == 'ac') {
            html = ac(device.identifier, device.currentFunction.words[0]);
        } else if (type_map[count] == 'door') {
            html = door(device.identifier, device.currentFunction.words[0]);
        }
        $("#simulate").append(html)
        if (count >= 5) {
            break;
        }
        count++
    }

}

async function manage(did) {
    await instance.devices(did).then((result) => {
        deviceData = result;
        $("#e_device_name").val(result.identifier);
        $("#e_min_toggle").val(result.minToggleMode);
        $("#e_max_toggle").val(result.maxToggleMode);
        $("#new_owner").val(account);

        option = $("#underline_select").html('<option value="0">FUNCTION 0 - [OFF]</option>');
        if (result.currentFunction.words[0] == 0) {
            option.attr('selected', true);
        }
        for (i = result.minToggleMode.words[0]; i <= result.maxToggleMode.words[0]; i++) {
            option = $('<option></option>').text('FUNCTION ' + i).val(i);
            if (result.currentFunction.words[0] == i) {
                option.attr('selected', true);
            }
            $("#underline_select").append(option);
        }
    }).catch((err) => {
        toastr.error("There was an error fetching device details");
    });
}