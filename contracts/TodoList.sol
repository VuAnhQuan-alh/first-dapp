// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract TodoList {
  uint public taskCount = 0;

  struct Task {
    uint id;
    string contents;
    bool compelted;
  }
  mapping (uint => Task) public tasks;

  constructor() {
    createTask("Create new task");
  }

  function createTask(string memory _content) public {
    taskCount ++;
    tasks[taskCount] = Task(taskCount, _content, false);
  }
}