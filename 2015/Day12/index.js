let input = require('./input.json')


console.time();



function partOne(input){
    const getValues = (object) => {
        let sum = 0
        for(let key in object) {
            const val = object[key]
            switch(typeof val) {
                case 'number':
                    sum += val
                    break
                case 'object':
                    sum += getValues(val)
                    break
            }
        }
        return sum
    }
    if(Array.isArray(input)) input = { 'a': input }
    return getValues(input)
}


function partTwo(input){
    const getValues = (object, ignoreRed = true) => {
        let sum = 0
        for(let key in object) {
            const val = object[key]
            if(val == 'red' && ignoreRed) return 0
            switch(typeof val) {
                case 'number':
                    sum += val
                    break
                case 'object':
                    sum += getValues(val, !Array.isArray(val))
                    break
            }
        }
        return sum
    }
    if(Array.isArray(input)) input = { 'a': input }
    return getValues(input)
}

console.log(partOne(input))
console.log(partTwo(input))

console.timeEnd()