import fs from 'fs'
import os from 'os';
import path from 'path'
import { Request, Response, NextFunction } from "express";

const way = path.join(__dirname, '..', '..', '/logs', 'server.log')

const logger = (req: Request, res: Response, next: NextFunction): void => {
    const now = Date.now();
    const { url, method } = req;
    
    const data = `${now} | ${url} | ${method}`;

    fs.appendFile(way, data + os.EOL, (err) => {
        if (err) throw err;
    });
    console.log('\x1b[36m%s\x1b[0m', data);
    next();
};

export { logger };
