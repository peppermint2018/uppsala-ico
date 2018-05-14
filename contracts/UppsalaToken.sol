pragma solidity ^0.4.23;

import 'zeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

contract UppsalaToken is MintableToken {
	string public constant name = 'SENTINEL PROTOCOL Token';
	string public constant  symbol = 'UPP';
	uint8 public constant decimals = 18;
}
