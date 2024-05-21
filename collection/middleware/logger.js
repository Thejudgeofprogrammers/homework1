// const fs = require('fs');
// const os = require('os');
// const path = require('path');
// const way = path.join(__dirname, '../logs', 'server.log')

// module.exports = (req, res, next) => {
//   const now = Date.now();
//   const { url, method } = req;
  
//   const data = `${now} | ${url} | ${method}`;

//   fs.appendFile(way, data + os.EOL, (err) => {
//     if (err) throw err;
//   });
//   console.log('\x1b[36m%s\x1b[0m', data);
//   next();
// };