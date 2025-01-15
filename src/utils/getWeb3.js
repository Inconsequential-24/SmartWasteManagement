import Web3 from "web3";

const getWeb3 = async () => {
  let web3;

  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
  } else {
    alert("Please install MetaMask!");
  }

  return web3;
};

export default getWeb3;