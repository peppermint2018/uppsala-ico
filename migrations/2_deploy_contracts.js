var UppsalaCrowdsale = artifacts.require("./UppsalaCrowdsale.sol");
var UppsalaPresale = artifacts.require("./UppsalaPresale.sol");
var UppsalaToken = artifacts.require("./UppsalaToken.sol");


module.exports = function(deployer, network, accounts) {
	console.log(accounts);
	return liveDeploy(deployer, accounts);
}

function latestTime() {
	  return web3.eth.getBlock('latest').timestamp;
}

const duration = {
	  seconds: function(val) { return val},
	  minutes: function(val) { return val * this.seconds(60) },
	  hours:   function(val) { return val * this.minutes(60) },
	  days:    function(val) { return val * this.hours(24) },
	  weeks:   function(val) { return val * this.days(7) },
	  years:   function(val) { return val * this.days(365)} 
}

function liveDeploy(deployer,accounts ) {
	console.log(UppsalaToken);
	console.log(UppsalaCrowdsale);

	const totalCap = web3.toWei(500,'ether');	
	// Rate = 5000 UPP per ether
	const Rate = 5000;
	
	// Bonus = 750 UPP per ether
	const PresaleBonus = 750; 
	const PresaleLockupReleaseTime = latestTime() + duration.minutes(1);

	// Time
	const PresaleOpenTime = latestTime() + duration.minutes(1);
	const PresaleCloseTime = PresaleOpenTime + duration.weeks(1);
	
	const CrowdsaleOpenTime = latestTime() + duration.minutes(1);
	const CrowdsaleCloseTime = CrowdsaleOpenTime + duration.weeks(1);
	
	// Min/Max contribution and Cap
	const PresaleTotalCap = web3.toWei(1, 'ether');
	const PresaleMin = web3.toWei(0.1, 'ether');
	const PresaleMax = web3.toWei(0.5, 'ether');

	const CrowdsaleMin = web3.toWei(0.01, 'ether');
	const CrowdsaleMax = web3.toWei(0.05, 'ether');
	const CrowdsaleTotalCap = web3.toWei(0.1, 'ether');

	return deployer
		.then( () => {
			return deployer.deploy(UppsalaToken);
		}).then( () => {
			return deployer.deploy(UppsalaPresale, Rate, PresaleOpenTime, PresaleCloseTime, 
				PresaleTotalCap, PresaleMin, PresaleMax, PresaleBonus, PresaleLockupReleaseTime, accounts[0], UppsalaToken.address);
		}).then( () => {
			return deployer.deploy(UppsalaCrowdsale, Rate, CrowdsaleOpenTime, CrowdsaleCloseTime,
				CrowdsaleTotalCap, CrowdsaleMin, CrowdsaleMax, accounts[0], UppsalaToken.address);
		}).then( () => {
			var presaleInstance = UppsalaPresale.at(UppsalaPresale.address);
			var crowdsaleInstance = UppsalaCrowdsale.at(UppsalaCrowdsale.address);

			console.log("UppsalaPresale: ", presaleInstance.address);
			console.log("UppsalaCrowdsale: ", crowdsaleInstance.address);

			var token = UppsalaToken.at(UppsalaToken.address);
			token.mint(crowdsaleInstance.address, web3.toWei(CrowdsaleTotalCap,'ether'));
			token.mint(presaleInstance.address, web3.toWei(PresaleTotalCap, 'ether'));
		});
}
