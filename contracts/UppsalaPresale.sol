pragma solidity ^0.4.23;

import 'zeppelin-solidity/contracts/crowdsale/Crowdsale.sol';
import 'zeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol';
import 'zeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol';
import 'zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';
import './UppsalaToken.sol';
import './UserMinMaxCrowdsale.sol';

contract UppsalaPresale is UserMinMaxCrowdsale, CappedCrowdsale, TimedCrowdsale {
	using SafeMath for uint256;

	function UppsalaPresale(uint256 rate, 
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
}