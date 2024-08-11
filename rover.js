const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
  constructor(position) {
    if (!position) {
      throw Error("Position required.");
    }
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
    this.position = position;
  }

  receiveMessage(message) {
    let results = [];

    if (!message || !message.name) {
      throw Error("Message required.");
    }

    for (let command of message.commands) {
      if (command.commandType === 'STATUS_CHECK') {
        let roverStatus = {

          mode: this.mode,
          generatorWatts: this.generatorWatts,
          position: this.position,
        };
         results.push({ completed: true, roverStatus });
      } else if (command.commandType === 'MODE_CHANGE') {
        this.mode = command.value;
        results.push({ completed: true });
      } 
      
      
      else if (command.commandType === 'MOVE') {
        if (this.mode === 'NORMAL') {
          this.position = command.value;
          results.push({ completed: true });
        } else {
          results.push({ completed: false });
        }
      }
    }

    return {
      message: message.name,
      results: results,
    };
  }
}

let rover = new Rover(98382); 
let commands = [
  new Command('MOVE', 4321),
  new Command('STATUS_CHECK'),
  new Command('MODE_CHANGE', 'LOW_POWER'),
  new Command('MOVE', 3579),
  new Command('STATUS_CHECK')
];
let message = new Message("TA power", commands);
let response = rover.receiveMessage(message);
console.log(response)
module.exports = Rover;