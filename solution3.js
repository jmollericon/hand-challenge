const fs = require('fs');

const instructions = [...fs.readFileSync('./input.hand', 'utf-8')];

const memory = [];
let pointer = 0;
let cursor = 0;
const stack = [];
const loops = {};

instructions.forEach((instruction, index) => {
  if (instruction === '🤜') {
    stack.push(index);
  } else if (instruction === '🤛') {
    const loopStart = stack.pop();
    loops[loopStart] = index;
    loops[index] = loopStart;
  }
});

const actions = {
  '👉': () => pointer += 1,
  '👈': () => pointer -= 1,
  '👆': () => memory[pointer] = memory[pointer] === 255 ? 0 : memory[pointer] + 1,
  '👇': () => memory[pointer] = memory[pointer] === 0 ? 255 : memory[pointer] - 1,
  '🤜': () => {
    if (memory[pointer] === 0) {
      cursor = loops[cursor]
    }
  },
  '🤛': () => {
    if (memory[pointer] !== 0) {
      cursor = loops[cursor];
    }
  },
  '👊': () => {
    process.stdout.write(String.fromCharCode(memory[pointer]))
  },
};

while(cursor < instructions.length) {
  if (memory[pointer] == undefined) memory[pointer] = 0;
  actions[instructions[cursor]]();
  cursor++;
}
