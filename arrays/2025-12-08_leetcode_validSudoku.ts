import { debug, check, c } from '../debug_utils.ts';

/**
 * Two Sum
 * 
 * https://leetcode.com/explore/interview/card/top-interview-questions-easy/92/array/769/
 * 
 * Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:
 * 
 * Each row must contain the digits 1-9 without repetition.
 * Each column must contain the digits 1-9 without repetition.
 * Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
 * Note:
 * 
 * A Sudoku board (partially filled) could be valid but is not necessarily solvable.
 * Only the filled cells need to be validated according to the mentioned rules.
 *  
 * 
 * Example 1:
 * Input: board = 
 * [["5","3",".",".","7",".",".",".","."]
 * ,["6",".",".","1","9","5",".",".","."]
 * ,[".","9","8",".",".",".",".","6","."]
 * ,["8",".",".",".","6",".",".",".","3"]
 * ,["4",".",".","8",".","3",".",".","1"]
 * ,["7",".",".",".","2",".",".",".","6"]
 * ,[".","6",".",".",".",".","2","8","."]
 * ,[".",".",".","4","1","9",".",".","5"]
 * ,[".",".",".",".","8",".",".","7","9"]]
 * Output: true
 * Example 2:
 * 
 * Input: board = 
 * [["8","3",".",".","7",".",".",".","."]
 * ,["6",".",".","1","9","5",".",".","."]
 * ,[".","9","8",".",".",".",".","6","."]
 * ,["8",".",".",".","6",".",".",".","3"]
 * ,["4",".",".","8",".","3",".",".","1"]
 * ,["7",".",".",".","2",".",".",".","6"]
 * ,[".","6",".",".",".",".","2","8","."]
 * ,[".",".",".","4","1","9",".",".","5"]
 * ,[".",".",".",".","8",".",".","7","9"]]
 * Output: false
 * Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.
 *  
 */

function getFullRow(sudoku: string[][], row: number): string[] {
    return sudoku[row];
}

function getFullColumn(sudoku: string[][], column: number): string[] {
    const colValues = [];

    for (let i = 0; i < 9; i++) {
        colValues.push(sudoku[i][column]);
    }

    return colValues;
}

function getFull9Field(sudoku: string[][], nineFieldIdx: number): string[] {
    // nine fields idx are counted from top-left to right-bottom (0-8)
    // 0, 1, 2
    // 3, 4, 5
    // 6, 7, 8
    const startRow = Math.floor(nineFieldIdx / 3) * 3;
    const startCol = (nineFieldIdx % 3) * 3;

    const nineFieldValues = [];

    let indexes = '';

    for (let i = 0; i < 3; i++) {
        nineFieldValues.push(sudoku[startRow + i][startCol]);
        nineFieldValues.push(sudoku[startRow + i][startCol + 1]);
        nineFieldValues.push(sudoku[startRow + i][startCol + 2]);

        indexes += `[${startRow + i}, ${startCol}], [${startRow + i}, ${startCol + 1}], [${startRow + i}, ${startCol + 2}], `
    }

    debug(c('[ ' + indexes + ' ]', ['bgRed']));

    return nineFieldValues;
}

function debugPrintRow(sudoku: string[][], row: number): void {
    const rowValues = getFullRow(sudoku, row);
    debug(c(' ' + rowValues.join(' | ') + ' ', ['bgBlue', 'white']));
}

function debugPrintCol(sudoku: string[][], col: number): void {
    const colValues = getFullColumn(sudoku, col);
    debug(colValues.map(v => c(' ' + v + ' ', ['bgGreen', 'white'])).join('\n' + c('---', ['bgGreen', 'white']) + '\n'));
}

function debugPrint9Fields(sudoku: string[][], nineFieldIdx: number): void {
    const nineFieldValues = getFull9Field(sudoku, nineFieldIdx);

    for (let i = 0; i < 3; i++) {
        const row = `${nineFieldValues[i * 3]} ${nineFieldValues[i * 3 + 1]} ${nineFieldValues[i * 3 + 2]}`;
        debug(c(' ' + row + ' ', ['bgRed', 'white']));
    }
    debug();
}

function debugSudoku(sudoku: string[][]): void {
    const all9Fields = [
        getFull9Field(sudoku, 0),
        getFull9Field(sudoku, 1),
        getFull9Field(sudoku, 2),

        getFull9Field(sudoku, 3),
        getFull9Field(sudoku, 4),
        getFull9Field(sudoku, 5),

        getFull9Field(sudoku, 6),
        getFull9Field(sudoku, 7),
        getFull9Field(sudoku, 8),
    ];

    // print: (all9Fields - a)
    // a[0][0] a[0][1] a[0][2]  |  a[1][0] a[1][1] a[1][2]  |  a[2][0] a[2][1] a[2][2]  \n
    // a[0][3] a[0][4] a[0][5]  |  a[1][3] a[1][4] a[1][5]  |  a[2][3] a[2][4] a[2][5]  \n
    // a[0][6] a[0][7] a[0][8]  |  a[1][6] a[1][7] a[1][8]  |  a[2][6] a[2][7] a[2][8]  \n
    // ------+-------+------- \n
    // a[3][0] a[3][1] a[3][2]  |  a[4][0] a[4][1] a[4][2]  |  a[5][0] a[5][1] a[5][2]  \n
    // a[3][3] a[3][4] a[3][5]  |  a[4][3] a[4][4] a[4][5]  |  a[5][3] a[5][4] a[5][5]  \n
    // a[3][6] a[3][7] a[3][8]  |  a[4][6] a[4][7] a[4][8]  |  a[5][6] a[5][7] a[5][8]  \n
    // ------+-------+------- \n
    // a[6][0] a[6][1] a[6][2]  |  a[7][0] a[7][1] a[7][2]  |  a[8][0] a[8][1] a[8][2]  \n
    // a[6][0] a[6][4] a[6][5]  |  a[7][3] a[7][4] a[7][5]  |  a[8][3] a[8][4] a[8][5]  \n
    // a[6][6] a[6][7] a[6][8]  |  a[7][6] a[7][7] a[7][8]  |  a[8][6] a[8][7] a[8][8]  \n

    for (let rowNr = 0; rowNr < 9; rowNr++) {
        let rowStr = ``;
        for (let i = 0; i < 9; i++) {
            const x = Math.floor(rowNr / 3) * 3 + Math.floor(i / 3);
            const y = i % 3 + (rowNr % 3) * 3;

            rowStr += all9Fields[x][y] + ' ';

            if (i == 2 || i == 5) {
                rowStr += '| '
            }
        }

        debug(rowStr);

        if (rowNr == 2 || rowNr == 5) {
            debug('------+-------+-------');
        }
    }

}

