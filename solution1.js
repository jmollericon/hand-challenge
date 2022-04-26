const fs = require('fs');

const memory = [];
let pointer = 0;
let response = '';

const instructions = [...fs.readFileSync('./test1.hand', 'utf-8')];

let sw = true;
let i = 0;
let instruction = null;


while(sw) {
    //console.log('--->',  i % instructions.length)
    instruction = instructions[i % instructions.length];

    if (memory[pointer] == undefined) {
        memory[pointer] = 0;
    }

    if (instruction == '👉') {
        pointer += 1;
    } else if (instruction == '👈') {
        pointer -= 1;
    } else if (instruction == '👆') {
        memory[pointer] = memory[pointer] === 255 ? 0 : memory[pointer] + 1;
    } else if (instruction == '👇') {
        memory[pointer] = memory[pointer] === 0 ? 255 : memory[pointer] - 1;
    } else if (instruction == '🤜') {
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
    } else if (instruction == '🤛') {
        if (memory[pointer] !== 0) {
            //console.log('make something <- jump just after the corresponding fist_right')
            //i++;
            //console.log('inicitial i = ', i)
            // make something
            let sww = true;
            do {
                i--;
                instruction = instructions[i % instructions.length]
                if (instruction == '🤜') {
                    sww = false;
                }
            } while(sww);
        }
    } else if (instruction == '👊') {
        //console.log('imprimir', i % instructions.length, memory[pointer])
        //console.log('terminar, interacion i = ', i,' ->', memory[pointer], '-', String.fromCharCode(memory[pointer]), '<-');
        response += String.fromCharCode(memory[pointer]);
        if (i % instructions.length == instructions.length - 1) {
            sw = false;
        }
    }
    i++;
    console.log(i)
}
console.log('response:', response);

/* instructions.forEach(instruction => {
    if (memory[pointer] == undefined) {
        memory[pointer] = 0;
    }

    if (instruction == '👉') {
        pointer++;
    } else if (instruction == '👈') {
        pointer--;
    } else if (instruction == '👆') {
        if (memory[pointer] === 255) {
            memory[pointer] = 0;
        } else {
            memory[pointer]++;
        }
    } else if (instruction == '👇') {
        if (memory[pointer] === 0) {
            memory[pointer] = 255;
        } else {
            memory[pointer]--;
        }
    } else if (instruction == '🤜') {

    } else if (instruction == '🤛') {

    } else if (instruction == '👊') {
        console.log('terminar ->', memory[pointer], '-', String.fromCharCode(memory[pointer]), '<-');
    }
}) */
