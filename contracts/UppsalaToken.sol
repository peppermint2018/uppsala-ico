pragma solidity ^0.4.4;

contract UppsalaToken {
    
		address public owner;		
    uint256 public constant _totalSupply = 1000000;
    uint256 _tokensSold = 0;
    string public constant symbol = "UPP";
    string public constant name = "Uppsala token";
    uint8 public constant decimals = 3;
		uint256 minFundable = 1 ether;
		uint256 maxFundable = 10 ether;

		uint256 price = 1 ether / 5000;
		bool started = false;
		bool ended = false;

    mapping(address => uint256) balances;
    
		modifier onlyOwner() {
			require(msg.sender == owner);
			_;
		}

    function UppsalaToken(){
        owner = msg.sender;
				balances[msg.sender] = _totalSupply;
    }
     
    function balanceOf(address _owner) constant returns (uint256 balance){
        return balances[_owner];
    }
    
		function invest() payable{
			uint256 amount = msg.value;
			require(amount >= minFundable);
			require(amount <= maxFundable);

			uint256 numTokens = amount / price;

			require((_tokensSold + numTokens) < _totalSupply);

			_tokensSold += numTokens;
			balances[msg.sender] = numTokens;
		}
}
