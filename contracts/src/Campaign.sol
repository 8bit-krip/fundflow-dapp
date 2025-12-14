// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Campaign {
    address public creator;
    uint256 public goal;
    uint256 public deadline;
    uint256 public totalRaised; 

    mapping(address => uint256) public contributions;

    bool public withdrawn;

    event Funded(address indexed contributor, uint256 amount);
    event Withdrawn(address indexed creator, uint256 amount);
    event Refunded(address indexed contributor, uint256 amount);

    constructor(
        address _creator,
        uint256 _goal,
        uint256 _duration
    ) {
        creator = _creator;
        goal = _goal;
        deadline = block.timestamp + _duration;
    }

    function fund() external payable {
        require(block.timestamp < deadline, "Campaign ended"); //time checked 
        require(msg.value > 0, "Zero value");   //check the input is not zero 

        contributions[msg.sender] += msg.value;  
        totalRaised += msg.value;

        emit Funded(msg.sender, msg.value);
    }

    function withdraw() external {
        require(msg.sender == creator, "Not creator");
        require(block.timestamp >= deadline, "Campaign ongoing");
        require(totalRaised >= goal, "Goal not reached");
        require(!withdrawn, "Already withdrawn");

        withdrawn = true;
        uint256 balance = address(this).balance;

        payable(creator).transfer(balance);
        
        emit Withdrawn(creator, balance);
    }

    function refund() external {
        require(block.timestamp >= deadline, "Campaign ongoing");
        require(totalRaised < goal, "Goal reached");

        uint256 amount = contributions[msg.sender];
        require(amount > 0, "Nothing to refund");

        contributions[msg.sender] = 0;
        payable(msg.sender).transfer(amount);

        emit Refunded(msg.sender, amount);
    }
}
