// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SmartWasteManagement {
    address public owner; // Contract owner's address
    uint public transactionCount; // Total number of waste transactions

    enum WasteType { Organic, NonBiodegradable }

    // Structure to represent a waste transaction
    struct WasteTransaction {
        address sender;
        WasteType wasteType;
        uint quantity;
        string location;
        uint timestamp;
    }

    // Mapping to store waste transactions
    mapping(uint => WasteTransaction) public wasteTransactions;

    // Mapping to store user balances in digital coupons
    mapping(address => uint) public userBalances;

    // Event to log waste transactions
    event WasteTransactionRecorded(address indexed sender, WasteType wasteType, uint quantity, string location, uint timestamp);

    // Event to log fine imposition
    event FineImposed(address indexed user, uint fineAmount);

    // Event to log digital coupon distribution
    event DigitalCouponIssued(address indexed user, uint couponAmount);

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    // Constructor
    constructor() {
        owner = msg.sender;
    }

    // Function to record waste transactions
    function recordWasteTransaction(WasteType _wasteType, uint _quantity, string memory _location) public {
        require(_quantity > 0, "Quantity must be greater than zero");

        // Increment transaction count
        transactionCount++;

        // Create a new waste transaction
        WasteTransaction memory newTransaction = WasteTransaction({
            sender: msg.sender,
            wasteType: _wasteType,
            quantity: _quantity,
            location: _location,
            timestamp: block.timestamp
        });

        // Store the transaction in the mapping
        wasteTransactions[transactionCount] = newTransaction;

        // Emit the event
        emit WasteTransactionRecorded(msg.sender, _wasteType, _quantity, _location, block.timestamp);

        // Issue digital coupons as an incentive (simplified example)
        uint couponAmount = calculateCouponAmount(_wasteType, _quantity);
        if (couponAmount > 0) {
            userBalances[msg.sender] += couponAmount;
            emit DigitalCouponIssued(msg.sender, couponAmount);
        }
    }

    // Function to impose a fine (onlyOwner can call this function)
    function imposeFine(address _user, uint _fineAmount) public onlyOwner {
        require(_fineAmount > 0, "Fine amount must be greater than zero");

        // Implement fine imposition logic (e.g., transfer tokens to a specific account)
        // For demonstration purposes, we deduct the fine amount from the user's digital coupons balance
        require(userBalances[_user] >= _fineAmount, "User does not have sufficient balance for the fine");
        userBalances[_user] -= _fineAmount;

        // Emit the event
        emit FineImposed(_user, _fineAmount);
    }

    // Function to check user's digital coupon balance
    function getUserBalance() public view returns (uint) {
        return userBalances[msg.sender];
    }

    // Internal function to calculate coupon amount based on waste type and quantity
    function calculateCouponAmount(WasteType _wasteType, uint _quantity) internal pure returns (uint) {
        // Simplified logic - adjust based on your requirements
        if (_wasteType == WasteType.Organic) {
            return _quantity * 2; // 2 coupons per unit for organic waste
        } else {
            return _quantity * 3; // 3 coupons per unit for non-biodegradable waste
        }
    }
}
