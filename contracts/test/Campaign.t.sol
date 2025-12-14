// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/CampaignFactory.sol";
import "../src/Campaign.sol";

contract CampaignTest is Test {
    
    CampaignFactory factory;
    Campaign campaign;

    
    address creator = makeAddr("creator");  //Random addresh by foundry 
    address contributor = makeAddr("contributor");

    function setUp() public {
        factory = new CampaignFactory();
        vm.prank(creator);
        address campaignAddr = factory.createCampaign(1 ether, 1 days);
        campaign = Campaign(campaignAddr);
    }

    function testCampaignCreation() public view {
        assertEq(campaign.creator(), creator);
        assertEq(campaign.goal(), 1 ether);
    }

    function testFunding() public {
        vm.deal(contributor, 2 ether);
        vm.prank(contributor);
        campaign.fund{value: 1 ether}();

        assertEq(campaign.totalRaised(), 1 ether);
    }

    function testWithdrawSuccess() public {
        vm.deal(contributor, 2 ether);
        vm.prank(contributor);
        campaign.fund{value: 1 ether}();

        vm.warp(block.timestamp + 2 days);
        vm.prank(creator);
        campaign.withdraw();

        assertEq(address(campaign).balance, 0);
    }

    function testRefund() public {
        vm.deal(contributor, 1 ether);
        vm.prank(contributor);
        campaign.fund{value: 0.5 ether}();

        vm.warp(block.timestamp + 2 days);
        vm.prank(contributor);
        campaign.refund();

        assertEq(contributor.balance, 1 ether);
    }
}
