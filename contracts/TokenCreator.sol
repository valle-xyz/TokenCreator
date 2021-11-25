// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./factories/SimpleToken.sol";

/**
 * @title A Creator for Tokens
 * @dev Currently only creates SimpleToken
 * @dev Saves address into _child
 */
contract TokenCreator is Ownable {
    address _child;

    event CreatedSimpleToken(
        SimpleToken SimpleToken,
        address owner,
        uint256 initialSupply,
        string name,
        string symbol
    );

    /**
     * @dev creates SimpleToken contract
     */
    function createSimpleToken(
        uint256 initialSupply,
        string memory name,
        string memory symbol
    ) public returns (address) {
        SimpleToken simpleToken = new SimpleToken(
            msg.sender,
            initialSupply,
            name,
            symbol
        );
        emit CreatedSimpleToken(
            simpleToken,
            msg.sender,
            initialSupply,
            name,
            symbol
        );
        _child = address(simpleToken);
        return address(simpleToken);
    }

    /**
     * @dev Returns child, TODO: has to be replaced
     */
    function child() public view returns (address) {
        return _child;
    }
}
