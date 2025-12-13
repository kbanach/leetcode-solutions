import { debug, c } from './debug_utils.ts';

export class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}

function getLinkedListExample(length: number = 10, offset: number = 0): ListNode {
    const root = new ListNode(0 + offset);
    let currentNode = root;

    for (let i = 1; i < length; i++) {
        currentNode.next = new ListNode(i + offset);
        currentNode = currentNode.next;
    }

    return root;
}

export const exampleList = getLinkedListExample;

function createLinkedListFromArray(values: ListNode['val'][]): ListNode {
    const root = new ListNode(values[0]);
    let currentNode = root;

    for (let i = 1; i < values.length; i++) {
        currentNode.next = new ListNode(values[i]);
        currentNode = currentNode.next;
    }

    return root;
}

export const arrToList = createLinkedListFromArray;

export function reverseLinkedList(root: ListNode | null): ListNode | null {
    if (!root) return null;

    let prevNode: ListNode | null = null;
    let currentNode: ListNode | null = root;

    while (currentNode && currentNode?.next) {
        const nextNode: ListNode = currentNode.next;

        currentNode.next = prevNode;
        prevNode = currentNode;
        currentNode = nextNode;
    }

    currentNode.next = prevNode;

    return currentNode;
}

export function getNodeByIdx(root: ListNode, idx: number): ListNode | null {
    let currentNode: ListNode | null = root;
    let i = 0;

    while (currentNode) {
        if (i === idx) {
            return currentNode;
        }

        i++;
        currentNode = currentNode.next;
    }

    return null;
}

export function deleteNodeByIdx(root: ListNode, idx: number): ListNode {
    let currentNode: ListNode | null = root;
    let i = 0;

    while (currentNode) {
        if (i === idx) {
            currentNode.val = currentNode.next?.val ?? -1;
            currentNode.next = currentNode.next?.next ?? null;
        }

        i++;
        currentNode = currentNode.next;
    }

    return root;
}

export function stringifyNode(node: ListNode | null) {
    if (!node) return 'null';

    return `val: ${node.val}, next: ${node.next ? 'yes' : null}`;
}

export function stringifyGraph(root: ListNode | null): string[] {
    const output = [];
    let currentNode: ListNode | null = root;

    while (currentNode !== null) {
        output.push(stringifyNode(currentNode));
        currentNode = currentNode.next;
    }

    return output;
}

export function debugGraph(root: ListNode | null, onlyOneElement = false) {
    let currentNode: ListNode | null = root;
    let outputStr = '';

    while (currentNode !== null) {
        outputStr += c(' ' + currentNode.val + ' ', ['bgBlue']) + ((currentNode.next && !onlyOneElement) ? ' -> ' : '');
        currentNode = currentNode.next;

        if (onlyOneElement) break;
    }

    debug(outputStr);
}