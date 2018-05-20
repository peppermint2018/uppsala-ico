var fs = require('fs');
var UppsalaPresale = artifacts.require("UppsalaPresale");
var UppsalaCrowdsale = artifacts.require("UppsalaCrowdsale");

module.exports = function(callback) {
	var pre = UppsalaPresale.at(UppsalaPresale.address)
	var crowd	 = UppsalaCrowdsale.at(UppsalaCrowdsale.address)

	var array = fs.readFileSync('crowdlist.txt').toString().split("\n");
	//var array = fs.readFileSync('whitelist.txt').toString().split("\n");

	var i = 0;
	var count = 0;
	var addresses = [];
	var chunk = 100;
	var gasobj = {gas: 200000, gasPrice: 50000000000};

	for(i=0; i< array.length; i++)
	{
		addresses.push( array[i] );	
		count = count+1;
		if(count >= chunk) {
			console.log( "commited", count,"addresses");
			crowd.addManyToWhitelist( addresses, gasobj );
			count = 0;
			addresses = [];
		}
	}

	console.log( "commited", count,"addresses");
	crowd.addManyToWhitelist( addresses, gasobj );
	
	

}
