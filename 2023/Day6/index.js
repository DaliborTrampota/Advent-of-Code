const fs = require('fs');
let input = fs.readFileSync('./Day6/input.txt', {encoding: 'utf-8'}).split('\r\n').map(l => l.match(/\d+/g))
let races = []

for(let i = 0; i < input[0].length; i++) {
    races.push({
        time: Number(input[0][i]),
        dist: Number(input[1][i])
    })
}

    
console.time();

function partOne(input){

    let total = 1
    for(let r of input) {
        let win = 0
        let dist = 0
        let speed = 0
        
        for(let ms = 0; ms < r.time; ms++) {
            speed = ms
            dist = (r.time - ms) * speed

            if(dist > r.dist) win++

        }
        total *= win
    }
    return total
}


function partTwo(input){
    let race = input.reduce((acc, r) => {
        acc.time += r.time
        acc.dist += r.dist
        return acc
    }, { time: '', dist: '' })

    race.time = Number(race.time)
    race.dist = Number(race.dist)
    return partOne([race])
}


console.log(partOne(races))
console.log(partTwo(races))

console.timeEnd()