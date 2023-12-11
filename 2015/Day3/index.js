const fs = require('fs');
let input = fs.readFileSync('./Day3/input.txt', {encoding: 'utf-8'}).split('')

console.time();


function partOne(input){
    let pos = {x: 0, y:0, toString: function(){ return `${this.x}_${this.y}`}}
    let visited = {
        [pos.toString()]: 1
    }
    for(let dir of input){
        switch(dir) {
            case '^':
                pos.y++
                break
            case 'v':
                pos.y--
                break
            case '>':
                pos.x++
                break
            case '<':
                pos.x--
                break
        }
        
        visited[pos.toString()] = 1
    }

    return Object.keys(visited).length
}
function partTwo(input){
    let posS = {x: 0, y:0, toString: function(){ return `${this.x}_${this.y}`}}
    let posR = {x: 0, y:0, toString: function(){ return `${this.x}_${this.y}`}}
    let visited = {
        [posS.toString()]: 1,
        [posR.toString()]: 1,
    }
    for(let i in input){
        i = Number(i)
        let pos = i%2 == 0 ? posS : posR
        switch(input[i]) {
            case '^':
                pos.y++
                break
            case 'v':
                pos.y--
                break
            case '>':
                pos.x++
                break
            case '<':
                pos.x--
                break
        }
        
        visited[pos.toString()] = 1
    }

    return Object.keys(visited).length
}
console.log(partOne(input))
console.log(partTwo(input))
console.timeEnd()