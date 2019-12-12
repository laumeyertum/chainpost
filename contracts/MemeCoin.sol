pragma solidity ^0.5.8;

contract MemeCoin {
    string symbol;
    string name;
    uint8 decimals;

    mapping(address => uint) balances;

    event Transfer(address _from, address _to, uint _value);

    constructor(string memory _symbol, string memory _name, uint8 _decimals, uint _initialsSupply) public {
        symbol = _symbol;
        name = _name;
        decimals = _decimals;
        balances[msg.sender] = _initialsSupply;
    }

    function transfer(address _to, uint _value) external {
        require(balances[msg.sender] >=_value);
        require(balances[_to] + _value >= balances[_to] );
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender,_to,_value);
    }

    function getTokenOf(address _of) external view returns(uint){
        return balances[_of];
    }

}