pragma solidity ^0.5.8;

interface token {
    function transfer(address receiver, uint amount) external;
}

contract TokenEconomy {
    token private MemeCoin;

    constructor(address _tokenAddress) public {
        MemeCoin = token(_tokenAddress);
    }
}