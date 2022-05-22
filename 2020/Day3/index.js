const fs = require('fs');
let input = fs.readFileSync('./Day3/input.txt', {encoding: 'utf-8'}).split('\r\n')

console.time();

function calcSlope(input, right, down){
    const sizeX = input[0].length;
    const sizeY = input.length;
    
    let map = input.join('').split('')

    let pos = 0, trees = 0, x = 0;
    for(let i = 0; i < sizeY; i++){
        x += right;
        pos += right
        if(x > sizeX){
            x -= sizeX;
            pos += sizeX * (down - 1)
        }else if(x == sizeX * down)
            x = 0;
        else
            pos += sizeX * down;
        

        if(map[pos] == '#')
            trees++;
    }
    return trees;
}


console.log(calcSlope(input, 3, 1))
console.log(calcSlope(input, 3, 1) * calcSlope(input, 1, 1) * calcSlope(input, 5, 1) * calcSlope(input, 7, 1) * calcSlope(input, 1, 2))
console.timeEnd()
