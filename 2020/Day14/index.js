const fs = require('fs');
let input = fs.readFileSync('./Day14/input.txt', {encoding: 'utf-8'}).split('\r\n')
//took 20min part one 30min part two
console.time();


function partOne(input){
    let instructions = input.map(ins => ins.split(/\s=\s/));
    let mask = instructions.shift()[1];
    let memory = {};

    for(let ins of instructions){
        if(ins[0] == 'mask'){
            mask = ins[1];
            continue;
        }
        let addr = ins[0].match(/\d+/)[0]
        let dec = Number(ins[1]);
        let bin = decToBin(dec);
        bin = applyMaskToBin(bin, mask);
        dec = binToDec(bin);
        memory[addr] = dec;        
    }
    return Object.values(memory).reduce((acc, dec) => acc += dec, 0)
}




function partTwo(input){
    let instructions = input.map(ins => ins.split(/\s=\s/));
    let mask = instructions.shift()[1];
    let memory = {};

    for(let ins of instructions){
        if(ins[0] == 'mask'){
            mask = ins[1];
            continue;
        }
        let addr = Number(ins[0].match(/\d+/)[0])
        let value = Number(ins[1])
        let bin = decToBin(addr);
        bin = applyMaskToBin(bin, mask, true);
        let addresses = getAllAddresses(bin).map(addr => binToDec(addr));
        for(let address of addresses)
            memory[address] = value;
                  
    }
    return Object.values(memory).reduce((acc, dec) => acc += dec, 0)
}

//console.log(partOne(input));
console.log(partTwo(input));
console.timeEnd();

/**
 * My function (bad)
 * @param {Number} dec 36bit integere - max value 68719476735 
 */
function decimalTo36bitBinary(dec){
    let binary = ''

    let counter = 0;
    while(counter != 36){
        binary = (Math.abs(dec % 2)).toString() + binary
        dec >>= 1
        counter++;
    }
    return binary
}

function decToBin(dec, bits = 36){
    return dec.toString(2).padStart(bits, '0')
}

function binToDec(bin){
    return parseInt(bin, 2)
}

function applyMaskToBin(bin, mask, partTwo){
    let bits = bin.split('');
    let maskBits = mask.split('');

    for(let i = 0; i < 36; i++){
        if((partTwo && maskBits[i] == '0') || (!partTwo && maskBits[i] == 'X'))
            continue;
        bits[i] = maskBits[i];
    }
    return bits.join('');
}

function getAllAddresses(bin){
    bin = bin.split('')
    let Xs = bin.reduce((acc, bit) => bit == 'X' ? acc += 1 : acc, 0);
    let combinations = 2**Xs;
    let addresses = [];
    for(let i = 0; i < combinations; i++){
        let binMask = decToBin(i, Xs).split('');
        let address = bin.join('');
        for(let bit of binMask)
            address = address.replace('X', bit);
        addresses.push(address)
    }

    return addresses
}