import * as express from "express";
import * as path from "path";
import redisClient from "./redisClient";
import mongoClient from "./mongoClient";
import authRoute from "./auth";
import passport  from "./passportJwt";
import { ensureUserExists } from "./mongoose_schemas/user";

redisClient.connect();
mongoClient.connect();

const app = express();
const port = parseInt(process.env.PORT) || process.argv[3] || 8080;

app.use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs");

const   bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use( passport .initialize());
app.use( ensureUserExists );
app.use("/auth", authRoute);
app.use("/protected", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  passport.authenticate("jwt", { session: false }, (err, user, info, status) => {
    if (!user || err) return res.status(403).json({ "msg": info });
    res.locals.user = user;
    next();
  })(req,
     res,
    next) ;
});

app.get("/"   , async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.json({ "msg": "Hello 1" });
});

app.get("/api", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.json({ "msg": "Hello 2" });
});

app.get("/protected/profile", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.json({ "msg":"Profile", "data":res.locals.user });
});

// app.get("/save-user", async (req, res) => {
//   const instance = new User();
//   instance.username = "test";
//   instance.password = "test";
//   await instance.save();
//   res.json({ "msg": await User.find({}) });
// });

// app.get("/load-user", async (req, res) => {
//   res.json({ "msg": await User.find({}) });
// });

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
