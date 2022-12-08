pragma solidity ^0.5.0;

contract DeviceBase {
    struct Device {
        address owner;
        string identifier;
        int256 minToggleMode;
        int256 maxToggleMode;
        int256 currentFunction;
    }

    Device[] public devices;

    mapping(address => uint256) public ownerDeviceCount;
    event DeviceCreated(
        uint256 indexed deviceId,
        address indexed owner,
        string identifier,
        int256 minToggleMode,
        int256 maxToggleMode,
        int256 currentFunction
    );

    modifier onlyOwnerOf(uint256 _deviceId) {
        require(
            devices[_deviceId].owner == msg.sender,
            "Only for device owner"
        );
        _;
    }

    function createDevice(
        string memory _identifier,
        int256 _minToggleMode,
        int256 _maxToggleMode
    ) public returns (uint256) {
        require(
            _minToggleMode >= 1,
            "Device must have at least one toggle mode."
        );
        require(
            _maxToggleMode >= _minToggleMode,
            "Maximum toggle mode cannot be less than minimum toggle mode."
        );
        Device memory newDevice = Device(
            msg.sender,
            _identifier,
            _minToggleMode,
            _maxToggleMode,
            0
        );
        uint256 deviceId = devices.push(newDevice) - 1;
        ownerDeviceCount[msg.sender]++;

        emit DeviceCreated(
            deviceId,
            msg.sender,
            _identifier,
            _minToggleMode,
            _maxToggleMode,
            0
        );
        return deviceId;
    }
}

contract DeviceHelper is DeviceBase {
    function getDevicesByOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256[] memory deviceIds = new uint256[](ownerDeviceCount[_owner]);
        uint256 counter = 0;
        for (uint256 i = 0; i < devices.length; i++) {
            if (devices[i].owner == _owner) {
                deviceIds[counter] = i;
                counter++;
            }
        }
        return deviceIds;
    }
}

contract DeviceUpdatable is DeviceHelper {
    event DeviceTransfered(
        uint256 indexed deviceId,
        address oldOwner,
        address newOwner
    );
    event DevicePropertyUpdated(
        uint256 indexed deviceId,
        int256 newMinValue,
        int256 newMaxValue
    );
    event DeviceIdentifierUpdated(uint256 indexed deviceId, string newValue);
    event ToggledDeviceMode(uint256 indexed deviceId, int256 newValue);

    function transferDevice(uint256 _deviceId, address _to)
        public
        onlyOwnerOf(_deviceId)
    {
        address currentOwner = devices[_deviceId].owner;
        devices[_deviceId].owner = _to;
        ownerDeviceCount[msg.sender]--;
        ownerDeviceCount[_to]++;
        emit DeviceTransfered(_deviceId, currentOwner, _to);
    }

    function updateIdentifier(uint256 _deviceId, string memory _newIdentifier)
        public
        onlyOwnerOf(_deviceId)
    {
        devices[_deviceId].identifier = _newIdentifier;
        emit DeviceIdentifierUpdated(_deviceId, _newIdentifier);
    }

    function updateToggleMode(
        uint256 _deviceId,
        int256 _minToggleMode,
        int256 _maxToggleMode
    ) public onlyOwnerOf(_deviceId) {
        devices[_deviceId].minToggleMode = _minToggleMode;
        devices[_deviceId].maxToggleMode = _maxToggleMode;
        emit DevicePropertyUpdated(_deviceId, _minToggleMode, _maxToggleMode);
    }

    function toggleDevice(uint256 _deviceId, int256 _currentFunction)
        public
        onlyOwnerOf(_deviceId)
    {
        require(
            _currentFunction == 0 ||
                (_currentFunction >= devices[_deviceId].minToggleMode &&
                    _currentFunction <= devices[_deviceId].maxToggleMode),
            "you can only set device toggle to 0 or any number between your min and max toggle mode."
        );
        devices[_deviceId].currentFunction = _currentFunction;

        emit ToggledDeviceMode(_deviceId, _currentFunction);
    }

    function updateDevice(
        uint256 _deviceId,
        string memory _identifier,
        int256 _minToggleMode,
        int256 _maxToggleMode
    ) public onlyOwnerOf(_deviceId) {
        devices[_deviceId].identifier = _identifier;
        devices[_deviceId].minToggleMode = _minToggleMode;
        devices[_deviceId].maxToggleMode = _maxToggleMode;

        emit DeviceIdentifierUpdated(_deviceId, _identifier);
        emit DevicePropertyUpdated(_deviceId, _minToggleMode, _maxToggleMode);
    }
}

contract DeviceManager is DeviceUpdatable {
    /// @dev Merges contracts.
}
