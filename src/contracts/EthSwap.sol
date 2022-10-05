//SPDX License Identifier: MIT

pragma solidity ^0.5.1;
import "./JanioToken.sol";

contract EthSwap {

	string public name = "EthSwap Janio Exchange";
	JanioToken public token;
	uint public rate = 100;

	event TokenPurchased(address from, address to, address tokenAddress, uint amount, uint rate );

	constructor (JanioToken _tokenAddr) public {
		token = _tokenAddr;

	}


	function buyTokens() public payable {
	    uint tokenAmount = msg.value * rate;
	    require(token.balanceOf(address(this))>=tokenAmount);
	    token.transfer(msg.sender, tokenAmount);
	    emit TokenPurchased(address(this), msg.sender, address(token), tokenAmount, rate);	
	}

       
	function sellTokens(uint _tokenAmount) public payable {
	    require(token.balanceOf(msg.sender)>=_tokenAmount);
	    
	    token.transferFrom(msg.sender,address(this),_tokenAmount);

	    uint etherAmount = _tokenAmount / rate;

	    require(address(this).balance >= etherAmount);

	    msg.sender.transfer(etherAmount);

	    emit TokenPurchased(msg.sender, address(this), address(token), _tokenAmount, rate);	
	}

	 
}