function checkNineOrLess(packOfNine: string[]): boolean {
    const checklist = new Set<number>();
    let sum = 45 // 9 +8 +7 +6 +5 +4 +3 +2 +1 

    for (let i = 0; i < packOfNine.length; i++) {
        const current = Number(packOfNine[i]);
        if (isNaN(current)) continue;
        sum -= current;
        if (sum < 0 || checklist.has(current)) {
            return false;
        }

        checklist.add(current);
    }

    return true;
}

function isValidSudoku(board: string[][]): boolean {
    for (let i = 0; i < 9; i++) {
        if (!checkNineOrLess(getFullRow(board, i))) return false;
        if (!checkNineOrLess(getFullColumn(board, i))) return false;
        if (!checkNineOrLess(getFull9Field(board, i))) return false;
    }

    return true;
};

const partsIndexes = [
    [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2],],
    [[0, 3], [0, 4], [0, 5], [1, 3], [1, 4], [1, 5], [2, 3], [2, 4], [2, 5],],
    [[0, 6], [0, 7], [0, 8], [1, 6], [1, 7], [1, 8], [2, 6], [2, 7], [2, 8],],
    [[3, 0], [3, 1], [3, 2], [4, 0], [4, 1], [4, 2], [5, 0], [5, 1], [5, 2],],
    [[3, 3], [3, 4], [3, 5], [4, 3], [4, 4], [4, 5], [5, 3], [5, 4], [5, 5],],
    [[3, 6], [3, 7], [3, 8], [4, 6], [4, 7], [4, 8], [5, 6], [5, 7], [5, 8],],
    [[6, 0], [6, 1], [6, 2], [7, 0], [7, 1], [7, 2], [8, 0], [8, 1], [8, 2],],
    [[6, 3], [6, 4], [6, 5], [7, 3], [7, 4], [7, 5], [8, 3], [8, 4], [8, 5],],
    [[6, 6], [6, 7], [6, 8], [7, 6], [7, 7], [7, 8], [8, 6], [8, 7], [8, 8],]
]

function FASTER_isValidSudoku(board: string[][]): boolean {
    for (let i = 0; i < 9; i++) {
        if (!checkNineOrLess(board[i])) return false;
        if (!checkNineOrLess(board.map(row => row[i]))) return false;

        const partIdx = partsIndexes[i];
        const part = Array(9);
        for (let j = 0; j < 9; j++) {
            const [x, y] = partIdx[j];
            part[j] = board[x][y];

            debug(`x: ${x} y: ${y}`);
        }

        if (!checkNineOrLess(part)) return false;
    }

    return true;
}

const testExamples: [string[][], boolean][] = [
    [
        [["5", "3", ".", ".", "7", ".", ".", ".", "."]
            , ["6", ".", ".", "1", "9", "5", ".", ".", "."]
            , [".", "9", "8", ".", ".", ".", ".", "6", "."]
            , ["8", ".", ".", ".", "6", ".", ".", ".", "3"]
            , ["4", ".", ".", "8", ".", "3", ".", ".", "1"]
            , ["7", ".", ".", ".", "2", ".", ".", ".", "6"]
            , [".", "6", ".", ".", ".", ".", "2", "8", "."]
            , [".", ".", ".", "4", "1", "9", ".", ".", "5"]
            , [".", ".", ".", ".", "8", ".", ".", "7", "9"]],
        true
    ],
    [
        [["8", "3", ".", ".", "7", ".", ".", ".", "."]
            , ["6", ".", ".", "1", "9", "5", ".", ".", "."]
            , [".", "9", "8", ".", ".", ".", ".", "6", "."]
            , ["8", ".", ".", ".", "6", ".", ".", ".", "3"]
            , ["4", ".", ".", "8", ".", "3", ".", ".", "1"]
            , ["7", ".", ".", ".", "2", ".", ".", ".", "6"]
            , [".", "6", ".", ".", ".", ".", "2", "8", "."]
            , [".", ".", ".", "4", "1", "9", ".", ".", "5"]
            , [".", ".", ".", ".", "8", ".", ".", "7", "9"]],
        false
    ],
    [
        [[".", ".", ".", ".", "5", ".", ".", "1", "."],
        [".", "4", ".", "3", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", "3", ".", ".", "1"],
        ["8", ".", ".", ".", ".", ".", ".", "2", "."],
        [".", ".", "2", ".", "7", ".", ".", ".", "."],
        [".", "1", "5", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", "2", ".", ".", "."],
        [".", "2", ".", "9", ".", ".", ".", ".", "."],
        [".", ".", "4", ".", ".", ".", ".", ".", "."]],
        false
    ]
];

check(testExamples, FASTER_isValidSudoku);
