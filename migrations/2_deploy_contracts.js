const SmartWasteManagement = artifacts.require("SmartWasteManagement");

module.exports = function (deployer) {
  deployer.deploy(SmartWasteManagement);
};