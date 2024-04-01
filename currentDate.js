#!/usr/bin/env node
const yargs = require( "yargs/yargs" );
const {hideBin} = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

function getTime(isAdding) {
    let now = new Date()
    // --year -y ...
    let { year = 0, month = 0, date = 0, y = 0, m = 0, d = 0 } = argv;

    year = parseInt(year);
    month = parseInt(month);
    date = parseInt(date);

    if (isAdding) {
        now.setFullYear(now.getFullYear() + year + y);
        now.setMonth(now.getMonth() + month + m);
        now.setDate(now.getDate() + date + d);
    } else {
        now.setFullYear(now.getFullYear() - year - y);
        now.setMonth(now.getMonth() - month - m);
        now.setDate(now.getDate() - date - d);
    }

    return now;
};

const command = argv._[0];

if (!command) {

    function isKey(long, short) {
        return argv.hasOwnProperty(long) || argv.hasOwnProperty(short);
    };
    const now = new Date();

    if (process.argv.length === 2) console.log(now);

    if (isKey('year', "y")) console.log(`Текущий год: ${now.getFullYear()}`);
    if (isKey('month', "m")) console.log(`Текущий месяц: ${now.getMonth() + 1}`);
    if (isKey('date', "d")) console.log(`Текущий день: ${now.getDate()}`);

} else if (command === 'add') {
    console.log(getTime(true));
} else if (command === 'sub') {
    console.log(getTime(false));
} else {
    console.log('Неизвестная команда');
};
