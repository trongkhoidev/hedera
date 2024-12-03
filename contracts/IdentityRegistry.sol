// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IdentityRegistry {
    struct Identity {
        address account;
        uint8 identityLevel;
        uint8 version;
        bool active;
    }

    mapping(address => Identity) public identities;
    
    event IdentityCreated(address account, uint8 level);
    event IdentityUpdated(address account, uint8 newLevel);

    function createIdentity(address account, uint8 level) public {
        require(identities[account].account == address(0), "Identity exists");
        
        identities[account] = Identity({
            account: account,
            identityLevel: level,
            version: 1,
            active: true
        });

        emit IdentityCreated(account, level);
    }

    function updateIdentityLevel(address account, uint8 newLevel) public {
        require(identities[account].account != address(0), "Identity not found");
        
        identities[account].identityLevel = newLevel;
        emit IdentityUpdated(account, newLevel);
    }
}