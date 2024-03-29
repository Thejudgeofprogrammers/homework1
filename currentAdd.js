#!/usr/bin/env node
const yargs = require( "yargs/yargs" );
const {hideBin} = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

// Проверка на аргументы
function isKey(long, short) {
  return argv.hasOwnProperty(long) || argv.hasOwnProperty(short);
};
const now = new Date()

if (process.argv.length === 2) console.log(now);

if (isKey('year', "y")) console.log(`Текущий год: ${now.getFullYear()}`);

if (isKey('month', "m")) console.log(`Текущий месяц: ${now.getMonth() + 1}`);

if (isKey('date', "d")) console.log(`Текущий день: ${now.getDate()}`);
