const  http = require("http")
const  dotenv = require("dotenv")
const getMovies = require("./method/get-req.js")
const postMovie = require("./method/post-req.js")
const putMovie = require("./method/put-req.js")
const deleteMovie = require("./method/delete-req.js")
const fs = require("fs");



dotenv.config()

const PORT = process.env.PORT || 3000
let movies = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/api/movies") {
        getMovies(req, res, movies);
    } else if (req.method === "POST" && req.url === "/api/movies") {
        postMovie(req, res, movies);
    } else if (req.method === "PUT" && req.url.startsWith("/api/movies/")) {
        putMovie(req, res, movies);
    } else if (req.method === "DELETE" && req.url.startsWith("/api/movies/")) {
        deleteMovie(req, res, movies);
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
      }


})

server.listen(PORT, () => {
    console.log(`server listening on port : ${PORT}`)
})