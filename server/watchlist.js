let watchlist = [];
let id = 0;

module.exports = {
  create ( req, res ) {
    const { id, title, year, overview } = req.body;
    watchlist.push({ 
      id : id,
      title : title,
      year : year,
      overview : overview
     });
    id++;
    res.status(200).send( watchlist );
    console.log(watchlist);
  },

  read (req, res) {
    res.status(200).send(watchlist)
  },

  update (req, res) {
    const { text } = req.body;
    // console.log('req.body / text + ', text)
    const id = req.params.id;
    const updateYear = req.params.year;

    // const movieIndex = watchlist.findIndex( movie => movie.id == id );
    // const newMovieYear = movie[movieIndex].update
     watchlist = watchlist.map((movie, i) => {
      if (movie.id === id) {
        // console.log('==update===>', i, id, movie.id)
        movie.year = updateYear;
      }
      return movie;
    })
    res.status(200).send( watchlist )
  },

  delete (req, res) {
    const deleteId = req.params.id;
    // console.log('deleteId ' + deleteId)
    const watchlistIndex = watchlist.findIndex( movie => movie.id == req.params.id );
    // console.log('watchlistIndex ' + watchlistIndex)
    if (watchlistIndex !== -1) {
      watchlist.splice(watchlistIndex, 1);
    }
    res.status(200).send(watchlist);
  }
}