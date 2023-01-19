import session from "express-session";
import MongoStore from "connect-mongo";

export default function sessionMiddleware(req:any, res:any, next:any) {
  const mongoStore = MongoStore.create({
    client: req.dbClient,
    stringify: false,
  });
  return session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
  })(req, res, next);
}