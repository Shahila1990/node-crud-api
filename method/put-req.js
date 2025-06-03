const fs = require("fs");
const path = require("path");

function putMovie(req, res, movies) {
    const id = req.url.split("/")[3]; // extract movie id from URL

    let body = "";
    req.on("data", chunk => {
        body += chunk.toString();
    });

    req.on("end", () => {
        const updatedData = JSON.parse(body);
        const index = movies.findIndex(movie => movie.id === id);

        if (index !== -1) {
            movies[index] = { ...movies[index], ...updatedData };

            fs.writeFileSync(path.join(__dirname, "../data/movies.json"), JSON.stringify(movies, null, 2));
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(movies[index]));
        } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Movie not found" }));
        }
    });
}

module.exports = putMovie;