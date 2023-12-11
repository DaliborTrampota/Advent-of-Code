const fs = require('fs');
let input = fs.readFileSync('./Day2/input.txt', {encoding: 'utf-8'}).split('\r\n')
    .map(l => {
        let [game, sets] = l.split(': ')
        let id = game.match(/(\d+)/)[1]
        return {
            id,
            sets: sets.split('; ').map(s => s.split(/, ?/).map(s => ({ color: s.split(' ')[1], amount: Number(s.split(' ')[0]) })))
        }
    })
    
console.time();


function partOne(games, cubeLimit){
    let sum = 0
    game:
    for(let game of games) {
        for(let s of game.sets) {
            for(let cube of s) {
                if(cubeLimit[cube.color] < cube.amount) {
                    continue game;
                }

            }
        }
        sum += Number(game.id)
    }
    return sum
}


function partTwo(games){
    let power = 0
    for(let game of games) {
        let cubeLimit = {}
        for(let s of game.sets) {
            for(let cube of s) {
                if((cubeLimit[cube.color] ?? 0) < cube.amount) {
                    cubeLimit[cube.color] = cube.amount
                }

            }
        }
        power += Object.values(cubeLimit).reduce((acc, t) => acc *= t, 1)
    }
    return power
}


console.log(partOne(input, { red: 12, green: 13, blue: 14 }))
console.log(partTwo(input))

console.timeEnd()