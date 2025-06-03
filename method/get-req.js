module.exports = function getMovies(req, res, movies) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(movies));
  };