// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AssetController {
    struct Asset {
        address token;
        address authority;
        address delegate;
        uint8 version;
        bool closed;
    }

    mapping(address => Asset) public assets;
    
    event AssetCreated(address token, address authority);
    event AssetUpdated(address token);
    event AssetClosed(address token);

    function createAsset(address token, address authority, address delegate) public {
        require(assets[token].token == address(0), "Asset already exists");
        
        assets[token] = Asset({
            token: token,
            authority: authority,
            delegate: delegate,
            version: 1,
            closed: false
        });

        emit AssetCreated(token, authority);
    }

    function updateAsset(address token, address newDelegate) public {
        require(assets[token].token != address(0), "Asset does not exist");
        require(msg.sender == assets[token].authority, "Not authorized");
        
        assets[token].delegate = newDelegate;
        emit AssetUpdated(token);
    }

    function closeAsset(address token) public {
        require(assets[token].token != address(0), "Asset does not exist");
        require(msg.sender == assets[token].authority, "Not authorized");
        
        assets[token].closed = true;
        emit AssetClosed(token);
    }
}