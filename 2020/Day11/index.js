const fs = require('fs');
let input = fs.readFileSync('./Day11/input.txt', {encoding: 'utf-8'}).split('\r\n')
//took 2h
console.time();

function partOne(input){

    let width = input[0].length;

    let map = input.join('').split('');
    let occupiedSeats = 0;
    let iteration;

    do{
        iteration = simulatePartOne(map, width);
        map = iteration.newMap;
    }while(iteration.changedSeats != 0)

    console.log(map)
    occupiedSeats = map.reduce((acc, field) => field == '#' ? acc+=1 : acc, 0)

    return occupiedSeats
}

function partTwo(input){

    let width = input[0].length;

    let map = input.join('').split('');
    let occupiedSeats = 0;
    let iteration;

    
    do{
        iteration = simulatePartTwo(map, width);
        map = iteration.newMap;
        //console.log(drawMap(map, width))
    }while(iteration.changedSeats != 0)
    occupiedSeats = map.reduce((acc, field) => field == '#' ? acc+=1 : acc, 0)

    return occupiedSeats
}

//console.log(partOne(input));
console.log(partTwo(input));
console.timeEnd();


function simulatePartOne(map, width){
    let newMap = Array.from(map);
    let changedSeats = 0;

    for(let i = 0; i < map.length; i++){
        let neighbours = getNeighbours(map, i, width);
        if(map[i] == '.')
            continue

        let occupied = map[i] == '#' ? true : false;
        if(!occupied && neighbours == 0){
            newMap[i] = '#';
            changedSeats++;
        }
        if(occupied && neighbours >= 4){
            newMap[i] = 'L'
            changedSeats++;
        }
    }

    return { newMap, changedSeats };
}

function simulatePartTwo(map, width){
    let newMap = Array.from(map);
    let changedSeats = 0;

    for(let i = 0; i < map.length; i++){
        let visibleSeats = getVisibleSeats(map, i, width);
        
        if(map[i] == '.')
            continue

        let occupied = map[i] == '#' ? true : false;
        if(!occupied && visibleSeats == 0){
            newMap[i] = '#';
            changedSeats++;
        }
        if(occupied && visibleSeats >= 5){
            newMap[i] = 'L'
            changedSeats++;
        }
    }

    return { newMap, changedSeats };
}

function getNeighbours(map, tileIdx, width){
    let neighbours = 0;

    for(let i = tileIdx - width - 1; i < tileIdx + width; i += width){
        for(let j = 0; j < 3; j++){
            let x = tileIdx % width;
            if(i + j == tileIdx)//check if its the middle field
                continue;

            if(i + j < 0 || i + j >= map.length) //check if index we are checking is out of bounds on top or bottom
                continue;

            if(x + j - 1 >= width || x + j - 1 < 0)//check if index we are checking is out of bounds on right or left
                continue;

            if(map[i + j] == '#')
                neighbours++;
        }
    }

    return neighbours;
}

function getVisibleSeats(map, tileIdx, width){
    let visibleSeats = 0;
    let directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    /*
       -1,-1 -1,0 -1,1
        0,-1  0,0  0,1
        1,-1  1,0  1,1
    */
    for(let dir of directions){
        let xDiff = yDiff = 0
        let x = tileIdx % width;
        while(true){
            xDiff += dir[0]
            yDiff += dir[1] * width
            
            if(tileIdx + xDiff + yDiff >= map.length || tileIdx + xDiff + yDiff < 0)
                break;

            if(x + xDiff >= width || x + xDiff < 0)
                break;
            
            if(map[tileIdx + xDiff + yDiff] == '#'){
                visibleSeats++;
                break;
            }else if(map[tileIdx + xDiff + yDiff] == 'L')
                break;

        }
    }

    return visibleSeats;
}

function drawMap(map, width){
    return map.join('').match(new RegExp(`.{1,${width}}`, 'g')).join('\n')
}