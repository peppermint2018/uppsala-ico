pragma solidity ^0.4.23;

import 'zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';

contract UppsalaToken is StandardToken {
 		string public name = 'DLEE Token';
		string public symbol = 'DYL';
		uint8 public decimals = 8;
}
