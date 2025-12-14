// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Campaign} from "./Campaign.sol";

contract CampaignFactory {
    address[] public campaigns;

    event CampaignCreated(
        address indexed campaign,
        address indexed creator,
        uint256 goal,
        uint256 deadline
    );

    function createCampaign(uint256 goal, uint256 duration)
        external
        returns (address)
    {
        Campaign campaign = new Campaign(
            msg.sender,
            goal,
            duration
        );

        campaigns.push(address(campaign));

        emit CampaignCreated(
            address(campaign),
            msg.sender,
            goal,
            block.timestamp + duration
        );

        return address(campaign);
    }

    function getCampaigns() external view returns (address[] memory) {
        return campaigns;
    }
}
