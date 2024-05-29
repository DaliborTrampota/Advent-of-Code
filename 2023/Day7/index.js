const fs = require('fs');
let input = fs.readFileSync('./Day7/input.txt', {encoding: 'utf-8'}).split('\r\n').map(l => l.split(/ +/))

console.time();

let order = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
let points = ["FIVE", "FOUR", "FULL_HOUSE", "THREE", "TWO_PAIR", "ONE_PAIR", "HIGH"]
//     FIVE: 7,
//     FOUR: 6,
//     FULL_HOUSE: 5,
//     THREE: 4,
//     TWO_PAIR: 3,
//     ONE_PAIR: 2,
//     HIGH: 1
// }

function getType(hand) {
    hand = hand.split('')//.sort((a, b) => order.indexOf(b) - order.indexOf(a))
    let cards = {}
    for(let c of hand) {
        cards[c] ??= 0
        cards[c]++
    }
    let vals = Object.values(cards).sort((a, b) => b - a)
    if(vals[0] == 5) return 'FIVE'
    if(vals[0] == 4) return "FOUR"
    if(vals[0] == 3 && vals[1] == 2) return "FULL_HOUSE"
    if(vals[0] == 3) return "THREE"
    if(vals[0] == 2 && vals[1] == 2) return "TWO_PAIR"
    if(vals[0] == 2) return "ONE_PAIR"
    return "HIGH"
}

function partOne(input){
    let types = {}
    for(let [hand, bid] of input) {
        let type = getType(hand)
        types[type] ??= []
        types[type].push({ hand, bid })
    }

    for(let type in types) {
        types[type].sort((h1, h2) => {
            for(let i = 0; i < h1.hand.length; i++) {
                if(h1.hand[i] != h2.hand[i])
                    return order.indexOf(h2.hand[i]) - order.indexOf(h1.hand[i])
            }
            return 0
        })
    }
    let rank = 1
    let winnings = 0
    for(let type of points.reverse()) {
        if(!types[type]) continue
        for(let { hand, bid } of types[type]) {
            winnings += bid*rank
            rank++
        }
    }
    return winnings
}


function partTwo(input){
    
}


console.log(partOne(input))
console.log(partTwo(input))

console.timeEnd()