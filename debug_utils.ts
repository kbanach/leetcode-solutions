import { isArray, styleText } from 'node:util';
import { performance } from 'node:perf_hooks';
import { ListNode, debugGraph, stringifyGraph, stringifyNode } from './linkedLists_utils.ts';

function startMeasuringPerformance(): void {
    performance.clearMeasures();
    performance.mark('mark_function_start');
}

function stopMeasuringPerformance(): void {
    performance.mark('mark_function_end');
}

function logPerformanceResults(): void {
    const perfResults = performance.measure(
        'measure_func_perf',
        'mark_function_start',
        'mark_function_end'
    );
    const runTimeMs = perfResults.duration;

    console.log(`Run took:\t${c(' ' + (runTimeMs.toFixed(4) + 'ms '), ['bgGray'])}`)
}

function toStr(a: any): string {
    if (a instanceof ListNode) return stringifyNode(a);

    if (Array.isArray(a)) return a.map(toStr).join(',');

    switch (typeof a) {
        case 'string':
            return a;

        case 'number':
        case 'bigint':
        case 'boolean':
            return String(a);

        case 'object':
            return JSON.stringify(a);

        case 'symbol':
        case 'undefined':
        case 'function':
        default:
            throw new Error(`Trying to stringify element of type "${typeof a}"`);
    }
}

function isEqual(a: any, b: any): boolean {
    if (typeof a !== typeof b) return false;

    if (typeof a === 'boolean' && typeof b === 'boolean') {
        return a === b;
    }

    if (typeof a === 'string' && typeof b === 'string') {
        return a === b;
    }

    if (typeof a === 'number' && typeof b === 'number') {
        return a === b;
    }

    if (typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        if (a.map(toStr).join(',') !== b.map(toStr).join(',')) return false;

        return true;
    }

    if (a instanceof ListNode && b instanceof ListNode) {
        return isEqual(stringifyGraph(a), stringifyGraph(b));
    }

    throw new Error(`Unhandled types: A of type "${typeof a}" or B of type "${typeof b}"`);
}

export function debug(...log: any[]) {
    let s = [...log];
    console.log(s.join('\t'));
}

export function check(testExamples: any[], testedFn: Function): void {
    for (let test of testExamples) {
        const expected = test[test.length - 1];
        const [...inputs] = test.slice(0, -1);

        if (inputs[0] instanceof Array) {
            console.log('Input:');
            inputs.forEach((e: any) => {
                if (e instanceof Array) {
                    console.table(e)
                } else {
                    console.log(toStr(e));
                }
            });
        } else {
            console.log(`Input:     \t${inputs}`);
        }

        startMeasuringPerformance();
        const returnValue = testedFn(...inputs);
        stopMeasuringPerformance();
        logPerformanceResults();

        // some methods change 'in-place' the input
        const output = typeof returnValue !== 'undefined' ? returnValue : test[0];

        // if (String(output) !== String(expected)) {
        if (isEqual(output, expected)) {
            console.log(`Received: \t${output}`, c('\t OK! ', ['bgGreen', 'white']));
        } else {
            console.log(`${c(' ! ', ['bgRed', 'white'])} Expected:   \t${expected} \tgot: ${c('' + output, ['bgRed', 'white'])}`);
        }
        console.log('\n');
    }
}


export function checkGraphs(graphsOnlyTestExamples: any[], testedFn: Function): void {
    let moreThanOne = false;

    for (let test of graphsOnlyTestExamples) {
        if (moreThanOne) {
            console.log([...Array(process.stdout.columns - 2)].map(() => '\u2550').join(''));
        }

        const expected = test[test.length - 1];
        const [...inputs] = test.slice(0, -1);

        console.log(`Input:`);
        inputs.forEach((e: any) => {
            if (e instanceof ListNode) {
                debugGraph(e);
            } else {
                console.log(toStr(e));
            }
        });

        startMeasuringPerformance();
        const returnValue = testedFn(...inputs);
        stopMeasuringPerformance();
        logPerformanceResults();

        // some methods change 'in-place' the input
        const actualOutput = typeof returnValue !== 'undefined' ? returnValue : test[0];

        if (isEqual(expected, actualOutput)) {
            // all fine
            if (actualOutput instanceof ListNode) {
                console.log(`Received: ${c('\t OK! ', ['bgGreen', 'white'])}`);
                debugGraph(actualOutput);
            } else {
                // make it as small as possible
                console.log(`Received: ${c('\t OK! ', ['bgGreen', 'white'])}`, toStr(actualOutput));
            }
        } else {
            // expected and received are different
            console.log(`${c(' ! ', ['bgRed', 'white'])} Expected: ${toStr(expected)}`);

            if (actualOutput instanceof ListNode) {
                console.log(c(' Received: ', ['bgRed', 'white']));
                console.table(stringifyGraph(actualOutput));
            } else {
                console.log(c(` Received: \t${toStr(actualOutput)}`, ['bgRed', 'white']));
            }
        }

        moreThanOne = true;
    }
}

export function color(str: any, colors: string[] = []) {
    return styleText(colors, str);
}

export const c = color;
