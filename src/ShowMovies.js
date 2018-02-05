import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

export default class ShowMovies extends Component {
  constructor(){
    super();

    this.state = {
      movies: [],
      id: '',
      title: '',
      year: '',
      overview: ''
    }
  }

  render() {
    console.log(this.props, 'showmovies props')
    console.log(this.props.SearchResults, ' props search')
    let displayArray = [];
    if (this.props.SearchResults.length !== 0) {
        

    
        displayArray = this.props.SearchResults.map((element, index) => {

    
            <div className="SearchResults" key={index}>
                <span className="SearchResultsTitle">{ element.title }</span>
                <span className="SearchResultsYear">{ element.year }</span>
                <button onClick={ () => {this.props.addMovieToWatchList(index)} }>Add to watchlist</button>
                <button onClick={ () => {this.props.removeMovieFromWatchList(element.id) } }>Remove from watchlist</button>
                <br/>
                <span>{ element.storyline }</span>
                <br/>
            </div>
        })
    }
    return (
      <div className="App">
        { displayArray }
      </div>
    );
  }
}