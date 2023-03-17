import * as path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import cors, {CorsOptions} from "cors";
import { router as indexRouter } from "./routes/index";
import { router as usersRouter } from "./routes/users";
import { morganMiddleware } from "./morganMiddleware";

export const app = express();


const whitelist = ["http://example1.com", "http://example2.com"];

const corsOptions: CorsOptions = {
    origin: function (origin, callback) {

        // Don't block REST tools or server-to-server requests.
        const allow = !origin;

        if (allow || whitelist.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
};
const corsMiddleware = cors(corsOptions);

// To allow pre-flight requests associated with "complex" (DELETE requests and
// requests with custom headers), add an OPTIONS handler to all routes.
app.options("*", corsMiddleware);
app.use(corsMiddleware);

app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../assets")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
