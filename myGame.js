#!/usr/bin/env node
const fs = require('fs');

const readLines = require('readline');
const { stdin: input, stdout: output } = require('node:process');
const rl = readLines.Interface({input, output});
const argv = process.argv.slice(2)[0];

const randomInt = Math.floor(Math.random() * 2 ) + 1;

console.log('\nПрограмма загодала Орёл или решку?\nВыберите:\n  Орёл --> 1\n  Решка --> 2');

// Функция переводит значение 1 или 2 в Орёл или решку
function transfer(tr1) {
  if (tr1 == 1) return 'Орёл'
  if (tr1 == 2) return 'Решка'
};

// Функция создаёт файл если он отсутствует
function createFileJson(text, boolean) {
  fs.access(argv, fs.constants.F_OK, (err) => {
  if (err) {
    fs.writeFile(argv, '', (err) => {
      if (err) console.error(err);
      appendContent(text, boolean);
    });
    } else {
      appendContent(text, boolean);
    }
  })
}
// Функция добавляет в существующий файл json информацию об игре
function appendContent(text, boolean) {
  let content = {
  "date": new Date().toISOString(),
  "result": text,
  "resbool": boolean
};  
  fs.readFile(argv, 'utf-8', (err, data) => {
    if (err) {
      console.error('Ошибка чтения', err);
      return;
    };
    let contentArray = [];
    try {
      if (data.trim() !== '') contentArray = JSON.parse(data); // удаление пробелов
    } catch (err) {
      console.error('Ошибка записи в JSON', err);
      return;
    }
    contentArray.push(content);
    fs.writeFile(argv, JSON.stringify(contentArray, null, 2) + '\n', 'utf8', (err) => {
      if (err) {
        console.error('Ошибка добавления', err);
        return;
      }
    });
  });
}
// Исходы игры
rl.on('line', (line) => {
  if (line == randomInt) {
      console.log(`Вы выиграли! Это был(а) ${transfer(randomInt)}`);
      createFileJson(`Пользователь выбрал ${transfer(line)} и выиграл`, true);
      rl.close();
  } else if (line != randomInt && line != 1 && line != 2) {
      console.log('Некорректное значение');
      rl.close();
  } else {
      console.log(`Вы проиграли! Это был(а) ${transfer(randomInt)}`);
      createFileJson(`Пользователь выбрал ${transfer(line)} и проиграл`, false);
      rl.close();
  };
});