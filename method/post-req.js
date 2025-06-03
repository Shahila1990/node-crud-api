const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

module.exports = function postMovie(req, res, movies) {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", () => {
        const newMovie = JSON.parse(body);
        newMovie.id = uuidv4();
        movies.push(newMovie);
        fs.writeFileSync(
            path.join(__dirname, "../data/movies.json"),
            JSON.stringify(movies, null, 2)
        );
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newMovie));
    });
};