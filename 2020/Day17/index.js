const fs = require('fs');
const { join } = require('path');
let input = fs.readFileSync('./Day17/input.txt', {encoding: 'utf-8'}).split('\r\n')
//took part one 30min 
console.time();


function partOne(square, cycles){
    square = square.map(row => row.split(''))
    let startWidth = square.length;
    let finalWidth = startWidth + (cycles * 3);//if wrong solution increase the 3

    let dimension = Array.from({ length: finalWidth }, () => Array.from({ length: finalWidth }, () => Array.from({ length: finalWidth }, () => '.')))

    const depth = dimension.length;
    const height = dimension[0].length;
    const width = dimension[0][0].length;

    dimension[Math.floor((finalWidth - 1) / 2)] = copyToMiddle(dimension[Math.floor((finalWidth - 1) / 2)], square);//copy the starting 2D slice into a middle of the 3D dimenson

    while(cycles != 0){
        let dimCopy = deepCopy(dimension);
        for(let z = 0; z < depth; z++){
            //let map = ''
            for(let y = 0; y < height; y++){
                for(let x = 0; x < width; x++){
                    let neighbours = getNeighbours(dimCopy, z, y, x, depth, height, width);
                    let cube = dimCopy[z][y][x];

                    if(cube == '#' && neighbours < 2 || neighbours > 3)
                        cube = '.';
                    else if(cube == '.' && neighbours == 3)
                        cube = '#';

                    dimension[z][y][x] = cube
                    //map += cube;
                    
                }
                //map += '\n'
            }
            //console.log('new', map);
        }
        console.log('cycle', cycles)
        cycles--;
    }


    return dimension.map(z => z.map(x => x.join('')).join('')).join('').split('').reduce((count, cube) => cube == '#' ? count += 1 : count, 0)
}
function partTwo(square, cycles){//4D
    square = square.map(row => row.split(''))
    let startWidth = square.length;
    let finalWidth = startWidth + (cycles * 3);//if wrong solution increase the 3

    let dimension = Array.from({ length: finalWidth }, () => Array.from({ length: finalWidth }, () => Array.from({ length: finalWidth }, () => Array.from({ length: finalWidth }, () => '.'))))

    const depth = dimension.length;
    const height = dimension[0].length;
    const width = dimension[0][0].length;
    const hyperspace = dimension[0][0][0].length;

    dimension[Math.floor((finalWidth - 1) / 2)] = copyToMiddle4D(dimension[Math.floor((finalWidth - 1) / 2)], square);//copy the starting 2D slice into a middle of the 3D dimenson

    while(cycles != 0){
        let dimCopy = deepCopy(dimension);
        for(let z = 0; z < depth; z++){
            for(let y = 0; y < height; y++){
                for(let x = 0; x < width; x++){
                    for(let w = 0; w < hyperspace; w++){
                        let neighbours = getNeighbours4D(dimCopy, z, y, x, w, depth, height, width, hyperspace);
                        let cube = dimCopy[z][y][x][w];

                        if(cube == '#' && neighbours < 2 || neighbours > 3)
                            cube = '.';
                        else if(cube == '.' && neighbours == 3)
                            cube = '#';
                        else
                            continue
                        dimension[z][y][x][w] = cube
                    }                        
                }
            }
        }
        console.log('cycle', cycles)
        cycles--;
    }


    return dimension.flat().flat().flat().reduce((count, cube) => cube == '#' ? count += 1 : count, 0)
}

//console.log(partOne(input, 6));
console.log(partTwo(input, 6));
console.timeEnd();


/**
 * My ugly version
 * @param {*} array 
 * @param {*} source 
 */
function copyToMiddleUgly(array, source){
    if(finalWidth % 2 == 0){
        console.log('here')
        for(let row = (finalWidth / 2) - 1; row < (finalWidth / 2) + startWidth - 1; row++){
            for(let col = (finalWidth / 2) - 1; col < (finalWidth / 2) + startWidth - 1; col++){
                let i = col - (finalWidth / 2) + 1;
                let j = row - (finalWidth / 2) + 1;
                twoD[row][col] = square[i][j]
            }
        }
    }
}

