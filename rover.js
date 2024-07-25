
const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   constructor(position) {
      this.position = position;
      if (!position) {
        throw Error("Position required.");
      }
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
      
   }
   
   receiveMessage(message) {
      let roverStatus = {'POSITION: ': this.position, 'MODE: ': this.mode, 'GENERATOR WATTS: ':this.generatorWatts}
      if (!message || !message.name) {
         throw Error("Message required.");
       }
       for (let i = 0; i < message.commands.length; i++) {
         if (message.commands[i].commandType === 'STATUS_CHECK') {
            console.log(roverStatus);
         } 
       }

       return {
         name: message.name,
         results: message.commands
       };

   
   }
  
}

let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
let message = new Message('Test message with two commands', commands);
let rover = new Rover(98382);    // Passes 98382 as the rover's position.
let response = rover.receiveMessage(message);

console.log(response);
module.exports = Rover;
