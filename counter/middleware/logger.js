const logger = (req, res, next) => {
    const now = Date.now();
    const { url, method } = req;
    
    const data = `${now} | ${url} | ${method}`;

    console.log('\x1b[36m%s\x1b[0m', data);
    next();
};

module.exports = { logger };