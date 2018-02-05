import React, { Component } from 'react';

const Search = ({handleTitleChange, handleYearChange, getMovies}) => (
  <div className="App">
    <input
      className="TitleInput"
      placeholder="Search for a movie..."
      // value="default value for movie title"
      onChange={ handleTitleChange }>
    </input>
    <input
      className="YearInput"
      placeholder="Year"
      // value="defalut value for movie year"
      onChange={ handleYearChange }>
    </input>
    <button onClick={ getMovies }>Search</button>
    <br/>
  </div>
);

export default Search;