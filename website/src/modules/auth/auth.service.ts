import { injectable } from "inversify";
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import * as bcrypt from "bcrypt";
import { User } from "../../models";
import { IUserDTO } from "../../dtos/user";

@injectable()
export class AuthService {
    public async registryUserPost(req: Request, res: Response): Promise<Response | void> {
        const { username, password, email, firstName } = req.body;
        if (!username || !password || !email || !firstName) return res.redirect('/auth/registry');
        try {
            const existingUser = await User.findOne({ username });
            if (existingUser) return res.redirect('/auth/registry');
            
            const newUser: IUserDTO = new User({
                username,
                password: await bcrypt.hash(password, 10),
                firstName,
                emails: [{ value: email }]
            });
            
            await newUser.save();
            return res.redirect('/auth/login');
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Регистрация не удалась" });
        };
    };

    public loginUserPost(req: Request, res: Response, next: NextFunction): void {
        passport.authenticate('local', (err: Error, user: IUserDTO, info: any) => {
            if (err) return next(err);
            if (!user) return res.redirect('/auth/login');
            req.logIn(user, (err) => {
                if (err) return next(err);
                return res.redirect('/api/users/profile');
            });
        })(req, res, next);
    };
};