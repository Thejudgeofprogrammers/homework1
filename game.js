#!/usr/bin/env node
const readlines = require('readline');
const rd = Math.floor(Math.random()*100);
const { stdin: input, stdout: output } = require('node:process');
const rl = readlines.Interface({input, output});

rl.on('line', (line) => {
  if (line == rd) {
    console.log('Вы угадали');
    rl.close()
  };
  if (line > rd) console.log('Меньше');
  if (line < rd) console.log('Больше');
});
