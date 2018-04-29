
var UppsalaToken = 
artifacts.require("./UppsalaToken.sol");

module.exports = function(deployer) {
  deployer.deploy(UppsalaToken);
};
