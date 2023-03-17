import morgan, {StreamOptions} from "morgan";
import { logger } from "../200-util/logger";

//
// Creates a Morgan middleware layer that logs requests/responses within
// Express.
//


// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream: StreamOptions = {
    // Use the http severity
    write: (message) => logger.http(message)
};


// Skip all the Morgan http log if the
// application is not running in development mode.
// This method is not really needed here since
// we already told to the logger that it should print
// only warning and error messages in production.
function shouldSkip() {
    const env = process.env.NODE_ENV || "development";
    // Skip if not in development mode.
    // In other words, log when in development mode.
    return env !== "development";
}

// Build the Morgan middleware
export const morganMiddleware = morgan(
    // Define message format string (this is the default one).
    // The message format is made from tokens, and each token is
    // defined inside the Morgan library.
    // You can create your custom token to show what do you want from a request.
    ":method :url :status :res[content-length] - :response-time ms",
    { stream, skip: shouldSkip }
);
