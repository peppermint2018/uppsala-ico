var UppsalaCrowdsale = artifacts.require("./UppsalaCrowdsale.sol");

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
	deployer.deploy(UppsalaToken).then( function() {
		const RATE = 5000;
		const openTime = latestTime() + duration.minutes(1);
		const closeTime = openTime + duration.weeks(1);
		const totalCap = 5000;
		console.log([openTime, closeTime, totalCap,accounts]);
		deployer.deploy(UppsalaCrowdsale, 
				RATE, 
				openTime, 
				closeTime, 
				totalCap, 
				UppsalaToken.address, 
				accounts[0]);
		});	
}
