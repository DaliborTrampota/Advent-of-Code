const fs = require('fs');
let input = fs.readFileSync('./Day16/input.txt', {encoding: 'utf-8'}).split('\r\n\r\n')
//took part one 30min 
console.time();


function partOne(input){
    let rules = input.shift().split('\r\n').map(rule => rule.split(': ')[1]);
    input.shift()//my ticket not needed for part one
    let otherTickets = input.shift().split('\r\n').map(ticket => ticket.split(',').map(Number)).slice(1).flat();

    let ranges = rules.map(rule => rule.split(' or ').map(range => range.split('-').map(Number))).flat()
    ranges = combineRanges(ranges);
    
    let errorRate = 0;
    ticket:
    for(let ticket of otherTickets){
        let rangeFail = 0
        for(let range of ranges){
            if(ticket < range[0] || ticket > range[1])
                rangeFail++;
            else
                continue ticket;
        }
        if(rangeFail == ranges.length)
            errorRate += ticket
    }
    return errorRate;
}

/*
function partTwo(input){
    
    let rules = input.shift().split('\r\n')
    let myTicket = input.shift().split('\r\n')[1].split(',');
    let otherTickets = input.shift().split('\r\n').map(ticket => ticket.split(',').map(Number)).slice(1)

    let ranges = rules.map(rule => {
        let temp = rule.split(': ');
        let ranges = temp[1].split(' or ').map(range => range.split('-').map(Number));
        return { field: temp[0], range: ranges };
    })
    console.log(ranges)
    


    //let combinedRanges = combineRanges(ranges.flat());
    //let combo = filterInvalidTicketsCombined(otherTickets, combinedRanges);
    let validTickets = filterInvalidTickets(otherTickets, ranges.map(r => r.range));
    //console.log(validTickets.length, combo.length)

    let rangeIndex = -1
    let foundColIndexes = [];
    range:
    while(rangeIndex != ranges.length - 1){
        let colIndex = -1;
        rangeIndex++;
        column:
        while(true){
            colIndex++;
            if(foundColIndexes.includes(colIndex))
                continue column;
            //console.log(colIndex)
            let i = 0;
            ticket:
            for(let ticket of validTickets){
                //console.log(ticket, ranges[rangeIndex])
                for(let range of ranges[rangeIndex].range){
                    //console.log(range, ticket[colIndex], colIndex)
                    if(ticket[colIndex] >= range[0] && ticket[colIndex] <= range[1]){
                        //console.log(`Column ${colIndex} passed ${i}`)
                        i++
                        continue ticket;
                    }//next range
                }
                if(!ticket[colIndex])
                    continue range;
                
                console.log(`Column ${colIndex} did not pass ${i}`,ticket[colIndex], ranges[rangeIndex].range)
                continue column;
            }
            //console.log('passed')
            //console.log(passedCount, ranges[i], myTicket[i])
            myTicket[colIndex] = { value: Number(myTicket[colIndex]), field: ranges[rangeIndex].field };
            foundColIndexes.push(colIndex);
            ranges.splice(rangeIndex, 1)
            rangeIndex--;
            break;
        }
        console.log(rangeIndex, ranges.length)
        //console.log(myTicket)
    }

    
    console.log(myTicket)

    return myTicket.reduce((acc, ticketObj) => {
        if(typeof ticketObj != 'object')
            return acc;
        if(ticketObj.field.includes('departure'))
            acc *= BigInt(ticketObj.value);

        return acc;
    }, 1n)
}*/

