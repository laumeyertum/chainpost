pragma solidity ^0.5.8;

contract Prison {
    mapping (uint => uint) private _reportPool;
    mapping (uint => address) _reporter;
    mapping (uint => address[]) private _conformer;
    mapping (uint => address) _creator;

//    function reportPost(uint postId, address reporter, address poster ) public {
//        _reporter[postId] = reporter;
//        _creator[postId] = poster;
//        delete _conformer[postId];
//    }
//
//    function addConfirmation(uint postId, address conformer){
//        _conformer[postId].push(conformer);
//    }
//
//    function resolveReport(uint postId, bool type){
//        if(type){
//
//        } else{
//
//        }
//    }
}
