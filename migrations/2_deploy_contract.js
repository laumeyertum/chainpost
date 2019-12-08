const presentation = artifacts.require("Presentation");

module.exports = function(deployer) {
  deployer.deploy(presentation);
};