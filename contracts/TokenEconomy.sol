pragma solidity ^0.5.8;
pragma experimental ABIEncoderV2;

import "./utils/Ownable.sol";
import "./utils/SafeMath.sol";
import "./token/SafeERC20.sol";
import "./token/IERC20.sol";

contract TokenEconomy is Ownable {

    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    IERC20 private _token;
    uint private _rate;
    address payable private _wallet;
    uint private _likeWorth = 10;

    uint[] private postLikeList;
    mapping(uint => PostLike) private likeMapping;

    struct PostLike {
        uint postId;
        address poster;
        uint amountLike;
        uint amountDisLike;
    }

    constructor(address tokenAddress, address payable wallet, uint rate) public {
        require(rate > 0, "TokenEconomy: rate is 0");
        require(wallet != address(0), "TokenEconomy: wallet is the zero address");
        require(address(tokenAddress) != address(0), "TokenEconomy: token is the zero address");

        _token = IERC20(tokenAddress);
        _wallet = wallet;
        _rate = rate;
    }

    function() external payable {
        buyMemeCoin(msg.sender);
    }

    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view {
        require(beneficiary != address(0), "TokenEconomy: beneficiary is the zero address");
        require(weiAmount != 0, "TokenEconomy: weiAmount is 0");
        this;
        // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
    }

    function _getTokenAmount(uint256 weiAmount) internal view returns (uint256) {
        return weiAmount.mul(_rate);
    }

    function _processPurchase(address beneficiary, uint256 tokenAmount) internal {
        _token.safeTransfer(beneficiary, tokenAmount);
    }

    function _forwardFunds() internal onlyOwner {
        _wallet.transfer(msg.value);
    }

    function _reportExist(PostLike memory like, uint[] memory postId, address[] memory originalPoster, address[] memory reporter, address [][] memory confirmer) internal returns (bool){
        for (uint i = 0; i < postId.length; i++) {
            if (like.postId == postId[i]) {
                _token.safeTransferFrom(owner(), originalPoster[i], _likeWorth.mul(like.amountLike));
                uint amountToDistribute = like.amountDisLike.mul(_likeWorth);
                uint amountReporter = amountToDistribute.div(2);
                amountToDistribute = amountToDistribute.sub(amountReporter);
                if (confirmer[i].length != 0) {
                    uint amountConfirmer = amountToDistribute.div(confirmer[i].length);
                    amountToDistribute = amountToDistribute.sub(amountConfirmer.mul(confirmer[i].length));
                    _token.safeTransferFrom(owner(), reporter[i], amountReporter);
                    for (uint j = 0; j < confirmer[i].length; j++) {
                        _token.safeTransferFrom(owner(), confirmer[i][j], amountConfirmer);
                    }
                }
                _token.safeTransferFrom(owner(), address(this), amountToDistribute);
            }
        }
        return false;
    }

    function _resetMapping() internal{
        for(uint i =0; i<postLikeList.length; i++){
            likeMapping[postLikeList[i]].postId = 0;
            likeMapping[postLikeList[i]].amountLike = 0;
            likeMapping[postLikeList[i]].amountDisLike = 0;
        }
        delete postLikeList;
    }

    function buyMemeCoin(address beneficiary) public payable {
        uint256 weiAmount = msg.value;
        _preValidatePurchase(beneficiary, weiAmount);

        // calculate token amount to be created
        uint256 tokens = _getTokenAmount(weiAmount);

        _processPurchase(beneficiary, tokens);
    }

    function giveLike(address to, uint postId) external {
        _token.safeTransferFrom(msg.sender, owner(), _likeWorth);
        if (likeMapping[postId].postId == 0) {
            PostLike(postId, to, 1, 0);
            postLikeList.push(postId);
        } else {
            likeMapping[postId].amountLike += 1;
        }
    }

    function getLikeWorth() external view returns (uint){
        return _likeWorth;
    }

    function setLikeWorth(uint likeWorth) external onlyOwner {
        _likeWorth = likeWorth;
    }

    function giveDisLike(address to, uint postId) external {
        _token.safeTransferFrom(msg.sender, owner(), _likeWorth);
        if (likeMapping[postId].postId == 0) {
            PostLike(postId, to, 0, 1);
            postLikeList.push(postId);
        } else {
            likeMapping[postId].amountDisLike += 1;
        }
    }

    function giveGift(address to, uint amount) external {
        return _token.safeTransferFrom(msg.sender, to, amount);
    }

    function rewardForLikes(uint[] memory postId, address[] memory originalPoster, address[] memory reporter, address [][] memory confirmer) public {
        for (uint i = 0; i < postLikeList.length; i++) {
            PostLike memory postLikeElement = likeMapping[postLikeList[i]];
            if (!_reportExist(postLikeElement, postId, originalPoster, reporter, confirmer)) {
                _token.safeTransferFrom(owner(), postLikeElement.poster, _likeWorth * postLikeElement.amountLike);
                _token.safeTransferFrom(owner(), address(this), _likeWorth * postLikeElement.amountDisLike);
            }
        }
        _resetMapping();
    }

}