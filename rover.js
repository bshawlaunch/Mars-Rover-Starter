const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
  constructor(position) {
    if (!position) {
      throw Error("Position required.");
    }
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }

  receiveMessage(message) {
    let results = [];

    if (!message || !message.name) {
      throw Error("Message required.");
    }

    for (let command of message.commands) {
      if (command.commandType === 'STATUS_CHECK') {
        let roverStatus = {
          position: this.position,
          mode: this.mode,
          generatorWatts: this.generatorWatts,
        };
         results.push({ completed: true });
         results.push(roverStatus)
      } else if (command.commandType === 'MODE_CHANGE') {
        this.mode = command.value;
        results.push({ completed: true });
      } else if (command.commandType === 'MOVE') {
        if (this.mode === 'NORMAL') {
          this.position = command.value;
          results.push({ completed: true });
        } else {
          results.push({ completed: false });
        }
      }
    }

    return {
      name: message.name,
      results: results,
    };
  }
}

let rover = new Rover(98382); 
let commands = [
  new Command('MODE_CHANGE', 'NORMAL'),
  new Command('STATUS_CHECK'),
  new Command('MOVE', 51251),
  new Command('STATUS_CHECK'),
  new Command('MODE_CHANGE', 'LOW_POWER'),
  new Command('STATUS_CHECK'),
  new Command('MOVE', 32901),
];
let message = new Message('Test message with two commands', commands);
let response = rover.receiveMessage(message);

console.log(response);
module.exports = Rover;