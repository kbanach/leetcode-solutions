import { debug, check, c } from './debug_utils.ts';

/**
Rotate Image

https://leetcode.com/explore/interview/card/top-interview-questions-easy/92/array/770/

You are given an `n x n` 2D `matrix` representing an image, rotate the image by **90** degrees (clockwise).

You have to rotate the image [**in-place**](https://en.wikipedia.org/wiki/In-place_algorithm), 
which means you have to modify the input 2D matrix directly. **DO NOT** allocate another 2D matrix and do the rotation.

Example 1:
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]

Example 2:
Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]

**Constraints:**
- `n == matrix.length == matrix[i].length`
- `1 <= n <= 20`
- `-1000 <= matrix[i][j] <= 1000`
 */

/**
 Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix: number[][]): void {
    // what should happen:
    // 1 2 3     7 4 1
    // 4 5 6  => 8 5 2
    // 7 8 9     9 6 3
    //
    // [0,0] [0,1] [0,2]
    // [1,0] [1,1] [1,2]
    // [2,0] [2,1] [2,2]
    // 
    //  [0,0] -> [0,2]   => [x,y] -> [y,mSize - 1 - x]
    //  [0,1] -> [1,2]
    //  [0,2] -> [2,2]
    //
    //  [1,0] -> [0,1]
    // [1,1] -> [1,1]
    //  [1,2] -> [2,1]
    //
    //  [2,0] -> [0,0] 
    //  [2,1] -> [1,0]
    //  [2,2] -> [2,0]
    //
    //
    // Pairs:
    // #[0,0] -> *[0,2]  &  ?[2,0] -> #[0,0]  &  *[0,2] -> %[2,2]  &  %[2,2] -> ?[2,0]
    // #[0,1] -> *[1,2]  &  ?[1,0] -> #[0,1]  &  *[1,2] -> %[2,1]  &  %[2,1] -> ?[1,0]
    // 
    // # -> *
    // ? -> #
    // * -> %
    // % -> ?

    ///////////////////////////////////////////
    // four pairs
    //
    // a,     b,     c,     d
    // 3x3
    // [0,0]  [0,2]  [2,2]  [2,0] -> rotate
    // [0,1]  [1,2]  [2,1]  [2,0] 
    // ![1,1]  [1,1]  [1,1]  [1,1] // skip 
    //
    // 4x4
    // 0. [0,0]  [0,3]  [3,3]  [3,0] -> rotate
    // 1. [0,1]  [1,3]  [3,2]  [2,0] 
    // 2. [0,2]  [2,3]  [3,1]  [1,0]
    // !inner circle
    // 3. [1,1]  [1,2]  [2,2]  [2,1]
    //
    // i = 0; i < n     j = 0; Math.floor(n/2)
    // a [i,j]  
    // b [j,n]
    // c [n,n-i]
    // d [n-i,j] 


    const maxIdx = matrix.length - 1;
    let a, b, c, d;
    for (let i = 0; i < maxIdx; i++) {
        for (let j = i; j < maxIdx - i; j++) {
            // const aIdx = [i, j];
            // const bIdx = [j, maxIdx - i];
            // const cIdx = [maxIdx - i, maxIdx - j];
            // const dIdx = [maxIdx - j, i]

            // debug(`pairs: [${aIdx}] [${bIdx}] [${cIdx}] [${dIdx}] `);
            // const a = matrix[aIdx[0]][aIdx[1]];
            // const b = matrix[bIdx[0]][bIdx[1]];
            // const c = matrix[cIdx[0]][cIdx[1]];
            // const d = matrix[dIdx[0]][dIdx[1]];

            a = matrix[i][j];
            b = matrix[j][maxIdx - i];
            c = matrix[maxIdx - i][maxIdx - j];
            d = matrix[maxIdx - j][i];

            matrix[i][j] = d;
            matrix[j][maxIdx - i] = a;
            matrix[maxIdx - i][maxIdx - j] = b;
            matrix[maxIdx - j][i] = c;
        }
        debug();

    }
    console.table(matrix);
};


const testExamples: [number[][], number[][]][] = [
    // [ input, expected ]
    [
        [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
        [[7, 4, 1], [8, 5, 2], [9, 6, 3]],
    ],
    [
        [[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]],
        [[15, 13, 2, 5], [14, 3, 4, 1], [12, 6, 8, 9], [16, 7, 10, 11]]
    ],

    [
        [
            [1, 2, 3, 4, 5, 6],
            [7, 8, 9, 10, 11, 12],
            [13, 14, 15, 16, 17, 18],
            [19, 20, 21, 22, 23, 24],
            [25, 26, 27, 28, 29, 30],
            [31, 32, 33, 34, 35, 36],
        ],
        [
            [31, 25, 19, 13, 7, 1],
            [32, 26, 20, 14, 8, 2],
            [33, 27, 21, 15, 9, 3],
            [34, 28, 22, 16, 10, 4],
            [35, 29, 23, 17, 11, 5],
            [36, 30, 24, 18, 12, 6],
        ],
    ]
];

// check(testExamples, isValidSudoku);
check(testExamples, rotate);
