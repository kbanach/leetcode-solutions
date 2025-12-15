/**
 * https://leetcode.com/explore/interview/card/top-interview-questions-easy/92/array/564/
 *  
 * Best Time to Buy and Sell Stock II
 * 
 * You are given an integer array prices where prices[i] is the price of a given stock on the ith day.
 * On each day, you may decide to buy and/or sell the stock. You can only hold at most one share 
 * of the stock at any time. However, you can sell and buy the stock multiple times on the same day, 
 * ensuring you never hold more than one share of the stock.
 * Find and return the maximum profit you can achieve.
 * 
 * Example 1:
 * Input: prices = [7,1,5,3,6,4]
 * Output: 7
 * Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
 * Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
 * Total profit is 4 + 3 = 7.
 * 
 * Example 2:
 * Input: prices = [1,2,3,4,5]
 * Output: 4
 * Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
 * Total profit is 4.
 * 
 * Example 3:
 * Input: prices = [7,6,4,3,1]
 * Output: 0
 * Explanation: There is no way to make a positive profit, so we never buy the stock to achieve the maximum profit of 0.
 * 
 * Constraints:
 * 1 <= prices.length <= 3 * 104
 * 0 <= prices[i] <= 104
 */

let DEBUG = false;

function debug(log: string) {
    if (DEBUG) {
        console.log('\t' + log);
    }
}

function maxProfit(prices: number[]): number {
    // 1. znalezc ciagi rosnace, np.:
    //    [7,1,5,3,6,4] -> [1,5] [3,6]
    //    [1,2,3,4,5] -> [1, 2, 3, 4, 5]

    const risingPrices: number[][] = []; // [ [minIdx, maxIdx], [minIdx, maxIdx], ...]
    let currentMinIdx = 0;
    let currentMaxIdx = -1;

    for (let i = 1; i < prices.length; i++) {
        const FELL = -1;
        const NO_CHANGE = 0;
        const RISEN = 1;

        let priceChange = NO_CHANGE;

        if (prices[i] < prices[i - 1]) {
            debug(`price fell - ( ${prices[i]} < ${prices[i - 1]} )`);
            priceChange = FELL;
        } else if (prices[i] == prices[i - 1]) {
            debug(`min price didn't change - ( ${prices[i]} == ${prices[i - 1]} )`);
            priceChange = NO_CHANGE;
        } else if (prices[i] > prices[i - 1]) {
            debug(`price risen - (${prices[i]} > ${prices[i - 1]})`);
            priceChange = RISEN;
        } else {
            debug(' something went terribly wrong ');
        }

        if (currentMinIdx < currentMaxIdx && priceChange == FELL) {
            debug(`push [${[currentMinIdx, currentMaxIdx]}] to risingPrices`);
            risingPrices.push([currentMinIdx, currentMaxIdx]);

            debug(`assign currentMinIdx to "${i}"`);
            currentMinIdx = i;
        } else if (currentMinIdx < currentMaxIdx && priceChange == RISEN) {

            debug(`assign currentMaxIdx to "${i}"`);
            currentMaxIdx = i;
        } else if (currentMinIdx > currentMaxIdx && priceChange == FELL) {
            debug(`currentMinIdx > currentMaxIdx && priceChange == FELL`)

            debug(`assign currentMinIdx to "${i}"`);
            currentMinIdx = i;

        } else if (currentMinIdx > currentMaxIdx && priceChange == RISEN) {
            debug(`currentMinIdx > currentMaxIdx && priceChange == RISEN`)

            debug(`assign currentMaxIdx to "${i}"`);
            currentMaxIdx = i;
        }

        debug(`END # \t i: ${i}\t currentMinIdx: ${currentMinIdx}\t currentMaxIdx: ${currentMaxIdx}\n`)
    }

    if (currentMinIdx < currentMaxIdx) {
        debug(`push [${[currentMinIdx, currentMaxIdx]}] to risingPrices`);
        risingPrices.push([currentMinIdx, currentMaxIdx]);
    }

    debug(`rising prices: ${JSON.stringify(risingPrices)}`);

    let maxProfit = 0;

    for (let minMaxPair of risingPrices) {
        const [minIdx, maxIdx] = minMaxPair;

        maxProfit += prices[maxIdx] - prices[minIdx];
    }

    return maxProfit;
};

const testExamples: [number[], number][] = [
    // [ input, output ]
    [[7, 1, 5, 3, 6, 4], 7],
    [[1, 2, 3, 4, 5], 4],
    [ [7,6,4,3,1],   0 ]
];

DEBUG = false;

for (let test of testExamples) {
    console.log(`For input: \t${test[0]}`);
    console.log(`Expects:   \t${test[1]}`);
    console.log(`Gets:      \t${maxProfit(test[0])}`);
    console.log('\n\n');
}