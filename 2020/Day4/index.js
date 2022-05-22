const fs = require('fs');
let input = fs.readFileSync('./Day4/input.txt', {encoding: 'utf-8'}).split('\r\n')//separate passports by empty line

console.time();

function partOne(input, neededFields){
    let valid = 0;
    for(let i of input){
        let fields = i.split(/ |\r\n/).map(f => f.slice(0, 3));

        if(neededFields.every(f => fields.includes(f)))
            valid++;
    }
    return valid;
}

function partTwo(input, neededFields){
    let valid = 0;
    for(let i of input){
        let fields = i.split(/ |\r\n/)//.map(f => f.split(':'));
        fields = fields.reduce((acc, f) => {
            let pair = f.split(':');
            acc[pair[0]] = pair[1]
            return acc
        }, {})

        if(isFieldValid(fields, neededFields))
            valid++;
    }
    return valid;
}

console.log(partTwo(input, ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']))//'cid' not needed
console.timeEnd()

function isFieldValid(field, neededFields){
    for(let f of neededFields)
        if(!field.hasOwnProperty(f))
            return false;

    if(field['byr'] < 1920 || field['byr'] > 2002)
        return false;
        
    if(field['iyr'] < 2010 || field['iyr'] > 2020)
        return false;
        
    if(field['eyr'] < 2020 || field['eyr'] > 2030)
        return false;
        
    let hgt = field['hgt']
    let res = hgt.match(/(\d+)(in|cm)/);
    if(!res)
        return false;

    let val = res[1];
    let units = res[2];
    if(units == 'cm' && (val < 150 || val > 193))
        return false;

    if(units == 'in' && (val < 59 || val > 76))
        return false;

    if(field['hcl'].charAt(0) != '#' || !isValidHex(field['hcl'].slice(1)))
        return false;

    const eyeColours = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
    if(!eyeColours.includes(field['ecl']))
        return false;

    if(isNaN(field['pid']) || field['pid'].length != 9)
        return false;

    return true;
}

function isValidHex(str){
    if(str.length > 6)
        return false;
    let chars = '1234567890abcdef';
    str = str.split('')
    if(str.some(ch => !chars.includes(ch)))
        return false;
    return true;
}