import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Search from './Search'
import ShowMovies from './ShowMovies'
import DivWatchlist from './DivWatchlist' 

class App extends Component {
  constructor(){
    super();
    this.state = {
      titleInput: '',
      yearInput: '',
      updateYearInput: '',
      year: '',
      movies: [],
      watchlist: []
    }
    this.setMovies = this.setMovies.bind(this);
    this.getMovies = this.getMovies.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.addMovieToWatchList = this.addMovieToWatchList.bind(this)
    this.removeMovieFromWatchList = this.removeMovieFromWatchList.bind(this)
    this.handleUpdateYear = this.handleUpdateYear.bind(this)
    this.updateYear = this.updateYear.bind(this)
  }

  setMovies(moviesArr) {
    this.setState({movies: moviesArr})
  }

  getMovies() {
    const endpoint = `https://api.themoviedb.org/3/search/movie?api_key=dc92a65fbd5a560369627cfd87fc0670&query=${this.state.titleInput}`
    console.log('endpoint -> ', endpoint)
    console.log('title -> ', this.state.titleInput)

    axios.get(endpoint).then((resp) => {
      console.log("Hihi" , resp.data)

      this.setState({movies: resp.data.results});
        }).catch(err => {
      console.log(err)
    })
  }

  handleTitleChange(event) {
    console.log("titlechange>>>>", event.target.value)
    this.setState({ titleInput: event.target.value })
  
  }

  handleYearChange(event) {
    this.setState({ yearInput: event.target.value })
  }

  addMovieToWatchList(i) {
    axios.post('http://localhost:3535/api/addmovie', {
      id: this.state.movies[i].id,
      title: this.state.movies[i].title,
      year: this.state.movies[i].year,
      overview: this.state.movies[i].overview
    }).then(resp => {
      this.setState({ watchlist: resp.data.results })
    })
  }

  removeMovieFromWatchList(id) {
    // console.log('id ' + id)
    axios.delete(`http://localhost:3535/api/deletemovie/${id}`).then(resp => {
      this.setState({watchlist: resp.data})
    })
  }

  // componentWillMount -> render() -> componentDidMount
  // watchlist with saved data will load up even if we refresh the page
  componentDidMount () {
    this.assignWatchlist()
  }

  assignWatchlist() {
    const watchlistFromController = axios.get('http://localhost:3535/api/getwatchlist').then((resp) => {
      this.setState({ watchlist: resp.data })
      // console.log(this.state.watchlist)
    }).catch((err) => {
      console.log(err)
    })
  }

  handleUpdateYear (val) {
    this.setState({year: val})
    // console.log('year ' + this.state.year)
  }

  updateYear (id, year) {
    axios.put(`http://localhost:3535/api/updateyear/${id}/${year}`).then(resp => {
      // console.log('=====================>',resp)
      this.setState({ watchlist: resp.data })
    }).catch((err) => {
      console.log(err)
    })
  }

  render() {
    let displayWatchlist = this.state.watchlist.map((element, index) => {
      console.log('hey ma');
      return ( 
        <div>
          <DivWatchlist 
            index = { index }
            element = { element }
          />
          <input onChange={ (e) => this.handleUpdateYear(e.target.value) }></input>
          {/* {console.log(element.id)} */}
          <button onClick={ (e) => this.updateYear(element.id, element.year) }>Change</button>
        </div>
      )
    })

    return (
      <div>
        <div className="App">
        <Search
          getMovies={ this.state.getMovies }
          handleTitleChange={ this.state.handleTitleChange }
          handleYearChange= { this.state.handleYearChange }
        />
        <ShowMovies 
          SearchResults = { this.state.movies }
          addMovieToWatchList = { this.addMovieToWatchList }
          removeMovieFromWatchList = { this.removeMovieFromWatchList }
        />
        <h3 className="Title">My <b><i>Special</i></b> List</h3>
        { displayWatchlist }
        </div>
      </div>
    );
  }
}

export default App;
