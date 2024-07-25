const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  // Test 7

  // “constructor sets position and default values for mode and generatorWatts”. Refer to the Rover Class description above for these default values.
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let position = 98382;
    let rover = new Rover(position);

    expect(rover.position).toBe(position)
    expect(rover.generatorWatts).toBe(110);
    expect(rover.mode).toBe('NORMAL')
  });
  

  // Test 8
  
  // “response returned by receiveMessage contains the name of the message”
  
  it("receiveMessage(message) returns an object with the name of the message", function() {
    let position = 98382;  
    let rover = new Rover(position);
    let messageName = 'Test';
    let commands = [];
    let message = new Message(messageName, commands);
    let response = rover.receiveMessage(message);
    expect(response.name).toBe(messageName);
    expect(response.results).toEqual([]);
  });

  // Test 9
  
  // “response returned by receiveMessage includes two results if two commands are sent in the message”
  

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let position = 98382;  
    let rover = new Rover(position);
    let messageName = 'Test';
    let commands = ['COMMAND_1', 'COMMAND_2'];
    let message = new Message(messageName, commands);
    let response = rover.receiveMessage(message);
    expect(response.results).toEqual(commands);
  });

  // Test 10
  
  // “responds correctly to the status check command”
  // For the STATUS_CHECK command, receiveMessage(message).results includes a roverStatus object describing the current state of the rover object — mode, generatorWatts, and position. The test should check each of these for accuracy.
  // See the Rover Command Types table for more details.

  it("responds correctly to the status check command", function() {
    let position = 98382;
    let generatorWatts = 110;
    let mode = 'CURRENT_MODE'
    let rover = new Rover(position);
    let messageName = 'Test';
    let commands = ['STATUS_CHECK'];
    let message = new Message(messageName, commands);
    let command = new Command(commands)
    let response = rover.receiveMessage(message);
    let roverStatus = { position, mode, generatorWatts }
    expect(response.results).toEqual(commands);
  });

  // Test 11
  
  // “responds correctly to the mode change command”
  
  // The test should check the completed property and rover mode for accuracy.
  // The rover has two modes that can be passed as values to a mode change command: ‘LOW_POWER’ and ‘NORMAL’.
  // Test 12
  
  // “responds with a false completed value when attempting to move in LOW_POWER mode”
  
  // The test should check the completed property for accuracy and confirm that the rover’s position did not change.
  // Use the Rover Modes table for guidance on how to handle move commands in different modes.
  // Test 13
  
  // “responds with the position for the move command”
  
  // A MOVE command will update the rover’s position with the position value in the command.

});
