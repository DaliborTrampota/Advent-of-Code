const fs = require('fs');
let input = fs.readFileSync('./Day8/input.txt', {encoding: 'utf-8'}).split('\r\n')

console.time();

function partOne(input){
    let acc = 0;
    let idx = 0;
    let instructions = {};

    for(let i of input){
        let args = i.split(' ')
        args[1] = Number(args[1]);
        instructions[idx] = args
        idx++;
    }
    idx = 0;
    let visitedIndecies = [];
    while(idx != input.length){
        let ins = instructions[idx];
        if(visitedIndecies.includes(idx))
            break;
        
        visitedIndecies.push(idx);

        switch(ins[0]){
            case 'acc':
                acc += ins[1];
                idx++;
                break;

            case 'nop':
                idx++;
                break;
            
            case 'jmp':
                idx += ins[1];
                break;
        }
    }
    return acc;
}

function partTwo(input){
    let acc = 0;
    let idx = 0, jmpnopIdx = 0;
    let instructions = {};

    for(let i of input){
        let args = i.split(' ')
        args[1] = Number(args[1]);
        instructions[idx] = args
        idx++;
    }
    let fixed;
    let entries = Object.entries(instructions);
    let jmpnop = entries.filter(ins => ['jmp', 'nop'].includes(ins[1][0])).map(arg => [arg[0], arg[1][0]]);
    do{
        fixed = true
        acc = 0;
        idx = 0;

        let visitedIndecies = [];
        let swap = jmpnop[jmpnopIdx];
        if(jmpnopIdx != 0){
            let prevSwap = jmpnop[jmpnopIdx - 1];
            instructions[prevSwap[0]][0] = prevSwap[1] != 'nop' ? 'jmp' : 'nop';
        }
        instructions[swap[0]][0] = swap[1] == 'nop' ? 'jmp' : 'nop';

        while(idx != input.length){
            let ins = instructions[idx];
            if(visitedIndecies.includes(idx)){
                fixed = false;
                break;
            }
            visitedIndecies.push(idx);
            switch(ins[0]){
                case 'acc':
                    acc += ins[1];
                    idx++;
                    break;
    
                case 'nop':
                    idx++;
                    break;
                
                case 'jmp':
                    idx += ins[1];
                    break;
            }
        }
        jmpnopIdx++;
    }while(!fixed);
    return acc;
}

console.log(partTwo(input));
console.timeEnd();
