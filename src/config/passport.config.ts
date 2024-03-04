import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import Auth from '../model/auth.model';
import { comparePassword } from '../shared/helper/hash-password';
import { Res } from '../shared/helper/api';
import { Request, Response, NextFunction } from 'express';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

passport.serializeUser((user: any, done) => {
    done(null, user.email);
});

passport.deserializeUser(async (email: string, done) => {
    try {
        const user = await Auth.findOne({ email });
        done(null, user);
    } catch (error) {
        done(error);
    }
});

passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            const user = await Auth.findOne({ email });
            if (!user) {
                return done(null, false, { message: 'Email not found' });
            }

            const passwordMatch = await comparePassword(user.password, password);

            if (!passwordMatch) {
                return done(null, false, { message: 'Incorrect password' });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);

export const loginMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (err, user, info) => {
        if (user) {
            req.logIn(user, (loginErr) => {
                if (loginErr) {
                    return next(loginErr);
                }
                return next();
            });
        } else {
            Res.unauthorized(req, res, info.message);
        }
    })(req, res, next);
};




// jwt token middleware
export const JwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'server-secret-key',
};

passport.use(
    new JwtStrategy(JwtOptions, async (jwt_payload, done) => {
        try {
            const user = await Auth.findById(jwt_payload.id);

            if (!user) {
                return done(null, false);
            }

            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    })
);

export const jwtMiddleWare = passport.authenticate('jwt', { session: false });