function partTwoFirstAttempt(input){
    let rules = input.shift().split('\r\n')
    let myTicket = input.shift().split('\r\n')[1].split(',');
    let otherTickets = input.shift().split('\r\n').map(ticket => ticket.split(',').map(Number)).slice(1)

    rules = rules.map(rule => {
        let temp = rule.split(': ');
        let ranges = temp[1].split(' or ').map(range => range.split('-').map(Number));
        return { field: temp[0], range: ranges };
    })
    console.log(rules)
    


    //let combinedRanges = combineRanges(ranges.flat());
    //let combo = filterInvalidTicketsCombined(otherTickets, combinedRanges);
    let validTickets = filterInvalidTickets(otherTickets, rules.map(r => r.range));
    //console.log(validTickets.length, combo.length)

    let rangeIndex = -1;
    let i = 0
    let foundColIndexes = [];
    range:
    while(rangeIndex != ranges.length - 1){
        let colIndex = -1;
        rangeIndex++;
        column:
        while(true){
            colIndex++;
            if(foundColIndexes.includes(colIndex))
                continue column;
                
            ticket:
            for(let ticket of validTickets){
                for(let range of ranges[rangeIndex].range){
                    if(ticket[colIndex] >= range[0] && ticket[colIndex] <= range[1]){
                        continue ticket;
                    }//next range
                }
                if(!ticket[colIndex]){
                    continue range;
                }
                
                //console.log(`Column ${colIndex} did not pass ${i}`,ticket[colIndex], ranges[rangeIndex].range)
                continue column;
            }
            myTicket[colIndex] = { value: Number(myTicket[colIndex]), field: ranges[rangeIndex].field };
            foundColIndexes.push(colIndex);
            //ranges.splice(rangeIndex, 1)
            //rangeIndex--;
            break;
        }
        if(rangeIndex == ranges.length - 1 && i < 4){
            i++
            rangeIndex = -1;
        }
        //console.log(rangeIndex, ranges.length)
        //console.log(myTicket)
    }
}
function partTwo(input){
    
    let rules = input.shift().split('\r\n')
    let myTicket = input.shift().split('\r\n')[1].split(',');
    let otherTickets = input.shift().split('\r\n').map(ticket => ticket.split(',').map(Number)).slice(1)

    rules = rules.map(rule => {
        let temp = rule.split(': ');
        let ranges = temp[1].split(' or ').map(range => range.split('-').map(Number));
        return { field: temp[0], range: ranges };
    })

    console.log(rules)
    let validTickets = filterInvalidTickets(otherTickets, rules.map(r => r.range));

    //assigns possible fields to all possible columns
    let columns = {};
    let columnCount = myTicket.length;
    for(let rule of rules){
        column:
        for(let col = 0; col < columnCount; col++){
            ticket:
            for(let ticket of validTickets){
                for(let range of rule.range){
                    if(ticket[col] >= range[0] && ticket[col] <= range[1])
                        continue ticket;
                }
                continue column;
            }
            if(columns.hasOwnProperty(col))
                columns[col].fields.push(rule.field);
            else
                columns[col] = {value: Number(myTicket[col]), fields: [rule.field]}
        }
    }

    
    //finds the field with only one field then replaces it in myTicket and repeats until solved
    for(let i of Object.keys(columns)){
        let entries = Object.entries(columns);
        for(let [key, obj] of entries){
            if(obj.fields.length == 1){
                myTicket[key] = { value: obj.value, field: obj.fields[0] };
                delete columns[key];
                removeFieldsFromOtherColumns(obj.fields[0], columns)
            }
        }
    }
    return myTicket.reduce((acc, ticketObj) => {
        if(ticketObj.field.includes('departure'))
            acc *= BigInt(ticketObj.value);

        return acc;
    }, 1n)
}

//console.log(partOne(input));
console.log(partTwo(input));
console.timeEnd();

function combineRanges(ranges){
    ranges.sort((a, b) => a[0] - b[0])
    let combineRanges = [];
    let curRange = ranges[0];
    for(let i = 0; i < ranges.length - 1; i++){
        //console.log(curRange, ranges[i + 1])
        if(ranges[i + 1][0] >= curRange[0] && ranges[i + 1][0] - 1 <= curRange[1]){
            curRange[1] = ranges[i + 1][1];
            continue;
        }

        combineRanges.push(curRange);
        curRange = ranges[i + 1];
    }
    combineRanges.push(curRange)
    return combineRanges
}

/**
 * 
 * @param {Array} tickets Array of other tickets
 * @param {Array} ranges Array of separate ranges
 */
function filterInvalidTickets(tickets, ranges){
    let validTickets = [];
    for(let ticket of tickets){
        let isValid = true;
        field:
        for(let field of ticket){
            let rangeFail = 0
            for(let range of ranges){
                if(field < range[0][0] || field > range[0][1] && field < range[1][0] || field > range[1][1])
                    rangeFail++;
                else
                    continue field;
            }
            if(rangeFail == ranges.length){
                isValid = false;
                break;
            }
        }
        if(isValid)
            validTickets.push(ticket)
    }
    return validTickets
}

function removeFieldsFromOtherColumns(field, columns){
    let keys = Object.keys(columns)
    for(let key of keys){
        columns[key] = { value: columns[key].value, fields: columns[key].fields.filter(f => f != field) };
    }
}

/**
 * 
 * @param {Array} tickets Array of other tickets
 * @param {Array} ranges Array of combined ranges 
 */
function filterInvalidTicketsCombined(tickets, ranges){
    let validTickets = [];
    for(let ticket of tickets){
        let isValid = true;
        field:
        for(let field of ticket){
            let rangeFail = 0
            for(let range of ranges){
                if(field < range[0] || field > range[1])
                    rangeFail++;
                else
                    continue field;
            }
            if(rangeFail == ranges.length){
                isValid = false;
                break;
            }
        }
        if(isValid)
            validTickets.push(ticket)
    }
    return validTickets
}