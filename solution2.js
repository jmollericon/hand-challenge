const fs = require('fs');

const memory = [];
let pointer = 0;
let response = '';

const instructions = [...fs.readFileSync('./test1.hand', 'utf-8')];

let sw = true;
let i = 0;
let instruction = null;

const actions = {
  '👉': () => pointer += 1,
  '👈': () => pointer -= 1,
  '👆': () => memory[pointer] = memory[pointer] === 255 ? 0 : memory[pointer] + 1,
  '👇': () => memory[pointer] = memory[pointer] === 0 ? 255 : memory[pointer] - 1,
  '🤜': () => {
    if (memory[pointer] === 0) {
      let swww = true;
      do {
        i++;
        instruction = instructions[i % instructions.length]
        if (instruction == '🤛') {
          swww = false;
        }
      } while(swww);
    }
  },
  '🤛': () => {
    if (memory[pointer] !== 0) {
      let sww = true;
      do {
        i--;
        instruction = instructions[i % instructions.length]
        if (instruction == '🤜') {
          sww = false;
        }
      } while(sww);
    }
  },
  '👊': () => {
    //console.log('imprimir', i % instructions.length, memory[pointer])
    //process.stdout.write(String.fromCharCode(memory[pointer]))
    response += String.fromCharCode(memory[pointer]);
    if (i % instructions.length == instructions.length - 1) {
      sw = false;
    }
  },
};

while(sw) {
  if (memory[pointer] == undefined) memory[pointer] = 0;
  instruction = instructions[i % instructions.length];
  actions[instruction]()
  i++;
}
console.log('response:', response);
