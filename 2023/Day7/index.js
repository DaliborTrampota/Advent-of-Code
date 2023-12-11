const fs = require('fs');
let input = fs.readFileSync('./Day7/input.txt', {encoding: 'utf-8'}).split('\r\n').map(l => l.split(/ +/))

console.time();

let order = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
function getType(hand) {
    hand = hand.split('')//.sort((a, b) => order.indexOf(b) - order.indexOf(a))
    let cards = {}
    for(let c of hand) {
        cards[c] ??= 0
        cards[c]++
    }
    if(Object.keys(cards).length == 1) return 'FIVE'
    
    console.log(cards)
}

function partOne(input){
    console.log(input)

    for(let [hand, bid] of input) {
        let type = getType(hand)
    }
}


function partTwo(input){
    
}


console.log(partOne(input))
console.log(partTwo(input))

console.timeEnd()