import React, { useEffect, useState } from "react";

const TransactionHistory = ({ contract, account }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      let events = await contract.getPastEvents('WasteRegistered', {
        fromBlock: 0,
        toBlock: 'latest'
      });
      setHistory(events);
    };
    fetchHistory();
  }, [contract]);

  return (
    <div>
      <h2>Transaction History</h2>
      {history.map((event, index) => (
        <div key={index}>
          <p>Waste Type: {event.returnValues.typeOfWaste}</p>
          <p>Weight: {event.returnValues.weight} kg</p>
          <p>Timestamp: {new Date(event.returnValues.timestamp * 1000).toLocaleString()}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default TransactionHistory;