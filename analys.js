#!/usr/bin/env node
const fs = require('fs');
const argv = process.argv.slice(2)[0];

let moreGame = 0 // колличество игр
let morewin // кол-во побед

fs.access(argv, fs.constants.F_OK, (err) => {
  if (err) {
    console.error('Создайте файл, чтобы чтение было возможно');
    return;
  }
  fs.readFile(argv, 'utf-8', (err, data) => {
    const content = JSON.parse(data);
    content.forEach(element => moreGame++);
    morewin = content.filter((win) => win.resbool == true).length;
  
    console.log(`\n  Количество игр: ${moreGame}`);
    console.log(`  Количество побед: ${morewin}`);
    console.log(`  Количество поражений: ${moreGame - morewin}`);
    console.log(`  Процентное соотношение побед: ${(morewin/moreGame) * 100}%`)
  });
});