pragma solidity ^0.4.23;

import 'zeppelin-solidity/contracts/crowdsale/Crowdsale.sol';
import 'zeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol';
import 'zeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol';
import 'zeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol';
import 'zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';
import './UppsalaToken.sol';
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

contract UppsalaCrowdsale is CappedCrowdsale, TimedCrowdsale {
	using SafeMath for uint256;

	function UppsalaCrowdsale(uint256 rate, 
														uint256 openTime, 
														uint256 closeTime, 
														uint256 totalCap,
													 	StandardToken 	token,	
														address account)
					 Crowdsale(rate, account, token)
				   TimedCrowdsale(openTime, closeTime)
					 CappedCrowdsale(totalCap)
	{

  }
}
