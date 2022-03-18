const mitoken = artifacts.require("mitoken");

module.exports = function (deployer) {
  deployer.deploy(mitoken);
};
