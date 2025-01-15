import React, { useState, useEffect } from "react";
import Web3 from "web3";
import getWeb3 from "./utils/getWeb3";
import Header from "./components/Header";
import WasteTransactionForm from "./components/WasteTransactionForm";
import TransactionHistory from "./components/TransactionHistory";
import UserBalance from "./components/UserBalance";
import SmartWasteManagement from "./contracts/SmartWasteManagement.json";

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const loadWeb3AndContract = async () => {
      const web3Instance = await getWeb3();
      setWeb3(web3Instance);

      const networkId = await web3Instance.eth.net.getId();
      const deployedNetwork = SmartWasteManagement.networks[networkId];
      const contractInstance = new web3Instance.eth.Contract(
        SmartWasteManagement.abi,
        deployedNetwork && deployedNetwork.address
      );
      setContract(contractInstance);

      const accounts = await web3Instance.eth.getAccounts();
      setAccount(accounts[0]);
    };

    loadWeb3AndContract();
  }, []);

  return (
    <div className="App">
      <Header />
      {account && <UserBalance account={account} web3={web3} />}
      {contract && <WasteTransactionForm contract={contract} account={account} />}
      {contract && <TransactionHistory contract={contract} account={account} />}
    </div>
  );
};

export default App;