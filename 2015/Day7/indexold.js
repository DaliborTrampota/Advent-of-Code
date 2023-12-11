const fs = require('fs');

const instruction = ['OR', 'AND', 'RSHIFT', 'LSHIFT', 'NOT']
let input = fs.readFileSync('./Day7/input.txt', {encoding: 'utf-8'}).split('\r\n')
    .map(r => r.split(' '))
    .map(tok => ({ 
        target: tok.at(-1), 
        instruction: tok.find(t => instruction.includes(t)), 
        wires: tok.slice(0, -2).filter(t => !instruction.includes(t) && isNaN(t)), 
        value: Number(tok.find(v => !isNaN(v))) 
    }))

console.time();

function simulate16bit(val) {
    let rem = val % 65535
if(val < 0) console.log(val, res)
    return rem
}

function partOne(input){
    let wires = {}
    // console.log(input)
    for(let { target, instruction, wires: sources, value } of input) {
        if(!instruction && value) {
            wires[target] = value
            continue
        }
        switch(instruction) {
            case 'AND':
                wires[target] = wires[sources[0]] & wires[sources[1]]
                break
            case 'OR':
                wires[target] = wires[sources[0]] | wires[sources[1]]
                break
            case 'RSHIFT':
                //console.log(wires[sources[0]], value, wires[sources[0]] >>> value)
                wires[target] = wires[sources[0]] >>> value
                break
            case 'LSHIFT':
                //console.log(wires[sources[0]], value, wires[sources[0]] << value)
                wires[target] = wires[sources[0]] << value
                break
            case 'NOT':
                wires[target] = res
                break
            default:
                wires[target] = wires[sources[0]]
                break
        }
        if(isNaN(wires[target])) console.log(target, instruction, sources, value)
        //wires[target] = simulate16bit(wires[target])
    }
    console.log(wires)
    return wires['a']
}


function partTwo(input){
    
}

console.log(partOne(input))
console.log(partTwo(input))

console.timeEnd()