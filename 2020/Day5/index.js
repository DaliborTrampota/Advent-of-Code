const fs = require('fs');
let input = fs.readFileSync('./Day5/input.txt', {encoding: 'utf-8'}).split('\r\n')

console.time();


function partOne(input, rowDigits){
    let highestSeatID = 0;
    for(let i of input){
        let row = i.slice(0, rowDigits);
        let column = i.slice(rowDigits, i.length);

        row = row.replace(/F/g, 0).replace(/B/g, 1)
        column = column.replace(/L/g, 0).replace(/R/g, 1)

        row = parseInt(row, 2);
        column = parseInt(column, 2);
        let seatID = row * 8 + column;
        if(seatID > highestSeatID)
            highestSeatID = seatID

        //64 32 16 8 4 2 1
        //F  B  F  B B F F
        //0  1  0  1 1 0 0
        //44
    }
    return highestSeatID;
}

function partTwo(input, rowDigits){
    let seats = [];
    
    const maxRows = Math.pow(2, rowDigits);
    const maxColumns = Math.pow(2, input[0].length - rowDigits);
    
    let maxSeats = maxRows * maxColumns;
    console.log(maxSeats)
    for(let i of input){
        let row = i.slice(0, rowDigits);
        let column = i.slice(rowDigits, i.length);

        row = row.replace(/F/g, 0).replace(/B/g, 1)
        column = column.replace(/L/g, 0).replace(/R/g, 1)

        row = parseInt(row, 2);
        column = parseInt(column, 2);
        let seatID = row * 8 + column;
        seats.push(seatID);
    }
    seats.sort((a, b) => a - b);

    for(let i = 1; i < seats.length; i++){
        let seat = seats[i];
        let prevSeat = seats[i - 1];
        let nextSeat = seats[i + 1];
        if(prevSeat + 1 == seat && nextSeat - 1 == seat)
            continue
        return seat + 1;
    }
}

console.log(partTwo(input, 7))
console.timeEnd()