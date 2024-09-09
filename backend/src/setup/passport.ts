import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "Invalid email or password." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Invalid email or password." });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

interface JwtPayload {
  id: string;
  email: string;
}

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET as string,
    },
    (payload: JwtPayload, done: (error: any, user?: any) => void) => {
      try {
        return done(null, payload);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

export default passport;
