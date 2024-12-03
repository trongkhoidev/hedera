// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PolicyEngine {
    struct Policy {
        address asset;
        uint8 policyType;
        uint256 limit;
        uint256 timeframe;
        bool active;
    }

    mapping(bytes32 => Policy) public policies;
    
    event PolicyCreated(bytes32 policyId, address asset);
    event PolicyUpdated(bytes32 policyId);

    function createPolicy(
        address asset,
        uint8 policyType,
        uint256 limit,
        uint256 timeframe
    ) public returns (bytes32) {
        bytes32 policyId = keccak256(abi.encodePacked(asset, policyType));
        
        policies[policyId] = Policy({
            asset: asset,
            policyType: policyType,
            limit: limit,
            timeframe: timeframe,
            active: true
        });

        emit PolicyCreated(policyId, asset);
        return policyId;
    }

    function updatePolicy(
        bytes32 policyId,
        uint256 newLimit,
        uint256 newTimeframe
    ) public {
        require(policies[policyId].active, "Policy not found");
        
        policies[policyId].limit = newLimit;
        policies[policyId].timeframe = newTimeframe;
        
        emit PolicyUpdated(policyId);
    }
}