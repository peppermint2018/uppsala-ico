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

	// Time
	//const PresaleOpenTime = latestTime() + duration.minutes(1);
	//const PresaleCloseTime = PresaleOpenTime + duration.weeks(1);
	//const CrowdsaleOpenTime = latestTime() + duration.minutes(1);
	//const CrowdsaleCloseTime = CrowdsaleOpenTime + duration.weeks(1);

	// May 23 21:00 SGT
	const PresaleOpenTime = 1527080400;
	// May 26 21:00 SGT
	const PresaleCloseTime = 1527339600;
	// May 27 21:00 SGT
	const CrowdsaleOpenTime = 1527426000;
	// Jun 10 21:00 SGT
	const CrowdsaleCloseTime = 1528635600;

	// Rate = 5000 UPP per ether
	const Rate = 5000;
	
	// Bonus = 750 UPP per ether
	const PresaleBonus = 750; 
	
	// bonus lock-up ends 180 days after the presale
	const PresaleLockupReleaseTime = PresaleCloseTime + duration.days(180);
	//const PresaleLockupReleaseTime = latestTime() + duration.minutes(5);

	// Min/Max contribution (in ethereum)
	const PresaleMin = web3.toWei(30, 'ether');
	const PresaleMax = web3.toWei(300, 'ether');

	const CrowdsaleMin = web3.toWei(0.5, 'ether');
	const CrowdsaleMax = web3.toWei(10, 'ether');
	
	// Total cap for presale (in UPP)
	// We set total cap (the actual cap) - (15% bonus UPP)
	// 6562500 UPPs are bonus, so we do not include them in the total cap
	const PresaleTotalCap = web3.toWei(37187500, 'ether');
	// Total cap for crowdsale (in UPP)
	const CrowdsaleTotalCap = web3.toWei(39000000, 'ether');

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
			
			// mint UPP as the amount of total crowd sale
			token.mint(crowdsaleInstance.address, web3.toWei(CrowdsaleTotalCap,'ether'));
			// mint UPP as the amount of total presale,
			// The bonus is also minited but will be transfered in the future when the lock has been
			// released
			token.mint(presaleInstance.address, web3.toWei(PresaleTotalCap, 'ether'));
		});
}
