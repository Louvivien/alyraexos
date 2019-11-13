const HDWalletProvider = require("truffle-hdwallet-provider");


module.exports = {
  networks: {
    ganache: {
      host: "10.1.1.118",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "5777",       // Any network (default: none)
     },
     
     ropsten: {
      provider: function() {
        return new HDWalletProvider("float early electric lazy swarm pluck bean alcohol pelican since chef lava", "https://ropsten.infura.io/v3/e6f5ded1d91c4fbcafb7c7a23a5241df")
      },
      network_id: 3
    }   
  },
    solc: {
      optimizer: {
          enabled: true,
          runs: 200
       }
    }
  }

