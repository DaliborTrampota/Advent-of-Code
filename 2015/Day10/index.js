const fs = require('fs');
let input = '3113322113'

console.time();


function countSequence(str, idx) {
    let same = 0
    for(let i = idx; i < str.length; i++) {
        if(str[i] == str[idx]) same++
        else break
    }
    return same
}

function partOne(seq, len){
    
    for(let i = 0; i < len; i++) {
        let newSeq = ''
        for(let idx = 0; idx < seq.length; ) {
            let n = countSequence(seq, idx)
            //console.log(n, seq, idx)
            newSeq += n + seq[idx]
            idx += n
        }
        seq = newSeq
    }
    return seq.length
}


console.log(partOne(input, 40))
console.log(partOne(input, 50))

console.timeEnd()