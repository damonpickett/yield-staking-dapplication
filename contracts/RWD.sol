pragma solidity ^0.5.0;


contract RWD {
    string public name = 'Reward Token';
    string public symbol = 'RWD';
    uint256 public totalSupply = 1000000000000000000000000; // ETH has 18 decimals
    uint8 public decimals = 18;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint indexed _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint indexed _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() public {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value); // require that sender has the money
        balanceOf[msg.sender] -= _value; // transfer the amount and subtract the balance
        balanceOf[_to] += _value; // add balance to transfer
        emit Transfer(msg.sender, _to, _value); // emit is for emitting events, events are like messages to the user
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);
        balanceOf[_to] += _value;
        balanceOf[_from] -= _value;
        allowance[msg.sender][_from] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}