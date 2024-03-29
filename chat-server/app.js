const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const helmet = require("helmet");
const mongosanitize = require("express-mongo-sanitize");
const bodyparser = require("body-parser");
const xss = require("xss");
const app = express();
const cors = require("cors");
const routes = require("./routes/index");
app.use(
  cors({
    origin: "*",
    methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
    Credentials: true,
  })
);
app.use(express.json({ limit: "10kb" }));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 3000,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this API, Please try again in an hour",
});

app.use("/tawk", limiter);

app.use(express.urlencoded({ extended: true }));

// app.use(mongosanitize());
// app.use(xss());

// routing
app.use(routes);

module.exports = app;

// http://localhost:3000/v1/auth/login
