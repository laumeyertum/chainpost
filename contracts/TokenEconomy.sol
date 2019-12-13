pragma solidity ^0.5.8;

import "./utils/Ownable.sol";
import "./utils/SafeMath.sol";
import "./token/SafeERC20.sol";

interface token {
    function transfer(address receiver, uint amount) external;
}

contract TokenEconomy is Ownable{

    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    IERC20 private _token;

    constructor(address _tokenAddress) public {
        MemeCoin = IERC20(_tokenAddress);
    }



}