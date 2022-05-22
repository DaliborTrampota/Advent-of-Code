const fs = require('fs');
let input = fs.readFileSync('./Day2/input.txt', {encoding: 'utf-8'}).split('\r\n')

console.time();

function partOne(input){
    let validPasswords = 0;
    for(let i of input){
        let args = i.split(' ');
        let min = args[0];
        let max = args[2];
        let letter = args[3].charAt(0);
        let pass = args[4];
        
        let count = 0;
        for(let char of pass)
            if(char == letter)
                count++;
        
        if(count >= min && count <= max)
            validPasswords++;
    }
    return validPasswords;
}

function partTwo(input){
    let validPasswords = 0;
    for(let i of input){
        let args = i.split(' ');
        let pos1 = args[0];
        let pos2 = args[2];
        let letter = args[3].charAt(0);
        let pass = args[4];
        
        if(pass.charAt(pos1 - 1) == letter && pass.charAt(pos2 - 1) != letter)
            validPasswords++;
        else if(pass.charAt(pos1 - 1) != letter && pass.charAt(pos2 - 1) == letter)
            validPasswords++;

    }
    return validPasswords;
}

console.log(partOne(input))
console.timeEnd()