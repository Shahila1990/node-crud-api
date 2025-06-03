const fs = require("fs");
const path = require("path");

function deleteMovie(req, res, movies) {
    const id = req.url.split("/")[3]; // extract movie id from URL
    const index = movies.findIndex(movie => movie.id === id);

    if (index !== -1) {
        const deleted = movies.splice(index, 1);
        fs.writeFileSync(path.join(__dirname, "../data/movies.json"), JSON.stringify(movies, null, 2));
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Movie deleted", deleted }));
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Movie not found" }));
    }
}

module.exports = deleteMovie;