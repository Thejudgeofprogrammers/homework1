#!/usr/bin/env node
const yargs = require( "yargs/yargs" );
const {hideBin} = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;


function addTime() {
  let now = new Date()

  // --year -y ...
  let { year = 0, month = 0, date = 0, y = 0, m = 0, d = 0 } = argv;

  year = parseInt(year);
  month = parseInt(month);
  date = parseInt(date);

  // Время сейчас + время в аргументе
  now.setFullYear(now.getFullYear() + year + y);
  now.setMonth(now.getMonth() + month + m);
  now.setDate(now.getDate() + date + d);

  return now;
};

console.log(addTime())
