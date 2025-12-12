import { styleText } from 'node:util';
import { ListNode, debugGraph, stringifyGraph } from './graph_utils.ts';

export function debug(...log: any[]) {
    let s = [...log];
    console.log(s.join('\t'));
}

export function check(testExamples: any[], testedFn: Function): void {
    for (let test of testExamples) {
        const expected = test[test.length - 1];
        const [...inputs] = test.slice(0, -1);

        if (inputs[0] instanceof Array) {
            console.log(`## START ##\nInput:`);
            inputs.forEach((e) => {
                if (e instanceof Array) {
                    console.table(e)
                } else {
                    console.log(JSON.stringify(e));
                }
            });
            console.log(`## END ##\n`);
        } else {
            console.log(`Input:     \t${inputs}`);
        }
        const returnValue = testedFn(...inputs);

        // some methods change 'in-place' the input
        const output = typeof returnValue !== 'undefined' ? returnValue : test[0];

        if (String(output) !== String(expected)) {
            console.log(`${c(' ! ', ['bgRed', 'white'])} Expected:   \t${expected} \tgot: ${c('' + output, ['bgRed', 'white'])}`);
        } else {
            console.log(`Received: \t${output}`, c('\t OK! ', ['bgGreen', 'white']));
        }
        console.log('\n');
    }
}

export function checkGraphs(graphsOnlyTestExamples: any[], testedFn: Function): void {
    let moreThanOne = false;

    for (let test of graphsOnlyTestExamples) {
        if (moreThanOne) {
            console.log();
            console.log([...Array(process.stdout.columns - 2)].map(() => '\u2550').join(''));
        }

        const expected = test[test.length - 1];
        const [...inputs] = test.slice(0, -1);

        console.log(`## START ##\nInput:`);
        inputs.forEach((e, idx: number) => {
            if (e instanceof ListNode) {
                debugGraph(e);
            } else {
                console.log(JSON.stringify(e));
            }
        });
        console.log(`## END ##\n`);

        const strOutputGraph = stringifyGraph(expected);

        const returnValue = testedFn(...inputs);
        // some methods change 'in-place' the input
        const output = typeof returnValue !== 'undefined' ? returnValue : test[0];

        if (String(strOutputGraph) !== String(stringifyGraph(output))) {
            console.log(`${c(' ! ', ['bgRed', 'white'])} Expected:`);
            console.table(strOutputGraph);
            console.log(c(' Received: ', ['bgRed', 'white']));
            console.table(stringifyGraph(output));
        } else {
            console.log(`Received: ${c('\t OK! ', ['bgGreen', 'white'])}`)
            debugGraph(output);
        }
        console.log('\n');
        moreThanOne = true;
    }
}

export function color(str: any, colors: string[] = []) {
    return styleText(colors, str);
}

export const c = color;
