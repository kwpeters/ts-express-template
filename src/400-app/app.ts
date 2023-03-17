import * as path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import { router as indexRouter } from "./routes/index";
import { router as usersRouter } from "./routes/users";
import { morganMiddleware } from "./morganMiddleware";

export const app = express();

app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../assets")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
