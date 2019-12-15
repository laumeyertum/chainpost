pragma solidity ^0.5.8;

import "./utils/Ownable.sol";
import "./utils/SafeMath.sol";
import "./token/SafeERC20.sol";
import "./token/IERC20.sol";

contract TokenEconomy is Ownable{

    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    IERC20 private _token;
    uint private _rate;
    address payable private _wallet;

    constructor(address _tokenAddress,address wallet,  uint rate) public {
        require(rate > 0, "TokenEconomy: rate is 0");
        require(wallet != address(0), "TokenEconomy: wallet is the zero address");
        require(address(token) != address(0), "TokenEconomy: token is the zero address");

        MemeCoin = IERC20(_tokenAddress);
        _wallet = wallet;
        _rate = rate;
    }

    function () external payable{
        buyMemeCoin(msg.sender);
    }

    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view {
        require(beneficiary != address(0), "TokenEconomy: beneficiary is the zero address");
        require(weiAmount != 0, "TokenEconomy: weiAmount is 0");
        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
    }

    function buyMemeCoin(address beneficiary) public payable {
        uint256 weiAmount = msg.value;
        _preValidatePurchase(beneficiary, weiAmount);

        // calculate token amount to be created
        uint256 tokens = _getTokenAmount(weiAmount);

        _processPurchase(beneficiary, tokens);

        _updatePurchasingState(beneficiary, weiAmount);

        _forwardFunds();
    }

    function _getTokenAmount(uint256 weiAmount) internal view returns (uint256) {
        return weiAmount.mul(_rate);
    }

    function _processPurchase(address beneficiary, uint256 tokenAmount) internal {
        _token.safeTransfer(beneficiary, tokenAmount);
    }

    function _forwardFunds() internal {
        _wallet.transfer(msg.value);
    }

    function giveLike(address to){}

    function giveDislike(uint postId){}

    function giveGift(address to, uint amount ){}

    function rewardForReporting(uint postId, address payable[] reporter){}
}