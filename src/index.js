const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routers');
const { getConnection } = require('./config/database');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Setup cors
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", process.env.URL_REACT);
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PUT,DELETE,OPTIONS,PATCH"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Setup routes
routes(app);

// Connect to database and start server
(async () => {
    try {
        const conn = await getConnection();
        console.log("Database connected!");
    } catch (err) {
        console.error("Error connecting to database: ", err);
        return;
    }

    app.listen(PORT, () => {
        console.log("Server is running on port: ", PORT);
    });
})();