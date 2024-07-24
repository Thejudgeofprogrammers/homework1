import multer from 'multer'
import path from 'path';
import { Request } from "express";

type MulterFile = Express.Multer.File;

function dynamicDestination(req: Request, file: MulterFile, cb: CallableFunction): void {
    const dynamicPath = path.join(__dirname, '..', '..', 'public', 'uploads');
    return cb(null, dynamicPath);
};

const storage = multer.diskStorage({
    destination: dynamicDestination,
    filename(req, file, cb) {
        const ext = path.extname(file.originalname);
        file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
        cb(null, `${file.originalname}-${Date.now()}${ext}`);
    }
});

export default multer({ storage });
