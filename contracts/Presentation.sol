pragma solidity ^0.5.8;

contract Presentation {

    Homepage homePage;

    constructor(address _homePage){
        homePage = Homepage(_homePage);
    }

    function getPost(string memory _sortBy) public returns(){
        return homePage.getPost(_sortBy);
    }

    function getUserProfile(string memory _userName) public returns(){
        return
    }
}
