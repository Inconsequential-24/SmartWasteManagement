import React from "react";

const UserBalance = ({ account, web3 }) => {
  return (
    <div>
      <h3>Connected Account</h3>
      <p>{account}</p>
    </div>
  );
};

export default UserBalance;