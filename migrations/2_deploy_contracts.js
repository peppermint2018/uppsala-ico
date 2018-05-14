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
	const RATE = 5000;
	const openTime = 1526304900;//latestTime() + duration.minutes(34);
	//const closeTime = openTime + duration.weeks(1);
	const closeTime = openTime + duration.minutes(10);
	const totalCap = 500000000;
	return deployer
		.then( () => {
		return deployer.deploy(UppsalaToken);
	}).then( () => {
		//return deployer.deploy(UppsalaCrowdsale, RATE, accounts[0], UppsalaToken.address)
		return deployer.deploy(UppsalaCrowdsale, RATE, openTime, closeTime, 
				totalCap, UppsalaToken.address, accounts[0])
		.then( (instance) => {
			var token = UppsalaToken.at(UppsalaToken.address);
			token.mint( instance.address, web3.toWei(totalCap,'ether') );
			console.log( [RATE, openTime, closeTime, totalCap, token.address, accounts[0]]);
			console.log( UppsalaCrowdsale.isDeployed() );
		})
	});	
}
