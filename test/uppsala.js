var UppsalaCrowdsale = artifacts.require("UppsalaCrowdsale");

contract('UppsalaCrowdsale', function(accounts) {
  /*it("should put 10000 UppsalaCrowdsale in the first account", function() {
    return UppsalaCrowdsale.deployed().then(function(instance) {
      return instance.getBalance.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
    });
  });*/
	/*
  it("should call a function that depends on a linked library", function() {
    var upp;
    var uppCoinBalance;
    var uppCoinEthBalance;

    return UppsalaCrowdsale.deployed().then(function(instance) {
      upp = instance;
      return upp.getBalance.call(accounts[0]);
    }).then(function(outCoinBalance) {
      uppCoinBalance = outCoinBalance.toNumber();
      return upp.getBalanceInEth.call(accounts[0]);
    }).then(function(outCoinBalanceEth) {
      uppCoinEthBalance = outCoinBalanceEth.toNumber();
    }).then(function() {
      assert.equal(uppCoinEthBalance, 2 * uppCoinBalance, "Library function returned unexpected function, linkage may be broken");
    });
  });*/
  it("should send coin correctly", function() {

    // Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;

    var amount = 1;
		console.log(UppsalaCrowdsale);
		
    return UppsalaCrowdsale.deployed().then(function(instance) {
			
			var uppsala = instance.address;
			var user1 = web3.eth.accounts[1];
			web3.eth.sendTransaction({'from': user1, 'to': uppsala, 'value': amount});
			assert.equal(web3.eth.getBalance(user1), 9);
			assert.equal(web3.eth.getBalance(uppsala), 1);
			console.log( instance.getBalance.call() );
    });
  });
});
