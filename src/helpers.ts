import {JSDOM} from 'jsdom'


export const createDocument = (html: string) => new JSDOM(html).window.document

export class Timer {
    start_?: number;
    constructor() {
        this.start();
    }
    start() {
        this.start_ = Date.now();
    }
    end() {
        return Math.floor((Date.now() - this.start_!) / 1000);
    }
}

function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0')
}
export function formatDate(date: Date) {
    return ([date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join('-') +
        ' ' + [padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes()), padTo2Digits(date.getSeconds())].join('-'))
}