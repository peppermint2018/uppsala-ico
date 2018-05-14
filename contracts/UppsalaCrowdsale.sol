pragma solidity ^0.4.23;

import 'zeppelin-solidity/contracts/crowdsale/Crowdsale.sol';
import 'zeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol';
import 'zeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol';
import 'zeppelin-solidity/contracts/crowdsale/validation/WhitelistedCrowdsale.sol';
import 'zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';
import './UppsalaToken.sol';
import './UserMinMaxCrowdsale.sol';

/*
contract UppsalaCrowdsale is Crowdsale {
	function UppsalaCrowdsale(uint256 rate,
														address account,
													  StandardToken token)
														Crowdsale(rate, account, token)
														{
														}
}
*/

contract UppsalaCrowdsale is WhitelistedCrowdsale, UserMinMaxCrowdsale, CappedCrowdsale, TimedCrowdsale {
	using SafeMath for uint256;

	function UppsalaCrowdsale(uint256 rate, 
														uint256 openTime, 
														uint256 closeTime, 
														uint256 totalCap,
														uint256 userMin,
														uint256 userMax,
														address account,
													 	StandardToken token)
					 Crowdsale(rate, account, token)
				   TimedCrowdsale(openTime, closeTime)
					 CappedCrowdsale(totalCap)
					 UserMinMaxCrowdsale(userMin, userMax)
	{
  }

	function buyTokens(address beneficiary) public payable {
		// limiting gas price
		require(tx.gasprice <= 50000000000 wei);
		// limiting gas limt up to around 200000-210000
		require(msg.gas <= 190000);
		super.buyTokens(beneficiary);
	}
}
