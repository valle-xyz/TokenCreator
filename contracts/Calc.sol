// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

contract Calc {
    uint256 private num = 0;

    event NumberSet(address _from, uint256 value);

    function getNum() public view returns (uint256) {
        return num;
    }

    function setNum(uint256 _num) public {
        num = _num;

        emit NumberSet(msg.sender, _num);
    }
}
