#!/usr/bin/env node
require('dotenv').config();
const { myAPIKey } = require('./config');
const http = require('http');
// const myAPIKey = process.env.myAPIKey;
const query = process.argv.slice(2).join(' ');
const url = `http://api.weatherstack.com/current?access_key=${myAPIKey}&query=${query}&units=m`;

http.get(url, (res) => {
    const {statusCode} = res;
    if (statusCode !== 200){
        console.log('Ошибка');
        return;
    }
    res.setEncoding('utf8')
    let rowData = ''
    res.on('data', (chunk) => rowData += chunk);
    res.on('end', () => {
        let parseData = JSON.parse(rowData);
        console.log(parseData);
    });
}).on('error', (err) => {
    console.error(err);
});