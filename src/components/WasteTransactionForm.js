import React, { useState } from "react";

const WasteTransactionForm = ({ contract, account }) => {
  const [typeOfWaste, setTypeOfWaste] = useState("");
  const [weight, setWeight] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await contract.methods.registerWaste(typeOfWaste, weight).send({ from: account });
    setTypeOfWaste("");
    setWeight("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type of Waste"
        value={typeOfWaste}
        onChange={(e) => setTypeOfWaste(e.target.value)}
      />
      <input
        type="number"
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <button type="submit">Register Waste</button>
    </form>
  );
};

export default WasteTransactionForm;