/**
 * https://stackoverflow.com/questions/65422730/copy-2d-array-into-a-middle-of-second-bigger-array Stack overflow my question 
 * @param {*} array 
 * @param {*} source 
 */
function copyToMiddle(array, source){
    
    if(array.length % 2 == 0){
        const midRow = Math.floor((array.length - 1) / 2)
        const midCol = Math.floor((array[0].length - 1) / 2)

        for (let row = 0; row < source.length; row++) {
            for (let col = 0; col < source[0].length; col++) {
                array[row + midRow][col + midCol] = source[row][col];
            }
        }
    }else{
        const midRow = Math.floor((array.length - 1) / 2) - 1;
        const midCol = Math.floor((array[0].length - 1) / 2) - 1;
        for (let row = 0; row < source.length; row++) {
            for (let col = 0; col < source[0].length; col++) {
                array[row + midRow][col + midCol] = source[row][col];
            }
        }
    }
    return array;
}

function copyToMiddle4D(array, source){
    
    if(array.length % 2 == 0){
        const midRow = Math.floor((array.length - 1) / 2)
        const midCol = Math.floor((array[0].length - 1) / 2)
        const midHyper = Math.floor((array[0][0].length - 1) / 2)

        for (let row = 0; row < source.length; row++) {
            for (let col = 0; col < source[0].length; col++) {
                for (let hyper = 0; hyper < source[0][0].length; hyper++) {
                    array[row + midRow][col + midCol][hyper + midHyper] = source[row][col][hyper];
                }
            }
        }
    }else{
        const midRow = Math.floor((array.length - 1) / 2) - 1;
        const midCol = Math.floor((array[0].length - 1) / 2) - 1;
        const midHyper = Math.floor((array[0][0].length - 1) / 2) - 1;
        for (let row = 0; row < source.length; row++) {
            for (let col = 0; col < source[0].length; col++) {
                for (let hyper = 0; hyper < source[0][0].length; hyper++) {
                    array[row + midRow][col + midCol][hyper + midHyper] = source[row][col][hyper];
                }
            }
        }
    }
    return array;
}

function getNeighbours(threeD, zIdx, yIdx, xIdx, depth, height, width){
    let neighbours = 0;
    for(let z = zIdx - 1; z <= zIdx + 1; z++){
        for(let y = yIdx - 1; y <= yIdx + 1; y++){
            for(let x = xIdx - 1; x <= xIdx + 1; x++){
                if(z == zIdx && y == yIdx && x == xIdx)
                    continue;
                if(z >= depth || z < 0 || y >= height || y < 0 || x >= width || x < 0)
                    continue;
                if(threeD[z][y][x] == '#')
                    neighbours++;
            }
        }
    }
    return neighbours;
}

function getNeighbours4D(threeD, zIdx, yIdx, xIdx, wIdx, depth, height, width, hyper){
    let neighbours = 0;
    for(let z = zIdx - 1; z <= zIdx + 1; z++){
        for(let y = yIdx - 1; y <= yIdx + 1; y++){
            for(let x = xIdx - 1; x <= xIdx + 1; x++){
                for(let w = wIdx - 1; w <= wIdx + 1; w++){
                    if(z == zIdx && y == yIdx && x == xIdx && w == wIdx)
                        continue;

                    if(z >= depth || z < 0 || y >= height || y < 0 || x >= width || x < 0 || w >= hyper || w < 0)
                        continue;

                    if(threeD[z][y][x][w] == '#')
                        neighbours++;
                }
            }
        }
    }
    return neighbours;
}

function deepCopy(arr){
    let copy = [];
    arr.forEach(elem => {
        if(Array.isArray(elem)){
            copy.push(deepCopy(elem))
        }else{
            copy.push(elem)
        }
    })
    return copy;
}