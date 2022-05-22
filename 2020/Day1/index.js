const fs = require('fs');
let input = fs.readFileSync('./Day1/input.txt', {encoding: 'utf-8'}).split('\n').map(num => parseInt(num))

console.time();

function partOne(input){
    for(let i of input)
        for(let j of input)
            if(i + j == 2020)
                return i * j;
}
function partTwo(input){
    for(let i of input)
        for(let j of input)
            for(let k of input)
                if(i + j + k == 2020)
                    return i * j * k;
}
console.log(partOne(input))
console.timeEnd()