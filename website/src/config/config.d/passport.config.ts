import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../../models/User';
import { IUserDTO } from '../../dtos/user';

passport.use(new LocalStrategy(
    async (username: string, password: string, done) => {
        try {
            const user: IUserDTO | null = await User.findOne({ username });
            if (!user) return done(null, false, { message: 'Некорректное имя' });
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return done(null, false, { message: 'Некорректный пароль' });
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

passport.serializeUser((user: IUserDTO, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user: IUserDTO | null = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    };
});

export default passport;
