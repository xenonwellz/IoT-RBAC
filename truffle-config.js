const path = require("path");

module.exports = {
  contracts_build_directory: path.join(__dirname, "resources/artifacts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7547,
      network_id: "5777"
    }
  },
  compilers: {
    solc: {
      version: "0.5.0"
    }
  }
};
