module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", 
      from: "0x3a88E97D3B3eE6568669D8E9C9770c0d0A453aeB" 
    },
  },
  compilers: {
    solc: {
      version: "0.8.21", 
    },
  },
};