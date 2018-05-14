pragma solidity ^0.4.23;

import 'zeppelin-solidity/contracts/crowdsale/Crowdsale.sol';
import 'zeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol';
import 'zeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol';
import 'zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';
import './UppsalaToken.sol';
import './UserMinMaxCrowdsale.sol';

contract UppsalaPresale is UserMinMaxCrowdsale, CappedCrowdsale, TimedCrowdsale {
	using SafeMath for uint256;

	mapping(address => uint256) public lockedBalances;
	uint256 public bonusRate;
	uint256 public releaseTime;
	uint256 public totalBonusGiven;

	function UppsalaPresale(uint256 rate, 
														uint256 openTime, 
														uint256 closeTime, 
														uint256 totalCap,
														uint256 userMin,
														uint256 userMax,
														uint256 _bonusRate,
														uint256 _releaseTime,
														address account,
													 	StandardToken token)
					 Crowdsale(rate, account, token)
				   TimedCrowdsale(openTime, closeTime)
					 CappedCrowdsale(totalCap)
					 UserMinMaxCrowdsale(userMin, userMax)
	{
		require( _bonusRate > 0 );
		require(_releaseTime > block.timestamp);
 		bonusRate = _bonusRate;
		releaseTime = _releaseTime;
		totalBonusGiven = 0;
	}


	function buyTokens(address beneficiary) public payable {
		require(beneficiary != address(0));
		super.buyTokens(beneficiary);

		uint256 weiAmount = msg.value;
		uint256 bonusAmount = weiAmount.mul(bonusRate);
		lockedBalances[beneficiary] = lockedBalances[beneficiary].add(bonusAmount);
		totalBonusGiven = totalBonusGiven.add(bonusAmount);
	}

	function lockedBalanceOf(address _beneficiary) public view returns (uint256) {
		return lockedBalances[_beneficiary];	
	}

	function releaseLockedBalance(address _beneficiary) public {
		require(_beneficiary != address(0));
		require( block.timestamp >= releaseTime );
		
		uint256 amount = lockedBalances[_beneficiary];
		require( amount > 0 );
		token.transfer(_beneficiary, amount);
		lockedBalances[_beneficiary] = lockedBalances[_beneficiary].sub(amount);
	}
}
