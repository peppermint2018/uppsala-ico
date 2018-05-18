var fs = require('fs');
var UppsalaPresale = artifacts.require("UppsalaPresale");
var UppsalaCrowdsale = artifacts.require("UppsalaCrowdsale");

module.exports = function(callback) {
	var pre = UppsalaPresale.at(UppsalaPresale.address)
	var crowd	 = UppsalaCrowdsale.at(UppsalaCrowdsale.address)

	var array = fs.readFileSync('prelist.txt').toString().split("\n");

	var i = 0;
	
	for(i=0; i< array.length; i++)
	{
		pre.addToWhitelist(array[i]);
	}
}
